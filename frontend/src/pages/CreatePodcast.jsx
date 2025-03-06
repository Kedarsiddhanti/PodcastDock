import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function CreatePodcast() {
  const [title, setTitle] = useState('');
  const [podcaster, setPodcaster] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [textToConvert, setTextToConvert] = useState('');
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState('');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [imageOption, setImageOption] = useState('upload'); 
  const [playbackTime, setPlaybackTime] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user');
        setPodcaster(response.data.name);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleTTSConversion = async () => {
    if (!textToConvert) {
      alert('Please enter text to convert to speech');
      return;
    }

    setIsGeneratingAudio(true);
    try {
      const response = await axios.post('http://localhost:5000/api/tts/generate', {
        text: textToConvert
      });
      
      setGeneratedAudioUrl(response.data.audioData);
      setAudioFile(null); 
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      alert(`Error generating audio: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleImageGeneration = async () => {
    if (!imagePrompt) {
      alert('Please enter a prompt to generate an image');
      return;
    }

    setIsGeneratingImage(true);
    try {
      const response = await axios.post('http://localhost:5000/api/image/generate', {
        prompt: imagePrompt
      });

      setGeneratedImageUrl(response.data.imageUrl);
      setCoverImageFile(null); 
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      alert(`Error generating image: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleCreatePodcast = async () => {
    if (!title || !category || !description || (!audioFile && !generatedAudioUrl) || (imageOption === 'upload' && !coverImageFile) || (imageOption === 'generate' && !generatedImageUrl)) {
      alert('Please fill in all fields and generate audio and cover image');
      return;
    }

    if (!playbackTime) {
      alert('Please wait for the audio to load and playback time to be set');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('podcaster', podcaster);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('playbackTime', playbackTime); 
    if (audioFile) {
      formData.append('audioFile', audioFile);
    } else {
      formData.append('audioUrl', generatedAudioUrl);
    }
    if (imageOption === 'generate') {
      formData.append('coverImageUrl', generatedImageUrl); 
    } else {
      formData.append('coverImageFile', coverImageFile);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/podcasts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Podcast created successfully');
      
    } catch (error) {
      console.error('Error creating podcast:', error.response?.data || error.message);
      alert(`Error creating podcast: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleAudioLoaded = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      setPlaybackTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    }
  };

  return (
    <div className="p-8 bg-background text-text min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Create Podcast</h1>
      <div className="space-y-6 w-full max-w-2xl"> {/* Increased max width */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter podcast title"
            className="w-full p-3 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter podcast category"
            className="w-full p-3 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter podcast description"
            className="w-full p-3 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="textToConvert">
            Text to Convert to Speech
          </label>
          <textarea
            id="textToConvert"
            value={textToConvert}
            onChange={(e) => setTextToConvert(e.target.value)}
            placeholder="Enter text to convert to speech"
            className="w-full p-3 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleTTSConversion}
            className="mt-2 px-4 py-2 bg-primary text-gray-100 rounded-lg hover:bg-secondary"
            disabled={isGeneratingAudio}
          >
            {isGeneratingAudio ? 'Generating Audio...' : 'Generate Audio'}
          </button>
        </div>
        {generatedAudioUrl && (
          <div className="mt-4">
            <audio controls src={generatedAudioUrl} ref={audioRef} onLoadedMetadata={handleAudioLoaded} />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2">
            Cover Image Option
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="imageOption"
                value="upload"
                checked={imageOption === 'upload'}
                onChange={() => setImageOption('upload')}
                className="mr-2"
              />
              Upload from Device
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="imageOption"
                value="generate"
                checked={imageOption === 'generate'}
                onChange={() => setImageOption('generate')}
                className="mr-2"
              />
              Generate from AI
            </label>
          </div>
        </div>
        {imageOption === 'upload' && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2" htmlFor="coverImageFile">
              Upload Cover Image
            </label>
            <input
              type="file"
              id="coverImageFile"
              onChange={(e) => setCoverImageFile(e.target.files[0])}
              className="w-full p-3 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {imageOption === 'generate' && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2" htmlFor="imagePrompt">
              Image Prompt
            </label>
            <input
              type="text"
              id="imagePrompt"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Enter prompt to generate image"
              className="w-full p-3 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleImageGeneration}
              className="mt-2 px-4 py-2 bg-primary text-gray-100 rounded-lg hover:bg-secondary"
              disabled={isGeneratingImage}
            >
              {isGeneratingImage ? 'Generating Image...' : 'Generate Image'}
            </button>
          </div>
        )}
        {generatedImageUrl && (
          <div className="mt-4">
            <img src={generatedImageUrl} alt="Generated Cover" className="w-full h-48 object-cover rounded" />
          </div>
        )}
        <button
          onClick={handleCreatePodcast}
          className="w-full py-3 bg-primary text-gray-100 rounded-lg hover:bg-secondary"
        >
          Create Podcast
        </button>
      </div>
    </div>
  );
}

export default CreatePodcast;