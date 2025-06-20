import { createContext } from 'react'

type ToastContextType = {
  showToast: (options: { message: string; type: 'success' | 'error' }) => void
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
})
