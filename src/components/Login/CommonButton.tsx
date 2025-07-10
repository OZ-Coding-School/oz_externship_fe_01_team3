// 아이디 찾기, 비밀번호 찾기 공통 보라색 버튼 컴포넌트
interface CommonButtonProps {
  onClick?: () => void
  text?: string
  disabled?: boolean
}

export default function CommonButton({
  onClick,
  text,
  disabled,
}: CommonButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-[40px] mb-[24px] h-[52px] w-[348px] rounded-[4px] ${
        disabled
          ? 'cursor-not-allowed bg-[#ECECEC] text-[#BDBDBD]'
          : 'cursor-pointer bg-[#6201E0] text-[#EFE6FC] hover:bg-[#4B00B5]'
      }`}
    >
      {text}
    </button>
  )
}
