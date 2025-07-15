import FindIDicon from '@/assets/FindIdicon.png'
interface FindIdHeaderProps {
  errorMessage: string
  foundId: string
}

export default function FindIdHeader({
  errorMessage,
  foundId,
}: FindIdHeaderProps) {
  return (
    <div className="mt-[10px] flex flex-col items-center justify-center">
      <img
        src={FindIDicon}
        alt="find"
        className="mb-[16px] h-[28px] w-[28px]"
      />
      <p className="mb-[16px] text-[20px] leading-none font-bold text-[#121212]">
        아이디 찾기
      </p>
      {foundId && (
        <p className="4 mb-[32px] text-center text-sm leading-none whitespace-pre-line">
          입력하신 정보와 일치하는 아이디입니다.
        </p>
      )}
      {errorMessage && (
        <p className="text-center text-sm whitespace-pre-line text-[#EC0037]">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
