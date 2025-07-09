import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import AuthInput from '../AuthForm/AuthInput'
import AuthLabel from '../AuthForm/AuthLabel'
import ValidateButton from '../AuthForm/ValidateButton'
import type { RegisterFormData } from '@/types/login/register'

interface FindIdInitialSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  nameValue: string
  phoneValue: string
  phoneCodeValue: string
}

export default function FindIdInitialSection({
  register,
  errors,
  nameValue,
  phoneValue,
  phoneCodeValue,
}: FindIdInitialSectionProps) {
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
