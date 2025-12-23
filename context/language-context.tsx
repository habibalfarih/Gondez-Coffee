"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { translations, Lang } from "@/lib/i18n"

/**
 * 🔑 AMBIL TIPE DARI KEY, BUKAN VALUE
 * Semua bahasa WAJIB punya key yang sama
 */
type TranslationKeys = keyof typeof translations.id
export type Translation = Record<TranslationKeys, string>

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translation
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [lang, setLang] = useState<Lang>("id")

  // 🔥 LOAD SAVED LANGUAGE
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null
    if (saved && translations[saved]) {
      setLang(saved)
    }
  }, [])

  // 🔥 APPLY LANGUAGE + RTL
  useEffect(() => {
    localStorage.setItem("lang", lang)

    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }, [lang])

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang] as Translation,
        isRTL: lang === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider")
  }
  return ctx
}
