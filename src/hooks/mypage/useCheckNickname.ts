import { api } from '@/api/axiosInstance'
import { useMutation } from '@tanstack/react-query'

interface NicknameCheckResponse {
  message: string
}

const checkNickname = async (
  nickname: string
): Promise<NicknameCheckResponse> => {
  const response = await api.post<NicknameCheckResponse>(
    '/api/v1/auth/profile/nickname-check/',
    { nickname }
  )
  return response.data
}

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => checkNickname(nickname),
  })
}
