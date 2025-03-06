import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 p-4 flex justify-center items-center space-x-4">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
        <FaFacebook size={24} />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
        <FaTwitter size={24} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
        <FaInstagram size={24} />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
        <FaLinkedin size={24} />
      </a>
    </footer>
  );
}

export default Footer;