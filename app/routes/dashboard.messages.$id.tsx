import { useState } from "react";
import { useParams, Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Conversation - Heartlink" },
    { name: "description", content: "Your conversation on Heartlink" },
  ];
};

// Mock data for messages
const MOCK_CONVERSATIONS = {
  "1": {
    id: 1,
    name: "Alex Johnson",
    online: true,
    messages: [
      { id: 1, sender: "them", text: "Hey there! How are you doing today?", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Hi Alex! I'm doing great, thanks for asking. How about you?", time: "10:32 AM" },
      { id: 3, sender: "them", text: "I'm pretty good! Just finished a morning run and feeling energized.", time: "10:35 AM" },
      { id: 4, sender: "them", text: "I noticed we both like hiking. Do you have any favorite trails?", time: "10:36 AM" },
      { id: 5, sender: "me", text: "That's awesome! Yes, I love hiking. My favorite trail is the Ridge Mountain path just outside the city. The views are incredible!", time: "10:40 AM" },
      { id: 6, sender: "them", text: "I've heard about that one but haven't tried it yet. Would you be interested in checking it out together sometime?", time: "10:42 AM" },
    ]
  },
  "2": {
    id: 2,
    name: "Jamie Smith",
    online: true,
    messages: [
      { id: 1, sender: "them", text: "Hi there! I really enjoyed looking through your profile.", time: "Yesterday" },
      { id: 2, sender: "me", text: "Thanks Jamie! I thought yours was interesting too. I see you're into photography?", time: "Yesterday" },
      { id: 3, sender: "them", text: "Yes! It's been my passion for years. I mostly do landscape and street photography.", time: "Yesterday" },
      { id: 4, sender: "me", text: "That's really cool. I'd love to see some of your work sometime.", time: "Yesterday" },
      { id: 5, sender: "them", text: "I'd be happy to show you! Would you like to meet for coffee sometime?", time: "2 hours ago" },
    ]
  },
};

export default function ConversationDetail() {
  const params = useParams();
  const conversationId = params.id;
  const [newMessage, setNewMessage] = useState("");
  
  // In a real app, you would fetch the conversation data from the server
  const conversation = conversationId ? MOCK_CONVERSATIONS[conversationId as keyof typeof MOCK_CONVERSATIONS] : null;
  
  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">Conversation not found</p>
          <Link to="/dashboard/messages" className="text-purple-600 hover:text-purple-800 mt-2 inline-block">
            Back to messages
          </Link>
        </div>
      </div>
    );
  }
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    
    // In a real app, you would send the message to the server
    // For now, we'll just clear the input
    setNewMessage("");
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <Link to="/dashboard/messages" className="md:hidden mr-3 text-gray-500">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
            {conversation.online && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
            )}
          </div>
          
          <div>
            <h2 className="text-sm font-medium text-gray-900">{conversation.name}</h2>
            <p className="text-xs text-gray-500">
              {conversation.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        
        <div className="ml-auto flex space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                message.sender === 'me' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <p 
                className={`text-xs mt-1 text-right ${
                  message.sender === 'me' ? 'text-purple-200' : 'text-gray-500'
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <button 
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          
          <button 
            type="submit"
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            disabled={newMessage.trim() === ""}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
