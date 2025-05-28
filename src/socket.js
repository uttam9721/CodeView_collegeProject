import { io } from 'socket.io-client';
export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    // return io(process.env.REACT_APP_BACKEND.URL,options);
    const backendUrl = process.env.REACT_APP_BACKEND || 'http://localhost:5000';
    return io(backendUrl, options);
};