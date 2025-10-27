// src/components/pages/Landing.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button'; 
import { Brain, Heart, Sun, Moon, Languages, Zap, Shield } from 'lucide-react'; 

// --- LANGUAGE DICTIONARY (English and Hindi only) ---
const LANGUAGE_CONTENT = {
    English: {
        code: 'EN',
        title: "MemoryMate",
        tagline: "Reviving Memories, Restoring Connections.",
        intro: "MemoryMate is an AI-powered platform dedicated to bridging the emotional gap created by Alzheimer's and dementia. We offer real-time cognitive assistance and invaluable monitoring tools for caregivers.",
        description: "Our technology focuses on making daily life smoother: identifying loved ones instantly using AI, logging key conversations, and scheduling reminders for critical routines. It's a supportive, gentle external memory system designed for safety, clarity, and peace of mind.",
        cta: "Start Your Journey",
        // REMOVED: secondaryCta: "Learn More About Our Features",
        footerText: "New user? The login page has a link to Sign Up.",
        promise: "Our Promise: Safety, Simplicity, Connection.",
    },
    Hindi: {
        code: 'HI',
        title: "मेमोरीमेट",
        tagline: "यादों को ताज़ा करना, कनेक्शन को बहाल करना।",
        intro: "मेमोरीमेट एक एआई-संचालित प्लेटफॉर्म है जो अल्जाइमर और डिमेंशिया के कारण पैदा हुए भावनात्मक अंतर को पाटने के लिए समर्पित है। हम वास्तविक समय में संज्ञानात्मक सहायता और देखभाल करने वालों के लिए अमूल्य निगरानी उपकरण प्रदान करते हैं।",
        description: "हमारी तकनीक रोजमर्रा की जिंदगी को आसान बनाने पर केंद्रित है: एआई का उपयोग करके प्रियजनों को तुरंत पहचानना, महत्वपूर्ण बातचीत को लॉग करना और महत्वपूर्ण दिनचर्या के लिए अनुस्मारक शेड्यूल करना। यह सुरक्षा, स्पष्टता और मानसिक शांति के लिए डिज़ाइन किया गया एक सहायक, सौम्य बाहरी मेमोरी सिस्टम है।",
        cta: "अपनी यात्रा शुरू करें",
        // REMOVED: secondaryCta: "हमारी सुविधाओं के बारे में अधिक जानें",
        footerText: "नए उपयोगकर्ता? लॉगिन पेज पर साइन अप का लिंक है।",
        promise: "हमारा वादा: सुरक्षा, सरलता, कनेक्शन।",
    }
};

const Landing = ({ toggleDarkMode, toggleLanguage, language, darkMode }) => {
    
    // Select the content based on the current language prop
    const content = LANGUAGE_CONTENT[language] || LANGUAGE_CONTENT['English'];

    const handleLanguageChange = (event) => {
        // Calls the toggle function with the new language name
        toggleLanguage(event.target.value);
    };

    return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-900 text-white transition duration-500 p-8">
        
        {/* Accessibility Toolbar (Top Right) - Dark Mode button removed */}
        <div className="absolute top-0 right-0 p-4 flex space-x-3">
            {/* Language Dropdown */}
            <div className="relative">
                {/* z-10 ensures the icon sits on top of the select */}
                <Languages className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700 pointer-events-none z-10"/>
                <select 
                    onChange={handleLanguageChange}
                    value={language}
                    className="appearance-none block w-full bg-white border border-gray-300 text-gray-700 py-2 pl-10 pr-4 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-sm font-semibold cursor-pointer"
                    aria-label="Select Language"
                >
                    <option value="English">English</option>
                    <option value="Hindi">हिन्दी (Hindi)</option>
                </select>
            </div>
        </div>


      <div className="max-w-4xl mx-auto p-8 text-center space-y-12 mt-16">
        
        {/* Logo and Tagline */}
        <div className="space-y-4">
          <Brain className="w-24 h-24 text-blue-400 mx-auto animate-pulse" />
          <h1 className="text-7xl font-extrabold tracking-wider text-white">
            {content.title}
          </h1>
          <p className="text-3xl font-light text-gray-300">
            "{content.tagline}"
          </p>
        </div>

        {/* New Beautiful Descriptive Content */}
        <div className="space-y-8 pt-6">
            <p className="text-xl font-medium text-gray-200">
                {content.intro}
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {content.description}
            </p>
            {/* Icon Group for visual appeal */}
            <div className='flex justify-center space-x-6'>
                 <Zap className='w-8 h-8 text-emerald-400'/>
                 <Heart className='w-8 h-8 text-red-400'/>
                 <Shield className='w-8 h-8 text-blue-400'/> 
            </div>
        </div>
        
        {/* Call to Action */}
        <div className="space-y-4 pt-8">
          <Link to="/login">
            <Button className="w-full sm:w-auto px-12 py-4 bg-emerald-500 text-white hover:bg-emerald-600 text-2xl shadow-xl">
              {content.cta}
              <Heart className="w-6 h-6 ml-2 inline fill-white"/>
            </Button>
          </Link>
          {/* REMOVED SECONDARY CTA:
            <Link to="/features" className='block'>
                <p className='text-lg text-gray-400 hover:text-blue-400 cursor-pointer transition'>
                    {content.secondaryCta} →
                </p>
            </Link>
          */}
          <p className="text-sm text-gray-500 pt-2">
            {content.footerText}
          </p>
        </div>
        
      </div>
      <div className="text-gray-600 text-sm mt-auto pb-4">
        {content.promise}
      </div>
    </div>
  );
};

export default Landing;