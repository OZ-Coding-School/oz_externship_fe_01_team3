import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string
  children?: ReactNode
}

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`${className} rounded-[4px] eading-[1.4] tracking-[-0.03] cursor-pointer`}
      {...rest}
    >
      {children}
    </button>
  )
}
