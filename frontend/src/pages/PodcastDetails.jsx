import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomAudioPlayer from '../components/AudioPlayer';

function PodcastDetails() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/podcasts/${id}`)
      .then(response => setPodcast(response.data))
      .catch(error => console.error('Error fetching podcast:', error));
  }, [id]);

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen">
      <div className="bg-gray-800 p-4 rounded-lg shadow">
        <img src={podcast.coverImageUrl} alt={podcast.title} className="w-full h-48 object-cover rounded mb-2" />
        <h1 className="text-3xl font-bold mb-2">{podcast.title}</h1>
        <p className="text-lg text-gray-400 mb-2">Hosted by {podcast.podcaster}</p>
        <p className="text-sm text-gray-400">Duration: {podcast.playbackTime}</p>
        <p className="text-sm text-gray-400">Listeners: {podcast.numberOfListeners.toLocaleString()}</p>
        <CustomAudioPlayer src={podcast.audioUrl} />
      </div>
    </div>
  );
}

export default PodcastDetails;