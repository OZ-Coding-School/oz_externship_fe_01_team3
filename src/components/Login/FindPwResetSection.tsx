import type { RegisterFormData } from '@/types/login/register'
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'

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
  isPasswordValid,
  isPasswordMatch,
}: FindPwResetSectionProps) {
  return (
    <>
      {/* 비밀번호 */}
      <div className="mt-[40px] flex items-center">
        <label
          htmlFor="password"
          className="mr-[16px] mb-[20px] text-[#121212]"
        >
          새 비밀번호<span className="text-[#EC0037]">*</span>
        </label>
        <p className="mb-[20px] text-[14px] font-semibold text-[#6201E0]">
          6~15자의 영문 대소문자, 숫자, 특수문자 포함
        </p>
      </div>
      <input
        type="password"
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{6,15}$/,
            message: '6~15자, 영문/숫자/특수문자를 모두 포함해야 합니다.',
          },
        })}
        className={`mb-[16px] h-[48px] w-[348px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
          errors.password ||
          (passwordValue &&
            passwordConfirmValue &&
            passwordValue !== passwordConfirmValue)
            ? 'border-[#EC0037]' // 형식 틀리거나 확인 칸이랑 다르면 빨간색
            : passwordValue &&
                passwordConfirmValue &&
                isPasswordValid &&
                isPasswordMatch
              ? 'border-[#14C786]' // 둘 다 맞으면 초록색
              : 'border-[#BDBDBD]' // 그 외엔 기본 회색
        } `}
        placeholder="비밀번호를 입력해주세요"
      />

      <input
        type="password"
        {...register('passwordConfirm', {
          required: '비밀번호 확인을 입력해주세요.',
          validate: (value) =>
            value === passwordValue || '비밀번호가 일치하지 않습니다.',
        })}
        className={`mb-[16px] h-[48px] w-[348px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
          errors.passwordConfirm ||
          (passwordValue &&
            passwordConfirmValue &&
            passwordValue !== passwordConfirmValue)
            ? 'border-[#EC0037]'
            : passwordValue &&
                passwordConfirmValue &&
                isPasswordValid &&
                isPasswordMatch
              ? 'border-[#14C786]'
              : 'border-[#BDBDBD]'
        } `}
        placeholder="비밀번호를 다시 입력해주세요"
      />
    </>
  )
}
