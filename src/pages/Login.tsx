import SocialButton from '@/components/common/SocialButton'
import { Toast } from '@/components/common/Toast'
import DeactivatedAccountInfoModal from '@/components/Login/DeactivatedModal'
import FindIdContent from '@/components/Login/FindIdContent'
import FindModal from '@/components/Login/FindModal'
import FindPwContent from '@/components/Login/FindPwContent'
import LoginButtonSection from '@/components/Login/LoginButtonSection'
import LoginHeader from '@/components/Login/LoginHeader'
import { useLoginForm } from '@/hooks/login/useLoginForm'

// 지향 파트 (짧아지는게 목적이긴한데, 그렇다고 극단적으로 다 지울필요는 없어요.)
// TODO: 컴포넌트를 세분화해서 쪼개는게 일단 우선이긴한데,,
// 생각보다 쪼개야하는 컴포넌트의 수가 많아서, 로그인, 회원가입 언제까지 가능할지...

export default function Login() {
  const {
    register,
    handleSubmit,
    errors,
    inputValue,
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
    showToast,
  } = useLoginForm()

  return (
    <div className="flex flex-col items-center pt-20">
      {/*로그인 헤더*/}
      <LoginHeader navigate={navigate} />

      {/*소셜 로그인 섹션*/}
      <LoginButtonSection />

      {/* 여기에 Toast 컴포넌트를 추가합니다 */}
      {toast && <Toast toast={toast} />}

      {/*아이디*/}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        {/* 이메일 인풋 */}
        <div className="mb-[16px]">
          <input
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '유효한 이메일 주소를 입력해주세요.',
              },
            })}
            className={`autofill h-[48px] w-[348px] rounded-[4px] border-[1px] px-[16px] py-[10px] text-sm text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
              errors.email
                ? 'border-red-500' // 에러가 있으면 빨간색
                : watch('email') && !errors.email // 값이 있고 에러가 없으면 (성공 시) 녹색
                  ? 'border-green-500'
                  : 'border-[#BDBDBD]' // 그 외 기본 색상
            }`}
            placeholder="아이디 (example@gmail.com)"
          />
        </div>

        {/* 비밀번호 인풋 */}
        <div className="mb-[16px]">
          <input
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'",.<>/?\\|~`_\-=+]).{6,15}$/,
                message: '6~15자, 영문/숫자/특수문자를 모두 포함해야 합니다.',
              },
            })}
            className={`autofill h-[48px] w-[348px] rounded-[4px] border-[1px] px-[16px] py-[10px] text-sm text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
              errors.password
                ? 'border-red-500' // 에러가 있으면 빨간색
                : watch('password') && !errors.password // 값이 있고 에러가 없으면 (성공 시) 녹색
                  ? 'border-green-500'
                  : 'border-[#BDBDBD]' // 그 외 기본 색상
            }`}
            placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자)"
          />
        </div>

        <div className="flex w-full justify-start text-sm text-[#4D4D4D]">
          <button
            type="button"
            onClick={() => {
              openModal('findIdType')
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
              openModal('findPwType')
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
        >
          일반회원 로그인
        </button>
      </form>
    </div>
  )
}
