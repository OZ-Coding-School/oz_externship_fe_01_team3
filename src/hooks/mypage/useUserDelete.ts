import { api } from '@/api/axiosInstance'
import { useMutation } from '@tanstack/react-query'

interface user_withdrawal {
  reason: string
  detail: string
}

const WithdrawRequest = async (
  reason: string,
  detail: string
): Promise<user_withdrawal> => {
  const response = await api.post<user_withdrawal>(
    '/api/v1/auth/users/delete/',
    { reason, detail }
  )
  return response.data
}

export const useWithdrawRequest = () => {
  return useMutation({
    mutationFn: ({ reason, detail }: { reason: string; detail: string }) =>
      WithdrawRequest(reason, detail),
  })
}
