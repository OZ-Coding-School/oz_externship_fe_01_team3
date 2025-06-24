import React, { useState } from 'react'
import { ToastContext } from '@/context/ToastBoxContext'
import { Toast } from '@/components/common/Toast'
import type { ToastProps } from '@/types/common/Toast'

interface ToastBoxProviderProps {
  children: React.ReactNode
}

export const ToastBoxProvider = ({ children }: ToastBoxProviderProps) => {
  const [toast, setToast] = useState<ToastProps | null>(null)

  const showToast = ({
    message,
    type,
    className,
    layout,
    subMessage,
  }: ToastProps) => {
    setToast({ message, type, className, layout, subMessage })
    setTimeout(() => setToast(null), 4000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast toast={toast} />
    </ToastContext.Provider>
  )
}
