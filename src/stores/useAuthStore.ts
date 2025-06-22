import { create } from 'zustand'

interface User {
  // TODO: 아직의 유저의 상태를 모르겠음.
  id: string
  name: string
  email: string
  accessToken?: string
}

interface UserAuthStatus {
  user: User | null
  isAuthenticated: boolean
  accessToken?: string | null

  login: (user: User, accessToken: string) => void
  logout: () => void
}

export const useAuthStore = create<UserAuthStatus>((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,

  login: (user, accessToken) => {
    localStorage.setItem('userToken', JSON.stringify({ accessToken }))
    set({
      user,
      accessToken,
      isAuthenticated: true,
    })
  },

  logout: () => {
    localStorage.removeItem('userToken')
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    })
  },
}))
