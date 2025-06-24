import type React from 'react'

interface LabelProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

export default function Label({
  label,
  children,
  required = true,
}: LabelProps) {
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
