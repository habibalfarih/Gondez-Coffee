"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, getTotalPrice } = useCartStore()
  const router = useRouter()
  const total = getTotalPrice()

  const handleCheckout = () => {
    closeCart()
    router.push("/checkout")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-[#2B1E1A] z-50 flex flex-col"
          >
            <div className="p-6 border-b border-[#A47148]/30">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-[#F5EDE3]">Keranjang Kopi Kamu</h2>
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

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag className="h-20 w-20 text-[#A47148]/50 mb-4" />
                <h3 className="text-xl font-bold text-[#F5EDE3] mb-2">Keranjang masih kosong.</h3>
                <p className="text-[#D4A574] leading-relaxed">Yuk, cari kopi yang cocok sama mood kamu hari ini.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((cartItem, index) => (
                    <motion.div
                      key={`${cartItem.item.id}-${cartItem.size}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#3B2F2F] rounded-xl p-4 border border-[#A47148]/20"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={cartItem.item.image || "/placeholder.svg"}
                            alt={cartItem.item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#F5EDE3] mb-1 truncate">{cartItem.item.name}</h3>
                          <p className="text-sm text-[#D4A574] mb-2 capitalize">{cartItem.size}</p>
                          <p className="text-[#A47148] font-semibold">
                            {formatPrice(cartItem.item.prices[cartItem.size])}
                          </p>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => updateQuantity(cartItem.item.id, cartItem.size, cartItem.quantity - 1)}
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-[#F5EDE3] hover:text-[#A47148] hover:bg-[#2B1E1A]"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-[#F5EDE3] font-bold w-6 text-center">{cartItem.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(cartItem.item.id, cartItem.size, cartItem.quantity + 1)}
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-[#F5EDE3] hover:text-[#A47148] hover:bg-[#2B1E1A]"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <p className="text-[#F5EDE3] font-bold">
                            {formatPrice(cartItem.item.prices[cartItem.size] * cartItem.quantity)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 border-t border-[#A47148]/30 space-y-4">
                  <div className="flex items-center justify-between text-xl font-black">
                    <span className="text-[#F5EDE3]">Total</span>
                    <span className="text-[#A47148]">{formatPrice(total)}</span>
                  </div>

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
