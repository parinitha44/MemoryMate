// src/components/pages/CognitiveSupport.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // <-- Make sure Link is imported
import { Brain, Shuffle, ListChecks, Shapes } from 'lucide-react';
import Button from '../ui/Button';

const gameData = [
  { 
    icon: Shuffle, 
    title: "Memory Match", 
    purpose: "Focuses on **visual recognition and short-term memory**.",
    description: "Match pairs of themed cards (e.g., family photos, objects) under timed pressure to improve recall.",
    color: "text-red-500 bg-red-100",
    gamePath: '/cognitive-support/memory-match'
  },
  { 
    icon: ListChecks, 
    title: "Word Recall", 
    purpose: "Targets **verbal fluency and episodic memory**.",
    description: "The system provides a category (e.g., 'things in a kitchen'), and the user lists as many items as they can remember.",
    color: "text-green-500 bg-green-100",
    gamePath: '/cognitive-support/word-recall'
  },
  { 
    icon: Shapes, 
    title: "Pattern Finder", 
    purpose: "Stimulates **problem-solving and working memory**.",
    description: "Identify the missing element in a simple sequence of shapes or sounds to maintain cognitive agility.",
    color: "text-purple-500 bg-purple-100",
    gamePath: '/cognitive-support/pattern-finder'
  },
];

const GameCard = ({ icon: Icon, title, purpose, description, color, gamePath }) => {
    
    // Notice the Link wrapper is now responsible for navigation
    return (
        <div className="p-6 rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition duration-300">
            <div className={`p-3 rounded-full inline-block mb-4 ${color}`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-blue-600 font-medium mb-3">{purpose}</p>
            <p className="text-gray-600 text-lg">{description}</p>
            <div className="mt-6">
                <Link to={gamePath}>
                    <Button 
                        primary={true} 
                        className="w-full"
                    >
                        Start {title}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

const CognitiveSupport = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      <header className="text-center mb-12 border-b pb-6">
        <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Cognitive Support Center
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Engage your mind with our specialist-designed memory games. Progress is tracked automatically for you and your caregiver.
        </p>
      </header>

      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Specialized Games</h2>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {gameData.map((game, index) => (
          <GameCard key={index} {...game} />
        ))}
      </div>
      
      {/* Tracking and Analytics CTA */}
      <section className="mt-16 text-center p-10 bg-emerald-50 rounded-xl border border-emerald-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">View Your Progress</h2>
        <p className="text-lg text-gray-700 mb-6">
          All game results and cognitive scores are securely logged. Caregivers can view detailed analytics via their dashboard.
        </p>
        <Link to="/patient-dashboard"> {/* <-- FIX: Wrapped button in Link to /patient-dashboard */}
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Go to Patient Analytics
          </Button>
        </Link>
      </section>
      
    </div>
  );
};

export default CognitiveSupport;