interface AuthLabelProps {
  htmlFor: string
  children: React.ReactNode
}

export default function AuthLabel({ htmlFor, children }: AuthLabelProps) {
  return (
    <label htmlFor={htmlFor} className="mr-[16px] mb-[20px] text-[#121212]">
      {children}
      <span className="text-[#EC0037]">*</span>
    </label>
  )
}
