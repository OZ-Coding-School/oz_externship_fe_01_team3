export const useSocialLogin = () => {
  const kakaoLogin = () => {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`
    window.location.href = kakaoURL
  }

  const naverLogin = () => {
    const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID
    const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI
    const state = Math.random().toString(36).substr(2, 11)

    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${state}`
    window.location.href = naverURL
  }

  return {
    kakaoLogin,
    naverLogin,
  }
}
