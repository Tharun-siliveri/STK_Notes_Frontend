import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../config';
const NewNote = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // If token does not exist, navigate to login page
            navigate('/STK_Notes_Frontend/login');
        }
    }, []);


    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${backendUrl}/api/newnote`, { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            if (response.status === 201) {
                console.log(data.message);
                setTitle('');
                setContent('');
                navigate('/STK_Notes_Frontend/dashboard');
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='newNote'>
            <div className='nNRow1'>
                <Link to='/STK_Notes_Frontend/dashboard'><h3>DashBoard</h3></Link>
                <span>/ New Note</span>
            </div>
            <h2 className='addNoteTag'>Add Note</h2>
            <form className='newNoteForm' onSubmit={SubmitHandler}>
                <div className='formGroup'>
                    <label htmlFor='title'><h3>Title:-</h3></label>
                    <input type='text' id='title' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='formGroup'>
                    <label htmlFor='content'><h3>Content:-</h3></label>
                    <textarea id='content' value={content} onChange={e => setContent(e.target.value)}></textarea>
                </div>
                <div className='formGroup'>
                    <button className="btn addNoteBtn" type='submit'>Add Note</button>
                </div>
            </form>

        </div>
    )
}

export default NewNote