import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Jobs from './pages/Jobs';
import SavedJobs from './pages/SavedJobs';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
