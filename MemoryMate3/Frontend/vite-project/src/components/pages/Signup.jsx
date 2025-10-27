// src/components/pages/Signup.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { authAPI, publicAPI } from '../../api/api';

const Signup = () => {
  const [role, setRole] = useState('Patient'); // 'Patient' or 'Caregiver'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    const formData = new FormData(e.target);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const caregiverEmail = formData.get('caregiverEmail');
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }
    
    try {
      // Test backend connection first
      await publicAPI.hello();
      console.log('Backend connection successful');
      
      // Attempt signup
      const signupData = {
        fullName,
        email,
        password,
        role: role.toUpperCase(),
        caregiverEmail: caregiverEmail || null
      };
      
      const response = await authAPI.signup(signupData);
      console.log('Signup successful:', response);
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Signup failed. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Your MemoryMate Account
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>
        
        {/* Role Selection */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setRole('Patient')}
            className={`flex-1 py-3 text-lg font-semibold rounded-lg transition duration-300 ${
              role === 'Patient' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            I am a Patient
          </button>
          <button
            type="button"
            onClick={() => setRole('Caregiver')}
            className={`flex-1 py-3 text-lg font-semibold rounded-lg transition duration-300 ${
              role === 'Caregiver' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            I am a Caregiver
          </button>
        </div>
        
        {/* Signup Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              name="fullName"
              type="text"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Full Name"
            />
            <input
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Email address"
            />
            {role === 'Patient' && (
              <input
                name="caregiverEmail"
                type="email"
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Caregiver Email ID (Optional to link account)"
              />
            )}
            <input
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Password"
            />
            <input
              name="confirmPassword"
              type="password"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Confirm Password"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">
              {success}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;