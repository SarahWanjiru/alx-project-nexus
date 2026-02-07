import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetchJobDetails();
    if (user) checkIfSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const checkIfSaved = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.savedJobs.getAll(token);
      if (response.success && response.jobs) {
        setIsSaved(response.jobs.some(j => j.job_id === id));
      }
    } catch (error) {
      console.error('Failed to check saved status:', error);
    }
  };

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await api.jobs.getJobs();
      if (response.success) {
        const foundJob = response.jobs.find((j) => j.id === id);
        setJob(foundJob);
      }
    } catch (error) {
      console.error("Failed to fetch job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert('Please login to save jobs');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (isSaved) {
        await api.savedJobs.remove(id, token);
        setIsSaved(false);
      } else {
        await api.savedJobs.save({
          jobId: id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary_min: job.salary_min,
          salary_max: job.salary_max,
          contract_type: job.contract_type,
          category: job.category
        }, token);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to save job:', error);
    }
  };

  const handleApply = () => {
    if (!user) {
      alert("Please login to apply for this job");
      navigate("/login");
    } else {
      navigate(`/apply/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Job not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">
                {job.company.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-blue-600 mb-3">{job.company}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold">
                  {job.contract_type || "FULL-TIME"}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">
                  {job.location}
                </span>
                {job.salary_min && job.salary_max && (
                  <span className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-semibold">
                    ${Math.round(job.salary_min / 1000)}K - $
                    {Math.round(job.salary_max / 1000)}K
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex gap-4 border-b border-gray-200 mb-6">
            <button className="pb-3 px-1 border-b-2 border-blue-600 text-blue-600 font-semibold">
              Description
            </button>
            <button className="pb-3 px-1 text-gray-500 font-semibold">
              Company
            </button>
            <button className="pb-3 px-1 text-gray-500 font-semibold">
              Reviews
            </button>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Job Description
            </h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex gap-3">
            <button onClick={handleSave} className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50">
              <svg
                className="w-6 h-6 text-gray-600"
                fill={isSaved ? "currentColor" : "none"}
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
            <button
              onClick={handleApply}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
