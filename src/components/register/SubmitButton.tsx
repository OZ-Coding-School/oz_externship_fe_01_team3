import type React from 'react'

interface SubmitButtonProps {
  isAllFieldsFilled: boolean
}

export default function SubmitButton({ isAllFieldsFilled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`mt-[52px] h-[52px] w-[480px] gap-2 rounded-[4px] transition-colors ${
        isAllFieldsFilled
          ? 'bg-[#6201E0] text-white hover:bg-[#5001c0]'
          : 'cursor-not-allowed bg-[#ECECEC] text-[#BDBDBD]'
      }`}
      disabled={!isAllFieldsFilled}
    >
      가입하기
    </button>
  )
}
