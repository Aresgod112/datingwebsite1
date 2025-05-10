import { create } from "zustand";
import { currentUser } from "../data/users";

type UserState = {
  currentUser: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      // Simple timeout without using _onTimeout
      setTimeout(() => {
        if (email && password) {
          set({ currentUser, isAuthenticated: true });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  }
}));
