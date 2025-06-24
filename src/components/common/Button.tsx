import type { ButtonStatus } from '@/types/common/Button'

interface ButtonProps {
  disabled?: boolean
  onclick?: () => void
  type: ButtonStatus
  className: string
  text: string
}

export default function Button({
  disabled = false,
  onclick,
  type = 'button',
  className,
  text,
}: ButtonProps) {
  return (
    <button
      className={`${className} rounded-[4px] eading-[1.4] tracking-[-0.03] cursor-pointer`}
      disabled={disabled}
      onClick={onclick}
      type={type}
    >
      {text}
    </button>
  )
}
