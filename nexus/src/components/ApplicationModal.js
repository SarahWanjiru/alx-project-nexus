import { useState } from 'react';
import { api } from '../utils/api';

const ApplicationModal = ({ job, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    resume: null,
    coverLetter: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setFormData({ ...formData, [field]: file });
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      setError('Resume is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('resume', formData.resume);
      if (formData.coverLetter) {
        data.append('cover_letter', formData.coverLetter);
      }

      await api.jobs.apply(job.id, data);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={onClose}
                className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Job Search
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{job.title}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-semibold">Application</span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Application Progress</h2>
              <span className="text-blue-500 font-semibold">Step 2 of 3</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-6 h-6 text-gray-600"
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
        </div>

        {/* Progress Bar */}
        <div className="px-8 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              STEP 2: RESUME & COVER LETTER
            </span>
            <span className="text-sm text-green-600">
              ✓ Personal Info Saved
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: '66%' }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Job Info */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{job.company}</span>
              <span className="text-gray-400">•</span>
              <span>{job.location}</span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {/* Cover Letter */}
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2">
              Cover Letter
              <span className="text-gray-400 text-sm font-normal ml-2">
                0 / 2000 characters
              </span>
            </label>
            <p className="text-gray-600 text-sm mb-3">
              Tell the hiring manager why you're the perfect fit for this role.
            </p>
            <textarea
              rows="6"
              placeholder="Introduce yourself, highlight your relevant experience, and share your excitement about TechCorp Inc..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-gray-400 text-xs mt-2">Auto-saved at 2:45 PM</p>
          </div>

          {/* Resume Upload */}
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2">
              Resume / CV <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-600 text-sm mb-3">
              Upload your most recent resume. PDF or DOCX only (Max 5MB).
            </p>

            {!formData.resume ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <label className="cursor-pointer">
                  <span className="text-blue-500 font-semibold hover:text-blue-600">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'resume')}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500 text-sm mt-2">
                  PDF, DOCX, or RTF (max. 5MB)
                </p>
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">{formData.resume.name}</p>
                    <p className="text-sm text-gray-500">
                      {(formData.resume.size / 1024 / 1024).toFixed(2)} MB •
                      Uploaded just now
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, resume: null })}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
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
            )}
          </div>

          {/* Cover Letter Upload (Optional) */}
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2">
              Cover Letter Document{' '}
              <span className="text-gray-400 text-sm font-normal">
                (Optional)
              </span>
            </label>
            <p className="text-gray-600 text-sm mb-3">
              Upload a cover letter document if you prefer. PDF or DOCX only
              (Max 5MB).
            </p>

            {!formData.coverLetter ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <label className="cursor-pointer">
                  <span className="text-blue-500 font-semibold hover:text-blue-600">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'coverLetter')}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">{formData.coverLetter.name}</p>
                    <p className="text-sm text-gray-500">
                      {(formData.coverLetter.size / 1024 / 1024).toFixed(2)} MB
                      • Uploaded just now
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, coverLetter: null })
                  }
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
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
            )}
          </div>

          {/* Notification Checkbox */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 text-blue-500" />
              <span className="text-gray-700">
                I want to receive notifications about my application status and
                similar job opportunities.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading || !formData.resume}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
            >
              Save as Draft
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            By submitting this application, you agree to TechCorp's{' '}
            <a href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </a>
            . Your data will be shared with the recruiter for this position.
          </div>

          {/* Tips */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h4 className="font-bold text-yellow-900">Pro Tip</h4>
              </div>
              <p className="text-sm text-yellow-800">
                Applicants who include a tailored cover letter are 40% more
                likely to get an interview. Highlight specific skills mentioned
                in the job description!
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <h4 className="font-bold text-blue-900">Security</h4>
              </div>
              <p className="text-sm text-blue-800">
                We encrypt all your personal documents. Recruiters only see what
                you choose to share. Your contact info is hidden until you
                accept an interview.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;
