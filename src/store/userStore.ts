import { create } from "zustand";
import { currentUser } from "../data/users";
import { User } from "../types";

type UserState = {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedUser: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: async (email, password) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
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
  },
  
  updateProfile: (updatedUser) => {
    set({ currentUser: updatedUser });
  }
}));
