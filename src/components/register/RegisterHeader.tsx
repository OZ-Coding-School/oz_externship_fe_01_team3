import logo_black from '@/assets/logo_black.png'
export default function RegisterHeader() {
  return (
    <div className="mb-[27px] flex flex-col flex-wrap items-center gap-2">
      <p>마법같이 빠르게 성장시켜줄</p>
      <img
        src={logo_black}
        alt="오즈코딩스쿨 로고"
        className="mb-[27px] h-[24px] w-[180px]"
      />
      <p className="mb-[20px]">회원가입</p>
    </div>
  )
}
