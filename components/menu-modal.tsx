"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus } from "lucide-react"
import type { MenuItem, MenuItemSize } from "@/types"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface MenuModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

export function MenuModal({ item, isOpen, onClose }: MenuModalProps) {
  const [selectedSize, setSelectedSize] = useState<MenuItemSize>("medium")
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()
  const { toast } = useToast()

  if (!item) return null

  const handleAddToCart = () => {
    addItem(item, selectedSize, quantity)
    toast({
      title: "Ditambahkan ke keranjang! ☕",
      description: `${quantity}x ${item.name} (${selectedSize})`,
    })
    onClose()
    setQuantity(1)
    setSelectedSize("medium")
  }

  const sizeLabels: Record<MenuItemSize, string> = {
    small: "Small",
    medium: "Medium",
    large: "Large",
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50"
          >
            <div className="bg-[#3B2F2F] rounded-2xl border border-[#A47148]/30 overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="relative aspect-[4/3]">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-[#2B1E1A]/80 hover:bg-[#2B1E1A] text-[#F5EDE3] rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-black text-[#F5EDE3] mb-2">{item.name}</h2>
                <p className="text-[#D4A574] mb-6 leading-relaxed">{item.description}</p>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-[#A47148] mb-3 block">Pilih Ukuran</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["small", "medium", "large"] as MenuItemSize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                            selectedSize === size
                              ? "bg-[#A47148] text-[#2B1E1A]"
                              : "bg-[#2B1E1A] text-[#D4A574] hover:bg-[#2B1E1A]/80"
                          }`}
                        >
                          <div className="text-xs mb-1">{sizeLabels[size]}</div>
                          <div className="text-sm">{formatPrice(item.prices[size])}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#A47148] mb-3 block">Jumlah</label>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        variant="outline"
                        size="icon"
                        className="bg-[#2B1E1A] border-[#A47148]/30 text-[#F5EDE3] hover:bg-[#2B1E1A]/80"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-bold text-[#F5EDE3] w-12 text-center">{quantity}</span>
                      <Button
                        onClick={() => setQuantity(quantity + 1)}
                        variant="outline"
                        size="icon"
                        className="bg-[#2B1E1A] border-[#A47148]/30 text-[#F5EDE3] hover:bg-[#2B1E1A]/80"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-[#A47148] hover:bg-[#A47148]/90 text-[#2B1E1A] font-bold py-6 text-lg"
                  >
                    Tambah ke Keranjang - {formatPrice(item.prices[selectedSize] * quantity)}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
