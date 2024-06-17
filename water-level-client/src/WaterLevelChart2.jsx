import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import io from 'socket.io-client';

const WaterLevelChart2 = ({ tankId }) => {
  const [waterLevels, setWaterLevels] = useState({});
  const [latestWaterLevel, setLatestWaterLevel] = useState(null);

  const ctx23 = React.createRef();
  const ctxFullDay = React.createRef();

  // Effect to establish socket connection and handle data updates simulation
  useEffect(() => {
    const socket = io('your_socket_server_url'); 

    socket.on('waterLevelUpdate', (data) => {
      setWaterLevels(data);
      setLatestWaterLevel(data[data.length - 1]); 
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to generate random water levels for simulation
  const generateRandomWaterLevels = () => {
    const randomLevels = Array.from({ length: 24 }, () => Math.floor(Math.random() * 20)); 
    setWaterLevels(randomLevels);
    setLatestWaterLevel(randomLevels[randomLevels.length - 1]);
  };

  
  // Effect to create and update chart
  useEffect(() => {
    if (Object.keys(waterLevels).length > 0) {
      const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      const data = Object.values(waterLevels);

      const chartFullDay = new Chart(ctxFullDay.current, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `Tank ${tankId} Water Level (cm)`,
            data,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 171, 255, 0.2)',
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'blue',
            pointBorderColor: 'white',
            pointBorderWidth: 1,
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'HH:mm'
                }
              },
              ticks: {
                minRotation: 4
              }
            }],
            yAxes: [{
              ticks: {
                min: 0, // minimum y-axis value
                max: 10 // maximum y-axis value
              }
            }]
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      });

      const animation = {
        duration: 3000
      };

      chartFullDay.options.animation = animation;
      chartFullDay.update();

      return () => chartFullDay.destroy();
    }
  }, [waterLevels, tankId]);

  // Render
  return (
    <div>
      <h2>Tank {tankId} Water Level</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
          <button onClick={generateRandomWaterLevels}>Update Water Levels</button>
          <div style={{ position: 'relative', width: '200px', height: '100px' }}>
            <canvas ref={ctx23} width="200" height="100"></canvas>
          </div>
          <p>Water Level at 23:00: {latestWaterLevel} gallons</p>
        </div>
        <div style={{ width: '100%' }}>
          <canvas ref={ctxFullDay} width="400" height="200"></canvas>
        </div>
      </div>
    </div>
  );
};

export default WaterLevelChart2;
