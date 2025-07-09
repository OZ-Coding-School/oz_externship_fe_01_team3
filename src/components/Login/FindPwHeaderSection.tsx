interface FindPwHeaderSectionProps {
  emailVerified: boolean
}

export default function FindPwHeaderSection({
  emailVerified,
}: FindPwHeaderSectionProps) {
  return (
    <div className="mt-[10px] flex flex-col items-center justify-center">
      <img
        src="src/assets/FindPwicon.png"
        alt="find"
        className="mb-[16px] h-[28px] w-[28px]"
      />
      <p className="mb-[16px] text-[20px] leading-none font-bold text-[#121212]">
        {emailVerified ? '비밀번호 재설정' : '비밀번호 찾기'}
      </p>
      <p className="text-sm leading-none text-[#4D4D4D]">
        {emailVerified
          ? '신규 비밀번호를 입력해주세요.'
          : '이메일로 비밀번호 재설정 인증코드를 보내드려요.'}
      </p>
    </div>
  )
}
