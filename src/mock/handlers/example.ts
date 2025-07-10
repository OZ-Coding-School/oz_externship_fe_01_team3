import { http, HttpResponse } from 'msw'
import type {
  ExamSendCodeRequest,
  ExamSendCodeResponse,
} from '@/types/mock/example'
import { mockExamData } from '../examListData'
import type { ExamResult } from '@/types/examResult/examResult'
import examResultData from '../examResultData'
import type { ErrorResponse } from '@/types/mock/auth'
import type { ExamListResponseItem } from '@/types/examList/examList'

export const exampleHandlers = [
  // 쪽지시험 목록 조회
  http.get<never, ExamListResponseItem>(
    '/api/v1/user/test-list/',
    async ({ request }) => {
      const authHeader = request.headers.get('Authorization')

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '인증 정보가 없거나 유효하지 않습니다.',
            code: 'AUTHORIZATION_HEADER_REQUIRED',
          },
          { status: 401 }
        )
      }

      const token = authHeader.replace('Bearer ', '')
      if (token === 'invalid_token') {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '접근 권한이 없습니다.',
            code: '유효하지 않는 토큰입니다.',
          },
          { status: 403 }
        )
      }

      return HttpResponse.json<ExamListResponseItem[]>(mockExamData)
    }
  ),

  //쪽지시험 모달 인증 번호
  http.post<never, ExamSendCodeRequest>(
    '/api/v1/auth/exam/send-code',
    async ({ request }) => {
      const { access_token } = await request.json()

      if (!access_token) {
        return HttpResponse.json<ErrorResponse>({
          error: 'access_token is required',
          code: 'ACCESS_TOKEN_REQUIRED',
        })
      }

      return HttpResponse.json<ExamSendCodeResponse>({
        message: '시험 목록을 성공적으로 조회하였습니다.',
        exam_list: mockExamData,
      })
    }
  ),

  // 쪽지시험 결과
  http.get<{ submission_id: string }, never>(
    '/api/v1/test/submissions/:submission_id/result/',
    async ({ request }) => {
      const authHeader = request.headers.get('Authorization')

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // 공백 추가
        return HttpResponse.json<ErrorResponse>(
          {
            error: '인증 정보가 없거나 유효하지 않습니다.',
            code: 'AUTHORIZATION_HEADER_REQUIRED',
          },
          { status: 401 }
        )
      }

      const token = authHeader.replace('Bearer ', '')
      if (token === 'invalid_token') {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '접근 권한이 없습니다.',
            code: '유효하지 않는 토큰입니다.',
          },
          { status: 403 }
        )
      }

      return HttpResponse.json<ExamResult>(examResultData)
    }
  ),
]
