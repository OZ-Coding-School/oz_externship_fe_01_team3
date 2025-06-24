import type { ButtonStatus } from '@/types/common/Button'

interface ButtonProps {
  disabled?: boolean
  onClick?: () => void
  type: ButtonStatus
  className: string
  text?: string
  children?: React.ReactNode
}

export default function Button({
  disabled = false,
  onClick,
  type = 'button',
  className,
  text = '',
  children,
}: ButtonProps) {
  return (
    <button
      className={`${className} rounded-[4px] leading-[1.4] tracking-[-0.03] cursor-pointer`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text || children}
    </button>
  )
}
