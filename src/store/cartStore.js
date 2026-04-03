import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(i => i.variantId === item.variantId && i.sku === item.sku);
          if (existingItem) {
            return {
              items: state.items.map(i => 
                (i.variantId === item.variantId && i.sku === item.sku) 
                  ? { ...i, quantity: i.quantity + item.quantity } 
                  : i
              )
            };
          }
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (sku, variantId) => {
        set((state) => ({
          items: state.items.filter(i => !(i.sku === sku && i.variantId === variantId))
        }));
      },
      
      updateQuantity: (sku, variantId, quantity) => {
        set((state) => ({
          items: state.items.map(i => 
            (i.sku === sku && i.variantId === variantId) ? { ...i, quantity } : i
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'sgs-cart-storage',
    }
  )
);
