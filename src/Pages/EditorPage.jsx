import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from "../Actions";
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from "../socket";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams
}
  from 'react-router-dom';

// THIS IS MAIN PAGE  

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);


  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });


      // LIsting for joined event

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          // If Joined room person is show in your editor page
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );


      // Listining for disconnected


      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setClients((prev) => {
            return prev.filter(
              (client) => client.socketId !== socketId
            );
          });
        });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID has been copied to your clipboard');
    } catch (err) {
      toast.error('Could not copy the Room Id');
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator('/');
  }

  const handleMeetingClick = () => {
      setShow(!show);  // Toggle the show state
      toast.success('Show is Enabled');
      joinMeeting();
  };

  function joinMeeting() {
    reactNavigator('/meetinglogin'); // Redirect to the meeting page
  }

  const [show, setShow] = useState(true);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img
              className='logoImage'
              src="/code-view-logo1.png"
              alt="Logo"
            />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client
                key={client.SocketId}
                username={client.username} />
            ))}
          </div>
        </div>
        <button className='btn copyBtn' onClick={copyRoomId} >
          Copy ROOM ID
        </button>
        {/* calling Function */}
        <button className='btn leaveBtn' onClick={handleMeetingClick}>
          Meeting
        </button>
        <button className='btn leaveBtn' onClick={leaveRoom} >
          Leave
        </button>
      </div>
      <div className="editorWrap">
        {
          show && <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }} />   
        }
        {/* <button className='btn leaveBtn' onClick={handleMeetingClick}>
          Meeting
        </button> */}
      </div>
    </div>
  );
};

export default EditorPage;