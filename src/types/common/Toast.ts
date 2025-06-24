export type ToastContextType = {
  showToast: (options: {
    message: string
    type: 'success' | 'error'
    className?: string
    layout?: 'inline' | 'centered'
    subMessage?: string
  }) => void
}

export type ToastProps = {
  message: string
  type: 'success' | 'error'
  className?: string
  layout?: 'inline' | 'centered'
  subMessage?: string
}
