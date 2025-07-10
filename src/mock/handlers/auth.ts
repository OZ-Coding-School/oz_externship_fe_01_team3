import { http, HttpResponse } from 'msw'
import type {
  NicknameCheckRequest,
  NicknameCheckResponse,
  ErrorResponse,
  EmailSendCodeRequest,
  EmailSendCodeResponse,
  EmailVerifyCodeRequest,
  EmailVerifyCodeResponse,
  PhoneSendCodeRequest,
  PhoneSendCodeResponse,
  PhoneVerifyCodeRequest,
  PhoneVerifyCodeResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/mock/auth'

export const authHandlers = [
  // 닉네임 중복확인
  http.post<never, NicknameCheckRequest>(
    '/api/v1/auth/profile/nickname-check/',
    async ({ request }) => {
      const { nickname } = await request.json()
      const isDuplicate = nickname === 'tester1'

      if (isDuplicate) {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '이미 사용 중인 닉네임입니다.',
            code: 'NICKNAME_ALREADY_EXISTS',
          },
          { status: 404 }
        )
      }

      return HttpResponse.json<NicknameCheckResponse>({
        message: '사용 가능한 닉네임입니다.',
        available: true,
      })
    }
  ),

  // 이메일 전송코드
  http.post<never, EmailSendCodeRequest>(
    '/api/v1/auth/email/send-code',
    async ({ request }) => {
      const { email } = await request.json()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(email)) {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '유효하지 않은 이메일 형식입니다.',
            code: 'INVALID_EMAIL_FORMAT',
          },
          { status: 400 }
        )
      }

      return HttpResponse.json<EmailSendCodeResponse>({
        message: '인증코드가 발송되었습니다.',
        email: email,
        expires_in: 300, // 5분
      })
    }
  ),

  // 이메일 인증번호 확인
  http.post<never, EmailVerifyCodeRequest>(
    '/api/v1/auth/email/verify-code',
    async ({ request }) => {
      const { verification_code } = await request.json()

      const correctCode = '123456'

      if (verification_code !== correctCode) {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '인증번호가 일치하지 않습니다.',
            code: 'INVALID_VERIFICATION_CODE',
          },
          { status: 400 }
        )
      }

      return HttpResponse.json<EmailVerifyCodeResponse>({
        message: '이메일 인증이 완료되었습니다.',
        verified: true,
        token: 'mock-token',
      })
    }
  ),

  // 휴대전화 인증번호 전송
  http.post<never, PhoneSendCodeRequest>(
    '/api/v1/auth/phone/send-code',
    async ({ request }) => {
      const { phone } = await request.json()

      const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/
      if (!phoneRegex.test(phone)) {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '유효하지 않은 휴대전화 번호입니다.',
            code: 'INVALID_PHONE_FORMAT',
          },
          { status: 400 }
        )
      }

      return HttpResponse.json<PhoneSendCodeResponse>({
        message: '인증번호가 발송되었습니다.',
        phone: phone,
        expires_in: 180, // 3분
      })
    }
  ),

  // 휴대전화 인증번호 인증
  http.post<never, PhoneVerifyCodeRequest>(
    '/api/v1/auth/phone/verify-code/',
    async ({ request }) => {
      const { code } = await request.json()

      const correctCode = '654321'

      if (code !== correctCode) {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '인증번호가 일치하지 않습니다.',
            code: 'INVALID_VERIFICATION_CODE',
          },
          { status: 400 }
        )
      }

      return HttpResponse.json<PhoneVerifyCodeResponse>({
        message: '휴대전화 인증이 완료되었습니다.',
        verified: true,
        token: 'phone_verified_token_' + Date.now(),
      })
    }
  ),

  // 이메일로 가입하기
  http.post<never, SignupRequest>(
    '/api/v1/auth/signup',
    async ({ request }) => {
      const userData = await request.json()
      const {
        email,
        password,
        password_confirm,
        name,
        nickname,
        gender,
        phone_number,
        birthday,
        self_introduction,
        profile_image_url,
      } = userData

      if (password !== password_confirm) {
        return HttpResponse.json<ErrorResponse>(
          {
            error: '비밀번호가 일치하지 않습니다.',
            code: 'PASSWORD_MISMATCH',
          },
          { status: 400 }
        )
      }

      return HttpResponse.json<SignupResponse>(
        {
          message: '회원가입이 완료되었습니다.',
          user: {
            id: Math.floor(Math.random() * 10000),
            email,
            name,
            nickname,
            gender,
            phone_number,
            birthday,
            self_introduction,
            profile_image_url,
            created_at: new Date().toISOString(),
            is_active: true,
          },
          tokens: {
            access_token: 'access_token_' + Date.now(),
            refresh_token: 'refresh_token_' + Date.now(),
          },
        },
        { status: 201 }
      )
    }
  ),
]
