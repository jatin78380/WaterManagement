//Include Libraries
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define trigPin 3 // Trigger pin of Sensor 1
#define echoPin 4 // Echo pin of Sensor 1
#define tankHeight 3 // Tank Height in meters
#define maxGallons 16000 // Maximum capacity of the Tank in gallons
RF24 radio(9, 8); // CE, CSN pins
const byte addresses[][6] = {"Reservoir", "Mountain"}; 


float filledPercentage = 0; // Mountain Tank 3 fill percentage

void setup() {
  Serial.begin(9600); 
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 

  //RF Communication:
  radio.begin();
  radio.setPALevel(RF24_PA_HIGH); // More RF Range
  radio.setDataRate(RF24_250KBPS); // More RF Range
  radio.setCRCLength(RF24_CRC_16); // Improved error detection
  radio.setAddressWidth(5); // Regular address width
  radio.setChannel(75); // RF Channel 75 to avoid interference with other 2.4GHz devices
  radio.openWritingPipe(addresses[0]); //sending mode
}

void loop() {
    float distance = measureDistance(trigPin, echoPin);
    filledPercentage = calculateFilledPercentage(distance);
    radio.write(&filledPercentage, sizeof(filledPercentage));
    delay(10000); // Wait for 2 seconds before sending the next data
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

