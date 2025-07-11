import { http, HttpResponse } from 'msw'
import type { ExamSendCodeRequest } from '@/types/mock/example'
import { mockExamData } from '@/mock/examListData'
import type { ExamResult } from '@/types/examResult/examResult'
import examResultData from '@/mock/examResultData'
import type { ErrorResponse } from '@/types/mock/auth'
import type { ExamListResponseItem } from '@/types/examList/examList'
import { mockModalSuccessResponse } from '@/mock/examModalData'
import type { ModalSuccessResponse } from '@/types/examList/examModal'

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
  http.post<{ test_deployment_id: string }, ExamSendCodeRequest>(
    '/api/v1/tests/:test_deployment_id/validate/',
    async ({ request, params }) => {
      const { access_token } = await request.json()
      const { test_deployment_id } = params

      const authHeader = request.headers.get('Authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return HttpResponse.json<ErrorResponse>(
          {
            detail: '인증되지 않았습니다.',
          },
          { status: 403 }
        )
      }

      if (!test_deployment_id) {
        return HttpResponse.json<ErrorResponse>(
          {
            detail: '유효하지 않은 배포 ID입니다.',
          },
          { status: 400 }
        )
      }

      if (!access_token) {
        return HttpResponse.json<ErrorResponse>(
          {
            detail: '참가코드가 필요합니다.',
          },
          { status: 400 }
        )
      }

      const validAccessCode = '123456'
      if (access_token !== validAccessCode) {
        return HttpResponse.json<ErrorResponse>(
          {
            detail: '유효하지 않은 참가코드입니다.',
          },
          { status: 400 }
        )
      }

      const validDeploymentId = '1'
      if (test_deployment_id !== validDeploymentId) {
        return HttpResponse.json<ErrorResponse>(
          {
            detail: '유효하지 않은 배포 ID입니다.',
          },
          { status: 400 }
        )
      }

      return HttpResponse.json<ModalSuccessResponse>(mockModalSuccessResponse)
    }
  ),

  // 쪽지시험 결과
  http.get<{ submission_id: string }, never>(
    '/api/v1/test/submissions/:submission_id/result/',
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

      return HttpResponse.json<ExamResult>(examResultData)
    }
  ),
]
