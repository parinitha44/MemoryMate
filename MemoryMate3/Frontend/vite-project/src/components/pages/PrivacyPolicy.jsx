// src/components/pages/PrivacyPolicy.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => (
    <div className="max-w-4xl mx-auto p-8 min-h-[70vh] flex flex-col items-center justify-center space-y-6 dark:text-gray-200">
        <Shield className="w-12 h-12 text-blue-600" />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Privacy Policy</h1>
        
        <div className="text-center space-y-4">
            <p className="text-xl text-gray-700 dark:text-gray-300">
                Content coming soon. Your data security is our **highest priority**.
            </p>
        </div>

        <div className="w-full text-left space-y-6 text-lg">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Commitment to Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
                MemoryMate uses **industry-standard encryption (AES-256)** for all data both in transit and at rest. We employ strict **role-based access** to ensure only authorized patients and linked caregivers can access relevant information, protecting sensitive patient and caregiver communication logs. **All systems undergo quarterly security audits to maintain compliance and proactively address vulnerabilities.**
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">What Data is Collected?</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 pl-4">
                <li>**Personal Identification:** Name, Email, and Role (Patient/Caregiver) for account management.</li>
                <li>**Biometric Data (Optional):** Encrypted models of faces and voices, used exclusively for real-time recognition. **Raw images/audio are never stored on our servers; only transient models are processed.**</li>
                <li>**Cognitive Logs:** Game scores, conversation summaries, and reminder compliance data to track progress. **This health information is anonymized for internal analysis unless viewed by a linked caregiver.**</li>
                <li>**Technical Data:** Device type, operating system, and anonymous usage statistics to help optimize application performance and accessibility features.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">How is Your Data Used?</h2>
            <p className="text-gray-600 dark:text-gray-300">
                Data is used **only to provide and improve the MemoryMate service.** This includes enhancing AI recognition accuracy, generating cognitive progress reports for caregivers, and ensuring the personalized delivery of memory prompts. We **never sell** or share health data with third parties for marketing purposes. **We retain data only as long as an account remains active, and all associated data is permanently deleted upon account closure.**
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Patient Control and Consent</h2>
            <p className="text-gray-600 dark:text-gray-300">
                Patients have full control over camera and microphone access. The real-time recognition features **require explicit consent** and can be deactivated at any time, instantly stopping the collection of biometric data. **Users can request a copy of all their stored data, or complete erasure of their biometric models, directly through the Patient Dashboard settings.**
            </p>
        </div>

        <div className="mt-8 p-4 border-t border-gray-200 dark:border-gray-700 w-full text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
                Have immediate questions about security, data handling, or features?
            </p>
            <Link to="/faqs" className="text-blue-600 hover:text-blue-700 font-semibold transition text-xl mt-2 block dark:text-blue-400 dark:hover:text-blue-500">
                Visit our Frequently Asked Questions (FAQs) →
            </Link>
        </div>
    </div>
);

export default PrivacyPolicy;