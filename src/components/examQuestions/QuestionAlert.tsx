import { useState } from 'react'

interface QuestionAlertProps {
  className?: string
  message: string
}

export default function QuestionAlert({
  className,
  message,
}: QuestionAlertProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    isOpen && (
      <div
        className={`flex h-[104px] w-[1200px] items-center justify-between rounded-[8px] bg-[#efe6fc] px-6 ${className}`}
      >
        {/* 왼쪽 내용 */}
        <div className="flex items-start gap-3">
          <div className="text-[20px] text-[#EA3C3C]">⚠️</div>
          <div className="flex flex-col gap-[10px] leading-[1.4] tracking-[-0.03em]">
            <strong className="text-[#121212]text-[18px] font-semibold">
              시험에만 집중해 주세요
            </strong>
            <span className="traking-[-0.03em] text-[16px] leading-[1.4] font-normal text-[#121212]">
              {message}
            </span>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button
          className="cursor-pointer text-[#666] hover:text-black"
          onClick={handleClose}
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
    )
  )
}
