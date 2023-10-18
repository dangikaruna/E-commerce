import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

const LogIn = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Corrected function name

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate("/");
        }
    })
    const handleLogin = async () => {
        console.log(email, password);


        let result = await fetch("http://localhost:5000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        if(result.auth){
            localStorage.setItem('email', JSON.stringify(result.user.email))
            localStorage.setItem('user', JSON.stringify(result.user.username))
            localStorage.setItem('token', JSON.stringify(result.auth))
        navigate('/');

        }
        else{
            alert("please provide correct data ")
        }

       
    };

    return (
        <div className='signup-container'>
            <div className='signup-box'>
                <h1 style={{ textAlign: 'center',marginBottom:'30px',marginTop:'5px' }}>LogIn</h1>
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
                        onClick={handleLogin}
                        style={{ color: "white" }}
                    >
                        LogIn
                    </button>
                    <div className="signup-link-container">
                        <h4>New User?
                            <Link to="/signup"> Sign Up</Link>
                        </h4>
                    </div>
                </div>
            </div>
        
    );
}



export default LogIn;