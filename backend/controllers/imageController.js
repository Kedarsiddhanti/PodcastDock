const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512"
    });

    const imageUrl = response.data[0].url;

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    
    if (error.code === 'model_not_found') {
      res.status(403).json({ 
        message: 'Access to the image generation model is not available. Please check your OpenAI account settings.',
        error: error.message 
      });
    } else {
      res.status(500).json({ 
        message: 'Error generating image',
        error: error.message 
      });
    }
  }
};

module.exports = {
  generateImage
};