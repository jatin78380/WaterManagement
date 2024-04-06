import React, { useState } from 'react';
import WaterLevelChart from './WaterLevelChart';
import { useNavigate } from 'react-router-dom';
import WaterLevelChartt from './WaterLevelChart2';
import WaterLevelChart3 from './WaterLevelChart3';
import Chart from 'chart.js/auto'; 

const DashboardPage = () => {
  // State to keep track of which page is currently active
  const [activePage, setActivePage] = useState('Dashboard');

  // Function to handle button clicks and change the active page
  const [selectedTankId, setSelectedTankId] = useState(1); 
  
  const navigate = useNavigate();
  const handleButtonClick = (page) => {
    if (page === 'Dashboard') {
      // Navigate to the admin page instead of updating activePage
      navigate('/admin');
    } else {
      setActivePage(page);
      setSelectedTankId(parseInt(page.split(' - ')[0].slice(5)));
    }
  };
 
  const handleNavigateToAdmin = () => {
      navigate('/admin'); // Replace with your actual admin route path
    };


  return (
    <div className="dashboard-page">
      <div className="nav">
        <img src="./images/VATank-Logo.jpg" alt="logo" className="logo" />
        <button onClick={ handleNavigateToAdmin }>Check Demo</button>
      </div>
      {/* Left column navigation menu */}
      <div className='wrapper'>
      <div className="leftmenu-column">
        <button className="left-column-button" onClick={() => handleButtonClick('Tank 1 - Reservoir')}>Tank 1 - Reservoir</button>
        <button className="left-column-button" onClick={() => handleButtonClick('Tank 2 - Reservoir')}>Tank 2 - Reservoir</button>
        <button className="left-column-button" onClick={() => handleButtonClick('Tank 3 - Mountain')}>Tank 3 - Mountain</button>
        <button className="left-column-button" onClick={() => handleButtonClick('Tank 3 - Mountain')}>History</button>
        <button className="left-column-button" onClick={() => handleButtonClick('Configuration')}>Configuration</button>
        <button className="left-column-button" onClick={() => handleButtonClick('Billing')}>Billing</button>
      </div>

      {/* Dashboard */}
      <div className="rightdashboard-column"> 
        
         
        {activePage === 'Tank 1 - Reservoir' && (
          <div className="tank-container">
            <h3>Tank 1 - Reservoir</h3>
            <div className="row">
              <div className="column">
                    <p><b className="blue-text">Last Update:</b> Today</p>
                    <p><b className="blue-text">Tank Volume:</b> 10 Gallons</p>
              </div>
            </div>
            <div className="row">
              <div className="big-white-square"> 
              <WaterLevelChart tankId={1} />
              </div>
            </div>
          </div>
        )}

        {activePage === 'Tank 2 - Reservoir' && (
          <div className="tank-container">
            <h3>Tank 2 - Reservoir</h3>
            <div className="row">
              <div className="column">
                    <p><b className="blue-text">Last Update:</b> Today</p>
                    <p><b className="blue-text">Tank Volume:</b> 20 Gallons</p>
              </div>
            </div>
            <div className="row">
              <div className="big-white-square">
              <WaterLevelChartt tankId={1} />
              </div>
            </div>
          </div>
        )}

        {activePage === 'Tank 3 - Mountain' && (
          <div className="tank-container">
            <h3>Tank 3 - Mountain</h3>
            <div className="row">
              <div className="column">
                    <p><b className="blue-text">Last Update:</b> Today</p>
                    <p><b className="blue-text">Tank Volume:</b> 30 Gallons</p>
              </div>
            </div>
            <div className="row">
              <div className="big-white-square">
              <WaterLevelChart3 tankId={1} />
              </div>
            </div>
          </div>
        )}

        {activePage === 'Configuration' && (
          <div className="tank-container">
            <h3>Settings & Configuration</h3>
            <div className="row">
              <div className="big-white-square"></div>
            </div>
          </div>
        )}  

        {activePage === 'Billing' && (
          <div className="tank-container">
            <h3>Billing</h3>
            <p>Future application on next version</p>
            <div className="row">
              <div className="big-white-square"></div>
            </div>
          </div>
        )}  

        {/* Add similar conditional rendering for other pages */}
      </div>

      </div>
     

    </div>
  );
};

export default DashboardPage;
