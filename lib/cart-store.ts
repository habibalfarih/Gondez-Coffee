"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, MenuItem, MenuItemSize } from "@/types"

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: MenuItem, size: MenuItemSize, quantity: number) => void
  removeItem: (itemId: string, size: MenuItemSize) => void
  updateQuantity: (itemId: string, size: MenuItemSize, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item, size, quantity) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.item.id === item.id && i.size === size)

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.item.id === item.id && i.size === size ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            }
          }

          return {
            items: [...state.items, { item, size, quantity }],
          }
        })
      },

      removeItem: (itemId, size) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.item.id === itemId && i.size === size)),
        }))
      },

      updateQuantity: (itemId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId, size)
          return
        }

        set((state) => ({
          items: state.items.map((i) => (i.item.id === itemId && i.size === size ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.item.prices[item.size] * item.quantity, 0)
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "gondez-cart-storage",
    },
  ),
)
