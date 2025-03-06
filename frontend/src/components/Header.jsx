import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-2 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <Logo />
          <h2 className="text-lg ml-2">PodcastDock</h2>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/about" className="hover:text-gray-400">About</Link>
        <Link to="/support" className="hover:text-gray-400">Support</Link>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>{user.email}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-gray-100 rounded-lg hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/register" className="px-4 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-500">
              Sign Up
            </Link>
            <Link to="/login" className="px-4 py-2 bg-green-600 text-gray-100 rounded-lg hover:bg-green-500">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;