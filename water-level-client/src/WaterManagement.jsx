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
      const response = await axios.post('http://localhost:3000/admin/signup', { email, password });

      if (response.status === 200) {
        console.log('Login successful!');
        navigate('/dashboard'); // Navigate to dashboard upon successful login
      } else {
        setErrorMessage(response.data.message || 'Login failed.');
      }
    } catch (error) {
     console.log(error)
    }
  };

  // Render
  return (
    <div className='pt-0.5 mt-6 mx-2.5  border-b border-neutral-900  pb-24'>

      <div  className=''>
      <form  className= " grid gap-6  box-border md:box-content rounded-2xl w-1/8  lg:w-1/4 p-8 bg-blue-900 my-20 text-center text-4xl" onSubmit={handleSubmit}>
        <h1 className=''>Login</h1>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className=' grid-gap-6 '>
          <label  className=" flex justify-right"htmlFor="email">Email:</label>
          <input   className='p-0.5 border-2 my-2.5  caret-pink-500 rounded-lg'
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='grid gap-6 form-group'>
          <label className='flex justify-right' htmlFor="password">Password:</label>
          <input className='p-0.5 my2.5 border-2  caret-pink-500 rounded-lg' 
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='rounded-full' type="submit">Login</button>
      </form>

      </div>
     
    
    </div>
    
  );
}

export default WaterManagement;
