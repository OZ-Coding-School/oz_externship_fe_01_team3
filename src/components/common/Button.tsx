type Status = 'button' | 'reset' | 'submit'

interface ButtonProps {
  disabled?: boolean
  onclick?: () => void
  type: Status
  className: string
  children: React.ReactNode
}

// rounded-[4px] eading-[1.4] tracking-[-00.3] 공통 css
/*

*/

export default function Button({
  disabled = false,
  onclick,
  type = 'button',
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={`${className} rounded-[4px] eading-[1.4] tracking-[-0.03] cursor-pointer`}
      disabled={disabled}
      onClick={onclick}
      type={type}
    >
      {children}
    </button>
  )
}
