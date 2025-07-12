import type { ModalSuccessResponse } from '@/types/examList/examModal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { token } from '@/lib/token'

// TODO: 7.12 MSW로 작업해둠, 실제 API가 들어오면 교체해야함 (아직까지 안 들어왔습니다.)
const fetchExamModal = async (
  access_code: string,
  deployment_id: string
): Promise<ModalSuccessResponse> => {
  try {
    const accessToken = token.get()
    const response = await axios.post<ModalSuccessResponse>(
      `/api/v1/tests/${deployment_id}/validate/`,
      {
        access_token: access_code,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useExamModalQuery = (
  access_code: string,
  enabled: boolean,
  deployment_id: string
) => {
  return useQuery<ModalSuccessResponse>({
    queryKey: ['examModal', access_code, deployment_id],
    queryFn: () => fetchExamModal(access_code, deployment_id),
    enabled,
  })
}
