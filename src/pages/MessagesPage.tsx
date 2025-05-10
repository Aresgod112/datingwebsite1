import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMessageStore } from '../store/messageStore';
import { getUserById } from '../data/users';
import { formatDistanceToNow } from 'date-fns';
import { Send, ArrowLeft } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    conversations, 
    messages, 
    activeConversation,
    fetchConversations, 
    fetchMessages,
    sendMessage,
    setActiveConversation
  } = useMessageStore();
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadConversations = async () => {
      await fetchConversations();
      setLoading(false);
    };
    
    loadConversations();
  }, [fetchConversations]);
  
  useEffect(() => {
    if (id && id !== activeConversation) {
      fetchMessages(id);
    }
  }, [id, activeConversation, fetchMessages]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConversation || !newMessage.trim() || sending) return;
    
    setSending(true);
    await sendMessage(activeConversation, newMessage.trim());
    setNewMessage('');
    setSending(false);
  };
  
  const handleConversationClick = (conversationId: string) => {
    navigate(`/dashboard/messages/${conversationId}`);
  };
  
  const handleBackClick = () => {
    setActiveConversation(null);
    navigate('/dashboard/messages');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="bg-pink-100 rounded-full p-4 mb-4">
          <Send className="h-12 w-12 text-pink-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No messages yet</h3>
        <p className="text-gray-600 max-w-md">
          When you match with someone, you can start a conversation here!
        </p>
      </div>
    );
  }
  
  // If a conversation is active, show the chat view
  if (activeConversation) {
    const conversation = conversations.find(c => c.id === activeConversation);
    if (!conversation) return null;
    
    const otherUserId = conversation.participants.find(p => p !== 'current-user') || '';
    const otherUser = getUserById(otherUserId);
    if (!otherUser) return null;
    
    return (
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Chat header */}
        <div className="bg-white p-4 border-b flex items-center">
          <button 
            onClick={handleBackClick}
            className="mr-3 md:hidden"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              src={otherUser.photos[0]} 
              alt={otherUser.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{otherUser.name}</h3>
            <p className="text-xs text-gray-500">
              {otherUser.lastActive ? (
                `Last active ${formatDistanceToNow(new Date(otherUser.lastActive), { addSuffix: true })}`
              ) : 'Offline'}
            </p>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(message => {
            const isCurrentUser = message.senderId === 'current-user';
            return (
              <div 
                key={message.id} 
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    isCurrentUser 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${isCurrentUser ? 'text-pink-100' : 'text-gray-500'}`}>
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <div className="bg-white p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="bg-pink-500 text-white rounded-r-md px-4 py-2 hover:bg-pink-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  // Otherwise, show the conversation list
  return (
    <div className="space-y-4">
      {conversations.map(conversation => {
        const otherUserId = conversation.participants.find(p => p !== 'current-user') || '';
        const otherUser = getUserById(otherUserId);
        if (!otherUser) return null;
        
        // Get the last message for this conversation
        const lastMessage = messages.length > 0 && activeConversation === conversation.id
          ? messages[messages.length - 1]
          : null;
        
        return (
          <div 
            key={conversation.id} 
            onClick={() => handleConversationClick(conversation.id)}
            className="bg-white rounded-lg shadow p-4 flex items-center cursor-pointer hover:bg-gray-50"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src={otherUser.photos[0]} 
                  alt={otherUser.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {conversation.unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-gray-900 truncate">{otherUser.name}</h3>
                <span className="text-xs text-gray-500">
                  {lastMessage 
                    ? formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })
                    : formatDistanceToNow(new Date(otherUser.lastActive), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {lastMessage 
                  ? `${lastMessage.senderId === 'current-user' ? 'You: ' : ''}${lastMessage.content}`
                  : 'Start a conversation'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesPage;
