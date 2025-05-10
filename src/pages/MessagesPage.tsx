import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMessageStore } from '../store/messageStore';
import { getUserById } from '../data/users';
import { format, isToday, isYesterday } from 'date-fns';
import { ArrowLeft, Send } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    conversations, 
    messages, 
    activeConversation,
    loading,
    fetchConversations,
    fetchMessages,
    sendMessage,
    setActiveConversation
  } = useMessageStore();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);
  
  // Set active conversation and fetch messages when ID changes
  useEffect(() => {
    if (id) {
      setActiveConversation(id);
      fetchMessages(id);
    } else if (activeConversation) {
      setActiveConversation(null);
    }
  }, [id, setActiveConversation, fetchMessages, activeConversation]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeConversation]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConversation || !newMessage.trim()) return;
    
    sendMessage(activeConversation, newMessage.trim());
    setNewMessage('');
  };
  
  const formatMessageTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, h:mm a');
    }
  };
  
  const renderDateSeparator = (date: Date, prevDate?: Date) => {
    if (!prevDate) return true;
    
    const dateStr = format(date, 'yyyy-MM-dd');
    const prevDateStr = format(prevDate, 'yyyy-MM-dd');
    
    return dateStr !== prevDateStr;
  };
  
  const getDateSeparatorText = (date: Date) => {
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  };
  
  if (loading && conversations.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  // Conversation list view
  if (!activeConversation) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Conversations</h2>
        
        {conversations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="bg-pink-100 rounded-full p-4 inline-block mb-4">
              <Send className="h-8 w-8 text-pink-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              When you match with someone, you can start a conversation here.
            </p>
            <Link
              to="/dashboard/matches"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
            >
              Find matches
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {conversations.map((conversation) => {
                const otherUserId = conversation.participants.find(id => id !== 'current-user');
                const user = otherUserId ? getUserById(otherUserId) : undefined;
                
                if (!user) return null;
                
                return (
                  <li key={conversation.id}>
                    <button
                      onClick={() => navigate(`/dashboard/messages/${conversation.id}`)}
                      className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={user.photos[0]} 
                            alt={user.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-1 text-left">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-base font-medium text-gray-900">{user.name}</h3>
                          <span className="text-xs text-gray-500">
                            {user.lastActive && format(user.lastActive, 'MMM d')}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                          {conversation.lastMessage?.content || 'Start a conversation'}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
  // Individual conversation view
  const conversationMessages = messages[activeConversation] || [];
  const conversation = conversations.find(c => c.id === activeConversation);
  const otherUserId = conversation?.participants.find(id => id !== 'current-user');
  const otherUser = otherUserId ? getUserById(otherUserId) : undefined;
  
  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-16rem)]">
      {/* Conversation header */}
      <div className="bg-white rounded-t-lg shadow p-4 flex items-center">
        <button
          onClick={() => navigate('/dashboard/messages')}
          className="mr-2 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        
        {otherUser && (
          <>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={otherUser.photos[0]} 
                alt={otherUser.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">{otherUser.name}</h3>
              <p className="text-xs text-gray-500">
                {otherUser.lastActive && `Last active ${format(otherUser.lastActive, 'MMM d')}`}
              </p>
            </div>
          </>
        )}
      </div>
      
      {/* Messages */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : conversationMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-pink-100 rounded-full p-3 mb-3">
              <Send className="h-6 w-6 text-pink-500" />
            </div>
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversationMessages.map((message, index) => {
              const isCurrentUser = message.senderId === 'current-user';
              const prevMessage = index > 0 ? conversationMessages[index - 1] : undefined;
              const showDateSeparator = prevMessage ? renderDateSeparator(message.timestamp, prevMessage.timestamp) : true;
              
              return (
                <React.Fragment key={message.id}>
                  {showDateSeparator && (
                    <div className="flex justify-center my-4">
                      <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">
                        {getDateSeparatorText(message.timestamp)}
                      </div>
                    </div>
                  )}
                  
                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] ${isCurrentUser ? 'bg-pink-500 text-white' : 'bg-white text-gray-800'} rounded-lg px-4 py-2 shadow`}>
                      <p>{message.content}</p>
                      <div className={`text-xs mt-1 ${isCurrentUser ? 'text-pink-200' : 'text-gray-500'} text-right`}>
                        {formatMessageTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Message input */}
      <div className="bg-white rounded-b-lg shadow p-4">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`bg-pink-500 text-white rounded-r-lg px-4 py-2 ${
              !newMessage.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
            }`}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagesPage;
