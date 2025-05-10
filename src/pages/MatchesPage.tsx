import React, { useEffect, useState } from 'react';
import { useMatchStore } from '../store/matchStore';
import { getUserById } from '../data/users';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MatchesPage: React.FC = () => {
  const { matches, fetchMatches } = useMatchStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadMatches = async () => {
      await fetchMatches();
      setLoading(false);
    };
    
    loadMatches();
  }, [fetchMatches]);
  
  const handleMessageClick = (userId: string) => {
    // In a real app, you would find or create a conversation with this user
    // For now, we'll just navigate to the messages page
    navigate('/dashboard/messages');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="bg-pink-100 rounded-full p-4 mb-4">
          <MessageSquare className="h-12 w-12 text-pink-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No matches yet</h3>
        <p className="text-gray-600 max-w-md">
          Start discovering new people to find your matches!
        </p>
      </div>
    );
  }
  
  // Sort matches by compatibility (highest first)
  const sortedMatches = [...matches].sort((a, b) => b.compatibility - a.compatibility);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedMatches.map(match => {
          const matchedUser = getUserById(match.matchedUserId);
          if (!matchedUser) return null;
          
          return (
            <div key={match.id} className="bg-white rounded-lg shadow overflow-hidden flex">
              <div className="w-1/3">
                <img 
                  src={matchedUser.photos[0]} 
                  alt={matchedUser.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{matchedUser.name}, {matchedUser.age}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      {match.compatibility}% Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{matchedUser.location}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{matchedUser.bio}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Matched {formatDistanceToNow(new Date(match.createdAt), { addSuffix: true })}
                  </span>
                  <button
                    onClick={() => handleMessageClick(matchedUser.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
                  >
                    <MessageSquare className="h-3.5 w-3.5 mr-1" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchesPage;
