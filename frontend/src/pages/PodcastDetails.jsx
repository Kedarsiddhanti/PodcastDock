import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomAudioPlayer from '../components/AudioPlayer';
import PodcastCard from '../components/PodcastCard';

function PodcastDetails() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [relatedPodcasts, setRelatedPodcasts] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/podcasts/${id}`)
      .then(response => setPodcast(response.data))
      .catch(error => console.error('Error fetching podcast:', error));

    axios.get('http://localhost:5000/api/podcasts')
      .then(response => setRelatedPodcasts(response.data.filter(p => p._id !== id)))
      .catch(error => console.error('Error fetching related podcasts:', error));
  }, [id]);

  const handlePlay = (audioUrl) => {
    setCurrentAudio(audioUrl);
  };

  if (!podcast) {
    return <div>Podcast not found</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen">
      <div className="bg-gray-800 p-4 rounded-lg shadow mb-8">
        <img src={podcast.coverImageUrl} alt={podcast.title} className="w-full h-48 object-cover rounded mb-2" />
        <h1 className="text-3xl font-bold mb-2">{podcast.title}</h1>
        <p className="text-lg text-gray-400 mb-2">Hosted by {podcast.podcaster}</p>
        <p className="text-sm text-gray-400">Duration: {podcast.playbackTime}</p>
        <p className="text-sm text-gray-400">Listeners: {podcast.numberOfListeners.toLocaleString()}</p>
        <CustomAudioPlayer src={podcast.audioUrl} />
      </div>

      {/* Related Podcasts Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Related Podcasts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedPodcasts.slice(0, 4).map(podcast => (
            <PodcastCard key={podcast._id} podcast={podcast} handlePlay={handlePlay} />
          ))}
        </div>
      </section>

      {/* Audio Player */}
      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
          <CustomAudioPlayer src={currentAudio} />
        </div>
      )}
    </div>
  );
}

export default PodcastDetails;