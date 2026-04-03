import { create } from 'zustand';

export const useUIStore = create((set) => ({
  cartOpen: false,
  searchOpen: false,
  filterOpen: false,
  toasts: [],
  
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  
  openFilter: () => set({ filterOpen: true }),
  closeFilter: () => set({ filterOpen: false }),
  
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { id: Date.now(), ...toast }],
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id),
  })),
}));
