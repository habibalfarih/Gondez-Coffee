"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const total = getTotalPrice()

  const handlePayment = async () => {
    if (!name || !phone) {
      alert("Mohon isi nama dan nomor WhatsApp")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const orderData = {
      name,
      phone,
      items: items.map((item) => ({
        item: {
          name: item.item.name,
          prices: item.item.prices,
        },
        size: item.size,
        quantity: item.quantity,
        price: item.item.prices[item.size] * item.quantity,
      })),
      total,
    }

    localStorage.setItem("gondez-last-order", JSON.stringify(orderData))
    clearCart()
    router.push("/success")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2B1E1A] via-[#3B2F2F] to-[#2B1E1A] flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-[#F5EDE3] mb-4">Keranjang kosong</h2>
          <Link href="/menu">
            <Button className="bg-[#A47148] hover:bg-[#A47148]/90 text-[#2B1E1A]">Kembali ke Menu</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1E1A] via-[#3B2F2F] to-[#2B1E1A]">
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-20 max-w-2xl">
        <Link href="/menu">
          <Button variant="ghost" className="text-[#F5EDE3] hover:text-[#A47148] hover:bg-[#3B2F2F] mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-[#F5EDE3] mb-3">Hampir Sampai ☕</h1>
            <p className="text-[#D4A574] leading-relaxed">
              Isi data singkat di bawah ini,
              <br />
              biar kopi kamu bisa langsung kami siapkan.
            </p>
          </div>

          <div className="bg-[#3B2F2F] rounded-2xl p-6 border border-[#A47148]/30 space-y-4">
            <h2 className="font-bold text-[#F5EDE3] text-lg mb-4">Ringkasan Pesanan</h2>
            {items.map((cartItem) => (
              <div key={`${cartItem.item.id}-${cartItem.size}`} className="flex justify-between text-sm">
                <span className="text-[#D4A574]">
                  {cartItem.quantity}x {cartItem.item.name} ({cartItem.size})
                </span>
                <span className="text-[#F5EDE3] font-semibold">
                  {formatPrice(cartItem.item.prices[cartItem.size] * cartItem.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-[#A47148]/30 pt-4 flex justify-between text-lg font-bold">
              <span className="text-[#F5EDE3]">Total</span>
              <span className="text-[#A47148]">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="bg-[#3B2F2F] rounded-2xl p-6 border border-[#A47148]/30 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#A47148] font-semibold">
                Nama kamu
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama"
                className="bg-[#2B1E1A] border-[#A47148]/30 text-[#F5EDE3] placeholder:text-[#D4A574]/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#A47148] font-semibold">
                Nomor WhatsApp
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="bg-[#2B1E1A] border-[#A47148]/30 text-[#F5EDE3] placeholder:text-[#D4A574]/50"
              />
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-[#A47148] hover:bg-[#A47148]/90 text-[#2B1E1A] font-bold py-6 text-lg"
          >
            {isProcessing ? "Memproses..." : "💳 Lanjutkan Pembayaran di WhatsApp"}
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
