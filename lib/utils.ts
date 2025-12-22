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
   PRICE ENGINE (SESUAI CLIENT)
================================ */

// ☕ COFFEE (ICE / HOT + BEANS)
export function getCoffeePrice(
  drinkType: "ice" | "hot",
  bean: "brazilian" | "indonesian",
  size: "medium" | "large"
): number {
  // ICE COFFEE
  if (drinkType === "ice") {
    if (bean === "brazilian") {
      return size === "medium" ? 1.5 : 2.25
    }
    return size === "medium" ? 1.75 : 2.5
  }

  // HOT COFFEE
  if (bean === "brazilian") {
    return size === "medium" ? 1.75 : 2.5
  }
  return size === "medium" ? 2.0 : 2.75
}

// 🥛 NON-COFFEE (NO ICE/HOT, NO BEANS)
export function getNonCoffeePrice(
  productId: string,
  size: "medium" | "large"
): number {
  const priceMap: Record<
    string,
    { medium: number; large: number }
  > = {
    "matcha-latte": { medium: 1.75, large: 2.25 },
    "red-velvet": { medium: 1.75, large: 2.25 },
    "oreo-milkshake": { medium: 1.5, large: 2.0 },
  }

  return priceMap[productId]?.[size] ?? 0
}

/* ================================
   CART ITEM TYPE (FINAL)
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
  total: number
): string {
  let message = `*Pesanan Baru Gondez Coffee* ☕\n\n`
  message += `*Nama:* ${name}\n`
  message += `*No HP:* ${phone}\n\n`
  message += `*Detail Pesanan:*\n`

  items.forEach((item) => {
    const itemTotal = item.price * item.quantity

    const variantInfo = item.drinkType
      ? `${item.drinkType}, ${item.bean}, ${item.size}`
      : `${item.size}`

    message += `• ${item.quantity}x ${item.name} (${variantInfo}) - ${formatPrice(
      itemTotal
    )}\n`
  })

  message += `\n*Total:* ${formatPrice(total)}\n\n`
  message += `Terima kasih sudah pesan di Gondez Coffee! 🔥`

  return encodeURIComponent(message)
}
