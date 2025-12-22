"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCartStore()

  const router = useRouter()
  const total = getTotalPrice()

  const handleCheckout = () => {
    closeCart()
    router.push("/checkout")
  }
  // ✅ INI YANG KURANG
  const handleClearCart = () => {
    const ok = window.confirm("Kosongkan semua item di keranjang?")
    if (!ok) return

    clearCart()
    closeCart()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-[#2B1E1A] z-50 flex flex-col"
          >
            {/* HEADER */}
            <div className="p-6 border-b border-[#A47148]/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-[#F5EDE3]">
                  Keranjang Kopi Kamu
                </h2>
                <Button
                  onClick={closeCart}
                  variant="ghost"
                  size="icon"
                  className="text-[#F5EDE3] hover:text-[#A47148] hover:bg-[#3B2F2F]"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* EMPTY */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag className="h-20 w-20 text-[#A47148]/50 mb-4" />
                <h3 className="text-xl font-bold text-[#F5EDE3] mb-2">
                  Keranjang masih kosong
                </h3>
                <p className="text-[#D4A574] leading-relaxed">
                  Yuk, cari kopi yang cocok sama mood kamu hari ini.
                </p>
              </div>
            ) : (
              <>
                {/* ITEM LIST */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((cartItem, index) => {
                    const key = `${cartItem.id}-${cartItem.size}-${cartItem.drinkType ?? "na"}-${cartItem.bean ?? "na"}`

                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-[#3B2F2F] rounded-xl p-4 border border-[#A47148]/20"
                      >
                        <div className="flex gap-4">
                          {/* IMAGE */}
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={cartItem.image || "/placeholder.svg"}
                              alt={cartItem.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* INFO */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#F5EDE3] truncate mb-1">
                              {cartItem.name}
                            </h3>

                            <p className="text-xs text-[#D4A574] mb-2 capitalize">
                              {cartItem.drinkType} • {cartItem.bean} • {cartItem.size === "medium" ? "Regular" : "Large"}
                            </p>

                            <p className="text-[#A47148] font-semibold">
                              {formatPrice(cartItem.price)}
                            </p>
                          </div>

                          {/* QTY */}
                          <div className="flex flex-col items-end justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() =>
                                  updateQuantity(key, cartItem.quantity - 1)
                                }
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-[#F5EDE3] hover:text-[#A47148] hover:bg-[#2B1E1A]"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>

                              <span className="text-[#F5EDE3] font-bold w-6 text-center">
                                {cartItem.quantity}
                              </span>

                              <Button
                                onClick={() =>
                                  updateQuantity(key, cartItem.quantity + 1)
                                }
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-[#F5EDE3] hover:text-[#A47148] hover:bg-[#2B1E1A]"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            <p className="text-[#F5EDE3] font-bold">
                              {formatPrice(cartItem.price * cartItem.quantity)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* FOOTER */}
                <div className="p-6 border-t border-[#A47148]/30 space-y-4">
                  <div className="flex items-center justify-between text-xl font-black">
                    <span className="text-[#F5EDE3]">Total</span>
                    <span className="text-[#A47148]">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <Button
                    onClick={handleClearCart}
                    variant="outline"
                    className="w-full border-red-500/40 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-[#A47148] hover:bg-[#A47148]/90 text-[#2B1E1A] font-bold py-6 text-lg"
                  >
                    Lanjut ke Checkout
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
