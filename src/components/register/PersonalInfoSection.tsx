import type React from 'react'
import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import AuthInput from '@/components/AuthForm/AuthInput'
import AuthLabel from '@/components/AuthForm/AuthLabel'
import ValidateButton from '@/components/AuthForm/ValidateButton'
import type { RegisterFormData } from '@/types/login/register'
import { api } from '@/api/axiosInstance'

interface PersonalInfoSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  nameValue: string
  nicknameValue: string
  birthValue: string
  isValidBirth: boolean
  handleNumberInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PersonalInfoSection({
  register,
  errors,
  nameValue,
  nicknameValue,
  birthValue,
  isValidBirth,
  handleNumberInput,
}: PersonalInfoSectionProps) {
  const handlerNickname = async () => {
    try {
      const res = await api.post('/api/v1/auth/profile/nickname-check/', {
        nickname: nicknameValue,
      })

      console.log(res.data)
      alert(res.data.message) // 예: "인증 코드가 이메일로 전송되었습니다."
    } catch (error) {
      console.error(error)

      // 서버 에러 메시지 보여주기
      if (error.response?.data?.message) {
        alert(error.response.data.message)
      } else {
        alert('이미 사용중인 닉네임 입니다앙 !')
      }
    }
  }

  return (
    <div className="space-y-11">
      {/* 이름 */}
      <div>
        <AuthLabel htmlFor="name">이름</AuthLabel>
        <AuthInput
          {...register('name', { required: '이름은 필수입니다.' })}
          placeholder="이름을 입력해주세요"
          variant={errors.name ? 'error' : nameValue ? 'success' : 'default'}
          className="w-[480px]"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      {/* 닉네임 */}
      <div>
        <AuthLabel htmlFor="nickname">닉네임</AuthLabel>
        <div className="flex gap-2">
          <AuthInput
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              pattern: {
                value: /^[가-힣a-zA-Z0-9]{2,10}$/,
                message: '2~10자 이내, 한글/영문/숫자만 입력해주세요.',
              },
            })}
            placeholder="닉네임을 입력해주세요"
            variant={
              errors.nickname ? 'error' : nicknameValue ? 'success' : 'default'
            }
            className="w-[356px]"
          />
          <ValidateButton
            variant={nicknameValue ? 'active' : 'inactive'}
            onClick={handlerNickname}
          >
            중복확인
          </ValidateButton>
        </div>
        {errors.nickname && (
          <p className="text-sm text-red-500">{errors.nickname.message}</p>
        )}
      </div>
      {/* 생년월일 */}
      <div>
        <AuthLabel htmlFor="birth">생년월일</AuthLabel>
        <AuthInput
          {...register('birth', {
            required: '생년월일은 필수입니다.',
            pattern: {
              value: /^\d{8}$/,
              message: '8자리 숫자로 입력해주세요 (예: 20001004)',
            },
          })}
          placeholder="8자리 입력해주세요 (ex.20001004)"
          variant={
            !isValidBirth && birthValue
              ? 'error'
              : isValidBirth
                ? 'success'
                : 'default'
          }
          maxLength={8}
          inputMode="numeric"
          onChange={handleNumberInput}
          value={birthValue || ''}
          className="w-[480px]"
        />
        {errors.birth && (
          <p className="text-sm text-red-500">{errors.birth.message}</p>
        )}
      </div>
    </div>
  )
}
