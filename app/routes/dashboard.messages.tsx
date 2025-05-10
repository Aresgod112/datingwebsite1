import { useState } from "react";
import { Link, Outlet, useLocation } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Messages - Heartlink" },
    { name: "description", content: "Your conversations on Heartlink" },
  ];
};

// Mock data for conversations
const MOCK_CONVERSATIONS = [
  {
    id: 1,
    name: "Alex Johnson",
    lastMessage: "Hey, how's it going?",
    timestamp: "Just now",
    unread: true,
    online: true
  },
  {
    id: 2,
    name: "Jamie Smith",
    lastMessage: "Would you like to meet for coffee sometime?",
    timestamp: "2 hours ago",
    unread: false,
    online: true
  },
  {
    id: 3,
    name: "Taylor Wilson",
    lastMessage: "I loved that movie too! What else do you enjoy watching?",
    timestamp: "Yesterday",
    unread: false,
    online: false
  },
  {
    id: 4,
    name: "Jordan Lee",
    lastMessage: "Thanks for the recommendation!",
    timestamp: "3 days ago",
    unread: false,
    online: false
  },
];

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const isConversationOpen = location.pathname !== "/dashboard/messages";
  
  const filteredConversations = MOCK_CONVERSATIONS.filter(
    conversation => conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Conversation list - hide on mobile when a conversation is open */}
      <div className={`${isConversationOpen ? 'hidden md:block' : ''} w-full md:w-80 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No conversations found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredConversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  to={`/dashboard/messages/${conversation.id}`}
                  className="block p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                          {conversation.lastMessage}
                        </p>
                        
                        {conversation.unread && (
                          <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
            New Message
          </button>
        </div>
      </div>
      
      {/* Conversation detail or placeholder */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50 text-center p-8">
        <div>
          <svg className="h-16 w-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-700">Your Messages</h3>
          <p className="mt-2 text-gray-500">Select a conversation to start chatting</p>
        </div>
      </div>
      
      {/* Outlet for conversation detail */}
      <div className={`${isConversationOpen ? 'block' : 'hidden md:block'} flex-1`}>
        <Outlet />
      </div>
    </div>
  );
}
