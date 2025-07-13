import { useQuery } from '@tanstack/react-query'
import type { ExamListResponseItem } from '@/types/examList/examList'
import axios from 'axios'
import { token } from '@/lib/token'

// TODO: 실제 API 엔드포인트로 교체
const fetchExamList = async (): Promise<ExamListResponseItem[]> => {
  const accessToken = token.get()
  const response = await axios.get('/api/v1/user/test-list/', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}

export const useExamListQuery = () => {
  return useQuery<ExamListResponseItem[], Error>({
    queryKey: ['examList'],
    queryFn: fetchExamList,
  })
}
