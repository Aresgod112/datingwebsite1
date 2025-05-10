export type User = {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  photos: string[];
  gender: 'male' | 'female' | 'non-binary' | 'other';
  lookingFor: ('male' | 'female' | 'non-binary' | 'other')[];
  lastActive: Date;
  email?: string;
};

export type Match = {
  id: string;
  userId: string;
  matchedUserId: string;
  compatibility: number;
  createdAt: Date;
  lastInteraction: Date;
};

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
