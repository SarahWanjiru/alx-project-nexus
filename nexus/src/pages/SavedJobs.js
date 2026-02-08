import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import ComingSoonModal from '../components/ComingSoonModal';

const SavedJobs = () => {
  const navigate = useNavigate();
  const { savedJobs, loading } = useJobs();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleFeatureClick = () => {
    setShowComingSoon(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Saved Jobs</h1>
          <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
            {savedJobs.length} Total
          </div>
        </div>
        <p className="text-gray-400 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          Click the bookmark icon to remove from saved jobs
        </p>
      </div>

      <div className="p-4 space-y-3">
        {loading && (
          <div className="text-center py-8 text-gray-500">Loading saved jobs...</div>
        )}
        {!loading && savedJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Jobs Yet</h3>
            <p className="text-gray-500 mb-4">Start saving jobs you're interested in!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Explore Jobs
            </button>
          </div>
        )}
        {savedJobs.map((job) => (
          <div
            key={job.id}
            onClick={handleFeatureClick}
            className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {job.company.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-blue-600">{job.company}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleFeatureClick(); }}>
                      <svg
                        className="w-6 h-6 text-blue-600 fill-current"
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
                    <button onClick={(e) => { e.stopPropagation(); handleFeatureClick(); }}>
                      <svg
                        className="w-6 h-6"
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
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 mt-2">
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
                    Saved recently
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.contract_type && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                      {job.contract_type.toUpperCase()}
                    </span>
                  )}
                  {job.category && (
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-semibold">
                      {job.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs font-semibold">EXPLORE</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-blue-600">
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

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        feature="Saved Jobs"
      />
    </div>
  );
};

export default SavedJobs;
