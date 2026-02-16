import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';
import RecruiterSidebar from '../components/RecruiterSidebar';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  const [jobPosts, setJobPosts] = useState([]);
  const [stats] = useState({
    openPositions: 8,
    totalApplicants: 246,
    interviewsToday: 5,
    avgTimeToHire: '18d',
  });
  const [candidates] = useState([
    {
      id: 1,
      name: 'Marco Russo',
      appliedFor: 'Product Designer',
      matchScore: 95,
      status: 'Interview',
    },
    {
      id: 2,
      name: 'Elena Gilbert',
      appliedFor: 'Frontend Developer',
      matchScore: 88,
      status: 'New',
    },
  ]);

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const fetchJobPosts = async () => {
    try {
      const data = await api.jobs.getAll();
      setJobPosts(data.results?.slice(0, 2) || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RecruiterSidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Good Morning, {user?.email?.split('@')[0] || 'Recruiter'}!</p>
            </div>
            <div className="flex items-center gap-4">
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
          {/* Overview Section */}
          <div className="mb-8">
            <p className="text-gray-600">
              You have{' '}
              <span className="text-teal-500 font-semibold">
                14 new applications
              </span>{' '}
              to review for your open positions.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Stats & Jobs */}
            <div className="col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border-l-4 border-blue-500 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">Open Positions</p>
                  <p className="text-3xl font-bold">{stats.openPositions}</p>
                </div>

                <div className="bg-white rounded-xl border-l-4 border-teal-500 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-teal-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                      +12%
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">Total Applicants</p>
                  <p className="text-3xl font-bold">{stats.totalApplicants}</p>
                </div>

                <div className="bg-white rounded-xl border-l-4 border-purple-500 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                      Next: 2PM
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">Interviews Today</p>
                  <p className="text-3xl font-bold">{stats.interviewsToday}</p>
                </div>

                <div className="bg-white rounded-xl border-l-4 border-orange-500 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold">
                      -2 days
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">
                    Avg. Time to Hire
                  </p>
                  <p className="text-3xl font-bold">{stats.avgTimeToHire}</p>
                </div>
              </div>

              {/* Recent Job Posts */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Recent Job Posts</h3>
                  <button className="text-blue-500 font-semibold hover:text-blue-600">
                    Manage All
                  </button>
                </div>

                <div className="space-y-4">
                  {jobPosts.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
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
                        <div>
                          <h4 className="font-bold text-lg">{job.title}</h4>
                          <p className="text-gray-600 text-sm">
                            {job.location} • Posted 3 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold">42</p>
                          <p className="text-gray-500 text-xs">APPLICANTS</p>
                        </div>
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Candidates */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Top Candidates</h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                    </svg>
                  </button>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-3 font-semibold">CANDIDATE</th>
                      <th className="pb-3 font-semibold">APPLIED FOR</th>
                      <th className="pb-3 font-semibold">MATCH SCORE</th>
                      <th className="pb-3 font-semibold">STATUS</th>
                      <th className="pb-3 font-semibold">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <span className="font-semibold">
                              {candidate.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-gray-600">
                          {candidate.appliedFor}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                              <div
                                className="bg-teal-500 h-2 rounded-full"
                                style={{ width: `${candidate.matchScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-teal-600">
                              {candidate.matchScore}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              candidate.status === 'Interview'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-green-100 text-green-600'
                            }`}
                          >
                            {candidate.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-blue-500 font-semibold hover:text-blue-600">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column - Boost, Schedule, Actions */}
            <div className="space-y-6">
              {/* Boost Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Boost Your Reach</h3>
                <p className="text-blue-100 text-sm mb-6">
                  Promote your job posts to get 3x more qualified candidates.
                </p>
                <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50">
                  Boost Now
                </button>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold">Today's Schedule</h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">OCT</p>
                      <p className="text-2xl font-bold text-blue-500">24</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        Interview with Alex Rivera
                      </p>
                      <p className="text-sm text-gray-600">
                        2:00 PM - 3:00 PM • Zoom
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">OCT</p>
                      <p className="text-2xl font-bold text-blue-500">24</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        Team Sync: Hiring Plan
                      </p>
                      <p className="text-sm text-gray-600">
                        4:30 PM - 5:00 PM • Room 4B
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 text-blue-500 font-semibold hover:text-blue-600">
                  View Full Calendar
                </button>
              </div>

              {/* Pending Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold mb-4">Pending Actions</h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Review design portfolio for Alex Rivera
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Schedule second round interviews
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      Send offer letter to Marco Russo
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
