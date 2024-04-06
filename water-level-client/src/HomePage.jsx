import React from 'react';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
    const navigate = useNavigate();
    const handleNavigateToAdmin = () => {
        navigate('/admin'); // Replace with your actual admin route path
      };
    
  return (
    <div className='App'> 

    
    <section className="hero">
      <div className="left-column">
        <h1>IOT Solution for Water Tank System in VLC</h1>
        <p>IoT-powered water management solution, providing real-time data visualization and analytics for Valencia Urbanism.</p>
        <button onClick={ handleNavigateToAdmin }>Check Demo</button>
      </div>
      <div className="right-column">
        <img src="./images/Hero-Image.jpg" alt="Water Tank" className="hero-img-container" />
      </div>
    </section>
    <section className="features">
        <h2>Simple Installation & Scalability</h2>
        <div className="features-wrapper">
        <div className="feature">
            <div className="circle">
            <img src="./images/DashboardIcon.png" alt="Dashboard" className="icon"/>
            </div>
            <p className="pwhite">One dashboard for management tasks.</p>
        </div>
        <div className="feature">
            <div className="circle">
            <img src="./images/WirelessIcon.png" alt="Wireless" className="icon"/>
            </div>
            <p className="pwhite">Wireless feature with easy installation.</p>
        </div>
        <div className="feature">
            <div className="circle">
            <img src="./images/NotificationIcon.png" alt="Notifications" className="icon"/>
            </div>
            <p className="pwhite">Customizable alerts and notifications.</p>
        </div>
        </div>
        <div>
        <img src="./images/BayAreaHacks.png" alt="BayAreaHAcks" className="sponsor"/>
        </div>
    </section>
    <section className="team">
        <h2 className="h2dark">Team</h2>
        
        <div className="features-wrapper">
        <div className="team-wrapper">
            <img src="./images/JP.jpg" alt="Jatin Parashar" className="pfp"/>
            <p>Jatin Parashar</p>
            <p><b>Aspiring Full Stack Dev</b></p>
        </div>
        <div className="team-wrapper">
            <img src="./images/MS.jpg" alt="Maria Salcedo" className="pfp"/>
            <p>María Salcedo</p>
            <p><b>Front-end Dev & Designer</b></p>
        </div>
        </div>
    </section>
     <section className="footer">
     <p className="pwhite">Project for BayAreaHacks Hackathon 2.0</p>
 </section>
 </div>
  );
}

export default HomePage;