import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CartItem } from "@/types"

/**
 * Merge Tailwind + conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price for Jordan (JOD)
 * - NO rounding ke integer
 * - ALWAYS 2 decimal
 * - Aman buat 1.5, 0.25, dst
 */
export function formatPrice(price: number): string {
  return `JOD ${price.toFixed(2)}`
}

/**
 * Generate WhatsApp order message
 * Currency sudah ikut formatPrice (JOD)
 */
export function generateWhatsAppMessage(
  items: CartItem[],
  name: string,
  phone: string,
  total: number
): string {
  let message = `*Pesanan Baru Gondez Coffee* ☕\n\n`
  message += `*Nama:* ${name}\n`
  message += `*No HP:* ${phone}\n\n`
  message += `*Detail Pesanan:*\n`

  items.forEach((item) => {
    const itemTotal =
      item.item.prices[item.size] * item.quantity

    message += `• ${item.quantity}x ${item.item.name} (${item.size}) - ${formatPrice(itemTotal)}\n`
  })

  message += `\n*Total:* ${formatPrice(total)}\n\n`
  message += `Terima kasih sudah pesan di Gondez Coffee! 🔥`

  return encodeURIComponent(message)
}
