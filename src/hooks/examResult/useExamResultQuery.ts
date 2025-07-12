import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { token } from '@/lib/token'

const getExamResult = async (submissionId: string) => {
  const accessToken = token.get()

  const response = await axios.get(
    `/api/v1/test/submissions/${submissionId}/result/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
