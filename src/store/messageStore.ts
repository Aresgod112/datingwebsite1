import { create } from "zustand";
import { sub } from "date-fns";

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
};

export type Conversation = {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
};

type MessageState = {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversation: string | null;
  loading: boolean;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  setActiveConversation: (conversationId: string | null) => void;
  markAsRead: (conversationId: string) => void;
};

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: [],
  messages: {},
  activeConversation: null,
  loading: false,
  
  fetchConversations: async () => {
    set({ loading: true });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
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
            unreadCount: 5,
          },
          {
            id: 'conv4',
            participants: ['current-user', 'user4'],
            unreadCount: 1,
          },
        ];
        
        set({ conversations: mockConversations, loading: false });
        resolve();
      }, 800);
    });
  },
  
  fetchMessages: async (conversationId) => {
    set({ loading: true });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const otherUserId = get().conversations.find(c => c.id === conversationId)?.participants.find(p => p !== 'current-user') || '';
        
        const mockMessages: Message[] = [
          {
            id: '1',
            conversationId,
            senderId: 'current-user',
            receiverId: otherUserId,
            content: 'Hey there! How are you doing?',
            timestamp: sub(new Date(), { days: 2, hours: 3 }),
            read: true,
          },
          {
            id: '2',
            conversationId,
            senderId: otherUserId,
            receiverId: 'current-user',
            content: 'I\'m good, thanks for asking! How about you?',
            timestamp: sub(new Date(), { days: 2, hours: 2 }),
            read: true,
          },
          {
            id: '3',
            conversationId,
            senderId: 'current-user',
            receiverId: otherUserId,
            content: 'Doing well! Just checking out this new app.',
            timestamp: sub(new Date(), { days: 1, hours: 12 }),
            read: true,
          },
          {
            id: '4',
            conversationId,
            senderId: otherUserId,
            receiverId: 'current-user',
            content: 'That\'s great! I\'ve been using it for a while now and really like it.',
            timestamp: sub(new Date(), { days: 1, hours: 11 }),
            read: true,
          },
          {
            id: '5',
            conversationId,
            senderId: 'current-user',
            receiverId: otherUserId,
            content: 'Have you met anyone interesting on here?',
            timestamp: sub(new Date(), { hours: 5 }),
            read: true,
          },
          {
            id: '6',
            conversationId,
            senderId: otherUserId,
            receiverId: 'current-user',
            content: 'A few people! The matching algorithm seems pretty good.',
            timestamp: sub(new Date(), { hours: 4 }),
            read: false,
          },
          {
            id: '7',
            conversationId,
            senderId: otherUserId,
            receiverId: 'current-user',
            content: 'Would you like to meet up sometime?',
            timestamp: sub(new Date(), { hours: 1 }),
            read: false,
          },
        ];
        
        set(state => ({
          messages: { ...state.messages, [conversationId]: mockMessages },
          loading: false
        }));
        
        resolve();
      }, 800);
    });
  },
  
  sendMessage: async (conversationId, content) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const otherUserId = get().conversations.find(c => c.id === conversationId)?.participants.find(p => p !== 'current-user') || '';
        
        const newMessage: Message = {
          id: Math.random().toString(36).substring(7),
          conversationId,
          senderId: 'current-user',
          receiverId: otherUserId,
          content,
          timestamp: new Date(),
          read: false,
        };
        
        set(state => ({
          messages: {
            ...state.messages,
            [conversationId]: [...(state.messages[conversationId] || []), newMessage]
          }
        }));
        
        resolve();
      }, 300);
    });
  },
  
  setActiveConversation: (conversationId) => {
    set({ activeConversation: conversationId });
    
    if (conversationId) {
      get().markAsRead(conversationId);
    }
  },
  
  markAsRead: (conversationId) => {
    set(state => ({
      conversations: state.conversations.map(conv => 
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      ),
      messages: {
        ...state.messages,
        [conversationId]: (state.messages[conversationId] || []).map(msg => 
          msg.receiverId === 'current-user' ? { ...msg, read: true } : msg
        )
      }
    }));
  }
}));
