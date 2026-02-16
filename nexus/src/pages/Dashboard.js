import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useJobs } from '../contexts/JobContext';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import ApplicationModal from '../components/ApplicationModal';
import { api } from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  const { jobs, loading } = useJobs();
  const { isDark, toggleTheme } = useTheme();
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationJob, setApplicationJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const data = await api.applications.getMyApplications(user.id);
      const apps = Array.isArray(data) ? data : data.results || [];
      setApplications(apps);
    } catch (err) {
      // Silent error handling
    }
  };

  const handleApply = (job) => {
    setApplicationJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplicationModal(false);
    setApplicationJob(null);
    // Show a success message in the UI instead of alert
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-60';
    successDiv.textContent = 'Application submitted successfully!';
    document.body.appendChild(successDiv);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 5000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img
              src="/Nexus Connect.png"
              alt="Nexus Connect"
              className="w-10 h-10 rounded-xl shadow-lg object-cover"
            />
            <div>
              <h1 className="font-bold">Nexus Connect</h1>
              <p className="text-xs text-teal-300">JOB SEEKER</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-teal-800 rounded-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </button>
            <button
              onClick={() => navigate('/find-jobs')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              Find Jobs
            </button>
            <button
              onClick={() => navigate('/applications')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              Applications
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg relative"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Messages
              <span className="absolute right-4 w-2 h-2 bg-blue-400 rounded-full"></span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
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
        </div>

        <div className="mt-auto p-6">
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
            </svg>
            Post Resume
          </button>
        </div>
      </aside>

      {/* Main Content */}
       <main className="flex-1">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Good Morning, {user?.email?.split('@')[0] || 'User'}!</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {isDark ? (
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg font-medium"
              >
                Log Out
              </button>
            </div>
          </div>
        </header>

         <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Job Matches Info */}
              <div>
                <p className="text-gray-600">
                  You have{' '}
                  <span className="text-blue-500 font-semibold">
                    3 new job matches
                  </span>{' '}
                  today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </div>
                    <span className="text-green-500 text-sm font-semibold">
                      +2 today
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">
                    Active Applications
                  </p>
                  <p className="text-3xl font-bold">12</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-teal-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-green-500 text-sm font-semibold">
                      +15%
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">Profile Views</p>
                  <p className="text-3xl font-bold">45</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-sm font-semibold">
                      no change
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">Unread Messages</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
              </div>

              {/* Recommended Jobs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Recommended Jobs</h3>
                  <button className="text-blue-500 font-semibold">
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {loading ? (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      Loading...
                    </div>
                  ) : (
                    jobs
                      .filter(job => !applications.some(app => app.job?.id === job.id))
                      .slice(0, 2)
                      .map((job) => (
                      <div
                        key={job.id}
                        className="bg-white p-6 rounded-xl border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <button className="text-gray-400 hover:text-blue-500">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                              />
                            </svg>
                          </button>
                        </div>
                        <h4 className="font-bold text-lg mb-2">{job.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">
                          {job.company} • {job.location}
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                            {job.contract_type}
                          </span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                            {job.category}
                          </span>
                          {job.salary_min && (
                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                              ${Math.round(job.salary_min / 1000)}k - $
                              {Math.round(job.salary_max / 1000)}k
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleApply(job)}
                          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                        >
                          Apply Now
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Application Tracker */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Application Tracker</h3>
                  <button className="text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-3 font-semibold">COMPANY</th>
                      <th className="pb-3 font-semibold">ROLE</th>
                      <th className="pb-3 font-semibold">DATE</th>
                      <th className="pb-3 font-semibold">STATUS</th>
                      <th className="pb-3 font-semibold">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.slice(0, 2).length > 0 ? (
                      applications.slice(0, 2).map((app) => (
                        <tr key={app.id} className="border-b">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-sm">
                                  {app.job?.company_name?.charAt(0) || 'C'}
                                </span>
                              </div>
                              <span className="font-semibold">{app.job?.company_name || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="py-4 text-gray-600">{app.job?.title || 'N/A'}</td>
                          <td className="py-4 text-gray-600">{new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              app.status === 'interviewing' ? 'bg-orange-100 text-orange-600' :
                              app.status === 'applied' ? 'bg-blue-100 text-blue-600' :
                              app.status === 'in_review' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {app.status === 'applied' ? 'Applied' :
                               app.status === 'interviewing' ? 'Interviewing' :
                               app.status === 'in_review' ? 'In Review' : app.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <button 
                              onClick={() => navigate('/applications')}
                              className="text-blue-500 font-semibold"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500">
                          No applications yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Profile Completion */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Complete Profile</h3>
                  <span className="text-sm font-semibold text-gray-600">
                    (85%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>

              {/* Upgrade Card */}
              <div className="bg-gradient-to-br from-teal-800 to-teal-900 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
                <p className="text-teal-200 text-sm mb-4">
                  Get noticed by top recruiters and unlock premium features.
                </p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
                  Learn More
                </button>
              </div>

              {/* Notifications */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Notifications</h3>
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">
                          Interview Invitation
                        </p>
                        <p className="text-gray-600 text-xs mb-2">
                          TechNode invited you for an interview for Product
                          Designer.
                        </p>
                        <p className="text-gray-400 text-xs">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">
                          Profile Viewed
                        </p>
                        <p className="text-gray-600 text-xs mb-2">
                          A recruiter from ByteApp viewed your profile.
                        </p>
                        <p className="text-gray-400 text-xs">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="text-blue-500 font-semibold text-sm mt-4">
                  See All Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Application Modal */}
      {showApplicationModal && applicationJob && (
        <ApplicationModal
          job={applicationJob}
          onClose={() => setShowApplicationModal(false)}
          onSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
