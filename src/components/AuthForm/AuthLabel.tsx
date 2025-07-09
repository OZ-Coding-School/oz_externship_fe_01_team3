interface AuthLabelProps {
  htmlFor: string
  children: React.ReactNode
  className?: string
}

export default function AuthLabel({
  htmlFor,
  children,
  className,
}: AuthLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mr-[16px] mb-[20px] text-[#121212] ${className ?? ''}`}
    >
      {children}
      <span className="text-[#EC0037]">*</span>
    </label>
  )
}
