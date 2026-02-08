import { useNavigate, useLocation } from 'react-router-dom';

const RecruiterSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-gradient-to-b from-teal-800 to-teal-900 text-white flex flex-col min-h-screen">
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-8">
          <img
            src="/Nexus Connect.png"
            alt="Nexus Connect"
            className="w-12 h-12 rounded-xl shadow-lg object-cover"
          />
          <div>
            <h1 className="font-bold text-lg">Nexus Connect</h1>
            <p className="text-xs text-teal-300">RECRUITER PORTAL</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-6 pb-6 space-y-2 overflow-y-auto">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
            isActive('/admin/dashboard') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          Overview
        </button>

        <button
          onClick={() => navigate('/admin/jobs')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
            isActive('/admin/jobs') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
              clipRule="evenodd"
            />
          </svg>
          My Job Posts
        </button>

        <button
          onClick={() => navigate('/admin/candidates')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg relative ${
            isActive('/admin/candidates') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          Candidates
          <span className="absolute right-4 w-2 h-2 bg-blue-400 rounded-full"></span>
        </button>

        <button
          onClick={() => navigate('/admin/interviews')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
            isActive('/admin/interviews') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          Interviews
        </button>

        <button
          onClick={() => navigate('/admin/messages')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
            isActive('/admin/messages') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Messages
        </button>

        <button
          onClick={() => navigate('/admin/reports')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
            isActive('/admin/reports') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          Reports
        </button>

        <button
          onClick={() => navigate('/admin/profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
            isActive('/admin/profile') ? 'bg-teal-700' : 'hover:bg-teal-700'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          Profile
        </button>
      </nav>
    </aside>
  );
};

export default RecruiterSidebar;
