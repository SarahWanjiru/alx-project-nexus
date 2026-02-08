import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.jobs.getAll(filters);

      if (data.results) {
        const formattedJobs = data.results.map((job) => ({
          id: job.job_id,
          title: job.title,
          company: job.company?.name || 'Unknown Company',
          location: job.location || 'Remote',
          description: job.description,
          salary_min: job.salary,
          salary_max: job.salary,
          contract_type: job.employment_type,
          category: job.category?.name || 'General',
          created: job.created_at,
          deadline: job.deadline,
          is_active: job.is_active,
        }));
        setJobs(formattedJobs);
      } else {
        setJobs([]);
      }
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (job) => {
    try {
      setSavedJobs((prev) => [...prev, job]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const unsaveJob = async (jobId) => {
    try {
      setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <JobContext.Provider
      value={{ jobs, loading, error, fetchJobs, savedJobs, saveJob, unsaveJob }}
    >
      {children}
    </JobContext.Provider>
  );
};
