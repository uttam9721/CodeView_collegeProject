import React, { useState } from 'react';
import { Button, Form, useNavigate } from 'react-router-dom';
import './Room-chat.css';
import toast from 'react-hot-toast';

const MeetingLogin = () => {
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();
    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        navigate(`/room/${roomCode}`);
    }
    const [show, setShow] = useState(true);
    return (
        <div className='home-page'>
            <form onSubmit={handleFormSubmit} className='form'>
                <div>
                    <label>Enter Room Code</label>
                    <input
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        type="text"
                        required
                        placeholder='Enter Room Code'
                    />
                </div>
                <button type="submit">Join Room</button>
            </form>
        </div>
    )
}

export default MeetingLogin