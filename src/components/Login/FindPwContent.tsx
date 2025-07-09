// 비밀번호 찾기 내용 컴포넌트

import { useState } from 'react'
import CommonButton from './CommonButton'
import { Toast } from '../common/Toast'
import Timer from '../common/Timer'
import { usePwForm } from '@/hooks/login/usePwForm'
import FindPwInitialSection from './FindPwInitialSection'

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
    emailVerified,
    handleVerifyCode,
  } = usePwForm()

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
            <FindPwInitialSection
              register={register}
              errors={errors}
              emailValue={emailValue}
              sendVerified={sendVerified}
              showTimer={showTimer}
              emailCodeValue={emailCodeValue}
              watch={watch}
            />
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
