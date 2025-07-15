import { api } from '@/API/axiosInstance'
import type { ModalSuccessResponse } from '@/types/examList/examModal'
import { useQuery } from '@tanstack/react-query'

// TODO: 7.12 MSW로 작업해둠, 실제 API가 들어오면 교체해야함 (아직까지 안 들어왔습니다.)
const fetchExamModal = async (
  test_deployment_id: string,
  access_code: string
): Promise<ModalSuccessResponse> => {
  try {
    const {
      data: { data: response },
    } = await api.post<{ message: string; data: ModalSuccessResponse }>(
      `/api/v1/test/submissions/${test_deployment_id}/start/`,
      { access_code }
    )

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useExamModalQuery = (
  test_deployment_id: string,
  access_code: string,
  enabled: boolean = true
) => {
  return useQuery<ModalSuccessResponse>({
    queryKey: ['examModal', test_deployment_id],
    queryFn: () => fetchExamModal(test_deployment_id, access_code),
    enabled,
  })
}
