// src/components/pages/Contact.jsx

import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 dark:bg-gray-900">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          We’re here to help you revive memories and restore connections.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Contact Information & FAQs */}
        <div className="lg:col-span-1 space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Support Information</h2>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-lg dark:text-white">Email Support</h4>
                <p className="text-gray-600 dark:text-gray-300">support@memorymate.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-lg dark:text-white">Caregiver Helpline</h4>
                <p className="text-gray-600 dark:text-gray-300">1-800-MATES (Mon-Fri, 9 AM - 5 PM)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MessageCircle className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-lg dark:text-white">Live Chat</h4>
                <p className="text-gray-600 dark:text-gray-300">Chat with our AI Assistant 24/7.</p>
              </div>
            </div>
          </div>

          {/* Quick Link to FAQs */}
          <div className="pt-4 border-t dark:border-gray-700">
            <h4 className="font-bold text-xl mb-2 dark:text-white">Need quick answers?</h4>
            {/* FIXED LINK: Navigates to the new /faqs page */}
            <a href="/faqs" className="text-blue-600 hover:text-blue-700 font-semibold transition dark:text-blue-400">
              Visit our Comprehensive FAQ Section →
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 dark:text-white">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input type="text" id="name" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-base font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label htmlFor="message" className="block text-base font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea id="message" rows="4" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
            </div>
            <div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
