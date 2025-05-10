import { create } from "zustand";

type Match = {
  id: string;
  userId: string;
  matchedUserId: string;
  compatibility: number;
  createdAt: Date;
  lastInteraction: Date;
};

type MatchState = {
  matches: Match[];
  loading: boolean;
  fetchMatches: () => Promise<void>;
  likeUser: (userId: string) => Promise<void>;
  passUser: (userId: string) => Promise<void>;
};

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  loading: false,
  
  fetchMatches: async () => {
    set({ loading: true });
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockMatches: Match[] = [
          {
            id: '1',
            userId: 'current-user',
            matchedUserId: 'user1',
            compatibility: 95,
            createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
            lastInteraction: new Date(Date.now() - 3600000), // 1 hour ago
          },
          {
            id: '2',
            userId: 'current-user',
            matchedUserId: 'user2',
            compatibility: 87,
            createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
            lastInteraction: new Date(Date.now() - 86400000), // 1 day ago
          },
          {
            id: '3',
            userId: 'current-user',
            matchedUserId: 'user3',
            compatibility: 78,
            createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
            lastInteraction: new Date(Date.now() - 86400000 * 2), // 2 days ago
          },
          {
            id: '4',
            userId: 'current-user',
            matchedUserId: 'user4',
            compatibility: 92,
            createdAt: new Date(Date.now() - 86400000), // 1 day ago
            lastInteraction: new Date(Date.now() - 1800000), // 30 minutes ago
          },
        ];
        
        set({ matches: mockMatches, loading: false });
        resolve();
      }, 800);
    });
  },
  
  likeUser: async (userId) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newMatch: Match = {
          id: Math.random().toString(36).substring(7),
          userId: 'current-user',
          matchedUserId: userId,
          compatibility: Math.floor(Math.random() * 30) + 70, // 70-99
          createdAt: new Date(),
          lastInteraction: new Date(),
        };
        
        set({ matches: [...get().matches, newMatch] });
        resolve();
      }, 500);
    });
  },
  
  passUser: async (userId) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Just simulate the API call, no state change needed
        resolve();
      }, 500);
    });
  },
}));
