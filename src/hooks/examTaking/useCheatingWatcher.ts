import { useEffect } from 'react'

export default function useCheatingWatcher(onCheating: () => void) {
  useEffect(() => {
    let isFocused = true
    let cheatingTimer: NodeJS.Timeout | null = null
    let delayedTrigger: NodeJS.Timeout | null = null

    const triggerCheating = () => onCheating()
    // TODO: 함수 hooks, or util로 빼기
    const handleBlur = () => {
      isFocused = false
      triggerCheating()

      delayedTrigger = setTimeout(() => {
        if (!isFocused) {
          triggerCheating()

          cheatingTimer = setInterval(() => {
            if (!isFocused) {
              triggerCheating()
            }
          }, 3000)
        }
      }, 3000)
    }

    const handleFocus = () => {
      isFocused = true

      if (delayedTrigger) {
        clearTimeout(delayedTrigger)
        delayedTrigger = null
      }
      if (cheatingTimer) {
        clearInterval(cheatingTimer)
        cheatingTimer = null
      }
    }

    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      if (delayedTrigger) clearTimeout(delayedTrigger)
      if (cheatingTimer) clearInterval(cheatingTimer)
    }
  }, [onCheating])
}
