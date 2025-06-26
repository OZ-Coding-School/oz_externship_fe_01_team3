import { mockModalSuccessResponse } from '@/mock/examModalData'
import type { ModalSuccessResponse } from '@/types/examList/examModal'
import { useQuery } from '@tanstack/react-query'

// TODO: 실제 api가 들어오면 api 주소로 수정해야함
const fetchExamModal = async (): Promise<ModalSuccessResponse> => {
  await new Promise((res) => setTimeout(res, 300))
  return mockModalSuccessResponse
}

export const useExamModalQuery = (access_code: string, enabled: boolean) => {
  return useQuery<ModalSuccessResponse>({
    queryKey: ['examModal', access_code],
    queryFn: fetchExamModal,
    enabled,
  })
}
