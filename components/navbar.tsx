"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = getTotalItems()

  // 🔑 hydration guard
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#2B1E1A]/90 backdrop-blur-sm border-b border-[#A47148]/30"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO + BRAND */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} className="relative h-10 w-10">
            <Image
              src="/images/image.png"
              alt="Gondez Coffee"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <div className="leading-tight">
            <span className="block text-sm font-black tracking-widest text-[#F5EDE3]">
              GONDEZ
            </span>
            <span className="block text-xs tracking-wide text-[#D4A574]">
              Coffee
            </span>
          </div>
        </Link>

        {/* CENTER TAGLINE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex items-center gap-2 text-xs tracking-widest text-[#D4A574]/80"
        >
          <span>Kopi</span>
          <span className="w-1 h-1 rounded-full bg-[#A47148]" />
          <span>Cerita</span>
          <span className="w-1 h-1 rounded-full bg-[#A47148]" />
          <span>Tongkrongan</span>
        </motion.div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">
          <Link href="/menu">
            <Button
              variant="ghost"
              className="text-[#F5EDE3] hover:text-[#A47148] hover:bg-[#3B2F2F]"
            >
              Menu
            </Button>
          </Link>

          <Button
            onClick={openCart}
            variant="ghost"
            className="relative text-[#F5EDE3] hover:text-[#A47148] hover:bg-[#3B2F2F]"
          >
            <ShoppingCart className="h-5 w-5" />

            {/* 🔥 BADGE (SSR SAFE) */}
            {mounted && totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-[#A47148] text-[#2B1E1A] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
