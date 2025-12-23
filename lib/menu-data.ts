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
    image: "/spanish.jpg",
  },
  {
    id: "aren-latte",
    name: "Gondez Aren",
    category: "signature",
    description: "Gula aren nendang, kopi berani. Sekali teguk, susah move on.",
    image: "/aren.jpeg",
  },

  // =====================
  // COFFEE
  // =====================
  {
    id: "oreo-latte",
    name: "Gondez Oreo Latte",
    category: "coffee",
    description: "Manis, creamy, penuh remahan oreo. Gak pesen ini, nyesel.",
    image: "/oreo.jpg",
  },
  {
    id: "hazelnut-latte",
    name: "Gondez Hazelnut Latte",
    category: "coffee",
    description: "Aroma hazelnut langsung nyerang hidung. Elegan tapi nagih.",
    image: "/hazlnut.jpg",
  },
  {
    id: "butterscotch-latte",
    name: "Gondez Butterscotch Latte",
    category: "coffee",
    description: "Manis karamel creamy yang bikin hari buruk lu mendingan.",
    image: "/btc.jpeg",
  },
  {
    id: "coffee-latte",
    name: "Gondez Coffee Latte",
    category: "coffee",
    description: "Latte klasik. Gak ribet, gak drama, selalu kena.",
    image: "/clate.jpg",
  },
  {
    id: "caramel-latte",
    name: "Gondez Caramel Latte",
    category: "coffee",
    description: "Manis karamel pekat yang bikin lupa diet.",
    image: "/caramel.jpg",
  },
  {
    id: "americano",
    name: "Gondez Americano",
    category: "coffee",
    description: "Pahit, tegas, tanpa basa-basi. Buat yang gak mau manja.",
    image: "/americano.jpeg",
  },
  {
    id: "vanilla-latte",
    name: "Gondez Vanilla Latte",
    category: "coffee",
    description: "Vanilla lembut yang bikin kopi terasa ramah tapi berkelas.",
    image: "/vanilalate.jpg",
  },
  {
    id: "iris-latte",
    name: "Gondez Iris Latte",
    category: "coffee",
    description: "Rasa unik yang bikin orang lain penasaran lu minum apa.",
    image: "/irishlate.jpg",
  },

  // =====================
  // NON-COFFEE
  // =====================
  {
    id: "matcha-latte",
    name: "Gondez Matcha Latte",
    category: "non-coffee",
    description: "Matcha creamy segar. Tenang di awal, nagih di akhir.",
    image: "/matcha.jpg",
  },
  {
    id: "red-velvet",
    name: "Gondez Red Velvet",
    category: "non-coffee",
    description: "Merah menggoda, creamy brutal. Susah nolak.",
    image: "/redppelpet.jpg",
  },
  {
    id: "oreo-milkshake",
    name: "Gondez Oreo Milkshake",
    category: "non-coffee",
    description: "Creamy, dingin, penuh oreo. Anak kecil sampe orang dewasa tunduk.",
    image: "/oremilk.jpg",
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
    image: "/tiramisu.jpg",
  },
  {
    id: "chocolate-cookies-latte",
    name: "Gondez Chocolate Cookies Latte",
    category: "coffee",
    description: "Cokelat pekat ketemu cookies. Dosa kecil yang bikin bahagia.",
    image: "/ccho.jpg",
  },
  {
    id: "dulce-de-leche-latte",
    name: "Gondez Dulce de Leche Latte",
    category: "coffee",
    description: "Manis karamel susu yang bikin lu lupa dunia sebentar.",
    image: "/dulcelate.jpg",
    
  },
]
