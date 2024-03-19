// UpdateNote.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../config';

const UpdateNote = ({ noteId, onClose, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // Fetch the note data based on the noteId
        const fetchNote = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${backendUrl}/api/newnote/${noteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.log(error);
            }
        };

        fetchNote();
    }, [noteId]);

    const handleUpdate = async (e) => {
        // e.preventDefault(); // Prevent the default form submission behavior

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${backendUrl}/api/newnote/${noteId}`,
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Close the update note window and trigger the parent's onUpdate callback
            onClose();
            onUpdate();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            {noteId && (
                <div className="update-note-overlay">
                    <div className="update-note-container">
                        <h2>Update Note</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(e); }}>
                            <div className="form-group">
                                <label htmlFor="update-title">Title</label>
                                <input
                                    type="text"
                                    id="update-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="update-content">Content</label>
                                <textarea
                                    id="update-content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <button className="btn" type="submit">Update</button>
                                <button className="btn" type="button" onClick={onClose}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateNote;
