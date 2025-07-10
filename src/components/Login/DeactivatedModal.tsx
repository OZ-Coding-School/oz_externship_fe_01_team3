// 탈퇴회원인가요?정보 관련 컴포넌트
// TODO: <Input /> , <Button /> Style이 중복되어 코드의 가독성이 저하되고 있음을 파악하였다,
// 기능을 구현한후에, 별도의 Button, Input 컴포넌트를 생성하여, 기본값으로 지정하는 스타일 또는 타입을 명시하여 가독성을 좋게 리팩토링 처리를 해줄겁니다. 💡
//
import { useState } from 'react'
import CommonButton from './CommonButton'
import { useForm } from 'react-hook-form'
import type { ToastProps } from '@/types/common/Toast'
import { Toast } from '../common/Toast'
import Timer from '../common/Timer'

interface ResetFormData {
  email: string
  emailCode: string
}
export default function DeactivatedAccountInfoModal() {
  const [toast, setToast] = useState<ToastProps | null>(null)
  const [showTimer, setShowTimer] = useState(false)

  const showToast = (options: ToastProps) => {
    setToast(options)
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }
  // 그냥 "탈퇴된 상태예요!" 보여주는 상태: false / 재설정 하는 모달 상태: true
  const [resetClicked, setResetClicked] = useState(false)
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<ResetFormData>({ mode: 'onChange' })

  const emailValue = watch('email')
  const emailCodeValue = watch('emailCode')

  //인증 코드 설정 버튼 disabled 조건 (여기에 나중에는 우선 값이 )
  const isVerifiedCodeDisabled = !emailCodeValue

  //인증번호 코드 전송! 함수 (토스트 띄우기, 타이머)
  const sendVerified = () => {
    showToast({
      message: '전송 완료! 이메일을 확인 해주세요.',
      type: 'success',
      layout: 'inline',
      className: '',
    })
    setShowTimer(true)
  }

  const handleReset = () => {
    setResetClicked(true)
  }

  return (
    <div>
      {/* 여기에 Toast 컴포넌트를 추가합니다 */}
      {toast && <Toast toast={toast} />}
      <div className="mt-[10px] flex flex-col items-center justify-center">
        <img
          src={`src/assets/${resetClicked ? 'DeactiveReset' : 'DeactiveIcon'}.png`}
          alt="find"
          className="mb-[16px] h-[28px] w-[28px]"
        />
        <p className="mb-[16px] text-[20px] leading-none font-bold text-[#121212]">
          {resetClicked ? '계정 다시 사용하기' : '해당 계정은 탈퇴된 상태예요'}
        </p>
        <p className="text-center text-sm leading-none text-[#4D4D4D]">
          {resetClicked ? (
            '입력하신 이메일로 인증번호를 보내드릴게요.'
          ) : (
            <>
              <p>2025년 6월 20일 이후, 계정 정보는 완전히 삭제돼요.</p>
              <p className="mt-[4px] block text-[#4D4D4D]">
                계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
              </p>
            </>
          )}
        </p>
        {resetClicked && (
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
                  placeholder="인증번호를 입력하세요"
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
          </div>
        )}
        {resetClicked ? (
          <CommonButton
            text="확인"
            disabled={isVerifiedCodeDisabled}
            onClick={() => {}}
          />
        ) : (
          <CommonButton onClick={handleReset} text="계정 다시 사용하기" />
        )}
      </div>
    </div>
  )
}
