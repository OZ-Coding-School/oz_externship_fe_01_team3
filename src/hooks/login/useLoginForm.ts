//로그인 관련 상태, 정규식, 함수를 모아둔 커스텀 훅

import type { ToastProps } from '@/types/common/Toast'
import type { RegisterFormData } from '@/types/login/register'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormData>({ mode: 'onChange' })

  //로그인 페이지 인풋 종류
  const inputValue = {
    emailValue: watch('email'),
    passwordValue: watch('password'),
  }

  //값이 다 채워졌는지 유무
  const isAllFieldsFilled =
    !!inputValue.emailValue && !!inputValue.passwordValue

  //이동 관련 함수

  const navigate = useNavigate()

  // 토스트 관련

  const [toast, setToast] = useState<ToastProps | null>(null)

  const showToast = (options: ToastProps) => {
    setToast(options)
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  //모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)

  type ModalContentType = 'findIdType' | 'findPwType' | 'deactivatedInfo'

  const [modalContentType, setModalContentType] =
    useState<ModalContentType>('findIdType')

  const openModal = (type: ModalContentType) => {
    setIsModalOpen(true)
    setModalContentType(type)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const setModalType = (type: ModalContentType) => {
    setModalContentType(type)
  }

  const onSubmit = (data: any) => {
    const { email, password } = data
    //임시 로직 (가짜 아이디 비밀번호 성공시, ui구현)
    if (email === 'test@test.com' && password === 'QWERTY12!') {
      showToast({
        message: '로그인 성공!',
        type: 'success',
        layout: 'centered',
        subMessage: '메인 페이지로 이동합니다.',
        className: '',
      })
      navigate('/') //랜딩페이지로 이동 (근데 로그인 상태 유지는? 모르겠음)
    } //탈퇴회원일 경우 로직
    else if (email === 'test1@test.com' && password === 'QWERTY12!!') {
      setIsModalOpen(true)
      setModalContentType('deactivatedInfo')
    } else {
      // 로그인 정보 없어서 실패 시
      showToast({
        message: '로그인 실패!',
        type: 'error',
        layout: 'centered',
        subMessage: '이메일 또는 비밀번호를 확인해주세요.',
      })
      reset() //인풋창 리셋 시켜버림
    }
  }

  return {
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
  }
}
