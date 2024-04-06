const express = require('express');
const WebSocket = require('ws');

const app = express();
const wss = new WebSocket.Server({ server: app });

// Simulated sensor data for multiple tanks (replace with actual sensor reading logic)
const tankData = {
  tank1: { level: 10, name: 'Tank 1' },
  tank2: { level: 15, name: 'Tank 2' },
  // ... add more tanks as needed
};

wss.on('connection', (ws) => {
  // Send initial water level data for all tanks to the connected client
  ws.send(JSON.stringify(tankData));

  // Simulate sensor readings and send updates at intervals
  setInterval(() => {
    for (const tankId in tankData) {
      tankData[tankId].level += Math.random() * 0.5 - 0.25; // Random variation
    }
    ws.send(JSON.stringify(tankData));
  }, 5000); // Update every 5 seconds (adjust as needed)
});

app.use(express.static('public')); // Serve static files from the 'public' directory

app.listen(3000, () => {
  console.log('Server listening on port 3000');
  console.log('hi');
});
