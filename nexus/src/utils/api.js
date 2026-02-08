const API_URL = process.env.REACT_APP_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: 'Request failed' }));

    // Parse Django validation errors
    if (typeof error === 'object' && !error.error && !error.detail) {
      const messages = [];
      for (const [, errors] of Object.entries(error)) {
        if (Array.isArray(errors)) {
          messages.push(...errors);
        } else {
          messages.push(errors);
        }
      }
      throw new Error(messages.join('. '));
    }

    throw new Error(error.error || error.detail || 'Request failed');
  }
  return response.json();
};

export const api = {
  // Auth endpoints
  auth: {
    register: async (userData) => {
      const response = await fetch(`${API_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },

    login: async (credentials) => {
      const response = await fetch(`${API_URL}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return handleResponse(response);
    },

    logout: async (refreshToken) => {
      const response = await fetch(`${API_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      return handleResponse(response);
    },

    refreshToken: async (refreshToken) => {
      const response = await fetch(`${API_URL}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      return handleResponse(response);
    },
  },

  // User endpoints
  users: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/users/`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    },

    getById: async (userId) => {
      const response = await fetch(`${API_URL}/users/${userId}/`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    },

    update: async (userId, userData) => {
      const response = await fetch(`${API_URL}/users/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },

    delete: async (userId) => {
      const response = await fetch(`${API_URL}/users/${userId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return response.ok;
    },
  },

  // Jobs endpoints
  jobs: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_URL}/jobs/${query ? `?${query}` : ''}`
      );
      return handleResponse(response);
    },

    getById: async (jobId) => {
      const response = await fetch(`${API_URL}/jobs/${jobId}/`);
      return handleResponse(response);
    },

    apply: async (jobId, formData) => {
      const response = await fetch(`${API_URL}/jobs/${jobId}/applications/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
      });
      return handleResponse(response);
    },

    getApplications: async (jobId) => {
      const response = await fetch(`${API_URL}/jobs/${jobId}/applications/`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    },
  },

  // Companies endpoints
  companies: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/companies/`);
      return handleResponse(response);
    },

    getById: async (companyId) => {
      const response = await fetch(`${API_URL}/companies/${companyId}/`);
      return handleResponse(response);
    },

    create: async (companyData) => {
      const response = await fetch(`${API_URL}/companies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(companyData),
      });
      return handleResponse(response);
    },

    update: async (companyId, companyData) => {
      const response = await fetch(`${API_URL}/companies/${companyId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(companyData),
      });
      return handleResponse(response);
    },

    delete: async (companyId) => {
      const response = await fetch(`${API_URL}/companies/${companyId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return response.ok;
    },

    // Company Jobs
    getJobs: async (companyId, params = {}) => {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(
        `${API_URL}/companies/${companyId}/jobs/${query ? `?${query}` : ''}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return handleResponse(response);
    },

    createJob: async (companyId, jobData) => {
      const response = await fetch(`${API_URL}/companies/${companyId}/jobs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(jobData),
      });
      return handleResponse(response);
    },

    getJobById: async (companyId, jobId) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/jobs/${jobId}/`,
        {
          headers: getAuthHeaders(),
        }
      );
      return handleResponse(response);
    },

    updateJob: async (companyId, jobId, jobData) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/jobs/${jobId}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify(jobData),
        }
      );
      return handleResponse(response);
    },

    deleteJob: async (companyId, jobId) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/jobs/${jobId}/`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );
      return response.ok;
    },

    // Company Job Applications
    getJobApplications: async (companyId, jobId) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/jobs/${jobId}/applications/`,
        {
          headers: getAuthHeaders(),
        }
      );
      return handleResponse(response);
    },

    getJobApplicationById: async (companyId, jobId, applicationId) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/jobs/${jobId}/applications/${applicationId}/`,
        {
          headers: getAuthHeaders(),
        }
      );
      return handleResponse(response);
    },

    updateApplicationStatus: async (
      companyId,
      jobId,
      applicationId,
      status
    ) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/jobs/${jobId}/applications/${applicationId}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ status }),
        }
      );
      return handleResponse(response);
    },

    // Company Reviews
    getReviews: async (companyId) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/reviews/`
      );
      return handleResponse(response);
    },

    createReview: async (companyId, reviewData) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/reviews/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
          body: JSON.stringify(reviewData),
        }
      );
      return handleResponse(response);
    },

    // Company Notifications
    getNotifications: async (companyId) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/notifications/`,
        {
          headers: getAuthHeaders(),
        }
      );
      return handleResponse(response);
    },

    markNotificationAsRead: async (companyId, notificationId) => {
      const response = await fetch(
        `${API_URL}/companies/${companyId}/notifications/${notificationId}/mark-as-read/`,
        {
          method: 'PATCH',
          headers: getAuthHeaders(),
        }
      );
      return handleResponse(response);
    },
  },

  // Categories endpoint
  categories: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/categories/`);
      return handleResponse(response);
    },

    getById: async (categoryId) => {
      const response = await fetch(`${API_URL}/categories/${categoryId}/`);
      return handleResponse(response);
    },

    create: async (categoryData) => {
      const response = await fetch(`${API_URL}/categories/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(categoryData),
      });
      return handleResponse(response);
    },

    update: async (categoryId, categoryData) => {
      const response = await fetch(`${API_URL}/categories/${categoryId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(categoryData),
      });
      return handleResponse(response);
    },

    delete: async (categoryId) => {
      const response = await fetch(`${API_URL}/categories/${categoryId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return response.ok;
    },
  },

  // User applications
  applications: {
    getMyApplications: async (userId) => {
      const response = await fetch(`${API_URL}/users/${userId}/applications/`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    },

    getById: async (userId, applicationId) => {
      const response = await fetch(
        `${API_URL}/users/${userId}/applications/${applicationId}/`,
        {
          headers: getAuthHeaders(),
        }
      );
      return handleResponse(response);
    },
  },

  // Profile endpoints
  profile: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/profiles/`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    },

    getMe: async () => {
      const response = await fetch(`${API_URL}/profiles/me/`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    },

    getById: async (profileId) => {
      const response = await fetch(`${API_URL}/profiles/${profileId}/`, {
        headers: getAuthHeaders(),
      });
      return handleResponse(response);
    },

    create: async (profileData) => {
      const response = await fetch(`${API_URL}/profiles/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(profileData),
      });
      return handleResponse(response);
    },

    update: async (profileId, profileData) => {
      const response = await fetch(`${API_URL}/profiles/${profileId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(profileData),
      });
      return handleResponse(response);
    },

    delete: async (profileId) => {
      const response = await fetch(`${API_URL}/profiles/${profileId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return response.ok;
    },
  },
};
