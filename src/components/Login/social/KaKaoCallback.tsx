import { api } from '@/API/axiosInstance'
import { token } from '@/lib/token'
import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

export default function KaKaoCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuthStore()

  useEffect(() => {
    const code = searchParams.get('code')
    const state = searchParams.get('state')

    if (code) {
      handleKakaoLogin(code, state)
    } else {
      navigate('/login')
    }
  }, [])

  const handleKakaoLogin = async (code: string, state: string | null) => {
    try {
      const response = await api.post('/api/v1/auth/login/kakao', {
        code,
        state,
      })

      const { accessToken, refreshToken, user } = response.data

      token.set(accessToken)
      token.refresh.set(refreshToken)

      login(user, accessToken)

      navigate('/my-quiz')
    } catch (error) {
      console.error('카카오 로그인 실패:', error)
      navigate('/login')
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="text-lg">카카오 로그인 처리 중...</div>
        <div className="mt-4 text-sm text-gray-500">잠시만 기다려주세요</div>
      </div>
    </div>
  )
}
