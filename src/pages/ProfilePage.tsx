import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import PhotoUploader from '../components/PhotoUploader';
import PhotoGallery from '../components/PhotoGallery';
import { Save, Edit, Camera } from 'lucide-react';
import { format } from 'date-fns';

const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    interests: '',
    gender: '',
    lookingFor: [] as string[],
    sexualPreference: '',
  });
  const [photos, setPhotos] = useState<string[]>([]);
  
  // Initialize form data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        interests: currentUser.interests?.join(', ') || '',
        gender: currentUser.gender || '',
        lookingFor: currentUser.lookingFor || [],
        sexualPreference: currentUser.sexualPreference || '',
      });
      setPhotos(currentUser.photos || []);
    }
  }, [currentUser]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLookingForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      lookingFor: checked 
        ? [...prev.lookingFor, value] 
        : prev.lookingFor.filter(item => item !== value)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Convert interests string back to array
      const interests = formData.interests
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');
      
      // In a real app, you would call an API to update the profile
      // For demo purposes, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the profile in the store
      if (updateProfile) {
        updateProfile({
          ...currentUser,
          name: formData.name,
          bio: formData.bio,
          location: formData.location,
          interests,
          gender: formData.gender as any,
          lookingFor: formData.lookingFor as any[],
          sexualPreference: formData.sexualPreference as any,
          photos,
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setShowGallery(true);
  };
  
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
            <button
              onClick={() => isEditing ? handleSubmit(new Event('submit') as any) : setIsEditing(true)}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <Save size={16} className="mr-2" />
                  Save
                </>
              ) : (
                <>
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile photo section */}
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Photos</h3>
                {isEditing ? (
                  <PhotoUploader
                    initialPhotos={photos}
                    onPhotosChange={setPhotos}
                    maxPhotos={6}
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {photos.length > 0 ? (
                      photos.map((photo, index) => (
                        <div 
                          key={index} 
                          className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
                          onClick={() => openGallery(index)}
                        >
                          <img 
                            src={photo} 
                            alt={`Profile photo ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center">
                          No photos added yet
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Profile details section */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.location}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    About Me
                  </label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.bio}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                    Interests (comma separated)
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {currentUser.interests.length > 0 ? (
                        currentUser.interests.map((interest, index) => (
                          <span 
                            key={index} 
                            className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No interests added yet</p>
                      )}
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <>
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="sexualPreference" className="block text-sm font-medium text-gray-700 mb-1">
                        Sexual Preference
                      </label>
                      <select
                        id="sexualPreference"
                        name="sexualPreference"
                        value={formData.sexualPreference}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      >
                        <option value="">Select sexual preference</option>
                        <option value="straight">Straight</option>
                        <option value="gay">Gay</option>
                        <option value="lesbian">Lesbian</option>
                        <option value="bisexual">Bisexual</option>
                        <option value="pansexual">Pansexual</option>
                        <option value="asexual">Asexual</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <span className="block text-sm font-medium text-gray-700 mb-1">
                        Looking for
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="looking-for-male"
                            name="lookingFor"
                            type="checkbox"
                            value="male"
                            checked={formData.lookingFor.includes('male')}
                            onChange={handleLookingForChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                          />
                          <label htmlFor="looking-for-male" className="ml-2 block text-sm text-gray-700">
                            Male
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="looking-for-female"
                            name="lookingFor"
                            type="checkbox"
                            value="female"
                            checked={formData.lookingFor.includes('female')}
                            onChange={handleLookingForChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                          />
                          <label htmlFor="looking-for-female" className="ml-2 block text-sm text-gray-700">
                            Female
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="looking-for-non-binary"
                            name="lookingFor"
                            type="checkbox"
                            value="non-binary"
                            checked={formData.lookingFor.includes('non-binary')}
                            onChange={handleLookingForChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                          />
                          <label htmlFor="looking-for-non-binary" className="ml-2 block text-sm text-gray-700">
                            Non-binary
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="looking-for-other"
                            name="lookingFor"
                            type="checkbox"
                            value="other"
                            checked={formData.lookingFor.includes('other')}
                            onChange={handleLookingForChange}
                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                          />
                          <label htmlFor="looking-for-other" className="ml-2 block text-sm text-gray-700">
                            Other
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {!isEditing && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Gender</h3>
                      <p className="text-gray-900 capitalize">{currentUser.gender}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Sexual Preference</h3>
                      <p className="text-gray-900 capitalize">
                        {currentUser.sexualPreference || 'Not specified'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-1">Looking for</h3>
                      {currentUser.lookingFor.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {currentUser.lookingFor.map((preference, index) => (
                            <span 
                              key={index} 
                              className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full capitalize"
                            >
                              {preference}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">Not specified</p>
                      )}
                    </div>
                  </>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Account Information</h3>
                  <p className="text-gray-900">Email: {currentUser.email}</p>
                  <p className="text-gray-900">Member since: {format(new Date(), 'MMMM yyyy')}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Photo gallery modal */}
      {showGallery && (
        <PhotoGallery
          photos={photos}
          initialIndex={galleryIndex}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
