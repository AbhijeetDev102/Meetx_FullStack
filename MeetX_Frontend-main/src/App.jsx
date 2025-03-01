
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Meeting from './components/Meeting';
import Room from './components/Room';
import Calculator from './components/Calculator';
import StudentMeeting from './components/StudentMeeting';
import Business from './components/Business';
import Card from './components/ui/card';
import SignupPage from './components/ui/signUpPage';
// Connect to your backend Socket.IO server.
const socket = io(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3001'}`);

function App() {


const [data, setData] = React.useState('');
const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';
const End = async ()=>{
  const Resultdata = await axios.get(`${baseUrl}/api/v1/endCall`);
  setData(Resultdata.data);
}

useEffect(()=>{
  if(data){
    console.log(data);
  }
},[data]);

// let [transcription,setTranscription] = useEffect(''); 
// useEffect(()=>{
//   socket.on('transcription', (data) => {
//     setTranscription(data);
//   });
// }, []);
// useEffect(()=>{
//   if(transcription){
//     console.log(transcription);
    
//   }
// },[transcription]);

  useEffect(() => {
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        // Create an AudioContext with a 16kHz sample rate.
        const audioContext = new AudioContext({ sampleRate: 16000 });
        // Create a source from the microphone stream.
        const source = audioContext.createMediaStreamSource(stream);

        // Create a ScriptProcessorNode.
        // Buffer size (e.g. 4096 samples) may be adjusted as needed.
        const processor = audioContext.createScriptProcessor(4096, 1, 1);

        // Process audio data and convert from Float32 (range -1 to 1) to 16-bit PCM.
        processor.onaudioprocess = (event) => {
          const inputData = event.inputBuffer.getChannelData(0);
          const pcmBuffer = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            let sample = Math.max(-1, Math.min(1, inputData[i]));
            pcmBuffer[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
          }
          // Emit the processed PCM data chunk to the backend.
          socket.emit('audio-chunk', pcmBuffer);
        };

        // Connect the audio nodes.
        source.connect(processor);
        // Optionally, connect the processor to the destination if you want to hear playback.
        processor.connect(audioContext.destination);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  }, []);


  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/card');
    }
  }, [navigate, location.pathname]);
  return <>
    <Routes path='/'>
      <Route path='/' ></Route>
      <Route path='/meeting/individual' element={<Meeting/>}></Route>
      <Route path='/room/:role' element={<Room/>}></Route>
      <Route path="/calculator" element={<Calculator />} />  
      <Route path="/meeting/educator" element={<StudentMeeting />} />  
      <Route path="/meeting/business" element={<Business />} />  
      <Route path='/card' element={<Card />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  </>;
}

export default App;







