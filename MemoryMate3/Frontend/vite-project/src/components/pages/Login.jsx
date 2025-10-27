// src/components/pages/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Button from '../ui/Button';
import { authAPI, publicAPI } from '../../api/api';

const Login = () => {
  const [isCaregiver, setIsCaregiver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      // Test backend connection first
      await publicAPI.hello();
      console.log('Backend connection successful');
      
      // Attempt login
      const response = await authAPI.login({ email, password });
      console.log('Login successful:', response);
      
      // Navigate based on user role
      const redirectTo = response.roles?.includes('CAREGIVER') ? '/caregiver-dashboard' : '/patient-dashboard';
      navigate(redirectTo);
      
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in to MemoryMate
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Or <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>
        
        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Email address" // Correct placeholder
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Password" // ADDED placeholder
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="caregiver-toggle"
                name="caregiver-toggle"
                type="checkbox"
                checked={isCaregiver}
                onChange={() => setIsCaregiver(!isCaregiver)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="caregiver-toggle" className="ml-2 block text-base text-gray-900">
                Login as Caregiver
              </label>
            </div>

            <div className="text-base">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
