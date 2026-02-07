import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileFilters from "../components/MobileFilters";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Explore = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState([]);

  useEffect(() => {
    fetchJobs();
    if (user && token) {
      fetchSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters, user]);

  const fetchSavedJobs = async () => {
    try {
      const response = await api.savedJobs.getAll(token);
      if (response.success) {
        setSavedJobIds(response.jobs.map((j) => j.job_id));
      }
    } catch (error) {
      console.error("Failed to fetch saved jobs:", error);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (appliedFilters?.jobTitle) params.what = appliedFilters.jobTitle;
      if (appliedFilters?.location) params.where = appliedFilters.location;

      const response = await api.jobs.getJobs(params);
      if (response.success) {
        setJobs(response.jobs || []);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  const handleSaveJob = async (job) => {
    if (!user) {
      alert("Please login to save jobs");
      navigate("/login");
      return;
    }

    try {
      if (savedJobIds.includes(job.id)) {
        await api.savedJobs.remove(job.id, token);
        setSavedJobIds(savedJobIds.filter((id) => id !== job.id));
        alert("Job removed from saved");
      } else {
        await api.savedJobs.save(
          {
            jobId: job.id,
            title: job.title,
            company: job.company,
            location: job.location,
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            contract_type: job.contract_type,
            category: job.category,
          },
          token,
        );
        setSavedJobIds([...savedJobIds, job.id]);
        alert("Job saved successfully");
      }
    } catch (error) {
      alert("Failed to save job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto lg:px-6 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-white lg:rounded-2xl lg:shadow-sm min-h-screen lg:min-h-0">
              <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate("/")}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                    <h1 className="text-lg font-bold text-gray-900">
                      Explore Jobs
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigate("/profile")}
                      className="hidden lg:flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">
                        Profile
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                  >
                    Search & Filter
                  </button>
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
                  {loading ? (
                    <div className="text-center text-gray-500 py-8">
                      Loading jobs...
                    </div>
                  ) : jobs.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      No jobs found matching your filters.
                    </div>
                  ) : (
                    jobs.map((job) => (
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
                              <h3 className="font-semibold text-gray-900">
                                {job.title}
                              </h3>
                              <button onClick={() => handleSaveJob(job)}>
                                <svg
                                  className={`w-5 h-5 ${
                                    savedJobIds.includes(job.id)
                                      ? "text-blue-600 fill-current"
                                      : "text-gray-400"
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
                            <p className="text-sm text-blue-600 mb-2">
                              {job.company}
                            </p>
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
                                {new Date(job.created).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">
                                {job.category}
                              </span>
                              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-semibold">
                                {job.contract_type || "FULL-TIME"}
                              </span>
                              {job.salary_min && job.salary_max && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                                  ${Math.round(job.salary_min / 1000)}K - $
                                  {Math.round(job.salary_max / 1000)}K
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => navigate(`/job/${job.id}`)}
                              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {jobs.length}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/applied")}
                  className="w-full p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors text-left"
                >
                  <p className="text-sm text-gray-600 mb-1">Applied</p>
                  <p className="text-2xl font-bold text-green-600">0</p>
                </button>
                <button
                  onClick={() => navigate("/saved")}
                  className="w-full p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors text-left"
                >
                  <p className="text-sm text-gray-600 mb-1">Saved</p>
                  <p className="text-2xl font-bold text-purple-600">0</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs font-semibold">EXPLORE</span>
          </button>
          <button onClick={() => navigate("/saved")} className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span className="text-xs font-semibold">SAVED</span>
          </button>
          <button onClick={() => navigate("/applied")} className="flex flex-col items-center gap-1 text-gray-400">
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
            onClick={() => navigate("/profile")}
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
export default Explore;
