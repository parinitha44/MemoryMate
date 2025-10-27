// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'; // Ensure Link is imported
import { publicAPI } from './api/api';

// Import Layout Components
import Navbar from './components/layouts/Navbar';
import Footer from './components/ui/Footer';

// Import Page Components
import Landing from './components/pages/Landing';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Features from './components/pages/Features';
import Contact from './components/pages/Contact';
// REMOVED inline PrivacyPolicy definition
import PatientDashboard from './components/pages/PatientDashboard';
import CaregiverDashboard from './components/pages/CaregiverDashboard';
import CognitiveSupport from './components/pages/CognitiveSupport';
import FaceRecognitionView from './components/pages/FaceRecognitionView'; 
import FAQs from './components/pages/FAQs'; 
// NEW IMPORT
import PrivacyPolicy from './components/pages/PrivacyPolicy'; 

// Import Game Components
import MemoryMatch from './components/pages/games/MemoryMatch';
import WordRecall from './components/pages/games/WordRecall';
import PatternFinder from './components/pages/games/PatternFinder';

// Terms of Service remains inline for now
const TermsOfService = () => (
    <div className="p-8 text-center min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-4 text-xl text-gray-700">Content coming soon. Please contact support for immediate questions.</p>
        <div className="mt-6">
            <p className="text-lg text-gray-600">Looking for answers about security, usage, or features?</p>
            <Link to="/faqs" className="text-blue-600 hover:text-blue-700 font-semibold transition text-xl mt-2 block">
                Visit our Frequently Asked Questions (FAQs) →
            </Link>
        </div>
    </div>
);


// Helper component to conditionally render Navbar/Footer
const LayoutWrapper = ({ children, darkMode, toggleDarkMode, language, toggleLanguage }) => {
// ... (LayoutWrapper remains unchanged)
  const location = useLocation();
  const hideLayout = 
        location.pathname === '/' ||
        location.pathname.startsWith('/cognitive-support/') ||
        location.pathname === '/login' || 
        location.pathname === '/signup';

  const wrapperClass = darkMode ? 'dark' : ''; 

  return (
    <div className={`min-h-screen flex flex-col ${wrapperClass}`}> 
      {!hideLayout && <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          language={language} 
          toggleLanguage={toggleLanguage}
      />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
// ... (State and utility functions remain unchanged)
    // GLOBAL STATE DEFINITION
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');
    const [backendStatus, setBackendStatus] = useState('checking');

    // Test backend connection on app startup
    useEffect(() => {
        const testBackendConnection = async () => {
            try {
                const response = await publicAPI.hello();
                console.log('Backend connection successful:', response);
                setBackendStatus('connected');
            } catch (error) {
                console.error('Backend connection failed:', error);
                setBackendStatus('disconnected');
            }
        };

        testBackendConnection();
    }, []);
    
    // FUNCTION: Toggles Dark Mode (Fixes issue by manipulating document.documentElement class)
    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newMode = !prev;
            document.documentElement.classList.toggle('dark', newMode); 
            return newMode;
        });
    };
    
    // FUNCTION: Sets the new language directly from the dropdown value
    const toggleLanguage = (newLang) => {
        setLanguage(newLang);
    };
    
    const layoutProps = { darkMode, toggleDarkMode, language, toggleLanguage };

  return (
    <Router>
        <LayoutWrapper {...layoutProps}>
        <Routes>
// ... (All other routes remain unchanged)
          {/* Unwrapped Route: LANDING PAGE */}
          <Route path="/" element={<Landing {...layoutProps} />} />

          {/* Authentication Routes (No Navbar/Footer) */}
          <Route path="/login" element={ <div className="flex-grow"><Login /></div> } />
          <Route path="/signup" element={ <div className="flex-grow"><Signup /></div> } />

            {/* Dedicated ML View & Game Routes */}
            <Route path="/face-recognition" element={<FaceRecognitionView />} />
            <Route path="/cognitive-support/memory-match" element={<MemoryMatch />} />
            <Route path="/cognitive-support/word-recall" element={<WordRecall />} />
            <Route path="/cognitive-support/pattern-finder" element={<PatternFinder />} />

          {/* Wrapped Routes: Main Application Pages */}
            <Route path="/app-home" element={<Home />} /> 
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cognitive-support" element={<CognitiveSupport />} /> 
            <Route path="/faqs" element={<FAQs />} /> 
            {/* Routes for Legal Pages - Now using imported component */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
            
            {/* Fallback route */}
            <Route path="*" element={<h1 className="p-8 text-center text-2xl font-bold">404: Page Not Found</h1>} />
        </Routes>
        </LayoutWrapper>
    </Router>
  );
}

export default App;