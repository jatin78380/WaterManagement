import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WaterManagement() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Check if email and password are not empty
    if (!email || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });

      if (response.status === 200) {
        console.log('Login successful!');
        navigate('/dashboard'); // Navigate to dashboard upon successful login
      } else {
        setErrorMessage(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  // Render
  return (
    <div>
      <form onSubmit={handleSubmit} className='login-form'>
        <h1>Login</h1>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default WaterManagement;
