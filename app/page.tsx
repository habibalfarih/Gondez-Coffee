"use client"

import { motion } from "framer-motion"
import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1E1A] via-[#3B2F2F] to-[#2B1E1A]">
      <Navbar />
      <CartDrawer />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 opacity-10">
          <Image src="/coffee-shop-interior-warm-lighting.jpg" alt="Coffee shop background" fill className="object-cover" />
        </div>

        <div className="relative z-10 container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-8"
            >
              <Coffee className="h-16 w-16 text-[#A47148]" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#F5EDE3] mb-6 leading-tight text-balance">
              Kopi yang baik
              <br />
              akan menemukan
              <br />
              penikmatnya.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-[#D4A574] mb-12 max-w-2xl mx-auto leading-relaxed text-pretty"
            >
              Di Gondez Coffee, kopi bukan cuma minuman.
              <br />
              Ini soal cerita, tawa, dan waktu yang dibagi bareng.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Link href="/menu">
                <Button className="bg-[#A47148] hover:bg-[#A47148]/90 text-[#2B1E1A] font-bold text-lg px-8 py-6 rounded-xl">
                  ☕ Pesan Kopi Sekarang
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#F5EDE3] mb-6">
              Sobat Gondez,
              <br />
              Selamat Datang.
            </h2>
            <p className="text-lg text-[#D4A574] leading-relaxed text-pretty">
              Gondez Coffee lahir dari tongkrongan, musik, dan obrolan panjang.
              <br />
              Kami percaya kopi terbaik adalah kopi yang diminum bareng orang yang tepat.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
