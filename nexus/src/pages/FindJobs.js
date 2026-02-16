import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';
import ApplicationModal from '../components/ApplicationModal';

const FindJobs = () => {
  const navigate = useNavigate();
  const { jobs, loading } = useJobs();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationJob, setApplicationJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [employmentTypes, setEmploymentTypes] = useState({
    fullTime: true,
    contract: false,
    remote: true,
    partTime: false,
  });

  const toggleEmploymentType = (type) => {
    setEmploymentTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleApply = (job) => {
    setApplicationJob(job);
    setShowApplicationModal(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplicationModal(false);
    setApplicationJob(null);
    alert('Application submitted successfully!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-teal-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold">Nexus Connect</h1>
              <p className="text-xs text-teal-300">JOB SEEKER</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </button>
            <button
              onClick={() => navigate('/find-jobs')}
              className="w-full flex items-center gap-3 px-4 py-3 bg-teal-800 rounded-lg"
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
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Filters Sidebar */}
        <aside className="w-72 bg-white border-r border-gray-200 p-6">
          <h2 className="text-lg font-bold mb-6">FILTERS</h2>

          {/* Category */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <h3 className="font-semibold">Category</h3>
            </div>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option>Software Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="font-semibold">Location</h3>
            </div>
            <input
              type="text"
              placeholder="City, state, or remote"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Salary Range */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="font-semibold">Salary Range</h3>
            </div>
            <div className="px-2">
              <input type="range" min="40" max="200" className="w-full" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>$40k</span>
                <span>$200k+</span>
              </div>
            </div>
          </div>

          {/* Employment Type */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <h3 className="font-semibold">Employment Type</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={employmentTypes.fullTime}
                  onChange={() => toggleEmploymentType('fullTime')}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-sm">Full-time</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={employmentTypes.contract}
                  onChange={() => toggleEmploymentType('contract')}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-sm">Contract</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={employmentTypes.remote}
                  onChange={() => toggleEmploymentType('remote')}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-sm">Remote</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={employmentTypes.partTime}
                  onChange={() => toggleEmploymentType('partTime')}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="text-sm">Part-time</span>
              </label>
            </div>
          </div>

          <button className="w-full text-blue-500 font-semibold py-2">
            Reset All Filters
          </button>
        </aside>

        {/* Job Listings */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recommended Jobs</h2>
              <span className="text-gray-600">{jobs.length} results</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Job title or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white p-6 rounded-lg border-2 cursor-pointer ${selectedJob?.id === job.id ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                        <p className="text-gray-600 mb-3">
                          {job.company} • {job.location}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          {job.salary_min && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-semibold">
                              ${Math.round(job.salary_min / 1000)}k - $
                              {Math.round(job.salary_max / 1000)}k
                            </span>
                          )}
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-semibold">
                            {job.contract_type}
                          </span>
                          {job.location?.includes('Remote') && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold">
                              Remote
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Posted 2 days ago</span>
                          <span className="text-red-500 font-semibold">
                            4 DAYS LEFT
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-blue-500">
                      <svg
                        className="w-6 h-6"
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
                </div>
              ))
            )}
          </div>
        </main>

        {/* Job Details Panel */}
        {selectedJob && (
          <aside className="w-96 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <button type="button" className="text-blue-500 font-semibold">
                    {selectedJob.company}
                  </button>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm">✓ Verified</span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
                Save
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">EXPERIENCE</p>
                <p className="font-semibold">5+ Years</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">TYPE</p>
                <p className="font-semibold">{selectedJob.contract_type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">SALARY</p>
                <p className="font-semibold">
                  {selectedJob.salary_min
                    ? `$${Math.round(selectedJob.salary_min / 1000)}k - $${Math.round(selectedJob.salary_max / 1000)}k`
                    : 'Not specified'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">EDUCATION</p>
                <p className="font-semibold">Bachelor's Degree</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">About the Role</h3>
              <p className="text-gray-700 leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Key Responsibilities</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    Lead design end-to-end for core creator features from
                    ideation to production.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    Design beautiful, intuitive interfaces for complex AI-driven
                    workflows.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>
                    Collaborate with cross-functional partners to define product
                    strategy and roadmap.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  Figma
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  UI/UX Design
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  Prototyping
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  User Research
                </span>
              </div>
            </div>

            <button
              onClick={() => handleApply(selectedJob)}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
            >
              Apply Now
            </button>
          </aside>
        )}
      </div>

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

export default FindJobs;
