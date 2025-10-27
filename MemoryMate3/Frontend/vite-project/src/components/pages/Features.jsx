// src/components/pages/Features.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, MessageSquare, Clock, Users, Shield, Zap, QrCode, Atom, Bell } from 'lucide-react'; 
import FeatureCard from '../ui/FeatureCard';

// UPDATED FEATURE DATA with the SOS feature included
const detailedFeatures = [
    { 
        icon: QrCode, // Reusing QrCode or another suitable icon for emergency
        title: "Emergency SOS Button", 
        description: "A prominent, accessible button that, when pressed, instantly triggers an alert (SMS/email) to the linked caregiver with the patient's last known location and timestamp.",
        path: "/patient-dashboard" // Directs user to the Patient Dashboard where the live button is located
    },
    { 
        icon: Atom, 
        title: "Face & Voice Recognition (AI)", 
        description: "Our proprietary AI model instantly identifies known people in the patient's life, displaying their name and relationship. Reduces anxiety during moments of disorientation. Requires patient consent for camera/mic access.",
        path: "/face-recognition" 
    },
    { 
        icon: MessageSquare, 
        title: "Conversation Logging & Summaries", 
        description: "Using speech-to-text, MemoryMate records interactions and provides short, easy-to-read summaries. This helps the patient recall recent events and helps caregivers track topics and mood.",
        path: "/logs" 
    },
    { 
        icon: Clock, 
        title: "Daily Memory Prompts & Scheduling", 
        description: "Set reminders for medication, appointments, and daily routines. The system uses AI to detect routine deviations and proactively reminds the patient, customizable via the Caregiver Dashboard.",
        path: "/patient-dashboard" 
    },
    { 
        icon: Zap, 
        title: "Cognitive Support Games", 
        description: "A selection of simple, engaging games (Memory Match, Word Recall, Pattern Finder) designed by cognitive specialists to stimulate brain function and slow memory degradation. Progress is tracked automatically.",
        path: "/cognitive-support" 
    },
    { 
        icon: Users, 
        title: "Comprehensive Caregiver Support", 
        description: "Dedicated dashboard for monitoring activity, reviewing logs, and managing settings remotely. Real-time data sync ensures caregivers are always informed.",
        path: "/caregiver-dashboard" 
    },
    { 
        icon: Shield, 
        title: "Secure User Authentication", 
        description: "Utilizing Firebase Auth, we ensure privacy with role-based access. Patient data is encrypted and handled with the highest level of security protocols (HTTPS, data encryption).",
        path: "/login" 
    },
];

const Features = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 dark:bg-gray-900">
      
      <header className="text-center mb-12 border-b pb-6 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          The Power of MemoryMate
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-4xl mx-auto dark:text-gray-300">
          Every feature is designed to reduce the challenges of Alzheimer's, enhance connections, and provide peace of mind.
        </p>
      </header>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center dark:text-white">Our Specialized Games</h2>

      {/* Features Grid: Fixed height applied via min-h-full for uniform cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {detailedFeatures.map((feature, index) => (
            <Link 
                key={index} 
                to={feature.path} 
                className="block min-h-full" // <- THIS LINE ENSURES EQUAL HEIGHT
            >
                <FeatureCard 
                    icon={feature.icon} 
                    title={feature.title} 
                    description={feature.description} 
                    className="hover:shadow-xl hover:scale-[1.02] transition duration-200 cursor-pointer min-h-full" // <- AND THIS LINE
                />
            </Link>
        ))}
      </div>
      
      {/* Cognitive Support CTA */}
      <section className="mt-16 text-center p-10 bg-blue-50 rounded-xl border border-blue-200 dark:bg-gray-700 dark:border-blue-800">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Ready to Reconnect?</h2>
        <p className="text-lg text-gray-700 mb-6 dark:text-gray-300">
          Start exploring cognitive games or set up your caregiver profile today.
        </p>
        <Link to="/cognitive-support" className="text-blue-600 font-semibold hover:underline text-lg dark:text-blue-400">
          Explore Cognitive Support →
        </Link>
      </section>
    </div>
  );
};

export default Features;
