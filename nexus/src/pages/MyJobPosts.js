import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RecruiterSidebar from '../components/RecruiterSidebar';

const MyJobPosts = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      employment_type: 'Full-time',
      location: 'Remote',
      created_at: 'Oct 12, 2023',
      applicants: 124,
      newApplicants: 12,
      status: 'active',
    },
    {
      id: 2,
      title: 'Product Designer (UI/UX)',
      employment_type: 'Contract',
      location: 'Hybrid',
      created_at: 'Oct 15, 2023',
      applicants: 82,
      newApplicants: 0,
      status: 'active',
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      employment_type: 'Full-time',
      location: 'On-site',
      created_at: 'Oct 05, 2023',
      applicants: 45,
      newApplicants: 0,
      status: 'paused',
    },
    {
      id: 4,
      title: 'HR Manager',
      employment_type: 'Full-time',
      location: 'Hybrid',
      created_at: 'Sep 20, 2023',
      applicants: 210,
      newApplicants: 0,
      status: 'closed',
    },
    {
      id: 5,
      title: 'Backend Architect (Node.js)',
      employment_type: 'Remote',
      location: 'Project-based',
      created_at: 'Oct 18, 2023',
      applicants: 32,
      newApplicants: 8,
      status: 'active',
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      active: { icon: '✓', class: 'bg-blue-500' },
      paused: { icon: '⏸', class: 'bg-teal-500' },
      closed: { icon: '✕', class: 'bg-gray-400' },
    };
    return badges[status] || badges.active;
  };

  const activeJobs = mockJobs.filter((j) => j.status === 'active').length;
  const totalApplicants = mockJobs.reduce((sum, j) => sum + j.applicants, 0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RecruiterSidebar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <h2 className="text-2xl font-bold">My Job Posts</h2>
        </header>

        <div className="p-8">
          {/* Page Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-gray-600">
                View and manage your current job listings and recruitment
                progress.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white rounded-xl border-l-4 border-blue-500 p-4 flex items-center gap-3 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Active Jobs</p>
                  <p className="text-2xl font-bold">{activeJobs}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border-l-4 border-teal-500 p-4 flex items-center gap-3 shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Applicants</p>
                  <p className="text-2xl font-bold">{totalApplicants}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 mb-6">
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">Filter by:</span>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Paused</option>
                  <option>Closed</option>
                </select>
              </div>
              <p className="text-gray-500 text-sm">Showing 1-5 of 5 jobs</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-teal-700 to-teal-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      JOB TITLE
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      DATE POSTED
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      TOTAL APPLICANTS
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">NEW</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      STATUS
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockJobs.map((job) => {
                    const badge = getStatusBadge(job.status);
                    return (
                      <tr key={job.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {job.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {job.employment_type} • {job.location}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {job.created_at}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            {job.applicants}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {job.newApplicants > 0 ? (
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold">
                              +{job.newApplicants}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 ${badge.class} text-white rounded-full text-xs font-semibold flex items-center gap-1 w-fit`}
                          >
                            <span>{badge.icon}</span>
                            <span className="capitalize">{job.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg"
                              title="View"
                            >
                              <svg
                                className="w-5 h-5 text-gray-600"
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
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg"
                              title="Edit"
                            >
                              <svg
                                className="w-5 h-5 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-lg"
                              title="Delete"
                            >
                              <svg
                                className="w-5 h-5 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyJobPosts;
