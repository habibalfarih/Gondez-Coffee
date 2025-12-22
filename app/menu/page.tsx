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
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory)

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1E1A] via-[#3B2F2F] to-[#2B1E1A]">
      <Navbar />
      <CartDrawer />

      {/* ✅ MODAL HARUS CONDITIONAL */}
      {isModalOpen && selectedItem && (
        <MenuModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      <main className="container mx-auto px-4 pt-28 pb-20">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="text-right leading-tight">
              <div className="text-sm md:text-base font-semibold tracking-[0.28em] text-[#D4A574] uppercase">
                Gondez
              </div>
              <div className="text-sm md:text-base font-semibold tracking-[0.28em] text-[#D4A574] uppercase">
                Coffee
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#F5EDE3] uppercase">
              Menu
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-lg text-[#D4A574] tracking-wide opacity-90 text-center">
            Diracik dengan rasa, disajikan dengan cerita.
          </p>
        </motion.div>

        {/* CATEGORY FILTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
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

        {/* MENU GRID */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <MenuCard
                item={item}
                onClick={() => handleItemClick(item)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
