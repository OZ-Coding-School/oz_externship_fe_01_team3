import SocialButton from '../common/SocialButton'
import { useSocialLogin } from '@/hooks/login/useSocialLogin'

export default function LoginButtonSection() {
  const { kakaoLogin, naverLogin } = useSocialLogin()

  return (
    <>
      {/* 카카오로 회원가입 버튼  */}
      <SocialButton
        bgColor="#FEE500"
        txtColor="#391C1A"
        iconSrc="src/assets/kakao_brown.svg"
        iconAlt="카카오"
        marginBottom="16px"
        onClick={kakaoLogin}
      >
        카카오 간편 로그인 / 가입
      </SocialButton>

      {/* 네이버로 회원가입 버튼  */}
      <SocialButton
        bgColor="#03C75A"
        txtColor="#FFFFFF"
        iconSrc="src/assets/naver_white.svg"
        iconAlt="네이버"
        marginBottom="25px"
        onClick={naverLogin}
      >
        네이버 간편 로그인 / 가입
      </SocialButton>
    </>
  )
}
