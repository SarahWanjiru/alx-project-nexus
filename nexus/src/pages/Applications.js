import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';

const Applications = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = useCallback(async () => {
    if (!profile?.user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await api.applications.getMyApplications(profile.user);
      const apps = Array.isArray(data) ? data : data.results || [];
      const mappedApps = apps.map((app) => ({
        id: app.id,
        title: app.job?.title || 'N/A',
        company: app.job?.company_name || 'N/A',
        location: app.job?.location || 'N/A',
        status: app.status || 'applied',
        appliedDate: new Date(app.created_at).toLocaleDateString(),
        type: app.job?.employment_type || 'N/A',
        salary: app.job?.salary || 'N/A',
        description: app.job?.description || '',
        responsibilities: [],
        requirements: [],
      }));
      setApplications(mappedApps);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const getStatusBadge = (status) => {
    const badges = {
      interviewing: {
        text: 'INTERVIEWING',
        class: 'bg-blue-100 text-blue-600',
      },
      applied: { text: 'APPLIED', class: 'bg-green-100 text-green-600' },
      in_review: { text: 'IN REVIEW', class: 'bg-orange-100 text-orange-600' },
      rejected: { text: 'REJECTED', class: 'bg-gray-100 text-gray-600' },
    };
    return badges[status] || badges.applied;
  };

  const getTabCount = (tab) => {
    if (tab === 'all') return applications.length;
    if (tab === 'applied')
      return applications.filter((a) => a.status === 'applied').length;
    if (tab === 'in_review')
      return applications.filter((a) => a.status === 'in_review').length;
    if (tab === 'interviewing')
      return applications.filter((a) => a.status === 'interviewing').length;
    if (tab === 'hired_rejected')
      return applications.filter((a) => a.status === 'rejected').length;
    return 0;
  };

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'applied') return app.status === 'applied';
    if (activeTab === 'in_review') return app.status === 'in_review';
    if (activeTab === 'interviewing') return app.status === 'interviewing';
    if (activeTab === 'hired_rejected') return app.status === 'rejected';
    return true;
  });

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
              key="nav-dashboard"
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </button>
            <button
              key="nav-find-jobs"
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
              key="nav-applications"
              className="w-full flex items-center gap-3 px-4 py-3 bg-teal-800 rounded-lg"
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
              key="nav-messages"
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
              key="nav-profile"
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
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${selectedApplication ? 'flex' : ''}`}>
        <div
          className={`${selectedApplication ? 'flex-1' : 'w-full'} bg-gray-50`}
        >
          <div className="p-8">
            {loading ? (
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading applications...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-red-500 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-600 font-semibold mb-2">
                    Error loading applications
                  </p>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={fetchApplications}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">My Applications</h1>
                    <p className="text-gray-600">
                      You have {applications.length} active job applications
                      across various stages.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    4 New Updates
                  </button>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl border border-gray-200 mb-6">
                  <div className="flex items-center border-b border-gray-200 px-6">
                    <button
                      key="tab-all"
                      onClick={() => setActiveTab('all')}
                      className={`px-4 py-4 font-semibold border-b-2 ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
                    >
                      All{' '}
                      <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
                        {getTabCount('all')}
                      </span>
                    </button>
                    <button
                      key="tab-applied"
                      onClick={() => setActiveTab('applied')}
                      className={`px-4 py-4 font-semibold border-b-2 ${activeTab === 'applied' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
                    >
                      Applied{' '}
                      <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
                        {getTabCount('applied')}
                      </span>
                    </button>
                    <button
                      key="tab-in-review"
                      onClick={() => setActiveTab('in_review')}
                      className={`px-4 py-4 font-semibold border-b-2 ${activeTab === 'in_review' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
                    >
                      In Review{' '}
                      <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
                        {getTabCount('in_review')}
                      </span>
                    </button>
                    <button
                      key="tab-interviewing"
                      onClick={() => setActiveTab('interviewing')}
                      className={`px-4 py-4 font-semibold border-b-2 ${activeTab === 'interviewing' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
                    >
                      Interviewing{' '}
                      <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
                        {getTabCount('interviewing')}
                      </span>
                    </button>
                    <button
                      key="tab-hired-rejected"
                      onClick={() => setActiveTab('hired_rejected')}
                      className={`px-4 py-4 font-semibold border-b-2 ${activeTab === 'hired_rejected' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600'}`}
                    >
                      Hired/Rejected{' '}
                      <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
                        {getTabCount('hired_rejected')}
                      </span>
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="p-6 flex items-center gap-4">
                    <div className="flex-1 relative">
                      <svg
                        className="w-5 h-5 text-gray-400 absolute left-3 top-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Filter by company, role or location"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Date Applied
                    </button>
                  </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                  {filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-xl border border-gray-200 p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-gray-400"
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
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{app.title}</h3>
                              <span
                                className={`px-3 py-1 rounded text-xs font-bold ${getStatusBadge(app.status).class}`}
                              >
                                {getStatusBadge(app.status).text}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600">
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {app.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {app.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Applied {app.appliedDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                          >
                            View Details
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <svg
                              className="w-5 h-5 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button className="text-blue-500 font-semibold flex items-center gap-2 mx-auto">
                    Load More Applications
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Details Panel */}
        {selectedApplication && (
          <aside className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Application Details</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <h3 className="text-2xl font-bold mb-2">
                {selectedApplication.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {selectedApplication.company}
              </p>
              <span
                className={`inline-block px-3 py-1 rounded text-xs font-bold ${getStatusBadge(selectedApplication.status).class}`}
              >
                {getStatusBadge(selectedApplication.status).text}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">LOCATION</p>
                <p className="font-semibold">{selectedApplication.location}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">TYPE</p>
                <p className="font-semibold">{selectedApplication.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">SALARY</p>
                <p className="font-semibold">{selectedApplication.salary}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">APPLIED</p>
                <p className="font-semibold">
                  {selectedApplication.appliedDate}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold mb-3">Job Description</h4>
              <p className="text-gray-700 leading-relaxed">
                {selectedApplication.description}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold mb-3">Key Responsibilities</h4>
              <ul className="space-y-2">
                {selectedApplication.responsibilities?.length > 0 ? (
                  selectedApplication.responsibilities.map((resp, idx) => (
                    <li
                      key={`resp-${idx}-${resp.substring(0, 20)}`}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{resp}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No responsibilities listed</p>
                )}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-bold mb-3">Requirements</h4>
              <ul className="space-y-2">
                {selectedApplication.requirements?.length > 0 ? (
                  selectedApplication.requirements.map((req, idx) => (
                    <li
                      key={`req-${idx}-${req.substring(0, 20)}`}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No requirements listed</p>
                )}
              </ul>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600">
                Withdraw Application
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50">
                View Job Posting
              </button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default Applications;
