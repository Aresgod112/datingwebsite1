import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { 
  Heart, 
  MessageSquare, 
  User, 
  LogOut, 
  Search,
  Users
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Heart className="h-8 w-8 text-pink-500" fill="#ec4899" />
                <span className="ml-2 text-xl font-bold text-gray-900">HeartLink</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar navigation */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <nav className="flex flex-col">
                <NavLink
                  to="/dashboard/discover"
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive 
                        ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-500' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Search className="h-5 w-5 mr-3" />
                  Discover
                </NavLink>
                <NavLink
                  to="/dashboard/matches"
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive 
                        ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-500' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Users className="h-5 w-5 mr-3" />
                  Matches
                </NavLink>
                <NavLink
                  to="/dashboard/messages"
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive || location.pathname.includes('/dashboard/messages/') 
                        ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-500' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  Messages
                </NavLink>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm font-medium ${
                      isActive 
                        ? 'bg-pink-50 text-pink-700 border-l-4 border-pink-500' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </NavLink>
              </nav>
            </div>
          </div>
          
          {/* Page content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
