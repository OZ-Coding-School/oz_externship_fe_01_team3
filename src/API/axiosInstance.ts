import { token } from '@/lib/token'
import axios from 'axios'

const BASE_URL = process.env.VITE_API_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = token.get()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const refreshToken = token.refresh.get()

        if (!refreshToken) {
          throw new Error('리프레시 토큰을 찾을 수 없습니다.')
        }

        const res = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        })

        const newAccessToken = res.data.accessToken

        token.set(newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        token.clear()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
