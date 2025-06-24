interface ToastProps {
  toast: {
    message: string
    type: 'success' | 'error'
  } | null
}

export const Toast = ({ toast }: ToastProps) => {
  if (!toast) return null

  const bgColor = toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'

  return (
    <div
      className={`fixed left-1/2 bottom-1/2 -translate-x-1/2 px-4 py-2 rounded text-white ${bgColor}`}
    >
      {toast.message}
    </div>
  )
}
