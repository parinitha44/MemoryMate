// src/components/ml/api.js

// IMPORTANT: Replace this with your final deployed ML API address
const ML_API_URL = 'http://127.0.0.1:5000/recognize'; 
const API_KEY = 'YOUR_SECRET_API_KEY_HERE'; // Use a real key for production security

/**
 * Sends a captured image frame to the ML server for face recognition.
 * * @param {Blob} imageBlob - The image data captured from the webcam canvas.
 * @returns {Promise<string>} The recognized name or "Unknown".
 */
export const recognizeFace = async (imageBlob) => {
    // 1. Create a FormData object to send the image file
    const formData = new FormData();
    formData.append('image', imageBlob, 'frame.jpeg'); // 'image' must match the key used in your Flask API (request.files['image'])

    try {
        const response = await fetch(ML_API_URL, {
            method: 'POST',
            // Do NOT manually set 'Content-Type': the browser sets it automatically to 'multipart/form-data' when using FormData
            headers: {
                // If you implement API key authentication later, add it here:
                // 'Authorization': `Bearer ${API_KEY}` 
            },
            body: formData,
        });

        if (!response.ok) {
            console.error('API Error: Server responded with status', response.status);
            return 'API Error';
        }

        const data = await response.json();

        // 2. Return the recognized name from your ML server's JSON response
        // The Flask API returns: {"name": "Mom", "prompt": "..."}
        return data.name; 

    } catch (error) {
        console.error('Network or Fetch Error:', error);
        return 'Connection Error'; // Indicates server is down or unreachable
    }
};