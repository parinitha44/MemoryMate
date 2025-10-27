// src/components/ui/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// NOTE: We will keep using placeholders, but style them to look
// like subtle, monochromatic SVG icons with a hover effect.
const SocialMediaIcons = () => (
  // Use margin-top 2 (mt-2) for subtle spacing, and a flex container
  <div className="flex space-x-4 mt-2">
    {/* Facebook Icon Placeholder */}
    <a 
      href="#" 
      aria-label="Facebook" 
      // Subtle gray color with a blue hover effect, matching other links
      className="text-gray-300 hover:text-blue-400 transition text-xl"
    >
      {/* Placeholder: Use a real icon component like <FaFacebookF /> here */}
      <span>f</span>
    </a>
    
    {/* X (Twitter) Icon Placeholder */}
    <a 
      href="#" 
      aria-label="X (Twitter)" 
      className="text-gray-300 hover:text-blue-400 transition text-xl"
    >
      {/* Placeholder: Use a real icon component like <FaXTwitter /> here */}
      <span>X</span>
    </a>
    
    {/* Instagram Icon Placeholder */}
    <a 
      href="#" 
      aria-label="Instagram" 
      className="text-gray-300 hover:text-blue-400 transition text-xl"
    >
      {/* Placeholder: Use a real icon component like <FaInstagram /> here */}
      <span>📸</span>
    </a>
    
    {/* WhatsApp Icon Placeholder */}
    <a 
      href="#" 
      aria-label="WhatsApp" 
      className="text-gray-300 hover:text-blue-400 transition text-xl"
    >
      {/* Placeholder: Use a real icon component like <FaWhatsapp /> here */}
      <span>WA</span>
    </a>

    {/* YouTube Icon Placeholder */}
    <a 
      href="#" 
      aria-label="YouTube" 
      className="text-gray-300 hover:text-blue-400 transition text-xl"
    >
      {/* Placeholder: Use a real icon component like <FaYoutube /> here */}
      <span>YT</span>
    </a>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white mt-12 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          
          {/* Column 1: Logo & Mission */}
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-400 tracking-wider">
              MemoryMate
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Reviving Memories, Restoring Connections.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="text-gray-300 hover:text-blue-400 transition">Features</Link></li>
              <li><Link to="/cognitive-support" className="text-gray-300 hover:text-blue-400 transition">Cognitive Support</Link></li>
              <li><Link to="/caregiver-dashboard" className="text-gray-300 hover:text-blue-400 transition">Caregiver Hub</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-300 hover:text-blue-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-blue-400 transition">Terms of Service</Link></li>
              <li><Link to="/faqs" className="text-gray-300 hover:text-blue-400 transition">FAQs</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Contact & Social Media (Updated to match requested style) */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Get in Touch</h4>
            <p className="text-sm text-gray-300">Email: support@memorymate.com</p>
            {/* Reduced the top margin to bring the hotline closer to the email */}
            <p className="text-sm text-gray-300 mt-1">Caregiver Hotline: 1-800-MATES</p>
            
            {/* Social Media Icons (Now monochromatic and subtle) */}
            <SocialMediaIcons />
          </div>
          
        </div>

        {/* Copyright */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} MemoryMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;