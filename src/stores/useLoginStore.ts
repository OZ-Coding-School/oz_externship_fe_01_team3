import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types/mock/auth'

export const useAuthStore = create(
  /* 앱을 새로고침해도 상태가 유지되도록 해주는 기능 persist */
  /* 코드에 따로 설정 안했으면 로컬에 저장, 상태 자동 동기화 하기 떄문에 로그아웃도 알아서 판단할 수 있음 */
  persist<{
    isLoggedIn: boolean
    user: User | null
    login: (user: User) => void
    logout: () => void
  }>(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (user: User) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
