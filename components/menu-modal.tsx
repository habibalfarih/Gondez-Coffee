"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus } from "lucide-react"
import type { MenuItem, MenuItemSize } from "@/types"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

type DrinkType = "ice" | "hot"
type BeanType = "indonesian" | "brazilian"

/**
 * DEFAULT PRICE (FALLBACK)
 */
const coffeePriceMap: Record<
  DrinkType,
  Record<BeanType, Record<MenuItemSize, number>>
> = {
  ice: {
    brazilian: { medium: 1.5, large: 2.25 },
    indonesian: { medium: 1.75, large: 2.5 },
  },
  hot: {
    brazilian: { medium: 1.75, large: 2.5 },
    indonesian: { medium: 2.0, large: 2.75 },
  },
}

const nonCoffeePriceMap: Record<MenuItemSize, number> = {
  medium: 1.75,
  large: 2.25,
}

interface MenuModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

export function MenuModal({ item, isOpen, onClose }: MenuModalProps) {
  if (!item) return null

  const isCoffee = item.category !== "non-coffee"

  const [drinkType, setDrinkType] = useState<DrinkType | null>(null)
  const [bean, setBean] = useState<BeanType | null>(null)
  const [size, setSize] = useState<MenuItemSize | null>(null)
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCartStore()
  const { toast } = useToast()

  /**
   * 💰 UNIT PRICE (SINGLE SOURCE OF TRUTH)
   */
  const unitPrice = (() => {
    if (!size) return 0

    // NON COFFEE
    if (!isCoffee) {
      return (
        item.priceConfig?.nonCoffee?.[size] ??
        nonCoffeePriceMap[size]
      )
    }

    // COFFEE
    if (!drinkType || !bean) return 0

    return (
      item.priceConfig?.coffee?.[drinkType]?.[bean]?.[size] ??
      coffeePriceMap[drinkType][bean][size]
    )
  })()

  const totalPrice = unitPrice * quantity

  /**
   * 🛒 ADD TO CART
   */
  const handleAddToCart = () => {
    if (!size) return
    if (isCoffee && (!drinkType || !bean)) return

    addItem({
      id: item.id,
      name: item.name,
      image: item.image,
      size,
      quantity,
      price: unitPrice,

      ...(isCoffee && {
        drinkType: drinkType!,
        bean: bean!,
      }),
    })

    toast({
      title: "Ditambahkan ke keranjang ☕",
      description: `${quantity}x ${item.name}`,
    })

    onClose()
    setDrinkType(null)
    setBean(null)
    setSize(null)
    setQuantity(1)
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="
             fixed inset-0 z-50
              flex items-center justify-center
              px-4"
              >
            <div className="
            w-full max-w-md
            bg-[#3B2F2F]
            rounded-2xl
            border border-[#A47148]/30
            overflow-y-auto
            max-h-[90vh]
            ">
              {/* IMAGE */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-[#2B1E1A]/80 text-[#F5EDE3]"
                >
                  <X />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-[#F5EDE3]">
                    {item.name}
                  </h2>
                  <p className="text-[#D4A574]">{item.description}</p>
                </div>

                {/* ICE / HOT */}
                {isCoffee && (
                  <div>
                    <p className="text-sm font-semibold text-[#A47148] mb-2">
                      Pilih Tipe
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {(["ice", "hot"] as DrinkType[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setDrinkType(t)
                            setBean(null)
                            setSize(null)
                          }}
                          className={`py-3 rounded-xl font-bold ${
                            drinkType === t
                              ? "bg-[#A47148] text-[#2B1E1A]"
                              : "bg-[#2B1E1A] text-[#D4A574]"
                          }`}
                        >
                          {t === "ice" ? "❄️ Ice" : "🔥 Hot"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* BEANS */}
                {isCoffee && drinkType && (
                  <div>
                    <p className="text-sm font-semibold text-[#A47148] mb-2">
                      Pilih Beans
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {(["indonesian", "brazilian"] as BeanType[]).map((b) => (
                        <button
                          key={b}
                          onClick={() => {
                            setBean(b)
                            setSize(null)
                          }}
                          className={`py-3 rounded-lg font-semibold ${
                            bean === b
                              ? "bg-[#A47148] text-[#2B1E1A]"
                              : "bg-[#2B1E1A] text-[#D4A574]"
                          }`}
                        >
                          {b === "indonesian"
                            ? "Indonesian Beans"
                            : "Brazilian Beans"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SIZE */}
                {(!isCoffee || (drinkType && bean)) && (
                  <div>
                    <p className="text-sm font-semibold text-[#A47148] mb-2">
                      Pilih Ukuran
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {(["medium", "large"] as MenuItemSize[]).map((s) => {
                        const displayPrice = (() => {
                          if (!isCoffee) {
                            return (
                              item.priceConfig?.nonCoffee?.[s] ??
                              nonCoffeePriceMap[s]
                            )
                          }

                          return (
                            item.priceConfig?.coffee?.[drinkType!]?.[bean!]?.[s] ??
                            coffeePriceMap[drinkType!][bean!][s]
                          )
                        })()

                        return (
                          <button
                            key={s}
                            onClick={() => setSize(s)}
                            className={`py-3 rounded-lg font-semibold ${
                              size === s
                                ? "bg-[#A47148] text-[#2B1E1A]"
                                : "bg-[#2B1E1A] text-[#D4A574]"
                            }`}
                          >
                            <div className="capitalize">
                              {s === "medium" ? "Regular" : "Large"}
                            </div>
                            <div className="text-xs">
                              {formatPrice(displayPrice)}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* QTY */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    size="icon"
                  >
                    <Minus />
                  </Button>
                  <span className="text-xl font-bold text-[#F5EDE3]">
                    {quantity}
                  </span>
                  <Button onClick={() => setQuantity(quantity + 1)} size="icon">
                    <Plus />
                  </Button>
                </div>

                {/* ADD */}
                <Button
                  disabled={!size || (isCoffee && (!drinkType || !bean))}
                  onClick={handleAddToCart}
                  className="w-full bg-[#A47148] text-[#2B1E1A] font-bold py-6"
                >
                  Tambah ke Keranjang – {formatPrice(totalPrice)}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
