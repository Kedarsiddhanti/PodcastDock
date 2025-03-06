import { NavLink } from 'react-router-dom';
import { FaHome, FaLeaf, FaMicrophone, FaUser } from 'react-icons/fa';

function LeftSidebar() {
  return (
    <aside className="bg-gray-900 text-gray-400 w-56 h-full p-4 flex flex-col fixed left-0 top-12">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center p-2 mb-4 rounded ${
            isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'
          }`
        }
      >
        <FaHome className="mr-2" />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/discover"
        className={({ isActive }) =>
          `flex items-center p-2 mb-4 rounded ${
            isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'
          }`
        }
      >
        <FaLeaf className="mr-2" />
        <span>Discover</span>
      </NavLink>
      <NavLink
        to="/createpodcast"
        className={({ isActive }) =>
          `flex items-center p-2 mb-4 rounded ${
            isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'
          }`
        }
      >
        <FaMicrophone className="mr-2" />
        <span>Create Podcast</span>
      </NavLink>
      <NavLink
        to="/myprofile"
        className={({ isActive }) =>
          `flex items-center p-2 mb-4 rounded ${
            isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'
          }`
        }
      >
        <FaUser className="mr-2" />
        <span>My Profile</span>
      </NavLink>
    </aside>
  );
}

export default LeftSidebar;