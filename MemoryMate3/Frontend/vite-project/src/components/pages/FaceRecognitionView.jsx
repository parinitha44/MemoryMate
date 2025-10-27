// src/components/pages/FaceRecognitionView.jsx

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScanFace, User, AlertTriangle, X } from 'lucide-react';
import Button from '../ui/Button';
import CaptureLoop from '../ml/CaptureLoop';

const FaceRecognitionView = () => {
    // Refs to connect the video/canvas elements to the CaptureLoop logic
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    
    // State to store the recognized name received from the API
    const [recognizedName, setRecognizedName] = useState("Initializing...");

    // Callback function to receive the name from CaptureLoop.jsx
    const handleNameUpdate = (name) => {
        if (name !== recognizedName) {
            setRecognizedName(name);
            console.log("Recognized:", name);
        }
    };
    
    // Determine the reminder message based on the status
    const reminderMessage = 
        recognizedName === "Unknown" ? "A visitor is here." : 
        recognizedName === "Initializing..." ? "Starting Camera..." :
        recognizedName === "Connection Error" ? "Connection Lost. Checking..." :
        recognizedName === "Camera Access Denied" ? "Please enable camera access." :
        `Hello, it's ${recognizedName}!`;

    const statusColor = 
        recognizedName === "Initializing..." ? 'bg-blue-500' :
        recognizedName === "Connection Error" || recognizedName === "Camera Access Denied" ? 'bg-red-500' :
        recognizedName === "Unknown" ? 'bg-yellow-500' :
        'bg-emerald-500';

    return (
        <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-4xl w-full bg-white p-10 rounded-xl shadow-2xl text-center space-y-6 dark:bg-gray-800">
                <ScanFace className="w-16 h-16 text-emerald-600 mx-auto" />
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Real-Time Face & Voice Recognition</h1>
                
                {/* Video Container */}
                <div className="relative w-full aspect-video rounded-xl shadow-xl overflow-hidden bg-gray-800">
                    
                    {/* 1. The visible video feed */}
                    <video 
                        ref={videoRef} 
                        className="w-full h-full object-cover" 
                        muted 
                        playsInline
                        autoPlay
                    />
                    
                    {/* 2. The reminder text overlay (Styled with Tailwind) */}
                    <div className="absolute top-4 left-4 p-3 rounded-lg text-white text-xl font-bold z-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        <span className={`inline-block w-3 h-3 rounded-full mr-3 ${statusColor}`}></span>
                        {reminderMessage}
                    </div>

                    {/* 3. The hidden canvas element used to capture frames */}
                    <canvas ref={canvasRef} style={{ display: 'none' }} /> 

                    {/* 4. The ML Logic Component */}
                    <CaptureLoop 
                        videoRef={videoRef} 
                        canvasRef={canvasRef} 
                        onNameRecognized={handleNameUpdate} 
                    />
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">The system analyzes one frame every 200ms.</p>

                {/* Exit Button: FIXED REDIRECT TO /features */}
                <Link to="/features" className="block pt-4"> 
                    <Button primary={false} className="bg-red-600 hover:bg-red-700 text-white flex items-center mx-auto space-x-2">
                        <X className="w-5 h-5" />
                        Stop Recognition & Return
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default FaceRecognitionView;
