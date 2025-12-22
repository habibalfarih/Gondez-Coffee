"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

/* =========================
   TYPES
========================= */

export type DrinkType = "ice" | "hot"
export type BeanType = "indonesian" | "brazilian"
export type SizeType = "medium" | "large"

export interface CartItem {
  id: string
  name: string
  image: string

  // coffee only
  drinkType?: DrinkType
  bean?: BeanType

  size: SizeType
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean

  addItem: (item: CartItem) => void
  removeItem: (item: CartItem) => void
  updateQuantity: (item: CartItem, quantity: number) => void

  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number

  openCart: () => void
  closeCart: () => void
}

/* =========================
   STORE
========================= */

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.id === newItem.id &&
              i.size === newItem.size &&
              i.drinkType === newItem.drinkType &&
              i.bean === newItem.bean
          )

          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
            }
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.id === item.id &&
                i.size === item.size &&
                i.drinkType === item.drinkType &&
                i.bean === item.bean
              )
          ),
        })),

      updateQuantity: (item, quantity) => {
        if (quantity <= 0) {
          get().removeItem(item)
          return
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === item.id &&
            i.size === item.size &&
            i.drinkType === item.drinkType &&
            i.bean === item.bean
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((t, i) => t + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((t, i) => t + i.price * i.quantity, 0),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "gondez-cart-storage",
    }
  )
)
