interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  variant: string
  className?: string
}

export default function AuthInput({
  placeholder,
  variant,
  className,
  type = 'text',
  maxLength,
  inputMode,
  ...rest
}: AuthInputProps) {
  const baseStyle =
    'h-[48px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none'
  const variantStyle =
    variant === 'error'
      ? 'border-[#EC0037]'
      : variant === 'success'
        ? 'border-[#14C786]'
        : 'border-[#BDBDBD]'
  return (
    <div>
      <input
        className={`${baseStyle} ${variantStyle} ${className ?? ''}`}
        placeholder={placeholder}
        type={type}
        {...rest}
        maxLength={maxLength}
        inputMode={inputMode}
      />
    </div>
  )
}
