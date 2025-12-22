import type { MenuItem } from "@/types"

export const menuItems: MenuItem[] = [
  // =====================
  // SIGNATURE
  // =====================
  {
    id: "spanish-latte",
    name: "Gondez Spanish Latte",
    category: "signature",
    description: "Manis creamy yang bikin lu mikir: kenapa baru nyobain sekarang?",
    image: "/espresso-shot-dark-background.jpg",
  },
  {
    id: "aren-latte",
    name: "Gondez Aren",
    category: "signature",
    description: "Gula aren nendang, kopi berani. Sekali teguk, susah move on.",
    image: "/palm-sugar-latte-coffee.jpg",
  },

  // =====================
  // COFFEE
  // =====================
  {
    id: "oreo-latte",
    name: "Gondez Oreo Latte",
    category: "coffee",
    description: "Manis, creamy, penuh remahan oreo. Gak pesen ini, nyesel.",
    image: "/caffe-latte-cup.jpg",
  },
  {
    id: "hazelnut-latte",
    name: "Gondez Hazelnut Latte",
    category: "coffee",
    description: "Aroma hazelnut langsung nyerang hidung. Elegan tapi nagih.",
    image: "/cappuccino-latte-art.jpg",
  },
  {
    id: "butterscotch-latte",
    name: "Gondez Butterscotch Latte",
    category: "coffee",
    description: "Manis karamel creamy yang bikin hari buruk lu mendingan.",
    image: "/vietnamese-iced-coffee.png",
  },
  {
    id: "coffee-latte",
    name: "Gondez Coffee Latte",
    category: "coffee",
    description: "Latte klasik. Gak ribet, gak drama, selalu kena.",
    image: "/caffe-latte-cup.jpg",
  },
  {
    id: "caramel-latte",
    name: "Gondez Caramel Latte",
    category: "coffee",
    description: "Manis karamel pekat yang bikin lupa diet.",
    image: "/specialty-coffee-signature-drink.jpg",
  },
  {
    id: "americano",
    name: "Gondez Americano",
    category: "coffee",
    description: "Pahit, tegas, tanpa basa-basi. Buat yang gak mau manja.",
    image: "/espresso-shot-dark-background.jpg",
  },
  {
    id: "vanilla-latte",
    name: "Gondez Vanilla Latte",
    category: "coffee",
    description: "Vanilla lembut yang bikin kopi terasa ramah tapi berkelas.",
    image: "/matcha-latte.png",
  },
  {
    id: "iris-latte",
    name: "Gondez Iris Latte",
    category: "coffee",
    description: "Rasa unik yang bikin orang lain penasaran lu minum apa.",
    image: "/hot-chocolate-marshmallow.jpg",
  },

  // =====================
  // NON-COFFEE
  // =====================
  {
    id: "matcha-latte",
    name: "Gondez Matcha Latte",
    category: "non-coffee",
    description: "Matcha creamy segar. Tenang di awal, nagih di akhir.",
    image: "/matcha-latte.png",
  },
  {
    id: "red-velvet",
    name: "Gondez Red Velvet",
    category: "non-coffee",
    description: "Merah menggoda, creamy brutal. Susah nolak.",
    image: "/hot-chocolate-marshmallow.jpg",
  },
  {
    id: "oreo-milkshake",
    name: "Gondez Oreo Milkshake",
    category: "non-coffee",
    description: "Creamy, dingin, penuh oreo. Anak kecil sampe orang dewasa tunduk.",
    image: "/caffe-latte-cup.jpg",
    priceConfig: {
      nonCoffee: {
        medium: 1.50,
        large: 2.0,
      },
    },
  },

  // =====================
  // PREMIUM COFFEE
  // =====================
  {
    id: "tiramisu-latte",
    name: "Gondez Tiramisu Latte",
    category: "coffee",
    description: "Dessert rasa kopi. Minum ini, kopi lain berasa hambar.",
    image: "/caffe-latte-cup.jpg",
  },
  {
    id: "chocolate-cookies-latte",
    name: "Gondez Chocolate Cookies Latte",
    category: "coffee",
    description: "Cokelat pekat ketemu cookies. Dosa kecil yang bikin bahagia.",
    image: "/hot-chocolate-marshmallow.jpg",
  },
  {
    id: "dulce-de-leche-latte",
    name: "Gondez Dulce de Leche Latte",
    category: "coffee",
    description: "Manis karamel susu yang bikin lu lupa dunia sebentar.",
    image: "/specialty-coffee-signature-drink.jpg",
  },
]
