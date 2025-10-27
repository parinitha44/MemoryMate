// src/components/pages/CaregiverDashboard.jsx

import React from 'react';
import { User, MessageSquare, Bell, Edit, BarChart, MapPin, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

// Reusable card for a clean look
const CaregiverCard = ({ icon: Icon, title, content, actionText, colorClass = 'border-blue-400' }) => (
  <div className={`p-6 rounded-xl shadow-lg bg-white border-l-4 ${colorClass} transition hover:shadow-xl`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <Icon className="w-6 h-6 text-gray-600" />
    </div>
    <div className="text-gray-600 text-lg">
      {content}
    </div>
    {actionText && (
      <div className="mt-4">
        <Button primary={false} className="py-2 px-4 text-base">{actionText}</Button>
      </div>
    )}
  </div>
);


const CaregiverDashboard = () => {
  const patientName = "Rhea Smith"; // Placeholder
  const lastActive = "2 hours ago";
  
  // Placeholder Data
  const recentLogs = [
    "10:30 AM: Completed 'Memory Match' game (Score: 8/10).",
    "9:00 AM: Medication reminder completed successfully.",
    "8:00 AM: Conversation Log added: Discussed the garden.",
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Header and Patient Overview */}
      <div className="mb-10 border-b pb-4 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Caregiver Hub: <span className="text-emerald-600">{patientName}</span>
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-lg text-gray-500">Last Active: {lastActive}</span>
          <Button primary={true}>Manage Patients</Button>
        </div>
      </div>
      
      {/* Key Stats and Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        
        {/* 1. SOS/Emergency Alert Card */}
        <CaregiverCard
          icon={AlertTriangle}
          title="Emergency Alerts"
          content={<p className="text-red-600 font-semibold text-2xl">No active alerts.</p>}
          colorClass="border-red-600"
          actionText="View Alert History"
        />

        {/* 2. Reminders Management Card */}
        <CaregiverCard
          icon={Bell}
          title="Reminders Management"
          content={<p>3 upcoming reminders scheduled for today (Lunch, Call Michael).</p>}
          colorClass="border-blue-600"
          actionText="Edit Reminders"
        />
        
        {/* 3. Location Tracking Card (If enabled) */}
        <CaregiverCard
          icon={MapPin}
          title="Patient Location"
          content={<p>Last known location: Home. (Last updated: 5 mins ago)</p>}
          colorClass="border-yellow-600"
          actionText="View Map"
        />
      </div>

      {/* Activity Logs and Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Logs (2/3 width) */}
        <div className="lg:col-span-2 p-6 rounded-xl shadow-2xl bg-gray-50 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <MessageSquare className="w-8 h-8 text-gray-600" />
            <span>Recent Activity Logs</span>
          </h2>
          <ul className="space-y-3">
            {recentLogs.map((log, index) => (
              <li key={index} className="p-4 bg-white rounded-lg shadow-sm text-lg text-gray-700 border-l-4 border-emerald-400">
                {log}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button primary={false}>View Full History</Button>
          </div>
        </div>

        {/* AI Insights (1/3 width) */}
        <CaregiverCard 
          icon={BarChart}
          title="AI Cognitive Insights"
          content={<p>Cognitive score improved by 5% this week. Strong engagement with Word Recall game.</p>}
          colorClass="border-purple-400"
          actionText="View Progress Graphs"
        />

      </div>
      
    </div>
  );
};

export default CaregiverDashboard;