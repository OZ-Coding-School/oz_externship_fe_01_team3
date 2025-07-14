import { api } from '@/API/axiosInstance'
import { token } from '@/lib/token'
import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

export default function NaverCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuthStore()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (code) {
      handleNaverLogin(code, state)
    } else {
      navigate('/login')
    }
  }, [])

  const handleNaverLogin = async (code: string, state: string | null) => {
    try {
      const response = await api.post('/api/v1/auth/login/naver', {
        code,
        state,
      })

      const { accessToken, refreshToken, user } = response.data

      token.set(accessToken)
      token.refresh.set(refreshToken)

      login(user, accessToken)

      navigate('/my-quiz')
    } catch (error) {
      console.error('네이버 로그인을 실패하였습니다')
      throw new Error()
    }
  }
  return <div>NaverCallback</div>
}
