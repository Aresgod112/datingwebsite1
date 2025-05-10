import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Heart, Search, MessageSquare, User, LogOut } from 'lucide-react';
import { useUserStore } from '../store/userStore';

const Dashboard: React.FC = () => {
  const { currentUser, logout } = useUserStore();
  const location = useLocation();
  
  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('/matches')) return 'Your Matches';
    if (path.includes('/discover')) return 'Discover';
    if (path.includes('/messages')) {
      if (path.split('/').length > 3) {
        return 'Conversation';
      }
      return 'Messages';
    }
    if (path.includes('/profile')) return 'Your Profile';
    return 'Dashboard';
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-pink-500" fill="#ec4899" />
              <span className="ml-2 text-xl font-bold text-gray-800">Heartlink</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  {currentUser?.name}
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={currentUser?.photos[0] || 'https://via.placeholder.com/150'} 
                    alt={currentUser?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button 
                onClick={() => logout()}
                className="ml-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 py-4">{getTitle()}</h1>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>
      
      {/* Bottom navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around h-16">
            <NavLink 
              to="/dashboard/matches" 
              className={({ isActive }) => 
                `flex flex-col items-center justify-center w-full ${
                  isActive ? 'text-pink-500' : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <Heart size={24} />
              <span className="text-xs mt-1">Matches</span>
            </NavLink>
            <NavLink 
              to="/dashboard/discover" 
              className={({ isActive }) => 
                `flex flex-col items-center justify-center w-full ${
                  isActive ? 'text-pink-500' : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <Search size={24} />
              <span className="text-xs mt-1">Discover</span>
            </NavLink>
            <NavLink 
              to="/dashboard/messages" 
              className={({ isActive }) => 
                `flex flex-col items-center justify-center w-full ${
                  isActive ? 'text-pink-500' : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <MessageSquare size={24} />
              <span className="text-xs mt-1">Messages</span>
            </NavLink>
            <NavLink 
              to="/dashboard/profile" 
              className={({ isActive }) => 
                `flex flex-col items-center justify-center w-full ${
                  isActive ? 'text-pink-500' : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <User size={24} />
              <span className="text-xs mt-1">Profile</span>
            </NavLink>
          </div>
        </div>
      </nav>
      
      {/* Bottom padding to account for fixed navigation */}
      <div className="h-16"></div>
    </div>
  );
};

export default Dashboard;
