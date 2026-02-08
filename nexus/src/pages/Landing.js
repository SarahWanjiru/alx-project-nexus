import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Hero */}
      <header className="bg-gray-50 py-6 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <img
              src="/nexus-connect.jpeg"
              alt="Nexus Logo"
              className="h-32 w-auto mx-auto md:mx-0"
            />
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 font-semibold"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 pb-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-teal-900 mb-6">
              Find Your Dream <span className="text-blue-600">Job</span> at
              Companies That Get It
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Stress less. Browse and apply to expert-verified jobs near you and
              across the globe.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Exploring Now!
            </button>
          </div>
          <div className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              <img
                src="/person-working-laptop.jpg"
                alt="Professional working on laptop"
                className="rounded-full w-full h-auto object-cover shadow-2xl"
              />
              <div className="absolute top-8 right-0 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span className="text-sm font-semibold">100% Remote</span>
              </div>
              <div className="absolute bottom-12 right-8 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span className="text-sm font-semibold">Great Benefits</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-teal-800 text-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What kind of work are you looking for?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white text-gray-800 p-8 rounded-xl">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-bold text-xl mb-2">100% Remote</h3>
              <p className="text-gray-600">
                No daily commute to the office. Work from home or the location
                of your choice.
              </p>
            </div>
            <div className="bg-white text-gray-800 p-8 rounded-xl">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="font-bold text-xl mb-2">Hybrid Remote</h3>
              <p className="text-gray-600">
                A blend of working in the office near you and working from home.
              </p>
            </div>
            <div className="bg-white text-gray-800 p-8 rounded-xl">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-bold text-xl mb-2">Flexible Options</h3>
              <p className="text-gray-600">
                Mostly in office, but with work-from-home flexibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold text-teal-900 mb-4">
          Verified & Trusted Job Listings
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          We verify 100% of our job listings to ensure quality and authenticity
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Start Your Job Search Now!
        </button>
      </section>

      {/* Reviews Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Nexus helped me find my dream remote job in just 2 weeks! The
                platform is easy to use and all listings are verified."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Best job board I've used. No spam, no scams, just genuine
                opportunities from real companies."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <p className="font-semibold">Michael Chen</p>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex mb-4">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "The filtering options are amazing! I found exactly what I was
                looking for - a hybrid role with great benefits."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  E
                </div>
                <div>
                  <p className="font-semibold">Emily Rodriguez</p>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <img
              src="/nexus-connect.jpeg"
              alt="Nexus Logo"
              className="h-20 w-auto"
            />
            <div className="flex flex-col md:flex-row gap-4 text-sm">
              <a
                href="mailto:support@nexusconnect.com"
                className="hover:text-blue-400"
              >
                📧 support@nexusconnect.com
              </a>
              <a href="tel:+254720171697" className="hover:text-blue-400">
                📞 +254720171697
              </a>
            </div>
            <p className="text-sm text-center">
              © 2026 NexusConnect. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
