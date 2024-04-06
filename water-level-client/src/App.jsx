import React, { useState } from 'react';
import WaterLevelChart from './WaterLevelChart';// Assuming the component is in a file named WaterLevelChart.jsx
import WaterManagement from './WaterManagement'; 
import WaterLevelAlerts from './WaterLevelAlerts';
import './App.css';
import DashboardPage from './DashboardPage';
import HomePage from './HomePage';
import WaterLevelHistory from './WaterLevelHistory';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


// Assuming the component is in a file named admin.jsx



function App() {
  const [tankCount, setTankCount] = useState(2); // Adjust based on your system

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/history" element={<WaterLevelHistory />} />
        <Route path="/admin" element={<WaterManagement />} />
        <Route path="/alerts" element={<WaterLevelAlerts />} />
        <Route path="/dashboard" element={<DashboardPage />} /> 
        
         
        
      </Routes>
    </Router>  
  
   


    </>
  )
}

export default App;
