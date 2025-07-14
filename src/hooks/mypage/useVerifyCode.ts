import { api } from '@/api/axiosInstance'
import { useMutation } from '@tanstack/react-query'

interface verify_code {
  phone: string
  code: string
}

const verifycode = async (
  phone: string,
  code: string
): Promise<verify_code> => {
  const response = await api.post<verify_code>(
    '/api/v1/auth/phone/verify-code/',
    { phone, code }
  )
  return response.data
}

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      verifycode(phone, code),
  })
}
