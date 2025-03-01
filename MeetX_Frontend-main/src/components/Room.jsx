import axios from 'axios';
import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Room = () => {

    const [name, setName] = React.useState('');
    const [roomId, setRoomId] = React.useState('');
    const [joinName, setJoinName] = React.useState('');
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';
    const {setToken,setRoomName,setParticipantName} = useContext(GlobalContext)
    const navigator = useNavigate()

    const handleCreateChange = (e) => {
        setName(e.target.value);
    };

    const handleJoinRoomIdChange = (e) => {
        setRoomId(e.target.value);
    };

    const handleJoinNameChange = (e) => {
        setJoinName(e.target.value);
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const currentDateTime = Date.now();

        const response = await axios.post(`${baseUrl}/api/v1/createToken`, { roomName: `${currentDateTime}`, participantName: name });

        setRoomName(`${currentDateTime}`);
        setToken(response.data.token);

        console.log(response.data.token);
        setParticipantName(name);
        console.log('Creating meeting with name:', name);
        if (window.location.pathname === '/room/educator') {
            navigator('/meeting/educator');
        } else if (window.location.pathname === '/room/individual') {
            navigator('/meeting/individual');
        }else if(window.location.pathname === '/room/bussines'){
            navigator('/meeting/bussines');
        }
        // Add your create meeting logic here
    };

    const handleJoinSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${baseUrl}/api/v1/createToken`, { roomName:roomId , participantName: joinName });

        setRoomName(roomId);
        setToken(response.data.token);
        setParticipantName(joinName);
        if (window.location.pathname === '/room/educator') {
            navigator('/meeting/educator');
        } else if (window.location.pathname === '/room/individual') {
            navigator('/meeting/individual');
        }else if(window.location.pathname === '/room/business'){
            navigator('/meeting/business');
        }
        console.log('Joining room with ID:', roomId, 'and name:', joinName);
        // Add your join meeting logic here
    };


const [activeForm, setActiveForm] = React.useState('create');

return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
        <div className='w-full flex justify-center items-center mb-8'>
            <button 
                className={`mx-2 px-4 py-2 rounded-lg ${activeForm === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`} 
                onClick={() => setActiveForm('create')}
            >
                Create Meeting
            </button>
            <button 
                className={`mx-2 px-4 py-2 rounded-lg ${activeForm === 'join' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`} 
                onClick={() => setActiveForm('join')}
            >
                Join Meeting
            </button>
        </div>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
            {activeForm === 'create' && (
                <div>
                    <form onSubmit={handleCreateSubmit} className='flex flex-col'>
                        <input 
                            className="outline-none border border-gray-300 rounded-lg px-4 py-2 mb-4" 
                            type="text" 
                            onChange={handleCreateChange} 
                            placeholder='Enter your name' 
                        />
                        <button 
                            type='submit' 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Create Meeting
                        </button>
                    </form>
                </div>
            )}
            {activeForm === 'join' && (
                <div>
                    <form onSubmit={handleJoinSubmit} className='flex flex-col'>
                        <input 
                            className="outline-none border border-gray-300 rounded-lg px-4 py-2 mb-4" 
                            type="text" 
                            onChange={handleJoinRoomIdChange} 
                            placeholder='Enter Room ID' 
                        />
                        <input 
                            className="outline-none border border-gray-300 rounded-lg px-4 py-2 mb-4" 
                            type="text" 
                            onChange={handleJoinNameChange} 
                            placeholder='Enter your name' 
                        />
                        <button 
                            type='submit' 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Join Meeting
                        </button>
                    </form>
                </div>
            )}
        </div>
    </div>
);
}

export default Room