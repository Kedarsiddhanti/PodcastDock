import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';

function MyProfile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-900 text-gray-100 min-h-screen">
      <div className="flex items-center mb-8">
        <img
          src="https://picsum.photos/150/150?random=1"
          alt="Profile"
          className="w-36 h-36 rounded-lg mr-8"
        />
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            {user.email} <FaCheckCircle className="text-blue-500 ml-2" />
          </h1>
          <p className="text-lg text-gray-400 mb-4">Monthly Listeners: 1,200,000</p>
          <button className="px-4 py-2 bg-orange-600 text-gray-100 rounded-lg hover:bg-orange-500">
            Play a random podcast
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;