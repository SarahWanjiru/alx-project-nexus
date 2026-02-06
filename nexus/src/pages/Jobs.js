import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileFilters from '../components/MobileFilters';

const Jobs = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Design');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState([2]);
  const [appliedFilters, setAppliedFilters] = useState(null);

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setShowFilters(false);
  };

  const toggleSave = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const categories = [
    { name: 'Design', icon: '🎨' },
    { name: 'Development', icon: '</>' },
    { name: 'Marketing', icon: '📢' },
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Product Designer',
      company: 'Nexus Tech',
      location: 'San Francisco, CA',
      time: '2h ago',
      level: 'SENIOR',
      type: 'FULL-TIME',
      salary: '$140K - $180K',
      category: 'Design',
    },
    {
      id: 2,
      title: 'Frontend Engineer (React)',
      company: 'Vortex Systems',
      location: 'Remote',
      time: '5h ago',
      level: 'MID LEVEL',
      type: 'FULL-TIME',
      category: 'Development',
    },
    {
      id: 3,
      title: 'Junior Data Analyst',
      company: 'Insight Global',
      location: 'Austin, TX',
      time: '1d ago',
      level: 'ENTRY',
      type: 'CONTRACT',
      category: 'Development',
    },
    {
      id: 4,
      title: 'Social Media Manager',
      company: 'Spark Creative',
      location: 'New York, NY',
      time: '2d ago',
      level: 'MID LEVEL',
      type: 'FULL-TIME',
      category: 'Marketing',
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    // First filter by category
    if (job.category !== selectedCategory) return false;

    // Then apply additional filters if any
    if (!appliedFilters) return true;

    if (
      appliedFilters.jobTitle &&
      !job.title.toLowerCase().includes(appliedFilters.jobTitle.toLowerCase())
    ) {
      return false;
    }

    if (
      appliedFilters.location &&
      !job.location
        .toLowerCase()
        .includes(appliedFilters.location.toLowerCase())
    ) {
      return false;
    }

    if (
      appliedFilters.experienceLevel &&
      appliedFilters.experienceLevel.length > 0 &&
      !appliedFilters.experienceLevel.includes(job.level)
    ) {
      return false;
    }

    if (
      appliedFilters.jobType &&
      appliedFilters.jobType.length > 0 &&
      !appliedFilters.jobType.includes(job.type)
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gray-900">Explore Jobs</h1>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>

        <button
          onClick={() => setShowFilters(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all mb-6"
        >
          Search Jobs
        </button>

        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Categories</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Recent Job Postings
          </h2>
          <button className="text-blue-600 font-semibold text-sm">
            See all
          </button>
        </div>

        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {job.company.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <button onClick={() => toggleSave(job.id)}>
                      <svg
                        className={`w-5 h-5 ${
                          savedJobs.includes(job.id)
                            ? 'text-blue-600 fill-current'
                            : 'text-gray-400'
                        }`}
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
                  <p className="text-sm text-blue-600 mb-2">{job.company}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
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
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {job.time}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                      {job.level}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        job.type === 'FULL-TIME'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-orange-50 text-orange-600'
                      }`}
                    >
                      {job.type}
                    </span>
                    {job.salary && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => navigate('/explore')}
            className="flex flex-col items-center gap-1 text-blue-600"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs font-semibold">EXPLORE</span>
          </button>
          <button
            onClick={() => navigate('/saved')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span className="text-xs font-semibold">SAVED</span>
          </button>
          <button
            onClick={() => navigate('/applied')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-semibold">APPLIED</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-semibold">PROFILE</span>
          </button>
        </div>
      </nav>

      <MobileFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default Jobs;
