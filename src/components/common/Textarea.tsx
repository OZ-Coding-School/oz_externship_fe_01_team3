type Status = 'default' | 'focus'

interface TextareaProps {
  value: string
  placeholder: string
  onChange: (v: string) => void
  status: Status
}

export default function Textarea({
  value,
  placeholder,
  status = 'default',
  onChange,
}: TextareaProps) {
  const padding = 'pt-[20px] pr-[16px] pb-[20px] pl-[16px]'
  const baseClass = `w-[598px] h-[134px] ${padding} rounded-sm border-2 resize-none outline-none`

  const statusClass = {
    default: 'border-[#BDBDBD] text-[#121212] placeholder-[#BDBDBD]',
    focus: 'border-[#9D9D9D] text-[#121212] placeholder-[#BDBDBD]',
  }
  return (
    <textarea
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className={`${baseClass} ${statusClass[status]}`}
    />
  )
}
