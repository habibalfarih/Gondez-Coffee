"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

export type Language =
  | "id"   // Indonesia
  | "ms"   // Malaysia
  | "en"   // English
  | "ar"   // Arabic
  | "th"   // Thailand
  | "zh"   // Chinese

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("id")

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("gondez-lang") as Language
    if (saved) setLangState(saved)
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem("gondez-lang", newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

/* 🔥 INI YANG KURANG TADI */
export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLang must be used inside LanguageProvider")
  }
  return context
}
