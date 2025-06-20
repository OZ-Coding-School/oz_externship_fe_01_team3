import React, { useState } from 'react'
import { ToastContext } from '@/context/ToastBoxContext'
import { Toast } from '@/components/common/Toast'

export interface ToastProps {
  message: string
  type: 'success' | 'error'
}

interface ToastBoxProviderProps {
  children: React.ReactNode
}

export const ToastBoxProvider = ({ children }: ToastBoxProviderProps) => {
  const [toast, setToast] = useState<ToastProps | null>(null)

  const showToast = ({ message, type }: ToastProps) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast toast={toast} />
    </ToastContext.Provider>
  )
}
