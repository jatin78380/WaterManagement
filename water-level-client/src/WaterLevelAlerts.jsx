import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

const WaterLevelAlerts = () => {
  const [waterLevel, setWaterLevel] = useState(10);
  const [alertMessage, setAlertMessage] = useState('');
  const [showManualAlert, setShowManualAlert] = useState(false);

  useEffect(() => {
    socket.on('waterLevelData', (data) => {
      setWaterLevel(data.level);
      setAlertMessage(data.message || ''); // Set empty string if no message
    });

    return () => socket.disconnect(); // Cleanup on unmount
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

// Add bounce animation (optional)
/*
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}*/
