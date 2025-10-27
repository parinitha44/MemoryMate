// src/components/pages/PatientDashboard.jsx

import React from 'react';
import { AlarmCheck, ScanFace, MessageCircle, Gamepad, Zap, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

// NOTE: FaceRecognitionView is NOT imported here, as we navigate to it via the router.

const DashboardCard = ({ icon: Icon, title, description, colorClass, actionText, actionLink }) => (
    <div className={`p-6 rounded-xl shadow-lg border-t-4 ${colorClass} bg-white transition hover:shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
            <Icon className="w-8 h-8 text-gray-600" />
            {/* ALWAYS use Link for navigation to dedicated feature pages */}
            {actionLink && (
                <Link to={actionLink}>  
                    <Button primary={false} className="py-1 px-3 text-sm">{actionText}</Button>
                </Link>
            )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


const PatientDashboard = () => {
    const patientName = "Rhea"; // Placeholder
    
    // The state and conditional rendering logic has been removed.
    // We rely purely on the URL/Router now.

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            
            {/* Header and SOS Button */}
            <div className="flex justify-between items-center mb-10 border-b pb-4">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Welcome back, <span className="text-blue-600">{patientName}!</span>
                </h1>
                <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 p-3 text-xl">
                    <Zap className="w-6 h-6 fill-white" />
                    <span>SOS</span>
                </Button>
            </div>
            
            {/* Main Dashboard Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Memory Prompts Panel (EXISTING CODE) */}
                <div className="lg:col-span-2 p-6 rounded-xl shadow-2xl bg-blue-50 border border-blue-200">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                        <AlarmCheck className="w-8 h-8 text-blue-600" />
                        <span>Daily Memory Prompts</span>
                    </h2>
                    <ul className="space-y-4 text-lg">
                        <li className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
                            <span className="font-semibold text-gray-700">9:00 AM: Take your morning medication.</span>
                            <span className="text-emerald-600 font-medium">Completed</span>
                        </li>
                        <li className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
                            <span className="font-semibold text-gray-700">1:00 PM: Lunch with Anna at your favorite cafe.</span>
                            <span className="text-orange-600 font-medium">Upcoming</span>
                        </li>
                        <li className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
                            <span className="font-semibold text-gray-700">7:00 PM: Call your son, Michael.</span>
                            <span className="text-gray-500 font-medium">Pending</span>
                        </li>
                    </ul>
                </div>

                {/* Cognitive Support (EXISTING CODE) */}
                <DashboardCard 
                    icon={Gamepad}
                    title="Cognitive Games"
                    description="Strengthen your memory with our personalized daily puzzles."
                    colorClass="border-blue-400"
                    actionText="Play Now"
                    actionLink="/cognitive-support"
                />

                {/* --- MODIFIED CARD: Identify Person (Uses Action Link) --- */}
                <DashboardCard 
                    icon={ScanFace}
                    title="Identify Person"
                    description="Use the camera/mic to instantly recognize faces and voices."
                    colorClass="border-emerald-400"
                    actionText="Start Recognition"
                    actionLink="/face-recognition" // <-- ROUTING TO DEDICATED PAGE
                />
                
                {/* Other Cards (EXISTING CODE) */}
                <DashboardCard 
                    icon={MessageCircle}
                    title="Conversation History"
                    description="Review AI-summarized logs of your recent interactions."
                    colorClass="border-purple-400"
                    actionText="View Logs"
                    actionLink="/logs" 
                />
                <DashboardCard 
                    icon={LogOut}
                    title="Mood Tracker / Journal"
                    description="Jot down a quick thought or feeling for the day."
                    colorClass="border-yellow-400"
                    actionText="Add Entry"
                    actionLink="/journal" 
                />
            </div>
        </div>
    );
};

export default PatientDashboard;