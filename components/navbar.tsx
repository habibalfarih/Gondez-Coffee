"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Globe } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

export function Navbar() {
  const { getTotalItems, openCart } = useCartStore()
  const totalItems = getTotalItems()
  const { lang, setLang } = useLanguage()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#2B1E1A]/90 backdrop-blur-sm border-b border-[#A47148]/30"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* LEFT — LOGO + BRAND (MOBILE & DESKTOP) */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9">
            <Image
              src="/images/image.png"
              alt="Gondez Coffee"
              fill
              className="object-contain"
            />
          </div>

          <div className="leading-tight">
            <span className="block text-sm font-black tracking-widest text-[#F5EDE3]">
              GONDEZ
            </span>
            <span className="block text-xs tracking-wide text-[#D4A574]">
              Coffee
            </span>
          </div>
        </Link>

        {/* CENTER — TAGLINE (DESKTOP ONLY) */}
        <div className="hidden md:flex items-center gap-2 text-xs tracking-widest text-[#D4A574]/80">
          <span>Kopi</span>
          <span className="w-1 h-1 rounded-full bg-[#A47148]" />
          <span>Cerita</span>
          <span className="w-1 h-1 rounded-full bg-[#A47148]" />
          <span>Tongkrongan</span>
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-3">

          {/* MENU (DESKTOP ONLY) */}
          <Link href="/menu" className="hidden md:block">
            <Button
              variant="ghost"
              className="text-[#F5EDE3] hover:text-[#A47148]"
            >
              Menu
            </Button>
          </Link>

          {/* 🌐 LANGUAGE SELECTOR */}
          <div className="relative">
            <Globe className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4A574]" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-[#3B2F2F] border border-[#A47148]/30 text-[#F5EDE3] text-xs rounded-lg pl-7 pr-2 py-1 focus:outline-none"
            >
              <option value="id">ID</option>
              <option value="en">EN</option>
              <option value="ar">AR</option>
              <option value="ms">MY</option>
              <option value="th">TH</option>
              <option value="zh">CN</option>
            </select>
          </div>

          {/* 🛒 CART */}
          <Button
            onClick={openCart}
            variant="ghost"
            className="relative text-[#F5EDE3]"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#A47148] text-[#2B1E1A] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
