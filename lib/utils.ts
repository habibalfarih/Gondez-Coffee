import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/* ================================
   CLASS UTILS
================================ */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* ================================
   PRICE FORMAT (JOD)
================================ */
export function formatPrice(price: number): string {
  return `JOD ${price.toFixed(2)}`
}

/* ================================
   SIZE FORMAT (DISPLAY ONLY)
================================ */
function formatSize(size: "medium" | "large"): string {
  return size === "medium" ? "regular" : "large"
}

/* ================================
   PRICE ENGINE
================================ */

// ☕ COFFEE
export function getCoffeePrice(
  drinkType: "ice" | "hot",
  bean: "brazilian" | "indonesian",
  size: "medium" | "large"
): number {
  if (drinkType === "ice") {
    if (bean === "brazilian") {
      return size === "medium" ? 1.5 : 2.25
    }
    return size === "medium" ? 1.75 : 2.5
  }

  if (bean === "brazilian") {
    return size === "medium" ? 1.75 : 2.5
  }

  return size === "medium" ? 2.0 : 2.75
}

// 🥛 NON-COFFEE
export function getNonCoffeePrice(
  productId: string,
  size: "medium" | "large"
): number {
  const priceMap: Record<string, { medium: number; large: number }> = {
    "matcha-latte": { medium: 1.75, large: 2.25 },
    "red-velvet": { medium: 1.75, large: 2.25 },
    "oreo-milkshake": { medium: 1.5, large: 2.0 },
  }

  return priceMap[productId]?.[size] ?? 0
}

/* ================================
   CART ITEM TYPE
================================ */
export interface WhatsAppCartItem {
  id: string
  name: string
  drinkType?: "ice" | "hot"
  bean?: "indonesian" | "brazilian"
  size: "medium" | "large"
  price: number
  quantity: number
}

/* ================================
   WHATSAPP MESSAGE
================================ */
export function generateWhatsAppMessage(
  items: WhatsAppCartItem[],
  name: string,
  phone: string,
  total: number,
  orderType: "pickup" | "delivery",
  deliveryNote?: string
): string {
  const DELIVERY_FEE = 0.25

  let message = `*Pesanan Baru Gondez Coffee* ☕\n\n`

  message += `*Nama:* ${name}\n`
  message += `*No HP:* ${phone}\n\n`

  // 🔥 ALWAYS SHOW ORDER TYPE
  message += `*Jenis Pesanan:* ${
    orderType === "pickup" ? "Self Pickup" : "Delivery"
  }\n`

  // 🔥 DELIVERY ADDRESS (ONLY IF DELIVERY)
  if (orderType === "delivery" && deliveryNote) {
    message += `*Alamat Delivery:* ${deliveryNote}\n`
  }

  message += `*Detail Pesanan:*\n`

  items.forEach((item) => {
    const details: string[] = []

    if (item.drinkType) details.push(item.drinkType)
    if (item.bean) details.push(item.bean)
    details.push(formatSize(item.size)) // ✅ FIXED

    const detailText = details.join(", ")
    const itemTotal = item.price * item.quantity

    message += `• ${item.quantity}x ${item.name} (${detailText}) - ${formatPrice(
      itemTotal
    )}\n`
  })

  if (orderType === "delivery") {
    message += `• Delivery Fee - ${formatPrice(DELIVERY_FEE)}\n`
  }

  message += `\n*Total:* ${formatPrice(total)}\n\n`
  message += `Terima kasih sudah pesan di Gondez Coffee! 🔥`

  return encodeURIComponent(message)
}
