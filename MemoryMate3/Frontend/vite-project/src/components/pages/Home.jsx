// src/components/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import FeatureCard from '../ui/FeatureCard';
import { Brain, MessageSquare, Clock, Users, Shield, Zap } from 'lucide-react';

const featureData = [
  { icon: Brain, title: "Face & Voice Recognition", description: "Instantly identify loved ones using AI, providing comfort and context." },
  { icon: MessageSquare, title: "Conversation Logging", description: "AI-summarized logs of past interactions to aid recall and connection." },
  { icon: Clock, title: "Daily Memory Prompts", description: "Scheduled reminders for medication, events, and routines based on AI-detection." },
  { icon: Users, title: "Caregiver Support", description: "Dedicated dashboard for monitoring progress, setting reminders, and managing care." },
  { icon: Shield, title: "User Authentication", description: "Secure login for patients and caregivers with role-based access." },
  { icon: Zap, title: "Cognitive Support", description: "Engaging games and puzzles designed to stimulate memory and track improvement." },
];

const Home = () => {
  return (
    <div>
      {/* 1. Hero Section: Deep Dark Background */}
      {/* FIX: Consistent dark background - removed light gradient colors in dark mode */}
      <section className="bg-gradient-to-r from-blue-50 to-emerald-50 py-20 sm:py-32 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Text color switch */}
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 dark:text-white">
              Helping Alzheimer’s patients <span className="text-blue-600 dark:text-blue-400">reconnect through AI</span>.
            </h1>
            {/* Text color switch */}
            <p className="text-xl text-gray-600 mb-8 dark:text-gray-300">
              MemoryMate: Reviving Memories, Restoring Connections. Our AI platform provides cognitive support and seamless caregiver integration.
            </p>
            <Link to="/signup">
              <Button primary={true}>Get Started Today</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* 2. About MemoryMate: Deep Dark Background */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Text color switch */}
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">About MemoryMate</h2>
            {/* Text color switch */}
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Alzheimer's and dementia can isolate. MemoryMate bridges the gap using **AI-powered memory assistance**, turning challenging moments into opportunities for reconnection and peace of mind for both patients and caregivers.
            </p>
          </div>
        </div>
      </section>

      {/* --- */}

      {/* 3. Key Features Overview: Deep Dark Background */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Text color switch */}
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FeatureCard background must also be dark (handled in FeatureCard.jsx) */}
            {featureData.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/features">
              {/* Button text/border for better visibility in Dark Mode */}
              <Button primary={false} className="border border-blue-600 dark:text-white dark:border-white">Explore All Features</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* --- */}

      {/* 4. CTA for Caregivers: Deep Blue/Black Background */}
      {/* FIX: Changed bg-blue-600 to dark:bg-gray-950 for a full dark look */}
      <section className="py-20 bg-blue-600 text-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Peace of Mind for Caregivers</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Monitor your loved one's progress, manage reminders, and receive real-time alerts with our dedicated Caregiver Dashboard.
          </p>
          <Link to="/login">
            {/* Custom button style, ensuring dark mode hover is visible */}
            <Button className="bg-gray-600 text-white hover:bg-white hover:text-black dark:bg-gray-500 dark:hover:bg-gray-100 dark:hover:text-gray-900">
              Caregiver Login / Sign Up
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
