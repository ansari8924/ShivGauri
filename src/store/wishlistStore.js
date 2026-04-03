import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [], // Array of product/item objects

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.items.some((i) => i.id === product.id);
          if (exists) {
            return { items: state.items.filter((i) => i.id !== product.id) };
          } else {
            return { items: [...state.items, product] };
          }
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId)
        }));
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (productId) => {
        return get().items.some((i) => i.id === productId);
      },
      
      getWishlistCount: () => {
        return get().items.length;
      }
    }),
    {
      name: 'sgs-wishlist-storage',
    }
  )
);
