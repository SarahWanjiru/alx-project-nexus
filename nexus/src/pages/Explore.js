import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import MobileFilters from '../components/MobileFilters';
import JobApplicationForm from '../components/JobApplicationForm';

const Explore = () => {
  const navigate = useNavigate();
  const { jobs, loading, error } = useJobs();
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = async (applicationData) => {
    try {
      const formData = new FormData();
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume);
      }
      if (applicationData.coverLetter) {
        formData.append('cover_letter', applicationData.coverLetter);
      }

      const { api } = await import('../utils/api');
      await api.jobs.apply(selectedJob.id, formData);
      alert('Application submitted successfully!');
      setShowApplicationForm(false);
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    }
  };

  const filteredJobs = jobs.filter((job) => {
    if (!appliedFilters) return true;
    if (appliedFilters.jobTitle && !job.title.toLowerCase().includes(appliedFilters.jobTitle.toLowerCase())) return false;
    if (appliedFilters.location && !job.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) return false;
    if (appliedFilters.experienceLevel && appliedFilters.experienceLevel.length > 0 && !appliedFilters.experienceLevel.includes(job.level)) return false;
    if (appliedFilters.jobType && appliedFilters.jobType.length > 0 && !appliedFilters.jobType.includes(job.type)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto lg:px-6 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-white lg:rounded-2xl lg:shadow-sm min-h-screen lg:min-h-0">
              <div className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                    <h1 className="text-lg font-bold text-gray-900">Explore Jobs</h1>
                  </div>
                </div>

                <div className="mb-6">
                  <button onClick={() => setShowFilters(true)} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all lg:hidden">
                    Search & Filter
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Job Postings</h2>
                </div>

                <div className="space-y-3">
                  {loading && <div className="text-center py-8">Loading jobs...</div>}
                  {error && <div className="text-center text-red-600 py-8">Error: {error}</div>}
                  {!loading && filteredJobs.length === 0 && <div className="text-center text-gray-500 py-8">No jobs found.</div>}
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">{job.company.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-sm text-blue-600 mb-2">{job.company}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                            <span>{job.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold">{job.level}</span>
                            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-semibold">{job.type}</span>
                          </div>
                          <button onClick={() => handleApply(job)} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileFilters isOpen={showFilters} onClose={() => setShowFilters(false)} onApply={handleApplyFilters} />
      {showApplicationForm && selectedJob && (
        <JobApplicationForm job={selectedJob} onClose={() => setShowApplicationForm(false)} onSubmit={handleSubmitApplication} />
      )}
    </div>
  );
};

export default Explore;
