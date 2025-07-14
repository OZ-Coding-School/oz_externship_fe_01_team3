import { api } from '@/api/axiosInstance'
import type { MyPage } from '@/types/mypage/myPage'
import { useQuery } from '@tanstack/react-query'

const fetchUserProfile = async (): Promise<MyPage> => {
  const response = await api.get<MyPage>(`/api/v1/auth/profile/`)
  return response.data
}
/* 유저 프로필 */
export const useUser = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchUserProfile(),
  })
}
