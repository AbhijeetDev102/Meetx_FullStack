

exports.callAI= async (req, res)=>{
    try {
        const transcription = await getTranscript();
        console.log(transcription)
    const result = await model.generateContent(`${systemPrompt} and here the transciption ${transcription}`);
    deleteTranscript()
    return res.status(200).json({
        success:true,
        data:result.response.text()
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
    
}

