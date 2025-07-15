import { useEffect } from 'react'
import { token } from '@/lib/token'
import { useNavigate, useSearchParams } from 'react-router'
import { api } from '@/API/axiosInstance'

export default function NaverCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const handleNaverCallback = async () => {
      const code = searchParams.get('code')
      const state = searchParams.get('state')

      if (code && state) {
        try {
          const response = await api.post('/api/v1/auth/login/naver', {
            code,
            state,
            redirect_uri: import.meta.env.VITE_NAVER_REDIRECT_URI,
          })

          const { access, refresh, user } = response.data

          token.set(access)
          token.refresh.set(refresh)

          console.log('네이버 로그인 성공', user)
          navigate('/my-quiz')
        } catch (error) {
          console.error('네이버 로그인 실패:', error)
          navigate('/login')
        }
      } else {
        navigate('/login')
      }
    }

    handleNaverCallback()
  }, [searchParams, navigate])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-green-600"></div>
        <p>네이버 로그인 처리 중...</p>
      </div>
    </div>
  )
}
