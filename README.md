# VATank: Water Reservoir Management System
![VATank Mockup](https://i.ibb.co/wcKbSrC/Mockup.jpg)

IoT-powered water management solution,  providing real-time data visualization and analytics for Valencia Urbanism.
In Valencia, Venezuela, an urban area faces a critical challenge with its water management system. The urbanism features three water tanks crucial for sustaining the community's water supply. However, the existing infrastructure relies on outdated mechanical sensors that merely trigger pump operations without providing any insights into the water levels within each tank. 

The communication network connecting these tanks is vulnerable to disruptions, particularly during the rainy season, when fallen trees frequently damage the aerial cables.
Project made thanks to Bay Area Hacks 2.0 Hackathon.

## Key Features
**Real-time visualization of individual tank water level:** This is critical for administrators to monitor the water availability in each tank and make informed decisions about water distribution.

**Alerts for low water levels and excessive flow rates:** These alerts are crucial for preventing potential water shortages and identifying potential leaks in the system.

**Valves and Pump control:** Depending on the water levels of Reservoir and Mountain Base, it controls each of the devices.

**RF CommunicationL** RF communication between Mountain and Reservoir Base.

## Future Features
**Management tools for administrators:** This includes functionalities like viewing historical data, managing alerts, and potentially configuring basic control settings for the pump if your hardware allows for it.

**User authentication and authorization:** Implement secure login and access control functionalities for administrators.

**Enhance sensor technology:** Not only monitor water levels but also track water quality parameters such as pH, turbidity, and contaminants.

**Monitor environmental factors:** Temperature, humidity, and rainfall.

**Implement machine learning algorithms:** Analyze historical data and predict future water consumption patterns, enabling proactive decision-making and resource planning.

**Billing:** Utilize real-time water consumption data collected by IoT sensors to generate accurate billing statements for residential, commercial, and industrial members.

**Members portal:** Where members can access their water consumption data, billing statements, and payment history.

# Water Dashboard - FrontEnd
Designed for monitor water level of each of the tanks, we had various challenges communicating the arduino with our web server. Mainly because we were working with simulators that couldn't handle that communication. It could've been done via WebSocket or using a WiFi module. The connection would've been in the Reservoir base, because it handles all the data from all of the tanks. 

**To access to the project:**

$ cd water-level-client

$ npm run dev

**To go to login:**

Click the check demo button or go to http://localhost:5173/admin

**To go to dashboard:**

http://localhost:5173/dashboard

## Tech Stack:
- React.js for UI.
- Chart.js for creating charts.
- Express.js for secure authentication.
- C++ for Arduino.
- SPI.h, nRF24L01.h and RF24.h libraries for RF Communication.

# Water Reservoir Management System - Arduino
Water Reservoir Management System designed to monitor and control water levels in two reservoir tanks and one mountain tank, utilizing Arduino microcontroller boards and various sensors and actuators. The system incorporates ultrasonic sensors for water level measurement, solenoid valves for water flow control, a water pump, and an emergency stop mechanism. Additionally, it employs an RF module for wireless communication with a remote mountain tank.

## System Components
- **Arduino Microcontroller:** Acts as the central processing unit for controlling sensors, valves, pump, and RF communication.
- **Ultrasonic Sensors (HC-SR04):** Used to measure the water level in the tanks. The trigger pins emit ultrasonic pulses, and the echo pins receive the reflected signals.
- **Solenoid Valves:** Electrically operated valves control the ingress of water into the reservoir tanks. They are actuated based on the fill level to prevent overflow or depletion.
- **Water Pump: Pumps water** from the reservoir tanks to the mountain tank. It is controlled based on the water level conditions of both the reservoir and mountain tanks.
- **RF Module (nRF24L01):** Enables wireless communication between the system and the remote mountain tank, allowing for the transmission and reception of tank fill levels.
- **Emergency Stop Switch:** A safety feature allowing for the manual, immediate cessation of all operations in case of an emergency.

## Circuit Diagram
**Reservoir Base**

![Reservoir Diagram](https://i.ibb.co/3fd0pJx/Screenshot-296.png)

**Mountain Base**

![Mountain Diagram](https://i.ibb.co/CKWmcxR/Screenshot-299.png)

Check file "VATank-Circuit-Diagram.pdf"

## Reservoir Base
### Simulation
Check TinKerKad Simulation here: https://www.tinkercad.com/things/3jS6k3861r8-powerful-wolt-krunk/editel?sharecode=E860uOz6-trSfUnOk5dSWzfpXMBiEw4g3Mir018WncQ

![TinkerKad Simulation](https://i.ibb.co/7J291B2/VATank-Reservoir-Simulation.png)

### Pin Configuration - Arduino MEGA
- trigPin1, echoPin1, trigPin2, echoPin2: Pins for ultrasonic sensors.
- valve1Pin, valve2Pin: Control pins for the solenoid valves.
- pumpPin: Control pin for the pump.
- eStopPin: Pin for the emergency stop switch.

### Constants and Variables
- tankHeight, maxGallons: Constants for tank dimensions and capacity.
- filledPercentage1, filledPercentage2, receivedFillPercentage: Variables to store the fill percentages of the tanks.
- eStopTriggered: A flag to indicate if the emergency stop has been activated.

### Setup Function
Initializes serial communication, pin modes, and the RF communication settings. It also attaches an interrupt for the emergency stop switch.

### Loop Function
Checks for the eStop condition, measures the distance (and thus the fill level) of the tanks, communicates with the mountain tank, updates the fill percentage, and checks for alerts. It repeats these actions indefinitely.

### Helper Functions
- measureDistance(): Calculates the distance to the water surface using the ultrasonic sensors.
- calculateFilledPercentage(): Converts the measured distance to a percentage of the tank's fill level.
- printReadings(): Prints the fill percentages and volume in gallons for each tank.
- checkAlerts(): Checks for and handles low and high water level alerts for each tank.
- mountainTankData(): Manages RF communication with the mountain tank, including receiving fill level data and controlling the pump based on the tank levels.
- emergencyStopActivated(): Handles the emergency stop procedure by turning off all valves and the pump, and setting the eStopTriggered flag.

### System Operation
The system operates by continuously measuring the fill levels of the reservoir tanks, receiving the fill level of the mountain tank via RF communication, and adjusting the water flow and pump operation accordingly. It uses predefined thresholds to manage water distribution and ensure the tanks do not overflow or run dry. The emergency stop feature allows for immediate cessation of all operations in case of an emergency.

## Mountain Base
### Pin Configuration - Arduino UNO
- trigPin (3): Trigger pin of the ultrasonic sensor, responsible for sending out ultrasonic signals.
- echoPin (4): Echo pin of the ultrasonic sensor, receives the ultrasonic signals after bouncing off the water surface.
- CE and CSN Pins (9 and 8 respectively): Pins used for initializing the nRF24L01 module, enabling it to enter sending mode.

### System Operation
The system continuously measures the water level in the mountain tank using an ultrasonic sensor. This measurement is then converted into a percentage based on the total height of the tank. The calculated fill percentage is transmitted over RF to the central monitoring system, allowing for remote monitoring and management of the water resource. This loop of measuring and transmitting ensures real-time updates on the water level, facilitating efficient water management and alerting for potential issues such as overflow or depletion.

# RF Communication Documentation
![RF Link](https://i.ibb.co/T4NMBnh/Screenshot-300.png)

This section outlines the specifications of the RF communication link used in the water level monitoring system between a mountain tank and a reservoir. The system operates within the 2.4 GHz ISM band, utilizing the NRF24L01 module for transmission and reception, and employs the Enhanced ShockBurst protocol for data communication.

## Frequency Band: 2.4 GHz ISM Band
- Channel: Specifically, channel 75 of the NRF24L01 Module, between 2474MHz and 2475MHz. The 2.4 GHz ISM band is available worldwide for unlicensed use, facilitating the deployment of the system in different regions without regulatory constraints. The NRF24L01 module's capability to auto-switch channels helps in mitigating interference from other devices operating in the same band.
- 250kbps Data Rate: This data rate is optimal for transmitting the necessary water level data efficiently, balancing speed and reliability over the communication link.

## Distance and Terrain
- Distance between mountain and reservoir: 0.6 Km.
- Terrain elevation variation: 28 m.
- Installation Requirements: Both antennas need to be at least 2m above ground.
- Propagation Mode: Line of sight, with minimum clearance of 0.7F1 at 0.5 Km, ensuring reliable signal transmission over the geographical features present between the two points.
- Climate: Equatorial. RF links with frequency below 4GHz are good for rainy scenarios.
- Surface Refractivity: 301 N-units
- Ground Conductivity: 0.005 S/m
- Relative Ground Permittivity: 15

## Propagation Loss and System Gain
- Total Propagation Loss: 99.4 dB, calculated considering the distance, frequency band, and terrain characteristics.
- Yagi Antenna: Needs to be 25 dBi gain to overcome propagation losses, ensuring strong signal reception and transmission. 
- System Gain: 137 dB from Mountain to Reservoir and vice versa.
- Receiver Sensitivity: -94 dBm at 250kbps allows for the detection of weak signals, ensuring reliable data communication.

## Modulation and Protocol
- Modulation: GFSK (Gaussian Frequency Shift Keying.
- Protocol: Enhanced ShockBurst, developed by Nordic Semiconductors.

## Range
![RF Range](https://i.ibb.co/xMkdqPH/Screenshot-302.png)

## Distribution
![RF Distribution](https://i.ibb.co/N2qLjNv/Screenshot-303.png)

## Operative Link
![RF Operative](https://i.ibb.co/Z8hjc9D/Screenshot-301.png)

# Team
![Jatin Parashar](https://i.ibb.co/9vq75zx/JP.jpg)

**Jatin Parashar:** Front-end & Backed Developer.

Linkedin: https://www.linkedin.com/in/jatin-parashar-1b1905222/

![Maria Salcedo](https://i.ibb.co/GVgdWPX/MS.jpg)

**Maria Salcedo:** Front-end & C++ Developer.

Linkedin: https://www.linkedin.com/in/maria-g-salcedo/

# Glossary
- Frequency Band: The specific range of radio frequencies assigned for particular uses. 
- Data Rate: The speed at which data is transmitted, typically measured in bits per second (bps). 
- Terrain Elevation Variation: The difference in height between the lowest and highest points of the terrain in a specific area, affecting signal propagation.
- Line of Sight (LOS): A type of propagation that requires a clear path between the transmitter and receiver. This is crucial for ensuring reliable RF communication, especially in high-frequency bands.
- Propagation Loss: The reduction in power density (attenuation) of an electromagnetic wave as it propagates through space. This loss is influenced by factors such as frequency, distance, and environmental conditions.
- Yagi Antenna: A directional antenna consisting of multiple parallel elements in a line, typically used for high-gain requirements. It is well-suited for long-distance communication in a specific direction.
- System Gain: The total gain of a communication system, accounting for the gains and losses from the transmitter, through the medium, to the receiver. 
- Receiver Sensitivity: The minimum signal strength that a receiver can detect and correctly demodulate. A sensitivity of -94 dBm means that the receiver can detect signals as low as -94 decibels relative to 1 milliwatt.
- Modulation: The process of varying a carrier wave in order to use that wave to convey information. GFSK (Gaussian Frequency Shift Keying) is a type of frequency modulation that smoothens the frequency transitions to reduce bandwidth and interference.
- Surface Refractivity: A measure of how much the path of light is bent, or refracted, when it enters from one medium to another. In RF propagation, it refers to the refractivity of the atmosphere affecting the signal path.
- Ground Conductivity: The ability of the ground to conduct electricity, affecting ground-based antennas and the propagation of ground waves.
- Relative Ground Permittivity: A measure of how much an electric field is decreased within a medium compared to a vacuum. It affects the propagation of signals near the ground.
- Equatorial Climate: Refers to the climate conditions found near the equator, characterized by high humidity and rainfall, which can impact RF signal propagation, especially at frequencies above 4 GHz.
