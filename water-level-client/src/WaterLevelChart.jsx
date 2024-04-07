import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const WaterLevelChart = ({ tankId }) => {
  const [waterLevels, setWaterLevels] = useState({});
  const [latestWaterLevel, setLatestWaterLevel] = useState(null);

  const ctx23 = React.createRef();
  const ctxFullDay = React.createRef();

  // Function to generate random water levels for simulation 
  const generateRandomWaterLevels = () => {
    const randomLevels = Array.from({ length: 24 }, () => Math.floor(Math.random() * 10)); 
    setWaterLevels(randomLevels);
    setLatestWaterLevel(randomLevels[randomLevels.length - 1]);
  };

  // Effect to update water levels periodically
  useEffect(() => {
    const updateWaterLevelPeriodically = () => {
      generateRandomWaterLevels();
      setTimeout(() => {
        updateWaterLevelPeriodically();
      }, 1000);
    };

    updateWaterLevelPeriodically();
  }, []);

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
                suggestedMin: 0, // minimum y-axis value
                suggestedMax: 10 // maximum y-axis value
              }
            }]
          },
          legend: {
            display: true,
            position: 'bottom'
          },
          animation: {
            duration: 3000,
            easing: 'linear'
          }
        }
      });

      return () => chartFullDay.destroy();
    }
  }, [waterLevels, tankId]);

  // Render
  return (
    <div>
      <h2>Tank {tankId} Water Level</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '45%' }}>
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

export default WaterLevelChart;
