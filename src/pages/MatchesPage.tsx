import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Heart } from 'lucide-react';
import { useMatchStore } from '../store/matchStore';
import { getUserById } from '../data/users';

const MatchesPage: React.FC = () => {
  const { matches, loading, fetchMatches } = useMatchStore();
  const navigate = useNavigate();
  const [loadingUsers, setLoadingUsers] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      await fetchMatches();
      setLoadingUsers(false);
    };
    
    loadData();
  }, [fetchMatches]);
  
  const navigateToMessages = (userId: string) => {
    // Find or create conversation ID
    const conversationId = `conv${userId.split('-')[1]}`;
    navigate(`/dashboard/messages/${conversationId}`);
  };
  
  if (loading || loadingUsers) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-16 w-16 text-pink-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No matches yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Head over to the Discover tab to find potential matches and start connecting with people.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => {
          const user = getUserById(match.matchedUserId);
          if (!user) return null;
          
          return (
            <div key={match.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-64">
                <img 
                  src={user.photos[0]} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{user.name}, {user.age}</h3>
                      <p className="text-sm text-gray-200">{user.location}</p>
                    </div>
                    <div className="bg-pink-500 text-white rounded-full px-2 py-1 text-sm font-medium">
                      {match.compatibility}% Match
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{user.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {user.interests.slice(0, 3).map((interest, index) => (
                    <span 
                      key={index} 
                      className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                  {user.interests.length > 3 && (
                    <span className="text-gray-500 text-xs px-2 py-1">
                      +{user.interests.length - 3} more
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => navigateToMessages(user.id)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
                >
                  <MessageSquare size={16} className="mr-2" />
                  Message
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchesPage;
