import { useQuery } from '@tanstack/react-query'
import type { ExamListResponseItem } from '@/types/examList/examList'
import { mockExamData } from '@/mock/examListData'
import { isDevelopment, fetchExamList } from '@/services/examApi'

export const useExamListQuery = () => {
  return useQuery<ExamListResponseItem[], Error>({
    queryKey: ['examList'],
    queryFn: async () => {
      if (isDevelopment) {
        console.log('🧪 Mock Data 사용 중....')
        await new Promise((resolve) => setTimeout(resolve, 300))
        return mockExamData
      }

      // TODO: 실제 API 호출
      console.log('🌐 실제 API 호출 중...')
      return fetchExamList()
    },
    staleTime: 1000 * 60 * 5,
  })
}
