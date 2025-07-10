import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import AuthInput from '@/components/AuthForm/AuthInput'
import AuthLabel from '@/components/AuthForm/AuthLabel'
import ValidateButton from '@/components/AuthForm/ValidateButton'
import type { RegisterFormData } from '@/types/login/register'

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
          <ValidateButton variant={emailValue ? 'active' : 'inactive'}>
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
          <ValidateButton variant={emailCodeValue ? 'active' : 'inactive'}>
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
