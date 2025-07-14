import type { RegisterFormData } from '@/types/login/register'
import Timer from '../common/Timer'
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { api } from '@/api/axiosInstance'
import { useEffect } from 'react'

interface FindPwInitialSection {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  watch: UseFormWatch<RegisterFormData>
  emailValue: string
  sendVerified: () => void
  showTimer: boolean
  emailCodeValue: string
  setIsCodeVerified: (v: boolean) => void
  isCodeVerified: boolean
}

export default function FindPwInitialSection({
  register,
  errors,
  emailValue,
  sendVerified,
  showTimer,
  emailCodeValue,
  watch,
  setIsCodeVerified,
  isCodeVerified,
}: FindPwInitialSection) {
  const handleSendCode = async () => {
    try {
      const res = await api.post('/api/v1/auth/account/send-reset-code/', {
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
      const res = await api.post('/api/v1/auth/account/verify-code/', {
        email: emailValue,
        code: emailCodeValue,
      })

      // 200이면 성공
      alert('인증 성공!')
      setIsCodeVerified(true)
      // 비밀번호 재설정 화면으로 전환
    } catch (error) {
      // 400이면 서버에서 에러 메시지가 응답으로 옴
      const errorMessage =
        error.response?.data?.non_field_errors?.[0] ||
        '알 수 없는 에러가 발생했습니다.'
      alert(errorMessage)
    }
  }

  useEffect(() => {
    if (isCodeVerified) {
      // 인증 성공 후 하고 싶은 코드
      console.log('이제 상태가 true다! 여기서 확실히 true.')

      // 예: 비밀번호 재설정 화면 전환 로직
    }
  }, [isCodeVerified])

  return (
    <>
      {/* 이메일 */}
      <div className="mt-[40px] flex items-center">
        <label htmlFor="email" className="mr-[16px] mb-[20px] text-[#121212]">
          이메일<span className="text-[#EC0037]">*</span>
        </label>
      </div>
      <div className="flex">
        <input
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '유효한 이메일 주소를 입력해주세요.',
            },
          })}
          className={`h-[48px] w-[201px] rounded-[4px] border-[1px] border-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
            errors.email
              ? 'border-red-500' // 에러가 있으면 빨간색
              : watch('email') && !errors.email // 값이 있고 에러가 없으면 (성공 시) 녹색
                ? 'border-green-500'
                : 'border-[#BDBDBD]' // 그 외 기본 색상
          }`}
          placeholder="이메일을 입력해주세요"
        />
        <button
          type="button"
          className={`ml-[12px] h-[48px] w-[139px] rounded-[4px] border ${emailValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
          onClick={handleSendCode}
          disabled={!emailValue}
        >
          인증코드전송
        </button>
      </div>
      {errors.email && (
        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
      )}

      {/* 이메일 인증코드 */}
      <div className="mt-[16px] flex">
        <div className="relative w-[201px]">
          <input
            {...register('emailCode', {
              required: '인증코드를 입력해주세요.',
            })}
            className={`h-[48px] w-[201px] rounded-[4px] border-[1px] border-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none`}
            placeholder="인증번호를 입력하세요."
          />
          {showTimer && (
            <div className="text-[#EC0037]] pointer-events-none absolute top-0 right-0 flex h-full items-center pr-[16px] font-medium">
              <div className="text-[#EC0037]">
                <Timer time={5} />
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          className={`ml-[12px] h-[48px] w-[139px] rounded-[4px] border ${emailCodeValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
          onClick={handleCheckCode}
        >
          인증번호확인
        </button>
      </div>
      {errors.emailCode && (
        <p className="mt-1 text-sm text-red-500">{errors.emailCode.message}</p>
      )}
    </>
  )
}
