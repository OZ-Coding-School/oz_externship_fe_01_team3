import type { RegisterFormData } from '@/types/login/register'
import { useForm } from 'react-hook-form'

// TODO: 부족하긴 함... 그래도 이정도만 되도, 리팩토링이라고 말할 수 있다.
export const VALIDATION_PATTENS = {
  // TODO: 서버로 보내는 형식의 값이 어떤게 있는지 확인해봐야 할 거 같아요.. (나중에 추가될 수 있어요)
  nickname: /^[가-힣a-zA-Z0-9]{2,10}$/,
  birth: /^\d{8}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-])[A-Za-z\d!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{6,15}$/,
  phone: /^[0-9]{4}$/,
} as const

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>()

  const watchedValues = {
    nameValue: watch('name'),
    nicknameValue: watch('nickname'),
    birthValue: watch('birth'),
    emailValue: watch('email'),
    emailCodeValue: watch('emailCode'),
    passwordValue: watch('password'),
    passwordConfirmValue: watch('passwordConfirm'),
    phoneValue: watch('phone1', 'phone2'),
    phoneCode: watch('phoneCode'),
  }

  const validationStates = {
    isPasswordValid: VALIDATION_PATTENS.password.test(
      watchedValues.passwordValue
    ),
    isPasswordMatch:
      watchedValues.passwordValue === watchedValues.passwordConfirmValue,
    isAllFieldsFilled: Object.values(watchedValues).every((v) => v?.trim()),
    isValidBirth: VALIDATION_PATTENS.birth.test(watchedValues.birthValue),
  }

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, '')
    if (onlyNums.length <= 8) {
      setValue('birth', onlyNums)
    }
  }

  const onSubmit = (data: RegisterFormData) => {
    console.log('제출된 데이터:', data)
  }

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    ...watchedValues,
    ...validationStates,
    handleNumberInput,
    onSubmit,
  }
}
