import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import AuthInput from '../AuthForm/AuthInput'
import type { RegisterFormData } from '@/types/login/register'

interface LoginPasswordSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  watch
}

export default function LoginPasswordSection({
  register,
  errors,
  watch,
}: LoginPasswordSectionProps) {
  return (
    <div className="mb-[16px]">
      <AuthInput
        type="password"
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'",.<>/?\\|~`_\-=+]).{6,15}$/,
            message: '6~15자, 영문/숫자/특수문자를 모두 포함해야 합니다.',
          },
        })}
        placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자)"
        variant={
          errors.password
            ? 'error'
            : watch('password') && !errors.password
              ? 'success'
              : 'default'
        }
        className="w-[348px] text-[14px]"
      />
    </div>
  )
}
