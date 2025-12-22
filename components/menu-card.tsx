"use client"

import { motion } from "framer-motion"
import type { MenuItem, MenuItemSize } from "@/types"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

interface MenuCardProps {
  item: MenuItem
  onClick: () => void
}

/**
 * 💰 GET STARTING PRICE (SINGLE SOURCE)
 */
function getStartingPrice(item: MenuItem): number {
  // NON-COFFEE
  if (item.category === "non-coffee") {
    return (
      item.priceConfig?.nonCoffee?.medium ??
      1.75 // fallback terakhir
    )
  }

  // COFFEE / SIGNATURE
  const coffeeConfig = item.priceConfig?.coffee

  if (coffeeConfig) {
    // ambil harga TERKECIL dari config
    return Math.min(
      ...Object.values(coffeeConfig).flatMap((byBean) =>
        Object.values(byBean).map((sizes) => sizes.medium),
      ),
    )
  }

  // fallback default
  return 1.75
}

export function MenuCard({ item, onClick }: MenuCardProps) {
  const startingPrice = getStartingPrice(item)

  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25 }}>
      <Card
        onClick={onClick}
        className="cursor-pointer overflow-hidden bg-[#3B2F2F] border-[#A47148]/30 hover:border-[#A47148] transition-all duration-300 group"
      >
        {/* IMAGE */}
        <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <span className="text-[11px] text-[#F5EDE3] bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
              Tap to order
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#2B1E1A] via-transparent to-transparent opacity-60" />
        </div>

        {/* CONTENT */}
        <div className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-bold text-[#F5EDE3] mb-1">
            {item.name}
          </h3>

          <p className="text-sm text-[#D4A574] mb-2 line-clamp-2">
            {item.description}
          </p>

          <p className="text-[#A47148] font-semibold text-sm">
            Mulai dari {formatPrice(startingPrice)}
          </p>
        </div>
      </Card>
    </motion.div>
  )
}
