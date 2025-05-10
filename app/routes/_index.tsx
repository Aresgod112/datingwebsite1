import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Heartlink - Find Your Perfect Match" },
    { name: "description", content: "A modern dating app to find your perfect match based on compatibility and shared interests." },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-purple-600">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Heartlink</h1>
          <p className="text-xl text-white mb-12 max-w-2xl">
            Find your perfect match with our intelligent matching algorithm.
            Connect with people who share your interests and values.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition"
            >
              Log In
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white">
              <div className="text-3xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p>Our algorithm finds people who are truly compatible with you based on interests, values, and preferences.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Real Connections</h3>
              <p>Chat with your matches in real-time and get to know them before meeting in person.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
              <p>Unlock exclusive photos and content from profiles you're interested in.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
