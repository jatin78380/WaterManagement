import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
const container =(delay)=>( {
    hidden: { x: -100, opacity: 0 },
    visible:{
      x:0,
      opacity:1,
      transition: {duration: 0.5, delay:delay}
    }
  })
const HomePage = () => {
    // Using React Router's useNavigate hook to handle navigation
    const navigate = useNavigate();
    
    // Function to handle navigation to the admin page
    const handleNavigateToAdmin = () => {
        navigate('/admin'); 
    };
    
    return (
        <div className='App'>   
            {/* Hero section */}
            <section className="hero">
                <div 
               className="left-column">
                    <motion.h1 variants={container(0)} initial="hidden" animate="visible">IOT Solution for Water Tank System in VLC</motion.h1>
                    <motion.p variants={container(0.5)} initial="hidden" animate="visible">IoT-powered water management solution, providing real-time data visualization and analytics for Valencia Urbanism.</motion.p>
                    <motion.button variants={container(1)} initial="hidden" animate="visible" onClick={handleNavigateToAdmin}>Check Demo</motion.button>
                </div>
                <motion.div  initial={{x:100,opacity:0}} 
           animate={{x:0,opacity: 1}} 
           transition={{duration: 1, delay: 1.5}} className="right-column">
                    <img src="./images/Hero-Image.jpg" alt="Water Tank" className="hero-img-container" />
                </motion.div>
            </section>
            {/* Features section */}
            <section className="features">
                <motion.h2 whileInView={{opacity:1, y:0}} initial={{opacity:0, y: -100}} transition={{duration: 1}}>Simple Installation & Scalability</motion.h2>
                <div className="features-wrapper">
                    <div className="feature">
                        <motion.div whileInView={{opacity: 1 , y:0}} initial={{opacity:0 ,y:100}}  transition={{duration:1.5}} className="circle">
                            <img src="./images/DashboardIcon.png" alt="Dashboard" className="icon"/>
                        </motion.div>
                         < motion.p whileInView={{opacity: 1 , y:0}} initial={{opacity:0 ,y:-100}}  transition={{duration:1.5}} className="pwhite">One dashboard for management tasks.</motion.p>
                    </div>
                    <div className="feature">
                        <motion.div whileInView={{opacity: 1 , y:0}} initial={{opacity:0 ,y:100}}  transition={{duration:1.5}} className="circle">
                            <img src="./images/WirelessIcon.png" alt="Wireless" className="icon"/>
                        </motion.div>
                        < motion.p whileInView={{opacity: 1 , y:0}} initial={{opacity:0 ,y:-100}}  transition={{duration:1.5}} className="pwhite">Wireless feature with easy installation.</motion.p>
                    </div>
                    <div className="feature">
                        <motion.div whileInView={{opacity: 1 , y:0}} initial={{opacity:0 ,y:100}}  transition={{duration:1.5}}className="circle">
                            <img src="./images/NotificationIcon.png" alt="Notifications" className="icon"/>
                        </motion.div>
                        < motion.p whileInView={{opacity: 1 , y:0}} initial={{opacity:0 ,y:-100}}  transition={{duration:1.5}}p className="pwhite">Customizable alerts and notifications.</motion.p>
                    </div>
                </div>
                {/* Sponsor section */}
                <motion.div whileInView={{opacity:1, y:0}} initial={{opacity:0, y: -100}} transition={{duration: 1}}div>
                    <img src="./images/BayAreaHacks.png" alt="BayAreaHAcks" className="sponsor"/>
                </motion.div>
            </section>
            {/* Team section */}
            <section className="team">
                <motion.h2 whileInView={{opacity:1, y:0}} initial={{opacity:0, y: -100}} transition={{duration: 1}} className="h2dark">Team</motion.h2>
                <div className="features-wrapper">
                    <div className="team-wrapper">
                        <motion.img whileInView={{opacity:1, y:0}} initial={{opacity:0, y: -100}} transition={{duration: 1}} src="./images/JP.jpg" alt="Jatin Parashar" className="pfp"/>
                        <motion.p whileInView={{opacity:1, x:0}} initial={{opacity:0, x: -100}} transition={{duration:1}}>Jatin Parashar</motion.p>
                        <motion.p whileInView={{opacity:1, x:0}} initial={{opacity:0, x: -100}} transition={{duration:1}}p><b>Aspiring Full Stack Dev</b></motion.p>
                    </div>
                    <div className="team-wrapper">
                        <motion.img whileInView={{opacity:1, y:0}} initial={{opacity:0, y: -100}} transition={{duration: 1}}img src="./images/MS.jpg" alt="Maria Salcedo" className="pfp"/>
                        <motion.p whileInView={{opacity:1, x:0}} initial={{opacity:0, x: -100}} transition={{duration:1}}>María Salcedo</motion.p>
                        <motion.p whileInView={{opacity:1, x:0}} initial={{opacity:0, x: -100}} transition={{duration:1}}><b>Front-end Dev & Designer</b></motion.p>
                    </div>
                </div>
            </section>
            {/* Footer section */}
            <section className="footer">
                <motion.p whileInView={{opacity:1, y:0}} initial={{opacity:0, y: -100}} transition={{duration: 1}} className="pwhite">Project for BayAreaHacks Hackathon 2.0</motion.p>
            </section>
        </div>
    );
}

export default HomePage;
