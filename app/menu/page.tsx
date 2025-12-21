"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { MenuCard } from "@/components/menu-card"
import { MenuModal } from "@/components/menu-modal"
import { menuItems } from "@/lib/menu-data"
import type { MenuItem } from "@/types"

const categories = [
  { id: "all", label: "Semua" },
  { id: "coffee", label: "Coffee" },
  { id: "non-coffee", label: "Non-Coffee" },
  { id: "signature", label: "Signature" },
]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredItems =
    selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1E1A] via-[#3B2F2F] to-[#2B1E1A]">
      <Navbar />
      <CartDrawer />
      <MenuModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="container mx-auto px-4 pt-28 pb-20">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12"
>
  {/* Brand + Menu */}
  <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
    {/* GONDEZ / COFFEE */}
    <div className="text-right leading-tight w-[110px] sm:w-[130px] md:w-[150px]">
      <div className="text-sm sm:text-base md:text-lg font-semibold tracking-[0.28em] text-[#D4A574] uppercase">
        Gondez
      </div>
      <div className="text-sm sm:text-base md:text-lg font-semibold tracking-[0.28em] text-[#D4A574] uppercase">
        Coffee
      </div>
    </div>

    {/* MENU */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#F5EDE3] leading-none uppercase tracking-tight">
      Menu
    </h1>
  </div>

  {/* Tagline */}
  <p className="mt-1.5 sm:mt-2 text-sm sm:text-base md:text-lg text-[#D4A574] tracking-wide opacity-90 text-center">
    Diracik dengan rasa, disajikan dengan cerita.
  </p>
</motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === category.id
                  ? "bg-[#A47148] text-[#2B1E1A]"
                  : "bg-[#3B2F2F] text-[#D4A574] hover:bg-[#3B2F2F]/80 border border-[#A47148]/30"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MenuCard item={item} onClick={() => handleItemClick(item)} />
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
