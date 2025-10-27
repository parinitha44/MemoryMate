// src/components/ml/CaptureLoop.jsx

import React, { useEffect, useRef } from 'react';
import { recognizeFace } from './api';

// Configuration for how often to check the face (e.g., 5 times per second)
const FRAME_RATE_MS = 200; // 1000ms / 5 FPS = 200ms interval

/**
 * Manages the webcam capture loop and communicates with the ML API.
 * * @param {object} props 
 * @param {HTMLVideoElement} props.videoRef - Ref to the main video element for display.
 * @param {HTMLCanvasElement} props.canvasRef - Ref to the hidden canvas for capturing frames.
 * @param {function} props.onNameRecognized - Callback to update the parent component with the name.
 */
const CaptureLoop = ({ videoRef, canvasRef, onNameRecognized }) => {
    const intervalRef = useRef(null);
    const streamRef = useRef(null);

    // --- Core function to capture a frame and send it to the API ---
    const processFrame = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas || video.paused || video.ended) {
            return;
        }

        // 1. Set canvas dimensions to match the video feed
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // 2. Draw the current video frame onto the canvas
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 3. Convert the canvas image to a Blob (file data)
        canvas.toBlob(async (imageBlob) => {
            if (!imageBlob) return;

            // 4. Send the image data to your ML API
            const name = await recognizeFace(imageBlob);

            // 5. Update the parent component with the recognition result
            onNameRecognized(name);
        }, 'image/jpeg', 0.8); // Use JPEG format, 80% quality
    };

    // --- useEffect: Setup Camera and Start Loop on Mount ---
    useEffect(() => {
        // Function to start the webcam
        const startWebcam = async () => {
            try {
                // Request access to the user's camera
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream; // Save stream for cleanup
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
                
                // Start the loop to process frames
                intervalRef.current = setInterval(processFrame, FRAME_RATE_MS);
                
            } catch (err) {
                console.error("Could not access the webcam:", err);
                onNameRecognized("Camera Access Denied");
            }
        };

        startWebcam();

        // --- Cleanup function runs when the component is unmounted (user leaves page) ---
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current); // Stop the recognition loop
            }
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop()); // Stop the camera
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return null; // This component is non-visual; it manages the background logic
};

export default CaptureLoop;