import { useEffect } from "react"

export const useOutsideClick = (ref, handler) => {
  useEffect(() => {
    const handleEvent = (event) => {
      if(ref.current && ref.current.contains(event.target)) {
        return
      }
      handler();
    }

    document.addEventListener('click', handleEvent)

    return () => {
      document.removeEventListener('click', handleEvent)
    }
  })
}