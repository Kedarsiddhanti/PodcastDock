import { FaSearch, FaPlay } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NoResultsFound from '../components/NoResultsFound';
import CustomAudioPlayer from '../components/AudioPlayer';

function Discover() {
  const [podcasts, setPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/podcasts')
      .then(response => setPodcasts(response.data))
      .catch(error => console.error('Error fetching podcasts:', error));
  }, []);

  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlay = (audioUrl) => {
    setCurrentAudio(audioUrl);
  };

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen">
      {/* Search Bar and Filter Button */}
      <div className="flex items-center mb-8">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Type here to search."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="ml-4 px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600">
          Apply filter
        </button>
      </div>

      {/* Section Title */}
      {filteredPodcasts.length > 0 && (
        <h2 className="text-2xl font-bold mb-4">Discover Community Podcasts</h2>
      )}

      {/* Podcast Grid Layout */}
      {filteredPodcasts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPodcasts.map(podcast => (
            <div key={podcast._id} className="bg-gray-800 p-4 rounded-lg shadow">
              <Link to={`/podcast/${podcast._id}`}>
                <img src={podcast.coverImageUrl} alt={podcast.title} className="w-full h-48 object-cover rounded mb-2" />
                <h3 className="text-lg font-bold">{podcast.title}</h3>
                <p className="text-sm text-gray-400">{podcast.podcaster}</p>
              </Link>
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-500 flex items-center"
                onClick={() => handlePlay(podcast.audioUrl)}
              >
                <FaPlay className="mr-2" /> Play
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <NoResultsFound searchQuery={searchQuery} />
        </div>
      )}

      {/* Audio Player */}
      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
          <CustomAudioPlayer src={currentAudio} />
        </div>
      )}
    </div>
  );
}

export default Discover;