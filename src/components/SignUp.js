import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'; // Corrected import statement
// Remove this line: import { Router } from 'express';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Corrected function name

  useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth){
      navigate("/");
    }
})
  const collectData = async () => {
    //console.log(username, email, password);

   
   let result = await fetch("http://localhost:5000/signup", {
      method: 'post',
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem('token', JSON.stringify(result.auth));
    localStorage.setItem('user', JSON.stringify(result.userObject.username));
    localStorage.setItem('email', JSON.stringify(result.userObject.email));
   

   
    navigate('/');
  };

 return (
    <div className='signup-container'>
      <div className='signup-box'>
        <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
        <input
          className='inputBox'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Enter User Name'
        />
        <input
          className='inputBox'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Email'
        />
        <input
          className='inputBox'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button
          className='appButton'
          type='button'
          onClick={collectData}
          style={{ color: "white" }}
        >
          Sign Up
        </button>
      
      </div>
    </div>
  );
}

export default SignUp;
