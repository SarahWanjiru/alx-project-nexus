import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Landing from './pages/Landing';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Jobs from './pages/Jobs';
import SavedJobs from './pages/SavedJobs';
import AppliedJobs from './pages/AppliedJobs';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/applied" element={<AppliedJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
