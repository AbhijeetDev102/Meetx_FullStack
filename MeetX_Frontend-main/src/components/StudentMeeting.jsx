import React, { useContext, useState } from 'react';
import {
  ChatToggle,
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
  Chat,
  LayoutContextProvider,
  StartAudio,
  TrackToggle,
} from '@livekit/components-react';
import '@livekit/components-styles';

import { Track } from 'livekit-client';
import AudioProcessor from './AudioProcessor';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Calculator from './Calculator';
import axios from 'axios';

export default function StudentMeeting() {
  const { token, roomName } = useContext(GlobalContext);
  const navigator = useNavigate();
  const serverUrl = 'wss://my-test-app-mwa2njto.livekit.cloud';
  const roomToken = `${token}`;
  const [showChat, setShowChat] = useState(false);
  const [showCalc, setShowCalc] = useState(false)
  const toggleChat = () => {
    setShowChat(prev => !prev);
  };
  const toggleCalc = () => {
    setShowCalc(prev => !prev);
  };

  const handleDownload = () => {
    axios
      .get("http://localhost:3001/api/v1/generate-pdf", { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sample.pdf"; // Set download filename
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => console.error("Download error:", err));
  };

  return (
    <>
      <div className='flex justify-center items-center h-7 w-full'>
        <h2 className='text-white'>Meeting Id: {roomName}</h2>
      </div>
      <LayoutContextProvider >
        <LiveKitRoom
          className='relative'
          video={true}
          token={roomToken}
          serverUrl={serverUrl}
          // style={{ height:"10vh" }}
          // onDisconnected={()=> navigator('/')}
          data-lk-theme="default"
          style={{ height: '100vh' }}
        >
          {/* /* Video conference layout */ }
          <div className='flex'>
            <div className='flex flex-col w-full'>
              <MyVideoConference />
              <div className='w-full h-16 flex justify-center items-center'>
                <ControlBar />
                <ChatToggle onClick={()=>{
                  toggleChat()
                  if(showCalc){
                    toggleCalc()
                  }
                  }}>Chat</ChatToggle>

<button className='bg-black p-3 hover:cursor-pointer mx-1 rounded-lg' onClick={handleDownload}>Download</button>

                <button className='bg-black p-3 hover:cursor-pointer mx-1 rounded-lg' onClick={() => {
                  window.open('https://haikelfazzani.github.io/whiteboard/iframe.html?id=whiteboard--c&args=&viewMode=story', '_blank');
                  // Add screen share logic here
                }}>
                  WhiteBoard
                </button>
                <button className='bg-black p-3 hover:cursor-pointer mx-1 rounded-lg' onClick={()=>{
                  toggleCalc()
                  if(showChat){
                    toggleChat()
                  }
              
                  }}>Calculator</button>
              </div>
            </div>
            {showChat && (<Chat />)}
            {showCalc && (<Calculator/>)}

          </div>
          
          
          {/* Place ChatToggle button - positioned as needed */}
          {/* <div style={{ position: 'absolute', bottom: '70px', right: '20px' }}>
            <ChatToggle onClick={toggleChat} />
            {showChat && (
            <div
            className='absolute right-0 bottom-0 w-96 h-96 bg-white rounded-lg shadow-lg'
            >
              <Chat />
            </div>
          )}
          </div> */}

          {/* Conditionally render the Chat component */}
          

          {/* Uncomment below if you wish to process audio */}
          {/* <AudioProcessor /> */}
          
        </LiveKitRoom>
        
      </LayoutContextProvider>
    </>
  );
}

function MyVideoConference() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      className='w-24 h-0'
      style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}
    >
     
      <ParticipantTile />

      

    </GridLayout>
  );
}
