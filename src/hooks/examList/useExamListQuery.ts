import { useQuery } from '@tanstack/react-query'
import { token } from '@/lib/token'
import { api } from '@/API/axiosInstance'
import { mockExamData } from '@/mock/examListData'
import {
  mapApiToExamData,
  type ExamListApiResponse,
  type ExamListResponseItem,
} from '@/types/examList/examList'

interface ExamListApiWrapper {
  message: string
  data: ExamListApiResponse[]
}
const fetchExamList = async (): Promise<ExamListResponseItem[]> => {
  try {
    const {
      data: { data: examData },
    } = await api.get<ExamListApiWrapper>('/api/v1/test/deployments')

    return examData.map(mapApiToExamData)
  } catch (error) {
    console.error('API 에러 발생, 목데이터 사용:', error)
    return mockExamData
  }
}

export const useExamListQuery = () => {
  return useQuery<ExamListResponseItem[], Error>({
    queryKey: ['examList'],
    queryFn: fetchExamList,
    staleTime: 5 * 60 * 1000,
  })
}
