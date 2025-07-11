import { api } from '@/api/axiosInstance'
import { Toast } from '@/components/common/Toast'
import DeactivatedAccountInfoModal from '@/components/Login/DeactivatedModal'
import FindIdContent from '@/components/Login/FindIdContent'
import FindModal from '@/components/Login/FindModal'
import FindPwContent from '@/components/Login/FindPwContent'
import LoginButtonSection from '@/components/Login/LoginButtonSection'
import LoginEmailSection from '@/components/Login/LoginEmailSection'
import LoginHeader from '@/components/Login/LoginHeader'
import LoginPasswordSection from '@/components/Login/LoginPasswordSection'
import { useLoginForm } from '@/hooks/login/useLoginForm'
import { token } from '@/lib/token'

// 지향 파트 (짧아지는게 목적이긴한데, 그렇다고 극단적으로 다 지울필요는 없어요.)
// TODO: 컴포넌트를 세분화해서 쪼개는게 일단 우선이긴한데,,
// 생각보다 쪼개야하는 컴포넌트의 수가 많아서, 로그인, 회원가입 언제까지 가능할지...

export default function Login() {
  const {
    register,
    handleSubmit,
    errors,
    emailValue,
    passwordValue,
    isAllFieldsFilled,
    isModalOpen,
    modalContentType,
    openModal,
    closeModal,
    onSubmit,
    navigate,
    watch,
    setModalType,
    toast,
    // showToast,
  } = useLoginForm()

  const handleLogin = async () => {
    try {
      const res = await api.post('/api/v1/auth/login/email', {
        email: emailValue,
        password: passwordValue,
      })
      const { access, refresh, user } = res.data

      token.set(access)
      token.refresh.set(refresh)

      // ✅ 이후 로직 (예: 전역 유저 정보 저장, 이동 등)
      console.log('로그인 성공', user)
    } catch (error) {
      console.error('로그인 실패', error)
    }
  }

  return (
    <div className="flex flex-col items-center pt-20">
      {/*로그인 헤더*/}
      <LoginHeader navigate={navigate} />

      {/*소셜 로그인 섹션*/}
      <LoginButtonSection />

      {/* 여기에 Toast 컴포넌트를 추가 */}
      {toast && <Toast toast={toast} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        {/* 이메일 인풋 */}
        <LoginEmailSection
          register={register}
          errors={errors}
          emailValue={emailValue}
        />

        {/* 비밀번호 인풋 */}
        <LoginPasswordSection
          register={register}
          errors={errors}
          watch={watch}
        />

        <div className="flex w-full justify-start text-sm text-[#4D4D4D]">
          <button
            type="button"
            onClick={() => {
              openModal()
              setModalType('findIdType')
            }}
            className="mr-[8px]"
          >
            아이디 찾기
          </button>

          {/*모달이 열릴 때, 모달컨텐트타입 상태가, findIdType이면 아이디찾기 내용 보여주기 / findPwContent면 비밀번호 찾기 내용 보여주기 렌더링 관련 */}

          {isModalOpen && (
            <FindModal
              onClose={() => {
                closeModal()
              }}
            >
              {modalContentType === 'findIdType' && (
                <FindIdContent setModalContentType={setModalType} />
              )}
              {modalContentType === 'findPwType' && <FindPwContent />}
              {modalContentType === 'deactivatedInfo' && (
                <DeactivatedAccountInfoModal />
              )}
            </FindModal>
          )}

          <p className="mr-[8px]">|</p>

          <button
            type="button"
            onClick={() => {
              openModal()
              setModalType('findPwType')
            }}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* 일반회원 로그인 버튼 : 유효성 검사 미통과시 disabled / 유효성 다 통과하고 값이 있어야만 보라색 활성화 색 */}
        <button
          type="submit"
          disabled={!!errors.email || !!errors.password}
          className={`mt-[12px] h-[52px] w-[348px] gap-2 rounded-[4px] ${!errors.email && !errors.password && isAllFieldsFilled ? 'bg-[#6201E0] text-white' : 'bg-[#ECECEC] text-[#BDBDBD]'} `}
          onClick={handleLogin}
        >
          일반회원 로그인
        </button>
      </form>
    </div>
  )
}
