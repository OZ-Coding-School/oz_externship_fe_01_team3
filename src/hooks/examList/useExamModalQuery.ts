import { mockModalSuccessResponse } from '@/mock/examModalData'
import { isDevelopment, startExam } from '@/services/examApi'
import type { ModalSuccessResponse } from '@/types/examList/examModal'
import { useQuery } from '@tanstack/react-query'

export const useExamModalQuery = (access_code: string, enabled: boolean) => {
  return useQuery<ModalSuccessResponse>({
    queryKey: ['examModal', access_code],
    queryFn: async () => {
      if (isDevelopment) {
        console.log('🧪 Modal Mock Data 사용 중....')
        await new Promise((res) => setTimeout(res, 300))

        if (access_code.length === 6 && /^\d+$/.test(access_code)) {
          return mockModalSuccessResponse
        }
        throw new Error('유효하지 않은 참가코드입니다.')
      }

      // TODO: 실제 API 호출
      console.log('🌐 실제 참가코드 검증 API 호출 중...')
      return startExam(access_code)
    },
    enabled: enabled && access_code.length === 6,
    retry: false,
    gcTime: 0,
  })
}
