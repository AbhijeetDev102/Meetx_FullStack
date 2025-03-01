const { AccessToken, VideoGrant } = require('livekit-server-sdk');

exports.createToken= async (req, res)=>{

const {roomName, participantName} =req.body ;

require('dotenv').config();
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;  
const at = new AccessToken(api_key, api_secret, {
  identity: participantName,
});

const videoGrant = { 
  room: roomName,
  roomJoin: true,
  canPublish: true,
  canSubscribe: true,
};  
at.addGrant(videoGrant);

const token = await at.toJwt();
console.log('token created ', token);

res.status(200).json({token: token});



}