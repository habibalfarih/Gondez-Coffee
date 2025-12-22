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

/* =========================
   CONFIG
========================= */
const DELIVERY_FEE = 0.25

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup")
  const [deliveryNote, setDeliveryNote] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getTotalPrice()
  const total =
    orderType === "delivery" ? subtotal + DELIVERY_FEE : subtotal

  /* =========================
     HANDLE PAYMENT
  ========================= */
  const handlePayment = async () => {
    if (!name || !phone) {
      alert("Mohon isi nama dan nomor WhatsApp")
      return
    }

    if (orderType === "delivery" && !deliveryNote) {
      alert("Mohon isi alamat delivery")
      return
    }

    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 1200))

    const orderData = {
      customer: {
        name,
        phone,
      },
      orderType,
      deliveryFee: orderType === "delivery" ? DELIVERY_FEE : 0,
      deliveryNote: orderType === "delivery" ? deliveryNote : null,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        drinkType: item.drinkType,
        bean: item.bean,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
      total,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("gondez-last-order", JSON.stringify(orderData))
    clearCart()
    router.push("/success")
  }

  /* =========================
     EMPTY CART
  ========================= */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2B1E1A] via-[#3B2F2F] to-[#2B1E1A] flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-[#F5EDE3] mb-4">
            Keranjang kosong
          </h2>
          <Link href="/menu">
            <Button className="bg-[#A47148] text-[#2B1E1A]">
              Kembali ke Menu
            </Button>
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
          <Button
            variant="ghost"
            className="text-[#F5EDE3] hover:text-[#A47148] mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-[#F5EDE3] mb-3">
              Hampir Sampai ☕
            </h1>
            <p className="text-[#D4A574]">
              Lengkapi pesanan kamu di bawah ini.
            </p>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-[#3B2F2F] rounded-2xl p-6 border border-[#A47148]/30 space-y-4">
            <h2 className="font-bold text-[#F5EDE3] text-lg">
              Ringkasan Pesanan
            </h2>

            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.drinkType}-${item.bean}`}
                className="flex justify-between text-sm"
              >
                <span className="text-[#D4A574]">
                  {item.quantity}x {item.name} (
                  {item.drinkType}, {item.bean},{" "}
                  {item.size === "medium" ? "Regular" : "Large"})
                </span>
                <span className="text-[#F5EDE3] font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}

            {orderType === "delivery" && (
              <div className="flex justify-between text-sm">
                <span className="text-[#D4A574]">Delivery Fee</span>
                <span className="text-[#F5EDE3] font-semibold">
                  {formatPrice(DELIVERY_FEE)}
                </span>
              </div>
            )}

            <div className="border-t border-[#A47148]/30 pt-4 flex justify-between text-lg font-bold">
              <span className="text-[#F5EDE3]">Total</span>
              <span className="text-[#A47148]">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* ORDER TYPE */}
          <div className="bg-[#3B2F2F] rounded-2xl p-6 border border-[#A47148]/30 space-y-4">
            <Label className="text-[#A47148] font-semibold">
              Metode Pesanan
            </Label>

            <label className="flex items-center gap-2 text-[#F5EDE3]">
              <input
                type="radio"
                checked={orderType === "pickup"}
                onChange={() => setOrderType("pickup")}
              />
              Self Pickup
            </label>

            <label className="flex items-center gap-2 text-[#F5EDE3]">
              <input
                type="radio"
                checked={orderType === "delivery"}
                onChange={() => setOrderType("delivery")}
              />
              Delivery (+ JOD 0.25)
            </label>

            {orderType === "delivery" && (
              <textarea
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder="Alamat delivery (contoh: Blok B No 12)"
                className="w-full mt-2 rounded-lg p-3 bg-[#2B1E1A] text-[#F5EDE3]"
              />
            )}
          </div>

          {/* CUSTOMER */}
          <div className="bg-[#3B2F2F] rounded-2xl p-6 border border-[#A47148]/30 space-y-6">
            <div>
              <Label className="text-[#A47148] font-semibold">Nama</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#2B1E1A] text-[#F5EDE3]"
              />
            </div>

            <div>
              <Label className="text-[#A47148] font-semibold">
                Nomor WhatsApp
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-[#2B1E1A] text-[#F5EDE3]"
              />
            </div>
          </div>

          {/* PAY */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-[#A47148] text-[#2B1E1A] font-bold py-6 text-lg"
          >
            {isProcessing
              ? "Memproses..."
              : "💳 Lanjutkan ke WhatsApp"}
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
