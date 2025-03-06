import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

const PodcastCard = ({ podcast, handlePlay }) => {
  return (
    <div className="bg-card p-4 rounded-lg shadow-soft flex flex-col justify-between h-full">
      <Link to={`/podcast/${podcast._id}`} className="flex-grow">
        <img src={podcast.coverImageUrl} alt={podcast.title} className="w-full h-48 object-cover rounded mb-2" />
        <h3 className="text-lg font-bold min-h-[3rem]">{podcast.title}</h3>
        <p className="text-sm text-gray-400">{podcast.podcaster}</p>
      </Link>
      <button
        className="mt-2 px-4 py-2 bg-primary text-gray-100 rounded-lg hover:bg-secondary flex items-center justify-center"
        onClick={() => handlePlay(podcast.audioUrl)}
      >
        <FaPlay />
      </button>
    </div>
  );
};

export default PodcastCard;