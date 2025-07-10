import type React from 'react'

interface ValidateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'active' | 'inactive' // variant prop 추가 (필요에 따라 조절)
}

export default function ValidateButton({
  variant,
  className,
  children,
  ...rest
}: ValidateButtonProps) {
  const baseStyle = 'ml-[12px] h-[48px] w-[112px] rounded-[4px] border'
  const variantStyle =
    variant === 'active'
      ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]'
      : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'
  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className ?? ''} `}
      {...rest}
    >
      {children}
    </button>
  )
}
