"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { generateWhatsAppMessage } from "@/lib/utils"
import Link from "next/link"

interface OrderData {
  customer: {
    name: string
    phone: string
  }

  orderType: "pickup" | "delivery"
  deliveryNote?: string
  deliveryFee?: number

  items: {
    id: string
    name: string
    drinkType?: "ice" | "hot"
    bean?: "indonesian" | "brazilian"
    size: "medium" | "large"
    quantity: number
    price: number
    subtotal: number
  }[]

  total: number
  createdAt: string
}

export default function SuccessPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("gondez-last-order")
    if (data) {
      setOrderData(JSON.parse(data))
    }
  }, [])

  const handleWhatsApp = () => {
    if (!orderData) return

    const message = generateWhatsAppMessage(
      orderData.items,
      orderData.customer.name,
      orderData.customer.phone,
      orderData.total,
      orderData.orderType,
      orderData.deliveryNote
    )
    

    // 🔥 GANTI NOMOR WA TOKO DI SINI
    const whatsappNumber = "962781901341"

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    )
  }

  if (!orderData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1E1A] via-[#3B2F2F] to-[#2B1E1A]">
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-20 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center max-w-lg"
        >
          {/* ICON */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-8"
          >
            <CheckCircle2 className="h-24 w-24 text-[#A47148]" />
          </motion.div>

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-black text-[#F5EDE3] mb-4">
            Lanjutkan Pembayaran ☕🔥
          </h1>

          {/* DESC */}
          <p className="text-lg text-[#D4A574] mb-8 leading-relaxed text-pretty">
            Pesanan kamu akan kami siapkan setelah konfirmasi pembayaran.
            <br />
            Klik tombol di bawah untuk konfirmasi pembayaran lewat WhatsApp.
          </p>

          {/* ACTIONS */}
          <div className="space-y-4">
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-[#A47148] hover:bg-[#A47148]/90 text-[#2B1E1A] font-bold py-6 text-lg"
            >
              💬 Chat Gondez Coffee di WhatsApp
            </Button>

            <Link href="/menu">
              <Button
                variant="outline"
                className="w-full border-[#A47148]/30 text-[#F5EDE3] hover:bg-[#3B2F2F] py-6 bg-transparent"
              >
                Pesan Lagi
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
