import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,         // Firebase auth user
  profile: null,      // Firestore user profile
  isLoggedIn: false,
  loading: true,
  
  setAuthUser: (user) => set({ user, isLoggedIn: !!user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  
  logout: () => set({ user: null, profile: null, isLoggedIn: false }),
}));
