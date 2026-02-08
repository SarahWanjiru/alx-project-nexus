import { useState } from 'react';
import RecruiterSidebar from '../components/RecruiterSidebar';

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const candidates = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      avatar: '/api/placeholder/60/60',
      appliedFor: 'Senior Frontend Engineer',
      appliedTime: '2H AGO',
      status: 'IN SCREENING',
      statusColor: 'text-blue-600',
      matchScore: 98,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '/api/placeholder/60/60',
      appliedFor: 'UX Lead Designer',
      appliedTime: '5H AGO',
      status: 'NEW',
      statusColor: 'text-blue-600',
      matchScore: 92,
    },
    {
      id: 3,
      name: 'Alex Rivera',
      avatar: '/api/placeholder/60/60',
      appliedFor: 'Junior Fullstack Developer',
      appliedTime: 'YESTERDAY',
      status: 'REJECTED',
      statusColor: 'text-red-600',
      matchScore: 45,
    },
    {
      id: 4,
      name: 'Emily Watson',
      avatar: '/api/placeholder/60/60',
      appliedFor: 'Product Manager',
      appliedTime: 'YESTERDAY',
      status: 'INTERVIEW',
      statusColor: 'text-green-600',
      matchScore: 87,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RecruiterSidebar />

      <div className="flex flex-1">
        {/* Filters Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 p-6 min-h-screen">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Filters</h2>
            <button className="text-blue-500 text-sm font-semibold hover:text-blue-600">
              Reset All
            </button>
          </div>

          {/* Experience Level */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              EXPERIENCE LEVEL
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="text-gray-700">Entry Level</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="text-gray-700">Mid-Senior</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="text-gray-700">Director / Lead</span>
              </label>
            </div>
          </div>

          {/* Application Status */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              APPLICATION STATUS
            </h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-blue-500 font-semibold">
                    New Applicants
                  </span>
                </div>
                <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                  12
                </span>
              </label>
              <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Screening</span>
                </div>
                <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-bold">
                  45
                </span>
              </label>
              <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-gray-700">Interview</span>
                </div>
                <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-bold">
                  8
                </span>
              </label>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                React
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                Python
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Node.js
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                UI Design
              </span>
              <button className="px-3 py-1 text-gray-600 text-sm font-semibold">
                +14 more
              </button>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl p-6 text-white">
            <p className="text-sm font-bold mb-2">PRO TIP</p>
            <p className="text-sm mb-4">
              Use the AI Match Score to prioritize top applicants automatically.
            </p>
            <button className="w-full bg-white text-teal-600 py-2 rounded-lg font-semibold hover:bg-teal-50">
              Learn More
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Candidates</h1>
              <p className="text-gray-600">
                Managing 1,248 total applicants across 12 active job postings
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Export
            </button>
          </div>

          {/* Search and Sort */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name, email, or resume keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">SORT BY:</span>
              <select className="px-4 py-3 border border-gray-300 rounded-lg font-semibold">
                <option>Match Score (Highest)</option>
                <option>Date Applied</option>
                <option>Name</option>
              </select>
            </div>
          </div>

          {/* Candidates List */}
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{candidate.name}</h3>
                    <p className="text-gray-600 mb-1">
                      Applied for{' '}
                      <span className="font-semibold text-gray-900">
                        {candidate.appliedFor}
                      </span>
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">
                        APPLIED {candidate.appliedTime}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span
                        className={`font-semibold ${candidate.statusColor}`}
                      >
                        ● {candidate.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-teal-500 mb-1">
                      {candidate.matchScore}%
                    </p>
                    <p className="text-xs text-gray-500 uppercase">
                      Match Score
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                      View Profile
                    </button>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <p className="text-gray-600">Showing 1 to 10 of 1,248 candidates</p>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 bg-blue-500 text-white rounded-lg font-semibold">
                1
              </button>
              <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-semibold">
                2
              </button>
              <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-semibold">
                3
              </button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-semibold">
                125
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Candidates;
