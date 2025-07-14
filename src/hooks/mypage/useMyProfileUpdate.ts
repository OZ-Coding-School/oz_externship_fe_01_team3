import { api } from '@/api/axiosInstance'
import { useMutation } from '@tanstack/react-query'

interface UpdateProfileRequest {
  profile_image_file?: File | null
  password?: string
  password2?: string
  nickname?: string
  phone_number?: string
}

interface UpdateProfileResponse {
  message: string
  updated_fields: Record<string, string>
}

const updateProfile = async (
  payload: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const formData = new FormData()

  if (payload.nickname) formData.append('nickname', payload.nickname)
  if (payload.phone_number)
    formData.append('phone_number', payload.phone_number)
  if (payload.password) formData.append('password', payload.password)
  if (payload.password2) formData.append('password2', payload.password2)
  if (payload.profile_image_file)
    formData.append('profile_image_file', payload.profile_image_file)

  const response = await api.patch<UpdateProfileResponse>(
    '/api/v1/auth/profile/update/',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  })
}
