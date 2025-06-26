import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string
  children?: ReactNode
}

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`${className} eading-[1.4] cursor-pointer rounded-[4px] tracking-[-0.03]`}
      {...rest}
    >
      {children}
    </button>
  )
}
