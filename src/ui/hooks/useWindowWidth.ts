import { useEffect, useState } from "react"

export const useWindowWidth = () => {
  const [ windowWidth, setWindowWidth ] = useState(window.outerWidth)
  useEffect(() => {
    window.onresize = (e) => {
      setWindowWidth(window.outerWidth)
    }
  }, [])
  return windowWidth
}