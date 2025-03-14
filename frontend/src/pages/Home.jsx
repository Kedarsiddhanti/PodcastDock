import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeadphones, FaClock, FaPlay } from 'react-icons/fa';
import CustomAudioPlayer from '../components/AudioPlayer';
import PodcastCard from '../components/PodcastCard';

function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/podcasts')
      .then(response => setPodcasts(response.data))
      .catch(error => console.error('Error fetching podcasts:', error));
  }, []);

  const handlePlay = (audioUrl) => {
    setCurrentAudio(audioUrl);
  };

  return (
    <div className="p-4 pt-16 bg-background text-text min-h-screen">
      {/* Trending Podcasts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trending Podcasts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {podcasts.slice(0, 4).map(podcast => (
            <PodcastCard key={podcast._id} podcast={podcast} handlePlay={handlePlay} />
          ))}
        </div>
      </section>

      {/* Latest Podcasts Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Latest Podcasts</h2>
          <button
            className="text-sm text-blue-400 hover:underline"
            onClick={() => navigate('/discover')}
          >
            See All
          </button>
        </div>
        <ul className="space-y-4">
          {podcasts.slice(0, 4).map((podcast, index) => (
            <li key={podcast._id} className="bg-card p-4 rounded-lg shadow-soft flex items-center space-x-4">
              <div className="text-gray-400">{index + 1}</div>
              <Link to={`/podcast/${podcast._id}`}>
                <img src={podcast.coverImageUrl} alt={podcast.title} className="w-16 h-16 object-cover rounded" />
              </Link>
              <div className="flex-1">
                <h3 className="text-lg font-bold">
                  <Link to={`/podcast/${podcast._id}`} className="hover:underline">
                    {podcast.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-400">{podcast.podcaster}</p>
              </div>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-1 w-24">
                  <FaHeadphones className="text-gray-400" />
                  <p className="text-sm text-gray-400">{podcast.numberOfListeners.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-1 w-24">
                  <FaClock className="text-gray-400" />
                  <p className="text-sm text-gray-400">{podcast.playbackTime}</p>
                </div>
                <button
                  className="px-4 py-2 bg-primary text-gray-100 rounded-lg hover:bg-secondary flex items-center justify-center"
                  onClick={() => handlePlay(podcast.audioUrl)}
                >
                  <FaPlay />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Popular Podcasts Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Podcasts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {podcasts.slice(0, 8).map(podcast => (
            <PodcastCard key={podcast._id} podcast={podcast} handlePlay={handlePlay} />
          ))}
        </div>
      </section>

      {/* Audio Player */}
      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-card p-4 shadow-soft">
          <CustomAudioPlayer src={currentAudio} />
        </div>
      )}
    </div>
  );
}

export default Home;