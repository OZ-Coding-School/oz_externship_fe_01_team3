import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import AuthInput from '../AuthForm/AuthInput'
import AuthLabel from '../AuthForm/AuthLabel'
import ValidateButton from '../AuthForm/ValidateButton'
import type { RegisterFormData } from '@/types/login/register'
import { api } from '@/api/axiosInstance'
import type { AxiosError } from 'axios'

interface FindIdInitialSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  nameValue: string
  phoneValue: string
  phoneCodeValue: string
  setSuccessFindId: (v: boolean) => void
}

export default function FindIdInitialSection({
  register,
  errors,
  nameValue,
  phoneValue,
  phoneCodeValue,
}: FindIdInitialSectionProps) {
  //휴대전화로 인증코드 전송 api
  const handSendCode = async () => {
    try {
      const res = await api.post('/api/v1/auth/find/email/phone/send/', {
        phone: phoneValue,
      })

      console.log(res.data.message)
      alert(res.data.message) //성공시, "코드 전송 되었습니다!!"
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

  //인증코드 확인하는 api
  const handleCheckCode = async () => {
    try {
      const res = await api.post('/api/v1/auth/find/email/phone/verify/', {
        phone: phoneValue,
        code: phoneCodeValue,
      })

      console.log(res.data.message)
      alert(res.data.message) //성공시, "코드가 일치합니다"
    } catch (error) {
      const axiosError = error as AxiosError<any>

      console.error(error)

      // 서버 에러 메시지 보여주기
      if (axiosError.response?.data?.message) {
        alert(axiosError.response.data.message)
      } else {
        alert('코드가 일치하지 않습니다.')
      }
    }
  }
  return (
    <>
      <div className="flex items-center">
        <AuthLabel htmlFor="name" className="text-[16px]">
          이름
        </AuthLabel>
      </div>
      <div>
        <AuthInput
          {...register('name', { required: '이름은 필수입니다.' })}
          placeholder="이름을 입력해주세요"
          variant={errors.name ? 'error' : nameValue ? 'success' : 'default'}
          className="w-[348px]"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}

        {/*휴대전화*/}

        <div className="mt-[32px] flex items-center">
          <AuthLabel htmlFor="phone" className="text-[16px]">
            휴대전화
          </AuthLabel>
        </div>
        <div className="flex">
          <div className="flex items-center">
            <AuthInput
              {...register('phone', {
                required: '번호를 입력해주세요',
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: '11자리 숫자를 입력해주세요.',
                },
              })}
              maxLength={11}
              inputMode="numeric"
              placeholder="숫자만 입력해주세요"
              variant={
                errors.phone ? 'error' : phoneValue ? 'success' : 'default'
              }
              className="w-[228px]"
              onInput={(e: any) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
              }
            />
          </div>
          <ValidateButton
            variant={phoneValue ? 'active' : 'inactive'}
            className="w-[112px]"
            onClick={handSendCode}
          >
            인증번호전송
          </ValidateButton>
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}

        {/*휴대전화 인증 번호*/}

        <div className="mt-[16px] flex">
          <AuthInput
            {...register('phoneCode', {
              required: '인증코드를 입력해주세요.',
            })}
            placeholder="인증번호 6자리를 입력해주세요"
            variant={
              errors.phoneCode
                ? 'error'
                : phoneCodeValue
                  ? 'success'
                  : 'default'
            }
            className="w-[228px]"
            maxLength={6}
          />
          <ValidateButton
            variant={phoneValue ? 'active' : 'inactive'}
            className="w-[112px]"
            onClick={handleCheckCode}
          >
            인증번호확인
          </ValidateButton>
        </div>
        {errors.phoneCode && (
          <p className="mt-1 text-sm text-red-500">
            {errors.phoneCode.message}
          </p>
        )}
      </div>
    </>
  )
}
