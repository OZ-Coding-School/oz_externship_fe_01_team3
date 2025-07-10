import axios from 'axios'

// 쿠키에서 특정 이름(name)의 값(value)을 읽는 함수
function getCookie(name) {
  const cookieArr = document.cookie.split('; ') // 쿠키 전체를 '; '로 나눠 배열로 만듦
  for (const cookie of cookieArr) {
    const [key, value] = cookie.split('=') // 각 쿠키를 'key=value'로 분리
    if (key === name) return decodeURIComponent(value) // 찾으면 디코딩해서 반환
  }
  return null // 못 찾으면 null 반환
}

// 쿠키에 값(value)을 저장하는 함수
// days가 있으면 그 날짜만큼 쿠키가 유지됨 (만료일 설정)
function setCookie(name, value, days) {
  let expires = ''
  if (days) {
    const date = new Date()
    // 현재 시간 + days일 만큼 더해 쿠키 만료일 계산
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}` // UTC 문자열로 변환해서 만료일 지정
  }
  // 쿠키 저장. path=/ 으로 사이트 전체에서 쿠키 접근 가능하게 함
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`
}

// 쿠키를 삭제하는 함수
// 유효기간을 과거로 설정하면 브라우저가 쿠키를 삭제함
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

// axios 인스턴스 생성
// baseURL: API 서버 기본 주소
// headers: 모든 요청에 JSON 데이터 전송 명시
const api = axios.create({
  baseURL: 'http://54.180.237.77/',
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 설정
// 서버로 요청 보내기 전에 실행됨
api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken') // 쿠키에서 accessToken 읽기
    if (accessToken) {
      // Authorization 헤더에 Bearer 토큰 형식으로 넣어줌
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config // 수정된 config 반환해서 요청 계속 진행
  },
  (error) => Promise.reject(error) // 요청 에러면 그대로 거부 처리
)

// 응답 인터셉터 설정
// 서버 응답 받거나 에러 발생했을 때 실행됨
api.interceptors.response.use(
  (response) => response, // 정상 응답이면 그대로 반환
  async (error) => {
    const originalRequest = error.config // 실패한 요청 정보 저장

    // 401 Unauthorized 에러 && 요청 재시도한 적 없으면
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true // 재시도 플래그 설정해 무한 루프 방지

      try {
        const refreshToken = getCookie('refreshToken') // 쿠키에서 refreshToken 가져오기
        if (!refreshToken) throw new Error('No refresh token found') // 없으면 예외 발생

        // refreshToken으로 서버에 새 accessToken 요청
        const res = await axios.post('http://54.180.237.77/auth/refresh', {
          refreshToken,
        })

        const newAccessToken = res.data.accessToken // 새로 받은 accessToken

        // 새 accessToken 쿠키에 저장 (7일간 유지)
        setCookie('accessToken', newAccessToken, 7)

        // 실패했던 요청에 새 accessToken 넣고 다시 요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // refresh 실패하면 쿠키 삭제하고 로그인 페이지로 이동
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // 401 아니거나 재시도 실패 시 원래 에러 그대로 반환
    return Promise.reject(error)
  }
)

// 만든 axios 인스턴스를 밖으로 내보내기 (다른 곳에서 import해서 사용 가능)
export default api
