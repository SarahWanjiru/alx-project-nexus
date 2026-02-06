import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 px-9 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img src="/nexusconnect.jpeg" alt="Nexus Connect" className="h-32" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 font-semibold"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
