import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { GlobalContext } from '../context/GlobalContext';

const socket = io(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3001'}`);

const AudioProcessor = () => {
  const {participantName} = useContext(GlobalContext);
  useEffect(()=>{
    if(participantName){
      socket.emit('name', participantName);
    }
  },[participantName]);

  useEffect(() => {
      // Request microphone access.
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        // Create an AudioContext with a sample rate of 16kHz.
        const audioContext = new AudioContext({ sampleRate: 16000 });
        // Create a media source from the microphone stream.
        const source = audioContext.createMediaStreamSource(stream);
        // Create a ScriptProcessorNode with a buffer size of 4096 samples.
        const processor = audioContext.createScriptProcessor(4096, 1, 1);

        // Process audio data.
        processor.onaudioprocess = (event) => {
          const inputData = event.inputBuffer.getChannelData(0);
          const pcmBuffer = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            // Clamp the sample and convert to 16-bit PCM.
            let sample = Math.max(-1, Math.min(1, inputData[i]));
            pcmBuffer[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
          }
          // Send the PCM data chunk to your backend.
          socket.emit('audio-chunk', pcmBuffer);
        };

        // Connect the audio nodes.
        source.connect(processor);
        // Optionally, if you want to hear the audio, connect to destination.
        processor.connect(audioContext.destination);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });

    // Cleanup the socket connection on unmount.
    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default AudioProcessor;