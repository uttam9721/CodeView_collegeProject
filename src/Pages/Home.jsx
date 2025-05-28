import React, { useState } from 'react';
import { v4 as uuidV4 } from "uuid";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const naviagte = useNavigate('');


    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a New Room');
    };

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username is required!');
            return;
        }

        // Redirect
        naviagte(`/editor/${roomId}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };


    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className='homePageLogo'
                    src="/code-view-logo1.png"
                    alt="Logo" />
                <h4 className='mainLabel'>Paste Invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder='ROOM ID'
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder='USERNAME'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}

                    />
                    <button
                        onClick={joinRoom}
                        className="btn joinBtn">
                        Join Room
                    </button>


                    <span className="createInfo">

                        If You don't have invite then create &nbsp;

                        <a onClick={createNewRoom} href="#" className='createNewBtn'>
                            New Room
                        </a>

                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    &copy; 2024 CodedView. All rights reserved.
                </h4>
            </footer>
        </div>
    )
}

export default Home