import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from '../components/Note';
import { Link, useNavigate } from 'react-router-dom';
import UpdateNote from '../components/UpdateNote';
import { backendUrl } from '../config';

const DashBoard = (props) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [notes, setNotes] = useState([]);
    const [updateNoteId, setUpdateNoteId] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${backendUrl}/api/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsername(response.data.username);
            setNotes(response.data.notes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (props.loggedIn === false) {
            navigate('/login');
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${backendUrl}/api/newnote/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newNotes = notes.filter(note => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = (noteId) => {
        // Set the updateNoteId to the selected note's ID
        setUpdateNoteId(noteId);
    };

    const handleUpdateNoteClose = () => {
        // Reset the updateNoteId when the update note window is closed
        setUpdateNoteId(null);
    };


    return (
        <div className='dashboard'>
            <div className='row1'>
                <div className='nameSec'>
                    <h2>Hey, {username}</h2>
                </div>
                <div>
                    <Link to="/newnote"><button className='btn'>+ New Note</button></Link>
                </div>
            </div>
            <div className='userNotes'>
                {notes && notes.length === 0 ? (
                    <h2>No notes available. Create a new note.</h2>
                ) : (
                    notes.map(note => (
                        <Note
                            key={note._id}
                            title={note.title}
                            content={note.content}
                            onDelete={() => handleDelete(note._id)}
                            onEdit={() => handleUpdate(note._id)}
                        />
                    ))
                )}

            </div>
            {/* Render the UpdateNote component when updateNoteId is set */}
            {updateNoteId && (
                <UpdateNote
                    noteId={updateNoteId}
                    onClose={handleUpdateNoteClose}
                    onUpdate={fetchData} // Refetch the data after updating a note
                />
            )}
        </div>
    );
}

export default DashBoard;
