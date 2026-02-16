import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RecruiterSidebar from '../components/RecruiterSidebar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const isRecruiter = user?.role === 'recruiter' || user?.role === 'admin';
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || user?.email?.split('@')[0] || 'User',
    professionalTitle: profile?.professional_title || 'Job Seeker',
    bio: profile?.bio || 'Tell us about yourself...',
    email: user?.email || 'user@example.com',
    location: profile?.location || 'Your location',
    skills: profile?.skills
      ? profile.skills
          .split(',')
          .map((skill) => skill.trim())
          .filter((skill) => skill !== '')
      : [],
  });

  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    // TODO: Save to backend
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isRecruiter ? (
        <RecruiterSidebar />
      ) : (
        <aside className="w-64 bg-teal-900 text-white flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/Nexus Connect.png"
                alt="Nexus Connect"
                className="w-10 h-10 rounded-xl shadow-lg object-cover"
              />
              <div>
                <h1 className="font-bold">Nexus Connect</h1>
                <p className="text-xs text-teal-300">JOB SEEKER</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Dashboard
              </button>
              <button
                onClick={() => navigate('/find-jobs')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Find Jobs
              </button>
              <button
                onClick={() => navigate('/applications')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Applications
              </button>
              <button
                onClick={() => navigate('/messages')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-teal-800 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Messages
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-teal-800 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Profile
              </button>
            </nav>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-4xl">
          {/* Profile Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <div className="flex items-start gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="/api/placeholder/128/128"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-teal-600">
                    Profile Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      PROFESSIONAL TITLE
                    </label>
                    <input
                      type="text"
                      value={formData.professionalTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          professionalTitle: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Bio */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-xl font-bold text-teal-600">
                Professional Bio
              </h3>
            </div>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <svg
                className="w-6 h-6 text-teal-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <h3 className="text-xl font-bold text-teal-600">
                Contact Details
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  LOCATION
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h3 className="text-xl font-bold text-teal-600">
                  Skills & Expertise
                </h3>
              </div>
              <button
                onClick={() => setNewSkill('')}
                className="text-teal-600 font-semibold flex items-center gap-1"
              >
                <span>+</span> Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg font-semibold flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-teal-600 hover:text-teal-800"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Add a new skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={addSkill}
                className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Last updated on October 14, 2023. Profile visibility:{' '}
            <span className="text-teal-600 font-semibold">Public</span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
