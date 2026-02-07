const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = {
  auth: {
    signup: async (userData) => {
      console.log('API: Sending signup request to', `${API_URL}/auth/signup`);
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log('API: Signup response status:', response.status, 'data:', data);
      return data;
    },
    login: async (credentials) => {
      console.log('API: Sending login request to', `${API_URL}/auth/login`);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log('API: Login response status:', response.status, 'data:', data);
      return data;
    },
  },
  jobs: {
    getJobs: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_URL}/jobs?${queryString}`);
      return response.json();
    },
    getCategories: async (country = "us") => {
      const response = await fetch(
        `${API_URL}/jobs/categories?country=${country}`,
      );
      return response.json();
    },
    getTopCompanies: async (country = "us") => {
      const response = await fetch(
        `${API_URL}/jobs/top-companies?country=${country}`,
      );
      return response.json();
    },
  },
  savedJobs: {
    save: async (jobData, token) => {
      const response = await fetch(`${API_URL}/saved-jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });
      return response.json();
    },
    getAll: async (token) => {
      const response = await fetch(`${API_URL}/saved-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
    remove: async (jobId, token) => {
      const response = await fetch(`${API_URL}/saved-jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.json();
    },
  },
};

export default api;
