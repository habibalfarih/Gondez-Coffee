"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"

interface FloatingCartProps {
  hide?: boolean // 🔥 dari MenuModal
}

export function FloatingCart({ hide = false }: FloatingCartProps) {
  const { items, openCart, isOpen, getTotalItems, getTotalPrice } =
    useCartStore()

  // 🔒 RULE FINAL (INI YANG BIKIN BENER)
  if (hide || isOpen || items.length === 0) return null

  return (
    <AnimatePresence>
      <motion.button
        key="floating-cart"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={openCart}
        className="
          fixed bottom-6 right-6 z-[60]
          flex items-center gap-3
          bg-[#A47148] text-[#2B1E1A]
          px-4 py-3 rounded-full
          shadow-2xl
        "
      >
        {/* ICON */}
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="
            absolute -top-2 -right-2
            bg-red-600 text-white
            text-xs font-bold
            w-5 h-5 rounded-full
            flex items-center justify-center
          ">
            {getTotalItems()}
          </span>
        </div>

        {/* TOTAL */}
        <div className="text-sm font-bold whitespace-nowrap">
          {formatPrice(getTotalPrice())}
        </div>
      </motion.button>
    </AnimatePresence>
  )
}
