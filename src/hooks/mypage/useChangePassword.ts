import { api } from '@/api/axiosInstance'
import { useMutation } from '@tanstack/react-query'

interface user_change_password {
  email: string
  new_password: string
  new_password_confirm: string
}

const ChangePassword = async (
  email: string,
  new_password: string,
  new_password_confirm: string
): Promise<user_change_password> => {
  const response = await api.post<user_change_password>(
    '/api/v1/auth/account/change-password/',
    { email, new_password, new_password_confirm }
  )
  return response.data
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({
      email,
      new_password,
      new_password_confirm,
    }: {
      email: string
      new_password: string
      new_password_confirm: string
    }) => ChangePassword(email, new_password, new_password_confirm),
  })
}
