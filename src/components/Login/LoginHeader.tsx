import type { NavigateFunction } from 'react-router'

interface LoginHeaderProps {
  navigate: NavigateFunction
}

export default function LoginHeader({ navigate }: LoginHeaderProps) {
  return (
    <>
      <img
        src="src/assets/logo_black.png"
        alt="오즈코딩스쿨 로고"
        className="mb-[27px] w-[180px]"
      />
      <div className="flex gap-3 text-[16px]">
        <p className="text-[#4D4D4D]"> 아직 회원이 아니신가요?</p>
        <p
          className="cursor-pointer text-[#6201E0]"
          onClick={() => navigate('/join')}
        >
          회원가입 하기
        </p>
      </div>
      <br />
      <br />
    </>
  )
}
