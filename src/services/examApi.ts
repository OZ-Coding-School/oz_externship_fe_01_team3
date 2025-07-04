import type { ExamListResponseItem } from '@/types/examList/examList'
import type { ModalSuccessResponse } from '@/types/examList/examModal'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const getAuthToken = () => {
  return localStorage.getItem('access_token')
}

const getHeaders = () => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export const fetchExamList = async (
  status?: string
): Promise<ExamListResponseItem[]> => {
  const queryParams = status ? `?status=${status}` : ''
  const url = `${API_BASE_URL}/api/v1/admin/test-list/${queryParams}`

  const response = await axios.get(url, {
    headers: getHeaders(),
  })

  if (response.status !== 200) {
    const errorData = response.data
    throw new Error(errorData.detail || '시험 목록을 불러오는데 실패했습니다.')
  }

  return response.data
}

export const startExam = async (
  access_code: string
): Promise<ModalSuccessResponse> => {
  const url = `${API_BASE_URL}/api/v1/test/submissions/start/`

  const response = await axios.post(
    url,
    {
      access_code,
    },
    {
      headers: getHeaders(),
    }
  )

  if (response.status !== 200) {
    const errorData = response.data
    throw new Error(errorData.detail || '시험 시작에 실패했습니다.')
  }

  return response.data
}

export const isDevelopment = process.env.NODE_ENV === 'development'
