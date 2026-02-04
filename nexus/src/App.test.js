/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock all dependencies
jest.mock('react-router-dom');
jest.mock('./App.css', () => ({}));

jest.mock('./contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('./pages/SignUp', () => () => <div>SignUp</div>);
jest.mock('./pages/Login', () => () => <div>Login</div>);
jest.mock('./pages/Explore', () => () => <div>Explore</div>);
jest.mock('./pages/Jobs', () => () => <div>Jobs</div>);
jest.mock('./components/ProtectedRoute', () => ({ children }) => (
  <div>{children}</div>
));

test('renders app component', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
