import { useState } from "react";
import { Heart, X, Filter, MapPin, Sliders } from "lucide-react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Discover - Heartlink" },
    { name: "description", content: "Discover new people and potential matches on Heartlink." },
  ];
};

// Mock data for potential matches
const POTENTIAL_MATCHES = [
  {
    id: "101",
    name: "Olivia Parker",
    age: 27,
    location: "Boston, MA",
    distance: 5,
    bio: "Bookworm, coffee addict, and aspiring chef. Looking for someone who appreciates quiet evenings and meaningful conversations.",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    interests: ["Reading", "Cooking", "Coffee", "Art"],
    compatibility: 89
  },
  {
    id: "102",
    name: "Ethan Brooks",
    age: 32,
    location: "Seattle, WA",
    distance: 8,
    bio: "Software engineer by day, rock climber by weekend. Seeking someone adventurous who enjoys the outdoors as much as a good Netflix binge.",
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    interests: ["Rock Climbing", "Coding", "Hiking", "Movies"],
    compatibility: 84
  },
  {
    id: "103",
    name: "Isabella Martinez",
    age: 29,
    location: "Miami, FL",
    distance: 3,
    bio: "Dance instructor with a passion for travel. I've visited 20 countries and counting! Looking for someone to share new adventures with.",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    interests: ["Dancing", "Travel", "Languages", "Photography"],
    compatibility: 92
  }
];

export default function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [potentialMatches, setPotentialMatches] = useState(POTENTIAL_MATCHES);
  
  const currentProfile = potentialMatches[currentIndex];
  
  const handleLike = () => {
    // In a real app, you would send this like to the backend
    goToNextProfile();
  };
  
  const handlePass = () => {
    goToNextProfile();
  };
  
  const goToNextProfile = () => {
    if (currentIndex < potentialMatches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset or show "no more profiles" message
      setPotentialMatches([]);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Discover people</h2>
          <p className="text-gray-500">Find your perfect match</p>
        </div>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filter preferences</h3>
            <button 
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age range
              </label>
              <div className="flex items-center space-x-4">
                <input 
                  type="number" 
                  min="18" 
                  max="100" 
                  defaultValue="18" 
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                />
                <span className="text-gray-500">to</span>
                <input 
                  type="number" 
                  min="18" 
                  max="100" 
                  defaultValue="40" 
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance
              </label>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  defaultValue="25" 
                  className="w-full"
                />
                <span className="ml-3 text-gray-700 min-w-[40px]">25 mi</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interested in
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded text-pink-600" defaultChecked />
                  <span className="ml-2 text-gray-700">Men</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded text-pink-600" defaultChecked />
                  <span className="ml-2 text-gray-700">Women</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="rounded text-pink-600" />
                  <span className="ml-2 text-gray-700">Non-binary</span>
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Looking for
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Relationship</option>
                <option>Casual dating</option>
                <option>Friendship</option>
                <option>Not sure yet</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {potentialMatches.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="relative">
            <div className="relative h-[500px] w-full">
              <img 
                src={currentProfile.photos[0]} 
                alt={currentProfile.name} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {currentProfile.location} • {currentProfile.distance} miles away
                    </div>
                  </div>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-pink-600 flex items-center">
                    <Heart className="w-4 h-4 mr-1 fill-pink-500 text-pink-500" />
                    {currentProfile.compatibility}% Match
                  </div>
                </div>
                
                <p className="text-white/90 mb-4">{currentProfile.bio}</p>
                
                <div>
                  <h4 className="text-sm font-medium text-white/90 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {currentProfile.photos.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-white' : 'bg-white/50'}`}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="p-4 flex justify-center space-x-4">
            <button 
              onClick={handlePass}
              className="flex items-center justify-center w-16 h-16 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50"
            >
              <X className="w-8 h-8 text-gray-500" />
            </button>
            
            <button 
              onClick={handleLike}
              className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-sm hover:from-pink-600 hover:to-purple-700"
            >
              <Heart className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="inline-flex items-center justify-center p-4 bg-pink-100 rounded-full mb-4">
            <Sliders className="h-8 w-8 text-pink-500" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No more profiles to show</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We've run out of profiles that match your preferences. Try adjusting your filters or check back later!
          </p>
          <button
            onClick={() => {
              setPotentialMatches(POTENTIAL_MATCHES);
              setCurrentIndex(0);
            }}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
          >
            Refresh Profiles
          </button>
        </div>
      )}
    </div>
  );
}
