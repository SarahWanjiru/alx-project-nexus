import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-bold text-blue-600 mb-6">404</div>
        <h1 className="text-4xl font-bold text-teal-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
