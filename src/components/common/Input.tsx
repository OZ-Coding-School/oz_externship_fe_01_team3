type Status = 'default' | 'error' | 'success' | 'focus'

interface InputProps {
  value: string
  placeholder: string
  onChange: (value: string) => void
  disabled?: boolean
  status: Status
  error?: string
  success?: string
}

export default function Input({
  value,
  placeholder,
  onChange,
  disabled = false,
  status = 'default',
  success,
  error,
}: InputProps) {
  const padding = 'pt-[10px] pr-[16px] pb-[10px] pl-[16px]'

  const baseClass = `w-[288px] h-[48px] ${padding} rounded-sm border-2 outline-none`
  const disabledTrue =
    'border-[#BDBDBD] text-[#BDBDBD] placeholder-[#BDBDBD] bg-[#bdbdbf35]'

  const statusClass = {
    default: 'border-[#BDBDBD] text-[#121212] placeholder-[#BDBDBD]',
    focus: 'border-[#6201E0] text-[#121212] placeholder-[#BDBDBD]',
    error: 'text-[#121212] border-[#EC0037] placeholder-[#BDBDBD]',
    success: 'text-[#121212] border-[#14C786] placeholder-[#BDBDBD]',
  }

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        value={value}
        disabled={disabled}
        className={
          disabled
            ? `${baseClass} ${disabledTrue}`
            : `${baseClass} ${statusClass[status]}`
        }
      />
      {error && (
        <span className="font-normal text-base text-[#EC0037] mt-[4px]">
          *{error}
        </span>
      )}
      {success && (
        <span className="font-normal text-base text-[#14C786] mt-[4px]">
          *{success}
        </span>
      )}
    </>
  )
}
