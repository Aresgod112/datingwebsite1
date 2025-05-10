import { Outlet, Link, useLocation } from "@remix-run/react";
import { 
  Heart, 
  MessageCircle, 
  Compass, 
  User, 
  LogOut,
  Search
} from "lucide-react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - Heartlink" },
    { name: "description", content: "Your Heartlink dashboard - find matches, chat with connections, and manage your profile." },
  ];
};

export default function Dashboard() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-center md:justify-start">
          <Heart className="h-8 w-8 text-pink-500" />
          <span className="ml-2 text-xl font-bold text-gray-900 hidden md:block">Heartlink</span>
        </div>
        
        <nav className="flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="px-2 space-y-1">
            <Link
              to="/dashboard"
              className={`flex items-center text-sm px-3 py-3 rounded-lg ${
                isActive("/dashboard")
                  ? "bg-pink-50 text-pink-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Heart className={`h-6 w-6 ${isActive("/dashboard") ? "text-pink-600" : "text-gray-500"}`} />
              <span className="ml-3 hidden md:block">Matches</span>
            </Link>
            
            <Link
              to="/dashboard/discover"
              className={`flex items-center text-sm px-3 py-3 rounded-lg ${
                isActive("/dashboard/discover")
                  ? "bg-pink-50 text-pink-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Compass className={`h-6 w-6 ${isActive("/dashboard/discover") ? "text-pink-600" : "text-gray-500"}`} />
              <span className="ml-3 hidden md:block">Discover</span>
            </Link>
            
            <Link
              to="/dashboard/messages"
              className={`flex items-center text-sm px-3 py-3 rounded-lg ${
                location.pathname.includes("/dashboard/messages")
                  ? "bg-pink-50 text-pink-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MessageCircle className={`h-6 w-6 ${location.pathname.includes("/dashboard/messages") ? "text-pink-600" : "text-gray-500"}`} />
              <span className="ml-3 hidden md:block">Messages</span>
            </Link>
            
            <Link
              to="/dashboard/profile"
              className={`flex items-center text-sm px-3 py-3 rounded-lg ${
                isActive("/dashboard/profile")
                  ? "bg-pink-50 text-pink-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <User className={`h-6 w-6 ${isActive("/dashboard/profile") ? "text-pink-600" : "text-gray-500"}`} />
              <span className="ml-3 hidden md:block">Profile</span>
            </Link>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link
            to="/login"
            className="flex items-center text-sm px-3 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <LogOut className="h-6 w-6 text-gray-500" />
            <span className="ml-3 hidden md:block">Log out</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {location.pathname === "/dashboard" && "Your Matches"}
              {location.pathname === "/dashboard/discover" && "Discover People"}
              {location.pathname.includes("/dashboard/messages") && "Messages"}
              {location.pathname === "/dashboard/profile" && "Your Profile"}
            </h1>
          </div>
          
          <div className="ml-4 flex items-center md:ml-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="py-2 pl-10 pr-4 block w-full border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            
            <div className="ml-3 relative">
              <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
