import { useState } from 'react'
type Status = 'default' | 'error' | 'success' | 'focus'

interface PasswordProps {
  value: string
  onChange: (v: string) => void
  placeholder: string
  status: Status
  error?: string
  success?: string
}

export default function Password({
  value,
  onChange,
  placeholder,
  status = 'default',
  error,
  success,
}: PasswordProps) {
  const [visible, setVisble] = useState(false)
  const padding = 'pt-[10px] pr-[16px] pb-[10px] pl-[16px]'

  const baseClass = `w-[288px] h-[48px] ${padding} rounded-sm border-2 outline-none`

  const statusClass = {
    default: 'border-[#BDBDBD] text-[#121212] placeholder-[#BDBDBD]',
    focus: 'border-[#121212] text-[#121212] placeholder-[#BDBDBD]',
    error: 'text-[#121212] border-[#EC0037] placeholder-[#BDBDBD]',
    success: 'text-[#121212] border-[#14C786] placeholder-[#BDBDBD]',
  }
  // visible 회의 후 아이콘으로 변경 예정
  return (
    <>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className={`${baseClass} ${statusClass[status]}`}
        />
        <div
          className="absolute right-[12px] top-1/2 transform -translate-y-1/2 cursor-pointer "
          onClick={() => setVisble(!visible)}
        >
          {visible ? '숨기' : '보기'}
        </div>
      </div>

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
