import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import AuthInput from '@/components/AuthForm/AuthInput'
import AuthLabel from '@/components/AuthForm/AuthLabel'
import type { RegisterFormData } from '@/types/login/register'

interface PasswordSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  passwordValue: string
  passwordConfirmValue: string
  isPasswordMatch: boolean
}

export default function PasswordSection({
  register,
  errors,
  passwordValue,
  passwordConfirmValue,
  isPasswordMatch,
}: PasswordSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AuthLabel htmlFor="password">비밀번호</AuthLabel>
        <p className="text-[14px] font-semibold text-[#6201E0]">
          6~15자의 영문 대소문자, 숫자, 특수문자 포함
        </p>
      </div>

      <AuthInput
        type="password"
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{6,15}$/,
            message: '6~15자, 영문/숫자/특수문자를 모두 포함해야 합니다.',
          },
        })}
        placeholder="비밀번호를 입력해주세요"
        variant={
          passwordValue &&
          passwordConfirmValue &&
          passwordValue !== passwordConfirmValue
            ? 'error'
            : passwordValue && passwordConfirmValue && isPasswordMatch
              ? 'success'
              : 'default'
        }
        className="w-[480px]"
      />

      <AuthInput
        type="password"
        {...register('passwordConfirm', {
          required: '비밀번호 확인을 입력해주세요.',
          validate: (value) =>
            value === passwordValue || '비밀번호가 일치하지 않습니다.',
        })}
        placeholder="비밀번호를 다시 입력해주세요"
        variant={
          errors.passwordConfirm ||
          (passwordValue &&
            passwordConfirmValue &&
            passwordValue !== passwordConfirmValue)
            ? 'error'
            : passwordValue && passwordConfirmValue && isPasswordMatch
              ? 'success'
              : 'default'
        }
        className="w-[480px]"
      />
    </div>
  )
}
