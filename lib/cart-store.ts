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

/**
 * 🔑 helper buat unique cart key
 * (product + variant)
 */
const getCartKey = (item: CartItem) =>
  `${item.id}-${item.size}-${item.drinkType ?? "na"}-${item.bean ?? "na"}`

interface CartStore {
  items: CartItem[]
  isOpen: boolean

  addItem: (item: CartItem) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void

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

      /* ➕ ADD ITEM */
      addItem: (newItem) => {
        const newKey = getCartKey(newItem)

        set((state) => {
          const existing = state.items.find(
            (i) => getCartKey(i) === newKey
          )

          if (existing) {
            return {
              items: state.items.map((i) =>
                getCartKey(i) === newKey
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
            }
          }

          return { items: [...state.items, newItem] }
        })
      },

      /* ❌ REMOVE ITEM */
      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter(
            (i) => getCartKey(i) !== key
          ),
        })),

      /* 🔁 UPDATE QTY */
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key)
          return
        }

        set((state) => ({
          items: state.items.map((i) =>
            getCartKey(i) === key
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((t, i) => t + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (t, i) => t + i.price * i.quantity,
          0
        ),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "gondez-cart-storage",
    }
  )
)
