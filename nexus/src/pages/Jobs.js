import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Jobs = () => {
  const { logout } = useAuth();
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    experience: '',
  });
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$80k - $120k',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'StartupXYZ',
      location: 'New York',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$120k - $160k',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="19" r="2" />
                <circle cx="5" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Nexus Connect
            </span>
          </div>
          <button
            className="text-gray-600 hover:text-gray-900"
            aria-label="Logout"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Find Your Next Opportunity
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            <option value="remote">Remote</option>
            <option value="onsite">On-site</option>
          </select>

          <select
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{job.company}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm">
                      {job.location}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                      {job.experience}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 mb-4">
                    {job.salary}
                  </p>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
