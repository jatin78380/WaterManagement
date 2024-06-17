//Include Libraries
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define trigPin1 22 // Trigger pin of Sensor 1
#define echoPin1 23 // Echo pin of Sensor 1
#define trigPin2 24 // Trigger pin of Sensor 2
#define echoPin2 25 // Echo pin of Sensor 2
#define valve1Pin 26 // Valve control pin for Tank 1
#define valve2Pin 27 // Valve control pin for Tank 2
#define pumpPin 28 // Pump control pin
#define eStopPin 2 // Emergency Stop Switch (normally closed push button)
#define tankHeight 3 // Tank Height in meters
#define maxGallons 16000 // Maximum capacity of the Tank in gallons
RF24 radio(53, 49); // CE, CSN pins
const byte addresses[][6] = {"Reservoir", "Mountain"}; 

float filledPercentage1 = 0; // Reservoir Tank 1 fill percentage
float filledPercentage2 = 0; // Reservoir Tank 2 fill percentage
float receivedFillPercentage = 0; //Mountain Tank 3 fill percentage
volatile bool eStopTriggered = false;

void setup() {
  Serial.begin(9600); 
  pinMode(trigPin1, OUTPUT); 
  pinMode(echoPin1, INPUT); 
  pinMode(trigPin2, OUTPUT); 
  pinMode(echoPin2, INPUT); 
  pinMode(valve1Pin, OUTPUT); 
  pinMode(valve2Pin, OUTPUT);
  pinMode(pumpPin, OUTPUT); 
  pinMode(eStopPin, INPUT_PULLUP); // internal pull-up resistor
  digitalWrite(valve1Pin, LOW);
  digitalWrite(valve2Pin, LOW);
  digitalWrite(pumpPin, LOW);

  attachInterrupt(digitalPinToInterrupt(eStopPin), emergencyStopActivated, FALLING);

  //RF Communication:
  radio.begin();
  radio.setPALevel(RF24_PA_HIGH); // More RF Range
  radio.setDataRate(RF24_250KBPS); // More RF Range
  radio.setCRCLength(RF24_CRC_16); // Improved error detection
  radio.setAddressWidth(5); // Regular address width
  radio.setChannel(75); // RF Channel 75 to avoid interference with other 2.4GHz devices
  radio.openReadingPipe(1, addresses[0]); //listening mode
  radio.startListening(); // This device is set to listening mode  
}

void loop() {
  if(eStopTriggered) {
        // Redundance for safety.
        digitalWrite(valve1Pin, LOW);
        digitalWrite(valve2Pin, LOW);
        digitalWrite(pumpPin, LOW);
        delay(1000);
        return; 
    }

  float distance1 = measureDistance(trigPin1, echoPin1);
  float distance2 = measureDistance(trigPin2, echoPin2);
  
  filledPercentage1 = calculateFilledPercentage(distance1);
  filledPercentage2 = calculateFilledPercentage(distance2);

  //RF Communication:
  mountainTankData();
  //Update and Alerts
  printReadings(filledPercentage1, filledPercentage2, receivedFillPercentage);
  checkAlerts(filledPercentage1, filledPercentage2);
  
  Serial.println("---------"); //Line for dividing current reading with the next one
}

float measureDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  return duration * 0.034 / 2 / 100; //Convert to distance in meters
}

float calculateFilledPercentage(float distance) {
  return ((tankHeight - distance) / tankHeight) * 100;
}

void printReadings(float filledPercentage1, float filledPercentage2, float receivedFillPercentage) {
  Serial.print("Tank 1 filled: ");
  Serial.print(filledPercentage1);
  Serial.println("%");
  Serial.print("Tank 1 gallons: ");
  Serial.print((filledPercentage1 / 100) * maxGallons);
  Serial.println(" gallons");

  Serial.print("Tank 2 filled: ");
  Serial.print(filledPercentage2);
  Serial.println("%");
  Serial.print("Tank 2 gallons: ");
  Serial.print((filledPercentage2 / 100) * maxGallons);
  Serial.println(" gallons");

  Serial.print("Mountain Tank filled: ");
  Serial.print(receivedFillPercentage);
  Serial.println("%");
}

void checkAlerts(float filledPercentage1, float filledPercentage2) {
  //-------TANK 1-------//
  // Check for low level alert (10%) and hight level alert (75%)
  if (filledPercentage1 >=0 && filledPercentage1 <75){
        digitalWrite(valve1Pin, HIGH); 
        if (filledPercentage1 <= 10) {
             Serial.println("Tank 1: Low level alert!");
        }
  } else if (filledPercentage1 >= 75) {
        Serial.println("Tank 1: Overflow level alert! Turning valve off.");
        digitalWrite(valve1Pin, LOW); 
  }
  //-------TANK 2-------//
  // Check for low level alert (10%) and hight level alert (75%)
  if (filledPercentage2 >=0 && filledPercentage2 <75){
        digitalWrite(valve2Pin, HIGH); 
        if (filledPercentage2 <= 10) {
             Serial.println("Tank 2: Low level alert!");
        }
  } else if (filledPercentage2 >= 75) {
        Serial.println("Tank 2: Overflow level alert! Turning valve off.");
        digitalWrite(valve2Pin, LOW); 
  }
}

void mountainTankData() {
    if (radio.available()) { 
        radio.read(&receivedFillPercentage, sizeof(receivedFillPercentage)); 
        
        if (filledPercentage1 < 15 && filledPercentage2 < 15) {
            Serial.println("Not enought reservoir water. Pump OFF");
            digitalWrite(pumpPin, LOW); 
        }
        else if (receivedFillPercentage >= 90) { 
            Serial.println("Alert: Mountain Tank overflow level!");
            digitalWrite(pumpPin, LOW); 
        } 
        else if (receivedFillPercentage <= 10) {
            Serial.println("Alert: Mountain Tank low level! Pump ON");
            if (!(filledPercentage1 < 15 && filledPercentage2 < 15)) {
                digitalWrite(pumpPin, HIGH); 
            }
        } 
        else if (receivedFillPercentage < 75) {
            if (!(filledPercentage1 < 15 && filledPercentage2 < 15)) {
                digitalWrite(pumpPin, HIGH);
                Serial.println("Pump is active.");
            }
        } else {
            digitalWrite(pumpPin, LOW);
            Serial.println("Pump OFF. Waiting for low level.");
        }
    }else{
        //If communication fails turn off for safety. 
        emergencyStopActivated();
    }
}

void emergencyStopActivated() {
    // Turn off everything
    digitalWrite(valve1Pin, LOW);
    digitalWrite(valve2Pin, LOW);
    digitalWrite(pumpPin, LOW);
    // E-Stop flag
    eStopTriggered = true;
}

