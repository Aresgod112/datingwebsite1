import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MatchesPage from './pages/MatchesPage';
import DiscoverPage from './pages/DiscoverPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import { useUserStore } from './store/userStore';

// Placeholder component for signup
const Signup = () => <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">Signup Page Coming Soon</div>

// Placeholder component for forgot password
const ForgotPassword = () => <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">Forgot Password Page Coming Soon</div>

// Landing Page Component
const LandingPage = () => {
  const { isAuthenticated } = useUserStore();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard/matches" />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-500" fill="#ec4899" />
            <span className="ml-2 text-2xl font-bold text-gray-800">Heartlink</span>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="px-4 py-2 text-gray-800 hover:text-pink-500 transition-colors">
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Find Your Perfect <span className="text-pink-500">Match</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Heartlink connects you with people who share your interests, values, and lifestyle. 
          Start your journey to meaningful relationships today.
        </p>
        <Link 
          to="/signup" 
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-colors shadow-lg"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-7 w-7 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Meaningful Connections</h3>
            <p className="text-gray-600">
              Our matching algorithm focuses on compatibility beyond just appearances.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Safe Environment</h3>
            <p className="text-gray-600">
              Your privacy and security are our top priorities with verified profiles.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Personalized Experience</h3>
            <p className="text-gray-600">
              Customize your preferences to find exactly what you're looking for.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-pink-500" fill="#ec4899" />
              <span className="ml-2 text-xl font-bold text-gray-800">Heartlink</span>
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Heartlink. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useUserStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  const { login } = useUserStore();
  
  useEffect(() => {
    // Auto-login for demo purposes
    login('demo@example.com', 'password');
  }, [login]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard/matches" replace />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="messages/:id" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;

// Fix missing import
import { Link } from 'react-router-dom';
