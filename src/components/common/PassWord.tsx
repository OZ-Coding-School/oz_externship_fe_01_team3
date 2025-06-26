import type { PassWordStatus } from '@/types/common/PassWord'
import { useState } from 'react'

interface PasswordProps {
  value: string
  onChange: (v: string) => void
  placeholder: string
  status: PassWordStatus
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
          className="absolute top-1/2 right-[12px] -translate-y-1/2 transform cursor-pointer"
          onClick={() => setVisble(!visible)}
        >
          {visible ? '숨기' : '보기'}
        </div>
      </div>

      {error && (
        <span className="mt-[4px] text-base font-normal text-[#EC0037]">
          *{error}
        </span>
      )}
      {success && (
        <span className="mt-[4px] text-base font-normal text-[#14C786]">
          *{success}
        </span>
      )}
    </>
  )
}
