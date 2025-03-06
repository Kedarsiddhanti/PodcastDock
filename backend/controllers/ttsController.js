const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateSpeech = async (req, res) => {
  try {
    const { text } = req.body;
    
    // Generating speech using OpenAI API
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const base64Audio = buffer.toString('base64');
    
    res.json({
      audioData: `data:audio/mpeg;base64,${base64Audio}`
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    res.status(500).json({ 
      message: 'Error generating speech',
      error: error.message 
    });
  }
};

module.exports = {
  generateSpeech
};