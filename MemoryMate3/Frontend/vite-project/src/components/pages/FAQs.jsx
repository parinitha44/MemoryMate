// src/components/pages/FAQs.jsx

import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqData = [
    { 
        question: "What is MemoryMate designed for?", 
        answer: "MemoryMate is an AI-powered platform designed to provide cognitive support for individuals with Alzheimer's and dementia. It uses features like face recognition, conversation logging, and scheduled prompts to help patients maintain connections and routines." 
    },
    { 
        question: "How does the Face & Voice Recognition work?", 
        answer: "The system uses the device's camera (with patient consent) to recognize familiar faces and voices in real-time. It then displays the person's name and relationship (e.g., 'Your daughter, Anna') to reduce moments of confusion." 
    },
    { 
        question: "Can caregivers monitor patients remotely?", 
        answer: "Yes. The dedicated Caregiver Dashboard provides real-time activity logs, game performance analytics, conversation summaries, and allows caregivers to remotely manage memory prompts and receive instant SOS alerts." 
    },
    { 
        question: "Is the data secure and private?", 
        answer: "Absolutely. We prioritize security using Firebase Auth for secure login and encryption for all user data (HTTPS). Patient and caregiver roles ensure strict access control." 
    },
    { 
        question: "How do the Cognitive Games help?", 
        answer: "The games (Memory Match, Word Recall, etc.) are designed by specialists to stimulate specific memory and focus centers in the brain. They track progress over time to monitor cognitive agility." 
    },
];

const FAQs = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 dark:bg-gray-900 min-h-screen">
            
            <header className="text-center mb-12 border-b pb-6 dark:border-gray-700">
                <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                    Frequently Asked Questions
                </h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                    Find quick answers about MemoryMate's features, security, and usage.
                </p>
            </header>

            <div className="space-y-6">
                {faqData.map((item, index) => (
                    <div 
                        key={index} 
                        className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                            <span className="text-blue-600 mr-3 text-2xl font-mono">Q.</span>
                            {item.question}
                        </h3>
                        <p className="text-lg text-gray-700 dark:text-gray-300 ml-9 mt-1">
                            {item.answer}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
