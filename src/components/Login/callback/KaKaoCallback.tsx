import { useEffect } from 'react'
import { token } from '@/lib/token'
import { useNavigate, useSearchParams } from 'react-router'
import { api } from '@/API/axiosInstance'

export default function KaKaoCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = searchParams.get('code')

      if (code) {
        try {
          const response = await api.post('/api/v1/auth/login/kakao', {
            code,
            redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          })

          const { access, refresh, user } = response.data

          token.set(access)
          token.refresh.set(refresh)

          console.log('카카오 로그인 성공', user)
          navigate('/my-quiz')
        } catch (error) {
          console.error('카카오 로그인 실패:', error)
          navigate('/login')
        }
      }
    }

    handleKakaoCallback()
  }, [searchParams, navigate])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
        <p>카카오 로그인 처리 중...</p>
      </div>
    </div>
  )
}
