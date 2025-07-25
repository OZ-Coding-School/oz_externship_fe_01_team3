import SocialButton from '@/components/common/SocialButton'
import { useSocialLogin } from '@/hooks/login/useSocialLogin'
import { useNavigate } from 'react-router'
import logo_black from '@/assets/logo_black.png'
import kakao_brown from '@/assets/kakao_brown.svg'
import naver_white from '@/assets/naver_white.svg'

function Join() {
  const navigate = useNavigate()
  const { kakaoLogin, naverLogin } = useSocialLogin()

  return (
    <div className="flex flex-col items-center pt-20">
      <img
        src={logo_black}
        alt="오즈코딩스쿨 로고"
        className="mb-[27px] w-[180px]"
      />
      <div className="flex gap-3 text-[16px]">
        <p className="text-[#4D4D4D]"> 회원 이신가요?</p>
        <p
          className="cursor-pointer text-[#6201E0]"
          onClick={() => navigate('/login')}
        >
          {' '}
          로그인 하기
        </p>
      </div>
      <br />
      <br />

      {/* 카카오로 회원 가입 버튼  */}
      <SocialButton
        bgColor="#FEE500"
        txtColor="#391C1A"
        iconSrc={kakao_brown}
        iconAlt="카카오"
        marginBottom="16px"
        onClick={kakaoLogin}
      >
        카카오로 3초만에 가입하기
      </SocialButton>

      {/* 네이버로 회원 가입 버튼  */}
      <SocialButton
        bgColor="#03C75A"
        txtColor="#FFFFFF"
        iconSrc={naver_white}
        iconAlt="네이버"
        marginBottom="25px"
        onClick={naverLogin}
      >
        네이버로 가입하기
      </SocialButton>

      <p
        className="cursor-pointer text-[#4D4D4D] underline"
        onClick={() => navigate('/register')}
      >
        {' '}
        일반회원 가입
      </p>
    </div>
  )
}

export default Join
