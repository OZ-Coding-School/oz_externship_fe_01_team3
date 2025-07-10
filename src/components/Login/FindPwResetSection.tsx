// 비밀번호 찾기 모달 중 조건부 렌더링 중 비밀번호 리셋 섹션

import type { RegisterFormData } from '@/types/login/register'
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import AuthLabel from '../AuthForm/AuthLabel'
import AuthInput from '../AuthForm/AuthInput'

interface FindPwResetSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  watch: UseFormWatch<RegisterFormData>
  passwordValue: string
  passwordConfirmValue: string
  isPasswordValid: string
  isPasswordMatch: string
}

export default function FindPwResetSection({
  register,
  errors,
  passwordValue,
  passwordConfirmValue,
  // isPasswordValid,
  isPasswordMatch,
}: FindPwResetSectionProps) {
  return (
    <>
      {/* 비밀번호 */}
      <div className="mt-[40px] flex items-center">
        <AuthLabel htmlFor="password">새 비밀번호</AuthLabel>
        <p className="text-[14px] font-semibold text-[#6201E0]">
          6~15자의 영문 대소문자, 숫자, 특수문자 포함
        </p>
        {/* <label
          htmlFor="password"
          className="mr-[16px] mb-[20px] text-[#121212]"
        >
          새 비밀번호<span className="text-[#EC0037]">*</span>
        </label>
        <p className="mb-[20px] text-[14px] font-semibold text-[#6201E0]">
          6~15자의 영문 대소문자, 숫자, 특수문자 포함
        </p> */}
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
        className="w-[348px]"
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
        className="mt-[16px] w-[348px]"
      />
    </>
  )
}
