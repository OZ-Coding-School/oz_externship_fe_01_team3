import { api } from '@/API/axiosInstance'
import { useMutation } from '@tanstack/react-query'

interface PhoneNumberCheckResponse {
  phone: string
}

const checkPhoneNumber = async (
  phone: string
): Promise<PhoneNumberCheckResponse> => {
  const response = await api.post<PhoneNumberCheckResponse>(
    '/api/v1/auth/phone/send-code/',
    { phone }
  )
  return response.data
}

export const useCheckPhoneNumber = () => {
  return useMutation({
    mutationFn: (phone: string) => checkPhoneNumber(phone),
  })
}
