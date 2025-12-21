export type MenuItemSize = "small" | "medium" | "large"

export interface MenuItem {
  id: string
  name: string
  category: "coffee" | "non-coffee" | "signature"
  description: string
  prices: {
    small: number
    medium: number
    large: number
  }
  image: string
}

export interface CartItem {
  item: MenuItem
  size: MenuItemSize
  quantity: number
}
