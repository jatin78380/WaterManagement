import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WaterLevelChart from './WaterLevelChart';
import WaterLevelChartt from './WaterLevelChart2';
import WaterLevelChart3 from './WaterLevelChart3';

const DashboardPage = () => {
    // State to keep track of which page is currently active
    const [activePage, setActivePage] = useState('Dashboard');
    const [selectedTankId, setSelectedTankId] = useState(1);

    // Using React Router's useNavigate hook to handle navigation
    const navigate = useNavigate();

    // Function to handle button clicks and change the active page
    const handleButtonClick = (page) => {
        if (page === 'Dashboard') {
            // Navigate to the admin page
            navigate('/admin');
        } else {
            setActivePage(page);
            setSelectedTankId(parseInt(page.split(' - ')[0].slice(5)));
        }
    };

    // Function to handle navigation to the admin page
    const handleNavigateToAdmin = () => {
        navigate('/admin');
    };




    const handleSubmit = async (event) => {
        event.preventDefault(); 
      
       
    
        // try {
        //   const response = await axios.post('http://localhost:3000/admin/configuration', {tankname,tankCapacity,location,threshold});
    
        //   if (response.status === 200) {
        //     console.log('config details added successfully');
           
        //   } else{
        //     if (response.status === 400) {
        //       console.log('config details already exist');
        //     } else {
        //       console.log('Error while adding config details');
        //     }
        //   }
        //   }
        // } catch (error) {
        //  console.log(error)
        // }
      };

    return (
        <div className="dashboard-page">
            <div className="nav">
                <img src="./images/VATank-Logo.jpg" alt="logo" className="logo" />
                <button onClick={handleNavigateToAdmin}>Login Page</button>
            </div>
            {/* Left column navigation menu */}
            <div className='wrapper'>
                <div className="leftmenu-column">
                    <button className="left-column-button" onClick={() => handleButtonClick('Tank 1 - Reservoir')}>Tank 1 - Reservoir</button>
                    <button className="left-column-button" onClick={() => handleButtonClick('Tank 2 - Reservoir')}>Tank 2 - Reservoir</button>
                    <button className="left-column-button" onClick={() => handleButtonClick('Tank 3 - Mountain')}>Tank 3 - Mountain</button>
                    <button className="left-column-button" onClick={() => handleButtonClick('Configuration')}>Configuration</button>
                    <button className="left-column-button" onClick={() => handleButtonClick('Billing')}>Billing</button>
                </div>

                {/* Dashboard */}
                <div className="rightdashboard-column">
                  {/* TANK RESERVOIR 1 */}
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
                  {/* TANK RESERVOIR 2 */}
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
                  {/* TANK MOUNTAIN 3 */}
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
                                <div className="big-white-square2">
                                    <p>Future application on next version</p>
                                    <div className="tank-configuration">
                                      <h2>Tank Configuration</h2>
                                      <div className="configuration-options">
                                      <form onSubmit={handleSubmit} className='login-form'>

                                          <label htmlFor="tankName">Tank Name:</label>
                                          <input type="text" id="tankName" name="tankName" placeholder="Enter tank name" />

                                          <label htmlFor="tankCapacity">Tank Capacity:</label>
                                          <input type="number" id="tankCapacity" name="tankCapacity" placeholder="Enter tank capacity" />

                                          <label htmlFor="location">Location:</label>
                                          <input type="text" id="location" name="location" placeholder="Enter tank location" />

                                          <label htmlFor="threshold">Threshold:</label>
                                          <input type="number" id="threshold" name="threshold" placeholder="Enter threshold value" />
                                          </form>
                                          <button className="save-btn">Save Configuration</button>
                                      </div>
                                      
                                     
                                  </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'Billing' && (
                        <div className="tank-container">
                            <h3>Billing</h3>
                            <div className="row">
                                <div className="big-white-square2">
                                    <p>Future application on next version</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
