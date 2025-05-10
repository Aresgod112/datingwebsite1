import { useState } from "react";
import { Heart, X, MessageCircle, Star } from "lucide-react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Your Matches - Heartlink" },
    { name: "description", content: "View and interact with your matches on Heartlink." },
  ];
};

// Mock data for matches
const MATCHES = [
  {
    id: "1",
    name: "Emma Wilson",
    age: 28,
    location: "New York, NY",
    bio: "Passionate about art, travel, and good coffee. Looking for someone who enjoys deep conversations and spontaneous adventures.",
    compatibility: 92,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    interests: ["Art", "Travel", "Coffee", "Reading"]
  },
  {
    id: "2",
    name: "Michael Chen",
    age: 31,
    location: "San Francisco, CA",
    bio: "Tech enthusiast and weekend hiker. I love trying new restaurants and am looking for someone to share these experiences with.",
    compatibility: 87,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    interests: ["Hiking", "Technology", "Food", "Photography"]
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    age: 26,
    location: "Chicago, IL",
    bio: "Yoga instructor and plant mom. I believe in living mindfully and finding joy in the simple things.",
    compatibility: 85,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    interests: ["Yoga", "Plants", "Meditation", "Cooking"]
  },
  {
    id: "4",
    name: "James Taylor",
    age: 30,
    location: "Austin, TX",
    bio: "Musician and dog lover. Looking for someone to share my passion for live music and outdoor adventures.",
    compatibility: 81,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    interests: ["Music", "Dogs", "Outdoors", "Concerts"]
  }
];

export default function Matches() {
  const [matches, setMatches] = useState(MATCHES);
  
  const removeMatch = (id: string) => {
    setMatches(matches.filter(match => match.id !== id));
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700">Your recent matches</h2>
        <p className="text-gray-500">Connect with people who share your interests</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {matches.map((match) => (
          <div key={match.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 transition-all hover:shadow-md">
            <div className="relative">
              <img 
                src={match.photo} 
                alt={match.name} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-pink-600 flex items-center">
                <Heart className="w-4 h-4 mr-1 fill-pink-500 text-pink-500" />
                {match.compatibility}% Match
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{match.name}, {match.age}</h3>
                  <p className="text-gray-500 text-sm">{match.location}</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{match.bio}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {match.interests.map((interest, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => removeMatch(match.id)}
                  className="flex-1 flex items-center justify-center py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Pass
                </button>
                
                <Link
                  to={`/dashboard/messages/${match.id}`}
                  className="flex-1 flex items-center justify-center py-2 bg-pink-600 rounded-lg text-white text-sm font-medium hover:bg-pink-700"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Message
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {matches.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center p-4 bg-pink-100 rounded-full mb-4">
            <Star className="h-8 w-8 text-pink-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No matches yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Head over to the Discover section to find potential matches and start connecting!
          </p>
          <Link
            to="/dashboard/discover"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
          >
            Discover People
          </Link>
        </div>
      )}
    </div>
  );
}
