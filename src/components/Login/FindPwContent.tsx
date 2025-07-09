// 비밀번호 찾기 내용 컴포넌트

import { useState } from 'react'
import CommonButton from './CommonButton'
import { Toast } from '../common/Toast'
import Timer from '../common/Timer'
import { usePwForm } from '@/hooks/login/usePwForm'

export default function FindPwContent() {
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    emailValue,
    emailCodeValue,
    passwordValue,
    passwordConfirmValue,
    isPasswordMatch,
    isVerifiedCodeDisabled,
    isPasswordValid,
    isDisabled,
    watch,
    toast,
    showTimer,
    sendVerified,
  } = usePwForm()

  const [emailVerified, setEmailVerified] = useState(false) //인증코드 성공 여부 (추후 백엔드 연결시, 서버에서 "성공!"이라고 오면 이 emailVerified값이 true )
  const handleVerifyCode = () => {
    // 현재는 UI용 임시 코드
    if (emailCodeValue === '000000') {
      setEmailVerified(true)
    } else {
      alert('error!')
      // 실패 처리
    }
  }

  return (
    <div>
      {/* 여기에 Toast 컴포넌트를 추가합니다 */}
      {toast && <Toast toast={toast} />}
      <div className="mt-[10px] flex flex-col items-center justify-center">
        <img
          src="src/assets/FindPwicon.png"
          alt="find"
          className="mb-[16px] h-[28px] w-[28px]"
        />
        <p className="mb-[16px] text-[20px] leading-none font-bold text-[#121212]">
          {emailVerified ? '비밀번호 재설정' : '비밀번호 찾기'}
        </p>
        <p className="text-sm leading-none text-[#4D4D4D]">
          {emailVerified
            ? '신규 비밀번호를 입력해주세요.'
            : '이메일로 비밀번호 재설정 인증코드를 보내드려요.'}
        </p>
      </div>
      {emailVerified ? (
        <div className="ml-[24px]">
          {/* 비밀번호 */}
          <div className="flex items-center">
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
          <CommonButton
            onClick={handleVerifyCode}
            text="확인"
            disabled={isDisabled}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleVerifyCode)}>
          <div className="ml-[24px]">
            {/* 이메일 */}
            <div className="mt-[40px] flex items-center">
              <label
                htmlFor="email"
                className="mr-[16px] mb-[20px] text-[#121212]"
              >
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
                onClick={sendVerified}
                disabled={!emailValue}
              >
                인증코드전송
              </button>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
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
                className={`ml-[12px] h-[48px] w-[139px] rounded-[4px] border ${emailCodeValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
              >
                인증번호확인
              </button>
            </div>
            {errors.emailCode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.emailCode.message}
              </p>
            )}

            <CommonButton
              onClick={handleVerifyCode}
              text="비밀번호찾기"
              disabled={isVerifiedCodeDisabled}
            />
          </div>
        </form>
      )}
    </div>
  )
}
