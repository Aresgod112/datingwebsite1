import { create } from "zustand";
import { Match, User } from "../types";
import { users } from "../data/users";

type MatchState = {
  matches: Match[];
  potentialMatches: User[];
  fetchMatches: () => Promise<void>;
  fetchPotentialMatches: () => Promise<void>;
  likeUser: (userId: string) => Promise<Match | null>;
  passUser: (userId: string) => Promise<void>;
};

// Mock data for matches
const mockMatches: Match[] = [
  {
    id: 'match1',
    userId: 'current-user',
    matchedUserId: 'user1',
    compatibility: 85,
    createdAt: new Date(Date.now() - 604800000), // 1 week ago
    lastInteraction: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: 'match2',
    userId: 'current-user',
    matchedUserId: 'user2',
    compatibility: 92,
    createdAt: new Date(Date.now() - 1209600000), // 2 weeks ago
    lastInteraction: new Date(Date.now() - 172800000), // 2 days ago
  },
  {
    id: 'match3',
    userId: 'current-user',
    matchedUserId: 'user3',
    compatibility: 78,
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    lastInteraction: new Date(Date.now() - 43200000), // 12 hours ago
  },
];

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  potentialMatches: [],
  
  fetchMatches: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ matches: mockMatches });
  },
  
  fetchPotentialMatches: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter out users that are already matched
    const matchedUserIds = get().matches.map(match => match.matchedUserId);
    const potential = users.filter(user => !matchedUserIds.includes(user.id));
    
    set({ potentialMatches: potential });
  },
  
  likeUser: async (userId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate a match (in a real app, this would be determined by the server)
    const isMatch = Math.random() > 0.3; // 70% chance of matching
    
    if (isMatch) {
      const newMatch: Match = {
        id: `match${Date.now()}`,
        userId: 'current-user',
        matchedUserId: userId,
        compatibility: Math.floor(Math.random() * 30) + 70, // Random between 70-99
        createdAt: new Date(),
        lastInteraction: new Date(),
      };
      
      set({ matches: [...get().matches, newMatch] });
      
      // Remove the matched user from potential matches
      set({
        potentialMatches: get().potentialMatches.filter(user => user.id !== userId)
      });
      
      return newMatch;
    }
    
    // If no match, just remove from potential matches
    set({
      potentialMatches: get().potentialMatches.filter(user => user.id !== userId)
    });
    
    return null;
  },
  
  passUser: async (userId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove the passed user from potential matches
    set({
      potentialMatches: get().potentialMatches.filter(user => user.id !== userId)
    });
  },
}));
