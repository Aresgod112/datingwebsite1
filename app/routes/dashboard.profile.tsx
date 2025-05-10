import { useState } from "react";
import { Form } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Profile - Heartlink" },
    { name: "description", content: "Manage your Heartlink profile" },
  ];
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Profile header */}
        <div className="relative h-40 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="absolute -bottom-16 left-6 flex items-end">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
              <div className="h-full w-full bg-gray-200"></div>
            </div>
            <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
        
        {/* Profile info */}
        <div className="pt-20 pb-6 px-6">
          <h1 className="text-2xl font-bold text-gray-800">Alex Johnson</h1>
          <p className="text-gray-600">New York, NY • 28 years old</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Hiking
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Photography
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Travel
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              Coffee
            </span>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition">
              + Add more
            </button>
          </div>
        </div>
        
        {/* Profile tabs */}
        <div className="border-t border-gray-200">
          <div className="flex">
            <button 
              onClick={() => setActiveTab("info")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "info" 
                  ? "text-purple-600 border-b-2 border-purple-600" 
                  : "text-gray-500 hover:text-gray-700"
              } transition`}
            >
              Basic Info
            </button>
            <button 
              onClick={() => setActiveTab("photos")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "photos" 
                  ? "text-purple-600 border-b-2 border-purple-600" 
                  : "text-gray-500 hover:text-gray-700"
              } transition`}
            >
              Photos
            </button>
            <button 
              onClick={() => setActiveTab("premium")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "premium" 
                  ? "text-purple-600 border-b-2 border-purple-600" 
                  : "text-gray-500 hover:text-gray-700"
              } transition`}
            >
              Premium Content
            </button>
            <button 
              onClick={() => setActiveTab("preferences")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "preferences" 
                  ? "text-purple-600 border-b-2 border-purple-600" 
                  : "text-gray-500 hover:text-gray-700"
              } transition`}
            >
              Preferences
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === "info" && (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue="Alex Johnson"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue="alex@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  defaultValue="1995-05-15"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  defaultValue="New York, NY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                About Me
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                defaultValue="Adventure seeker and coffee enthusiast. Love hiking and exploring new places."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>
            
            <div>
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Save Changes
              </button>
            </div>
          </Form>
        )}
        
        {activeTab === "photos" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Photos</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button className="p-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="p-1 bg-white/80 backdrop-blur-sm rounded-full text-red-600 hover:bg-white transition">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition cursor-pointer">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="mt-2 text-sm font-medium">Add Photo</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                You can upload up to 9 photos. Photos should be clear and show your face.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === "premium" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Premium Content</h3>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Show premium content badge</span>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Premium content allows you to share exclusive photos that others can unlock for a fee. You'll earn 70% of all revenue from your premium content.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs mt-1">Premium</span>
                  </div>
                  
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button className="p-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="p-1 bg-white/80 backdrop-blur-sm rounded-full text-red-600 hover:bg-white transition">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 hover:border-gray-400 transition cursor-pointer">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="mt-2 text-sm font-medium">Add Premium Photo</span>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Premium Content Earnings</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">This Month</div>
                  <div className="text-xl font-bold text-gray-800">$124.50</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Total Earnings</div>
                  <div className="text-xl font-bold text-gray-800">$1,245.75</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-500">Content Unlocks</div>
                  <div className="text-xl font-bold text-gray-800">37</div>
                </div>
              </div>
              <button className="mt-4 text-purple-700 text-sm font-medium hover:text-purple-800 transition">
                View Earnings Details →
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "preferences" && (
          <Form className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Match Preferences</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="interestedIn" className="block text-sm font-medium text-gray-700 mb-1">
                    I am interested in
                  </label>
                  <select
                    id="interestedIn"
                    name="interestedIn"
                    defaultValue="women"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="everyone">Everyone</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age Range
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      name="minAge"
                      defaultValue="21"
                      min="18"
                      max="100"
                      className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      name="maxAge"
                      defaultValue="35"
                      min="18"
                      max="100"
                      className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distance (miles)
                  </label>
                  <input
                    type="range"
                    name="distance"
                    min="1"
                    max="100"
                    defaultValue="25"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Show my profile in discovery</h4>
                    <p className="text-xs text-gray-500">When disabled, your profile won't be shown to new people</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Show my online status</h4>
                    <p className="text-xs text-gray-500">Others will see when you're active on the app</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Show my distance</h4>
                    <p className="text-xs text-gray-500">Your approximate distance will be visible to others</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Save Preferences
              </button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
