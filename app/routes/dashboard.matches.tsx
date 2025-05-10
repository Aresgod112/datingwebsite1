import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Matches - Heartlink" },
    { name: "description", content: "View your matches on Heartlink" },
  ];
};

// Mock data for matches
const MOCK_MATCHES = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 28,
    location: "New York, NY",
    compatibility: 92,
    lastActive: "Just now",
    hasPremiumContent: true,
    hasUnreadMessages: true
  },
  {
    id: 2,
    name: "Jamie Smith",
    age: 26,
    location: "Los Angeles, CA",
    compatibility: 85,
    lastActive: "2 hours ago",
    hasPremiumContent: true,
    hasUnreadMessages: false
  },
  {
    id: 3,
    name: "Taylor Wilson",
    age: 30,
    location: "Chicago, IL",
    compatibility: 78,
    lastActive: "Yesterday",
    hasPremiumContent: false,
    hasUnreadMessages: false
  },
  {
    id: 4,
    name: "Jordan Lee",
    age: 27,
    location: "Miami, FL",
    compatibility: 75,
    lastActive: "3 days ago",
    hasPremiumContent: true,
    hasUnreadMessages: false
  },
  {
    id: 5,
    name: "Casey Brown",
    age: 29,
    location: "Seattle, WA",
    compatibility: 70,
    lastActive: "1 week ago",
    hasPremiumContent: false,
    hasUnreadMessages: false
  },
];

export default function Matches() {
  const [filter, setFilter] = useState("all");
  
  const filteredMatches = MOCK_MATCHES.filter(match => {
    if (filter === "premium") return match.hasPremiumContent;
    if (filter === "unread") return match.hasUnreadMessages;
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Matches</h2>
          
          <div className="mt-3 sm:mt-0 flex space-x-2">
            <button 
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "all" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("premium")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "premium" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition`}
            >
              Premium Content
            </button>
            <button 
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === "unread" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition`}
            >
              Unread
            </button>
          </div>
        </div>
        
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12">
            <svg className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-700">No matches found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or discover new people</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMatches.map((match) => (
              <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex-shrink-0"></div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-800 truncate">{match.name}, {match.age}</h3>
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                        {match.compatibility}%
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">{match.location}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">Active: {match.lastActive}</span>
                      
                      <div className="flex space-x-2">
                        {match.hasUnreadMessages && (
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          </div>
                        )}
                        
                        {match.hasPremiumContent && (
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        )}
                        
                        <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                    Message
                  </button>
                  <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
