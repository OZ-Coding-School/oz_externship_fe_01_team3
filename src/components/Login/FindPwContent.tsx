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
    emailValue,
    emailCodeValue,
    // setValue,
    // passwordValue,
    // passwordConfirmValue,
    // isPasswordMatch,
    // isPasswordValid,
    isVerifiedCodeDisabled,
    isDisabled,
    watch,
    toast,
    showTimer,
    sendVerified,
    emailVerified,
    setEmailVerified,
    isCodeVerified,
    setIsCodeVerified,
  } = usePwForm()

  // "비밀번호찾기" 버튼 클릭 시 실행
  const onClickFindPw = () => {
    if (isCodeVerified) {
      // 인증번호가 성공적으로 확인된 상태여야 전환 가능
      setEmailVerified(true)
    } else {
      alert('먼저 인증번호를 확인해주세요!')
    }
  }

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
            // onClick={handleVerifyCode}
            text="확인"
            disabled={isDisabled}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onClickFindPw)}>
          <div className="ml-[24px]">
            <FindPwInitialSection
              register={register}
              errors={errors}
              emailValue={emailValue}
              sendVerified={sendVerified}
              showTimer={showTimer}
              emailCodeValue={emailCodeValue}
              watch={watch}
              setIsCodeVerified={setIsCodeVerified}
              isCodeVerified={isCodeVerified}
            />
            <CommonButton
              onClick={onClickFindPw}
              text="비밀번호찾기"
              disabled={isVerifiedCodeDisabled}
            />
          </div>
        </form>
      )}
    </div>
  )
}
