import { useQuery } from '@tanstack/react-query'
import type { ExamListResponseItem } from '@/types/examList/examList'
import { mockExamData } from '@/mock/examListData'

// TODO: 실제 API 엔드포인트로 교체
const fetchExamList = async (): Promise<ExamListResponseItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockExamData
}

export const useExamListQuery = () => {
  return useQuery<ExamListResponseItem[], Error>({
    queryKey: ['examList'],
    queryFn: fetchExamList,
  })
}
