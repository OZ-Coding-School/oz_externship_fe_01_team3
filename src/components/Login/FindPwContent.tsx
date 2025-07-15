import CommonButton from './CommonButton'
import { Toast } from '../common/Toast'
import { usePwForm } from '@/hooks/login/usePwForm'
import FindPwInitialSection from './FindPwInitialSection'
import FindPwHeaderSection from './FindPwHeaderSection'
import FindPwResetSection from './FindPwResetSection'
import { api } from '@/API/axiosInstance'
import { useNavigate } from 'react-router'
import type { AxiosError } from 'axios'

export default function FindPwContent() {
  const {
    register,
    handleSubmit,
    errors,
    emailValue,
    emailCodeValue,
    // setValue,
    passwordValue,
    passwordConfirmValue,
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
  const navigate = useNavigate()

  // "비밀번호찾기" 버튼 클릭 시 실행
  const onClickFindPw = () => {
    if (isCodeVerified) {
      // 인증번호가 성공적으로 확인된 상태여야 전환 가능
      setEmailVerified(true)
    } else {
      alert('먼저 인증번호를 확인해주세요!')
    }
  }
  //비밀번호 재설정 코드
  const resetPw = async () => {
    try {
      const res = await api.post('/api/v1/auth/account/change-password/', {
        email: emailValue,
        new_password: passwordValue,
        new_password_confirm: passwordConfirmValue,
      })

      console.log(res.data.message)
      alert(res.data.message) //성공시, "재설정되었습니다!"
      navigate('/')
    } catch (error) {
      const axiosError = error as AxiosError<any>

      console.error(error)

      // 서버 에러 메시지 보여주기
      if (axiosError.response?.data?.message) {
        alert(axiosError.response.data.message)
      } else {
        alert('코드 전송에 실패했습니다.')
      }
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
          <CommonButton onClick={resetPw} text="확인" disabled={isDisabled} />
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
