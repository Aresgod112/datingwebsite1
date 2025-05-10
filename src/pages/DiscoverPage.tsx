import React, { useState, useEffect } from 'react';
import { Heart, X, MessageSquare } from 'lucide-react';
import { users } from '../data/users';
import { useMatchStore } from '../store/matchStore';
import PhotoGallery from '../components/PhotoGallery';

const DiscoverPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { likeUser, passUser } = useMatchStore();
  
  const currentUser = users[currentIndex];
  
  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    await likeUser(currentUser.id);
    setIsLoading(false);
    
    // Move to next user
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePass = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    await passUser(currentUser.id);
    setIsLoading(false);
    
    // Move to next user
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setShowGallery(true);
  };
  
  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <div className="bg-pink-100 rounded-full p-4 inline-block mb-4">
          <Heart className="h-12 w-12 text-pink-500" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No more profiles to discover</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          You've seen all available profiles for now. Check back later for new matches!
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-lg mx-auto">
      {/* Main card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Photos */}
        <div className="relative h-96">
          <img 
            src={currentUser.photos[0]} 
            alt={currentUser.name} 
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openGallery(0)}
          />
          
          {/* Photo indicators */}
          {currentUser.photos.length > 1 && (
            <div className="absolute top-4 left-0 right-0 flex justify-center space-x-1">
              {currentUser.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => openGallery(index)}
                  className="w-2 h-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-opacity"
                />
              ))}
            </div>
          )}
          
          {/* User info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-2xl font-bold text-white">{currentUser.name}, {currentUser.age}</h2>
            <p className="text-white text-opacity-90">{currentUser.location}</p>
          </div>
        </div>
        
        {/* User details */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">About me</h3>
          <p className="text-gray-600 mb-4">{currentUser.bio}</p>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {currentUser.interests.map((interest, index) => (
              <span 
                key={index} 
                className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handlePass}
              disabled={isLoading}
              className="flex items-center justify-center w-14 h-14 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <X size={24} className="text-gray-500" />
            </button>
            
            <button
              onClick={handleLike}
              disabled={isLoading}
              className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full shadow-sm hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <Heart size={24} className="text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Photo gallery modal */}
      {showGallery && (
        <PhotoGallery
          photos={currentUser.photos}
          initialIndex={galleryIndex}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};

export default DiscoverPage;
