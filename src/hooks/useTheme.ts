import { useEffect, useState } from "react"

const getThemeFromBody = (bodyElement: HTMLBodyElement) => {
  return bodyElement.classList.contains("dark") ? "dark" : "light"
}

export default function useTheme(): string {
  const [theme, setTheme] = useState("light")

  const onBodyMutation = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      const currentTheme = getThemeFromBody(mutation.target as HTMLBodyElement)
      setTheme(currentTheme)
    })
  }

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0]
    const currentTheme = getThemeFromBody(body)
    setTheme(currentTheme)
    const bodyMutationObserver = new MutationObserver(onBodyMutation)
    bodyMutationObserver.observe(document.getElementsByTagName("body")[0], {
      attributeFilter: ["class"],
      attributes: true,
    })
    return () => {
      bodyMutationObserver.disconnect()
    }
  }, [])

  return theme
}
