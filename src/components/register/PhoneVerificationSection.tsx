import { type UseFormRegister, type FieldErrors } from 'react-hook-form'
import AuthInput from '@/components/AuthForm/AuthInput'
import AuthLabel from '@/components/AuthForm/AuthLabel'
import ValidateButton from '@/components/AuthForm/ValidateButton'
import type { RegisterFormData } from '@/types/login/register'

interface PhoneVerificationSectionProps {
  register: UseFormRegister<RegisterFormData>
  errors: FieldErrors<RegisterFormData>
  phoneValue: string
  phoneCode: string
}

export default function PhoneVerificationSection({
  register,
  errors,
  phoneValue,
  phoneCode,
}: PhoneVerificationSectionProps) {
  return (
    <div className="space-y-4">
      {/* 휴대전화 */}
      <div>
        <AuthLabel htmlFor="phone">휴대전화</AuthLabel>
        <div className="flex gap-2">
          <div className="flex items-center">
            <input
              value="010"
              readOnly
              className="mr-[4px] h-[48px] w-[108px] rounded border border-[#BDBDBD] p-1 pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#BDBDBD]"
            />
            <span className="text-[17px] text-[#BDBDBD]">-</span>
            <input
              {...register('phone1', {
                required: '중간 번호를 입력해주세요.',
                pattern: {
                  value: /^[0-9]{4}$/,
                  message: '4자리 숫자를 입력해주세요.',
                },
              })}
              maxLength={4}
              inputMode="numeric"
              onInput={(e: any) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
              }
              className="mr-[4px] ml-[4px] h-[48px] w-[108px] rounded border border-[#BDBDBD] p-2 text-center"
            />
            <span className="text-[#BDBDBD]">-</span>
            <input
              {...register('phone2', {
                required: '마지막 번호를 입력해주세요.',
                pattern: {
                  value: /^[0-9]{4}$/,
                  message: '4자리 숫자를 입력해주세요.',
                },
              })}
              maxLength={4}
              inputMode="numeric"
              onInput={(e: any) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
              }
              className="ml-[4px] h-[48px] w-[108px] rounded border border-[#BDBDBD] p-2 text-center"
            />
          </div>
          <ValidateButton variant={phoneValue ? 'active' : 'inactive'}>
            인증번호전송
          </ValidateButton>
        </div>
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* 휴대전화 인증번호 */}
      <div>
        <div className="flex gap-2">
          <AuthInput
            {...register('phoneCode', {
              required: '인증코드를 입력해주세요.',
            })}
            placeholder="인증번호 6자리를 입력해주세요"
            variant={
              errors.phoneCode ? 'error' : phoneCode ? 'success' : 'default'
            }
            className="w-[356px]"
            maxLength={6}
          />
          <ValidateButton variant={phoneValue ? 'active' : 'inactive'}>
            인증번호확인
          </ValidateButton>
        </div>
        {errors.phoneCode && (
          <p className="text-sm text-red-500">{errors.phoneCode.message}</p>
        )}
      </div>
    </div>
  )
}
