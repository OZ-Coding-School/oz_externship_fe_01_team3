// 비밀번호 찾기 모달 상태, 함수 모아둔 훅

import type { ToastProps } from '@/types/common/Toast'
import type { RegisterFormData } from '@/types/login/register'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const usePwForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>()

  const inputValues = {
    emailValue: watch('email'),
    emailCodeValue: watch('emailCode'),
    passwordValue: watch('password'),
    passwordConfirmValue: watch('passwordConfirm'),
  }

  // 비밀번호와 비밀번호 확인 일치 여부
  const isPasswordMatch =
    inputValues.passwordValue === inputValues.passwordConfirmValue
  // 비밀번호 유효성 검사 통과 여부
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{6,15}$/.test(
      inputValues.passwordValue
    )

  //인증 코드 설정 버튼 disabled 조건 (여기에 나중에는 우선 값이 )
  const isVerifiedCodeDisabled = !inputValues.emailCodeValue

  // 비밀번호 재설정 버튼 disabled 조건
  const isDisabled = !(
    isPasswordValid &&
    isPasswordMatch &&
    !errors.password &&
    !errors.passwordConfirm
  )

  const [toast, setToast] = useState<ToastProps | null>(null)
  const [showTimer, setShowTimer] = useState(false)

  const showToast = (options: ToastProps) => {
    setToast(options)
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

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

  const [emailVerified, setEmailVerified] = useState(false)
  // 실제로 비밀번호 재설정 화면으로 전환하는 상태

  const [isCodeVerified, setIsCodeVerified] = useState(false)
  // 인증번호 확인 버튼 성공 시 true로 변경되는 상태 (이 상태는 아직 화면 전환 안 됨)

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
    isPasswordMatch,
    isVerifiedCodeDisabled,
    isDisabled,
    isPasswordValid,
    toast,
    showTimer,
    sendVerified,
    setEmailVerified,
    isCodeVerified,
    setIsCodeVerified,
    emailVerified,
    ...inputValues,
  }
}
