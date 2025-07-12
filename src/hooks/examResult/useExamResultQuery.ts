import { token } from '@/lib/token'
import type { ExamResult } from '@/types/examResult/examResult'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getExamResult = async (submissionId: string) => {
  const access_code = token.get()
  const response = await axios.get<ExamResult>(
    `/api/v1/test/submissions/${submissionId}/result/`,
    {
      headers: {
        Authorization: `Bearer ${access_code}`,
      },
    }
  )
  return response.data
}

export const useExamResultQuery = (submissionId: string) => {
  return useQuery({
    queryKey: ['examResult', submissionId],
    queryFn: () => getExamResult(submissionId),
  })
}
