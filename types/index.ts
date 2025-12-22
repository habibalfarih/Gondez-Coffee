/**
 * =========================
 * MENU TYPES
 * =========================
 */

// Ukuran minuman (client cuma minta ini)
export type MenuItemSize = "medium" | "large"

// Jenis minuman (COFFEE ONLY)
export type DrinkType = "ice" | "hot"

// Jenis beans (COFFEE ONLY)
export type BeanType = "indonesian" | "brazilian"

// Kategori menu
export type MenuCategory = "coffee" | "non-coffee" | "signature"

/**
 * =========================
 * PRICE TYPES
 * =========================
 */

// Struktur harga kopi (ice/hot + beans + size)
export type CoffeePriceMap = Record<
  DrinkType,
  Record<BeanType, Record<MenuItemSize, number>>
>

// Struktur harga non-coffee
export type NonCoffeePriceMap = Record<MenuItemSize, number>

/**
 * =========================
 * MENU ITEM
 * =========================
 */
export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  description: string
  image: string

  /**
   * OPTIONAL PRICE OVERRIDE
   * kalau tidak ada → pakai default di MenuModal
   */
  priceConfig?: {
    coffee?: CoffeePriceMap
    nonCoffee?: NonCoffeePriceMap
  }
}

/**
 * =========================
 * CART TYPES (FINAL)
 * =========================
 */
export interface CartItem {
  id: string
  name: string
  image: string

  /**
   * OPTIONAL
   * cuma ada kalau category === "coffee"
   */
  drinkType?: DrinkType
  bean?: BeanType

  size: MenuItemSize
  quantity: number

  /**
   * Harga FINAL per item
   * (sudah dihitung dari size + ice/hot + beans)
   */
  price: number
}
