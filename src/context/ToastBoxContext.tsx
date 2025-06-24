import { createContext } from 'react'
import type { ToastContextType } from '@/types/common/Toast'

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
})
