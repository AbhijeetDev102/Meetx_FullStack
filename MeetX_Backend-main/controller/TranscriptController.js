const Transcript = require("../models/Transcript")

 function setTranscript(transciption){
    if(transciption){
       Transcript.create({text:transciption}).then((transcript)=>{
            console.log("Transcript created", transcript)
            

        }).catch((error)=>{
            console.log("Error creating transcript", error)
        })
    }
}

async function getTranscript(){
    let text= ``;
    const transcript = await Transcript.findAll();
    console.log("Transcript", transcript);
    
    transcript.forEach((transcript)=>{
        text += `${transcript.participant} : ${transcript.text}\n`;
    })
    return text;

}

function deleteTranscript(){
    Transcript.destroy({ where: {} })
        .then(() => {
            console.log("All transcripts deleted");
        })
        .catch((error) => {
            console.log("Error deleting transcripts", error);
        });
}


module.exports = {setTranscript, getTranscript, deleteTranscript};