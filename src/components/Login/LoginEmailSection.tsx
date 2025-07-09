import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import AuthInput from '../AuthForm/AuthInput'
import type { RegisterFormData } from '@/types/login/register'

interface LoginEmailSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  inputValue: { emailValue?: string }
}

export default function LoginEmailSection({
  register,
  errors,
  inputValue,
}: LoginEmailSectionProps) {
  return (
    <div className="mb-[16px]">
      <AuthInput
        {...register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '유효한 이메일 주소를 입력해주세요.',
          },
        })}
        placeholder="아이디 (example@gmail.com)"
        variant={
          errors.email ? 'error' : inputValue.emailValue ? 'success' : 'default'
        }
        className="w-[348px] text-[14px]"
      />
    </div>
  )
}
