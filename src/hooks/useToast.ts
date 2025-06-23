import { useContext } from 'react'
import { ToastContext } from '@/context/ToastBoxContext'

export const useToast = () => useContext(ToastContext)
