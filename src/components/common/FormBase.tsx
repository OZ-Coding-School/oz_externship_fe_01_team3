import type React from 'react'

type FormBaseProps = {
  label: string //라벨명
  required?: boolean //안에 들어갈 input들
  children: React.ReactNode
}

export default function FormBase({
  label,
  children,
  required = true,
}: FormBaseProps) {
  return (
    <div className="w-[348px] flex flex-col">
      <label className="text-base font-medium text-[#121212] mb-[20px]">
        {label}
        {required && (
          <span className="font-normal text-base text-[#EC0037]">*</span>
        )}
      </label>
      {children}
    </div>
  )
}
