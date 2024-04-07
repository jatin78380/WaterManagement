import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const WaterLevelAlerts = () => {
  const [waterLevel, setWaterLevel] = useState(10);
  const [alertMessage, setAlertMessage] = useState('');
  const [showManualAlert, setShowManualAlert] = useState(false);

  useEffect(() => {
    socket.on('waterLevelData', (data) => {
      setWaterLevel(data.level);
      setAlertMessage(data.message || ''); 
    });

    return () => socket.disconnect(); 
  }, []);

  const triggerManualAlert = () => {
    setShowManualAlert(true);
    setTimeout(() => setShowManualAlert(false), 3000); // Hide alert after 3 seconds
  };

  const notificationStyle = {
    padding: '10px',
    backgroundColor: alertMessage || showManualAlert ? 'red' : 'white',
    border: '1px solid black',
    borderRadius: '5px',
    animation: (alertMessage || showManualAlert) && 'bounce 1s infinite ease-in-out',
  };

  return (
    <div>
      <h1>Water Level: {waterLevel} gallons</h1>
      {alertMessage && (
        <div style={notificationStyle}>
          <b>Alert:</b> {alertMessage}
        </div>
      )}
      {showManualAlert && (
        <div style={notificationStyle}>
          <b>Manual Alert:</b> This is a manually triggered notification.
        </div>
      )}
      <button onClick={triggerManualAlert}>Trigger Manual Alert</button>
    </div>
  );
};

export default WaterLevelAlerts;


