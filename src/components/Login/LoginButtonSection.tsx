import SocialButton from '../common/SocialButton'

// TODO: Q. 백엔드에서 KEY값을 언제 주는지,,, REST API KEY를 추가해야하는지 안해야하는지 확인을 해야함.
const STATE = 'random_state_string'
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.REST_API_KEY}&redirect_uri=${import.meta.env.REDIRECT_URL}&response_type=code`
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${import.meta.env.REDIRECT_URL}`

export default function LoginButtonSection() {
  return (
    <>
      {/* 카카오로 회원가입 버튼  */}
      <SocialButton
        bgColor="#FEE500"
        txtColor="#391C1A"
        iconSrc="src/assets/kakao_brown.svg"
        iconAlt="카카오"
        marginBottom="16px"
        onClick={() => (window.location.href = KAKAO_AUTH_URL)}
      >
        카카오 간편 로그인 / 가입
      </SocialButton>

      {/* 네이버로 회원가입 버튼  */}
      <SocialButton
        bgColor="#79f6b2"
        txtColor="#FFFFFF"
        iconSrc="src/assets/naver_white.svg"
        iconAlt="네이버"
        marginBottom="25px"
        onClick={() => (window.location.href = NAVER_AUTH_URL)}
      >
        네이버 간편 로그인 / 가입
      </SocialButton>
    </>
  )
}
