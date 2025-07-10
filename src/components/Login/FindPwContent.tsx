// 비밀번호 찾기 내용 컴포넌트

import { useState } from 'react'
import CommonButton from './CommonButton'
import { Toast } from '../common/Toast'
import { usePwForm } from '@/hooks/login/usePwForm'
import FindPwInitialSection from './FindPwInitialSection'
import FindPwHeaderSection from './FindPwHeaderSection'
import FindPwResetSection from './FindPwResetSection'

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
      {/* 헤더 섹션 */}
      <FindPwHeaderSection emailVerified={emailVerified} />

      {emailVerified ? (
        <div className="ml-[24px]">
          <FindPwResetSection
            register={register}
            errors={errors}
            watch={watch}
            passwordValue="passwordValue"
            passwordConfirmValue="passwordConfirmValue"
            isPasswordValid="isPasswordValid"
            isPasswordMatch="isPasswordMatch"
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
