// Signup component
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../config';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showError('Passwords do not match');
        } else {
            axios.post(`${backendUrl}/api/signup`, { username, email, password })
                .then(res => {
                    console.log(res.data);
                    alert('Signup successful. You can now login.');
                    navigate('/STK_Notes_Frontend/login');
                })
                .catch(err => {
                    console.error(err);
                    if (err.response) {
                        showError(err.response.data.message || 'Internal server error. Please try again later.');
                    } else {
                        showError('Failed to connect to the server. Please try again later.');
                    }
                });
        }
    }

    const showError = (errorMessage) => {
        setError(errorMessage);
        setShowToast(true);
    }

    return (
        <div className='form'>
            <h2>Create Your Account</h2>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn'>Signup</button>
                </div>
            </form>
            {showToast && (
                <div className='toast show'>
                    {error}
                    <div className="toast-progress"></div>
                </div>
            )}
        </div>
    )
}

export default Signup;