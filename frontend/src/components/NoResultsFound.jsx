import { FaSearch } from 'react-icons/fa';

function NoResultsFound({ searchQuery }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-100">
      <FaSearch className="text-6xl mb-4 text-gray-400" />
      <h2 className="text-2xl font-bold mb-2">No results found</h2>
      <p className="text-lg mb-2">Try adjusting your search to find what you are looking for</p>
      <p className="text-sm text-gray-400">No search matches for "{searchQuery}"</p>
    </div>
  );
}

export default NoResultsFound;