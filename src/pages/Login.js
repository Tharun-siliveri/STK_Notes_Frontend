// Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../config.js';

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000); // Hide the toast after 10 seconds
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${backendUrl}/api/login`, { email, password }) // Use process.env.PORT
            .then(res => {
                console.log(res.data);
                const token = res.data.token;

                // Store the token in local storage
                localStorage.setItem('token', token);
                props.setLoggedIn(true);
                navigate('/dashboard');
            })
            .catch(err => {
                console.error('Error:', err)
                if (err.response) {
                    showError(err.response.data.message);
                } else {
                    showError('Failed to connect to the server. Please try again later.');
                }
            });
    }

    const showError = (errorMessage) => {
        setError(errorMessage);
        setShowToast(true);
    }

    return (
        <div className='form'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn'>Login</button>
                </div>
            </form>
            {showToast && (
                <div className='toast show'>
                    {error}
                    <div className="toast-progress"></div>
                </div>
            )}
        </div>
    );
}

export default Login;
