import { create } from "zustand";
import { Conversation, Message } from "../types";

type MessageState = {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Message[];
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  setActiveConversation: (conversationId: string | null) => void;
};

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: 'conv1',
    participants: ['current-user', 'user1'],
    unreadCount: 2,
  },
  {
    id: 'conv2',
    participants: ['current-user', 'user2'],
    unreadCount: 0,
  },
  {
    id: 'conv3',
    participants: ['current-user', 'user3'],
    unreadCount: 1,
  },
];

// Mock data for messages
const mockMessages: Record<string, Message[]> = {
  conv1: [
    {
      id: 'msg1',
      conversationId: 'conv1',
      senderId: 'user1',
      receiverId: 'current-user',
      content: 'Hey there! I noticed we both like hiking. Have you tried any trails around here?',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
    },
    {
      id: 'msg2',
      conversationId: 'conv1',
      senderId: 'current-user',
      receiverId: 'user1',
      content: 'Hi! Yes, I love the trails at Bear Mountain. Have you been there?',
      timestamp: new Date(Date.now() - 82800000), // 23 hours ago
      read: true,
    },
    {
      id: 'msg3',
      conversationId: 'conv1',
      senderId: 'user1',
      receiverId: 'current-user',
      content: 'Not yet, but I'd love to go sometime! Maybe we could plan a hike?',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
    },
    {
      id: 'msg4',
      conversationId: 'conv1',
      senderId: 'user1',
      receiverId: 'current-user',
      content: 'I'm free this weekend if you're interested!',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      read: false,
    },
  ],
  conv2: [
    {
      id: 'msg5',
      conversationId: 'conv2',
      senderId: 'current-user',
      receiverId: 'user2',
      content: 'I saw you like cooking too. What's your favorite dish to make?',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      read: true,
    },
    {
      id: 'msg6',
      conversationId: 'conv2',
      senderId: 'user2',
      receiverId: 'current-user',
      content: 'I love making homemade pasta! Especially ravioli with a butternut squash filling. What about you?',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      read: true,
    },
  ],
  conv3: [
    {
      id: 'msg7',
      conversationId: 'conv3',
      senderId: 'user3',
      receiverId: 'current-user',
      content: 'Your photography portfolio is amazing! How long have you been taking photos?',
      timestamp: new Date(Date.now() - 43200000), // 12 hours ago
      read: false,
    },
  ],
};

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: [],
  activeConversation: null,
  messages: [],
  
  fetchConversations: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ conversations: mockConversations });
  },
  
  fetchMessages: async (conversationId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const messages = mockMessages[conversationId] || [];
    set({ 
      messages,
      activeConversation: conversationId,
      // Mark messages as read
      conversations: get().conversations.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 } 
          : conv
      )
    });
  },
  
  sendMessage: async (conversationId, content) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      conversationId,
      senderId: 'current-user',
      receiverId: get().conversations.find(c => c.id === conversationId)?.participants.find(p => p !== 'current-user') || '',
      content,
      timestamp: new Date(),
      read: true,
    };
    
    // Add message to the conversation
    const updatedMessages = [...get().messages, newMessage];
    
    // Update the messages in the store
    set({ messages: updatedMessages });
    
    // In a real app, you would send this to an API
    mockMessages[conversationId] = updatedMessages;
  },
  
  setActiveConversation: (conversationId) => {
    set({ activeConversation: conversationId });
  },
}));
