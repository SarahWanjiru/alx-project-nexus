import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import FindJobs from './pages/FindJobs';
import Messages from './pages/Messages';
import Applications from './pages/Applications';
import RecruiterDashboard from './pages/RecruiterDashboard';
import MyJobPosts from './pages/MyJobPosts';
import Candidates from './pages/Candidates';
import Interviews from './pages/Interviews';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <JobProvider>
        <ThemeProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['user']}><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={['user']}><ProfilePage /></ProtectedRoute>} />
            <Route path="/find-jobs" element={<ProtectedRoute allowedRoles={['user']}><FindJobs /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute allowedRoles={['user']}><Messages /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute allowedRoles={['user']}><Applications /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin', 'recruiter']}><RecruiterDashboard /></ProtectedRoute>} />
            <Route path="/admin/jobs" element={<ProtectedRoute allowedRoles={['admin', 'recruiter']}><MyJobPosts /></ProtectedRoute>} />
            <Route path="/admin/candidates" element={<ProtectedRoute allowedRoles={['admin', 'recruiter']}><Candidates /></ProtectedRoute>} />
            <Route path="/admin/interviews" element={<ProtectedRoute allowedRoles={['admin', 'recruiter']}><Interviews /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute allowedRoles={['admin', 'recruiter']}><Messages /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin', 'recruiter']}><Reports /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin', 'recruiter']}><ProfilePage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </JobProvider>
    </AuthProvider>
  );
}

export default App;
