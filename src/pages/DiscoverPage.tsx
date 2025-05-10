import React, { useEffect, useState } from 'react';
import { useMatchStore } from '../store/matchStore';
import { getUserById } from '../data/users';
import { Heart, X, MessageSquare } from 'lucide-react';

const DiscoverPage: React.FC = () => {
  const { potentialMatches, fetchPotentialMatches, likeUser, passUser } = useMatchStore();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState<string | null>(null);
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  useEffect(() => {
    const loadMatches = async () => {
      await fetchPotentialMatches();
      setLoading(false);
    };
    
    loadMatches();
  }, [fetchPotentialMatches]);
  
  const handleLike = async () => {
    if (currentIndex >= potentialMatches.length) return;
    
    setSwipeDirection('right');
    setSwiping(true);
    
    const userId = potentialMatches[currentIndex].id;
    const match = await likeUser(userId);
    
    if (match) {
      setMatchedUser(userId);
      setMatchPercentage(match.compatibility);
      setTimeout(() => {
        setShowMatch(true);
      }, 500);
    } else {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setSwiping(false);
        setSwipeDirection(null);
      }, 500);
    }
  };
  
  const handlePass = async () => {
    if (currentIndex >= potentialMatches.length) return;
    
    setSwipeDirection('left');
    setSwiping(true);
    
    const userId = potentialMatches[currentIndex].id;
    await passUser(userId);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwiping(false);
      setSwipeDirection(null);
    }, 500);
  };
  
  const handleCloseMatch = () => {
    setShowMatch(false);
    setCurrentIndex(prev => prev + 1);
    setSwiping(false);
    setSwipeDirection(null);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (potentialMatches.length === 0 || currentIndex >= potentialMatches.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="bg-pink-100 rounded-full p-4 mb-4">
          <Heart className="h-12 w-12 text-pink-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No more profiles to show</h3>
        <p className="text-gray-600 max-w-md">
          We've run out of potential matches for now. Check back later for new people!
        </p>
      </div>
    );
  }
  
  const currentUser = potentialMatches[currentIndex];
  
  return (
    <div className="max-w-md mx-auto">
      {/* Match modal */}
      {showMatch && matchedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center">
                <Heart className="h-10 w-10 text-pink-500" fill="#ec4899" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">It's a Match!</h2>
            <p className="text-gray-600 mb-4">
              You and {getUserById(matchedUser)?.name} have a {matchPercentage}% compatibility match!
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleCloseMatch}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none"
              >
                Keep Browsing
              </button>
              <button
                onClick={handleCloseMatch}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none"
              >
                <div className="flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile card */}
      <div 
        className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-500 ${
          swiping 
            ? swipeDirection === 'left' 
              ? 'transform -translate-x-full opacity-0' 
              : 'transform translate-x-full opacity-0'
            : ''
        }`}
      >
        {/* Profile images */}
        <div className="relative aspect-[3/4] bg-gray-200">
          <img 
            src={currentUser.photos[0]} 
            alt={currentUser.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-white text-2xl font-bold">{currentUser.name}, {currentUser.age}</h2>
            <p className="text-white text-sm opacity-90">{currentUser.location}</p>
          </div>
        </div>
        
        {/* Profile details */}
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-1">About</h3>
            <p className="text-gray-700">{currentUser.bio}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.interests.map((interest, index) => (
                <span 
                  key={index} 
                  className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-1">Gender</h3>
            <p className="text-gray-700 capitalize">{currentUser.gender}</p>
          </div>
          
          {currentUser.sexualPreference && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-1">Sexual Preference</h3>
              <p className="text-gray-700 capitalize">{currentUser.sexualPreference}</p>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-center p-4 border-t border-gray-200">
          <button
            onClick={handlePass}
            className="mr-4 w-16 h-16 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none"
            aria-label="Pass"
          >
            <X className="h-8 w-8 text-gray-500" />
          </button>
          <button
            onClick={handleLike}
            className="w-16 h-16 flex items-center justify-center bg-pink-500 rounded-full shadow-sm hover:bg-pink-600 focus:outline-none"
            aria-label="Like"
          >
            <Heart className="h-8 w-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
