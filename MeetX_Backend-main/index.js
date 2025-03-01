// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const speech = require('@google-cloud/speech');
const cors = require("cors");
const { setTranscript } = require('./controller/TranscriptController');
const router = require('./routes/router');
const sequelize = require('./config/dbConnect');
const { callAI } = require('./controller/CallAi');

require("dotenv").config()
const app = express();

const fs = require("fs");

if (process.env.GOOGLE_CREDENTIALS) {
    const credentials = Buffer.from(process.env.GOOGLE_CREDENTIALS, "base64").toString("utf-8");
    fs.writeFileSync("credentials.json", credentials);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "credentials.json"; // Set env var dynamically
}
const PRODUCTION_CLIENT_URL = process.env.PRODUCTION_CLIENT_URL || "http://localhost:5173";
app.use(cors())
app.use(express.json())
app.use("/api/v1", router)
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: PRODUCTION_CLIENT_URL, // your React app's URL
      methods: ["GET", "POST"],
    },
  })

// Configure your Google Speech client
const client = new speech.SpeechClient();

const requestConfig = {
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  },
  interimResults: true, // set true if you want interim results
};

// Create a streamingRecognize stream
let recognizeStream = null;

let transcript;
let Name;
let pdfState = { page: 1 }; // Keeps track of the current page

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('name', (participantName)=>{
    Name = participantName;
  })

  socket.emit("sync_page", pdfState.page); // Send the current page to the new user

  socket.on("page_change", (newPage) => {
    pdfState.page = newPage;
    socket.broadcast.emit("sync_page", newPage);
  });
  // Start a new speech stream on client request or connection.
  const startRecognitionStream = async() => {
    if (recognizeStream) {
      recognizeStream.end();
      recognizeStream = null;
    }

    recognizeStream = client
      .streamingRecognize(requestConfig)
      .on('data', (data) => {
        // data.results contains the transcription
        if (data.results[0] && data.results[0].isFinal) {
         transcript =
          data.results[0] && data.results[0].alternatives[0]
            ? data.results[0].alternatives[0].transcript
            : '';
            setTranscript(transcript)
        }
      })
      .on('error', (error) => {
        console.error('Speech API error:', error);
        startRecognitionStream()
      });
  };

  // Initialize the recognition stream when client connects
  startRecognitionStream();

  // When audio chunks arrive, write them to the recognition stream.
  socket.on('audio-chunk', (chunk) => {
    if (recognizeStream && !recognizeStream.destroyed) {
      recognizeStream.write(chunk);
    }
  });

  // Optionally handle client disconnects, end the stream gracefully.
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    if (recognizeStream) {
      recognizeStream.end();
      recognizeStream = null;
    }
  });
});

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successful")
    }).catch((err)=>{
        throw err
    })