import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import AuthInput from '@/components/AuthForm/AuthInput'
import AuthLabel from '@/components/AuthForm/AuthLabel'
import ValidateButton from '@/components/AuthForm/ValidateButton'
import type { RegisterFormData } from '@/types/login/register'
import { api } from '@/api/axiosInstance'

interface EmailVerificationSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  emailValue: string
  emailCodeValue: string
}

export default function EmailVerificationSection({
  register,
  errors,
  emailValue,
  emailCodeValue,
}: EmailVerificationSectionProps) {
  const handleSendCode = async () => {
    try {
      const res = await api.post('/api/v1/auth/email/send-code', {
        email: emailValue,
        purpose: 'signup',
      })

      console.log(res.data.message)
      alert(res.data.message) // 예: "인증 코드가 이메일로 전송되었습니다."
    } catch (error) {
      console.error(error)

      // 서버 에러 메시지 보여주기
      if (error.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert('코드 전송에 실패했습니다.')
      }
    }
  }

  async function handleCheckCode() {
    try {
      const res = await api.post('/api/v1/auth/email/verify-code', {
        email: emailValue,
        verification_code: emailCodeValue,
        purpose: 'signup',
      })

      // 200이면 성공
      alert('인증 성공!')
    } catch (error) {
      // 400이면 서버에서 에러 메시지가 응답으로 옴
      const errorMessage =
        error.response?.data?.non_field_errors?.[0] ||
        '알 수 없는 에러가 발생했습니다.'
      alert(errorMessage)
    }
  }

  return (
    <div className="space-y-4">
      {/* 이메일 */}
      <div>
        <div className="flex items-center gap-2">
          <AuthLabel htmlFor="email">이메일</AuthLabel>
          <p className="text-[14px] font-semibold text-[#6201E0]">
            로그인 시 아이디로 사용합니다.
          </p>
        </div>
        <div className="flex gap-2">
          <AuthInput
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '유효한 이메일 주소를 입력해주세요.',
              },
            })}
            placeholder="이메일을 입력해주세요"
            variant={
              errors.email ? 'error' : emailValue ? 'success' : 'default'
            }
            className="w-[356px]"
          />
          <ValidateButton
            variant={emailValue ? 'active' : 'inactive'}
            onClick={handleSendCode}
          >
            인증코드전송
          </ValidateButton>
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      {/* 이메일 인증코드 */}
      <div>
        <div className="flex gap-2">
          <AuthInput
            {...register('emailCode', {
              required: '인증코드를 입력해주세요.',
            })}
            placeholder="인증코드를 입력해주세요"
            variant={
              errors.emailCode
                ? 'error'
                : emailCodeValue
                  ? 'success'
                  : 'default'
            }
            className="w-[356px]"
          />
          <ValidateButton
            variant={emailCodeValue ? 'active' : 'inactive'}
            onClick={handleCheckCode}
          >
            인증번호확인
          </ValidateButton>
        </div>
        {errors.emailCode && (
          <p className="text-sm text-red-500">{errors.emailCode.message}</p>
        )}
      </div>
    </div>
  )
}
