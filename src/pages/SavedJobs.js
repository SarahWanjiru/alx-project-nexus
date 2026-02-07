import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const SavedJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchSavedJobs();
    else setLoading(false);
  }, [user]);

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.savedJobs.getAll(token);
      if (response.success) setSavedJobs(response.jobs);
    } catch (error) {
      console.error('Failed to fetch saved jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await api.savedJobs.remove(jobId, token);
      setSavedJobs(savedJobs.filter(j => j.job_id !== jobId));
    } catch (error) {
      console.error('Failed to remove job:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/jobs")} className="p-2 hover:bg-gray-100 rounded-full hidden md:flex">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Saved Jobs</h1>
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
            {savedJobs.length} Total
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-4 flex justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <svg
            className="w-24 h-24 text-gray-300 mb-4"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Saved Jobs Yet
          </h3>
          <p className="text-gray-500 text-center mb-6">
            Save jobs you're interested in to view them later
          </p>
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{job.company.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-blue-600 mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{job.location}</span>
                    {job.contract_type && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">{job.contract_type}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/job/${job.job_id}`)}
                      className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRemove(job.job_id)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2 w-full">
          <button onClick={() => navigate("/explore")} className="flex flex-col items-center gap-1 min-w-0">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-[10px] font-medium text-gray-400">Jobs</span>
          </button>
          <button onClick={() => navigate("/saved")} className="flex flex-col items-center gap-1 min-w-0">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span className="text-[10px] font-medium text-blue-600">Saved</span>
          </button>
          <button onClick={() => navigate("/applied")} className="flex flex-col items-center gap-1 min-w-0">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] font-medium text-gray-400">Applied</span>
          </button>
          <button onClick={() => navigate("/profile")} className="flex flex-col items-center gap-1 min-w-0">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] font-medium text-gray-400">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SavedJobs;
