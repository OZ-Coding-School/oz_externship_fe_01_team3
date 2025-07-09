// 아이디 찾기 내용 컴포넌트
import { useState } from 'react'
import CommonButton from './CommonButton'
import { useFindForm } from '@/hooks/FindIdPw/useFindForm'
import AuthLabel from '../AuthForm/AuthLabel'
import AuthInput from '../AuthForm/AuthInput'
import ValidateButton from '../AuthForm/ValidateButton'

type FindIdContentProps = {
  setModalContentType: (
    value: 'findIdType' | 'findPwType' | 'deactivatedInfo'
  ) => void
}

export default function FindIdContent({
  setModalContentType,
}: FindIdContentProps) {
  const {
    maskEmailDomain,
    register,
    handleSubmit,
    errors,
    nameValue,
    phoneValue,
    phoneCodeValue,
    handleClickFindPw,
    errorMessage,
    successFindId,
    foundId,
    findId,
  } = useFindForm(setModalContentType)

  return (
    <div>
      <div className="mt-[10px] flex flex-col items-center justify-center">
        <img
          src="src/assets/FindIdicon.png"
          alt="find"
          className="mb-[16px] h-[28px] w-[28px]"
        />
        <p className="mb-[16px] text-[20px] leading-none font-bold text-[#121212]">
          아이디 찾기
        </p>
        {foundId && (
          <p className="4 mb-[32px] text-center text-sm leading-none whitespace-pre-line">
            입력하신 정보와 일치하는 아이디입니다.
          </p>
        )}
        {errorMessage && (
          <p className="text-center text-sm whitespace-pre-line text-[#EC0037]">
            {errorMessage}
          </p>
        )}
      </div>
      {successFindId ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-[24px] flex h-[93px] w-[348px] items-center justify-center rounded-[4px] border border-[#BDBDBD] bg-[#ECECEC] px-4 py-10">
            <p className="text-[18px] font-semibold text-[#121212]">
              {maskEmailDomain(foundId)}
            </p>
          </div>
          <div className="mb-[24px] flex">
            <button className="mr-[12px] h-[48px] w-[168px] rounded-[4px] border border-[#6201E0] text-[16px] font-semibold text-[#6201E0]">
              로그인
            </button>
            <button
              className="h-[48px] w-[168px] rounded-[4px] bg-[#6201E0] text-[16px] font-semibold text-[#FAFAFA]"
              onClick={handleClickFindPw}
            >
              비밀번호 찾기
            </button>
          </div>
        </div>
      ) : (
        <div className="mr-[24px] ml-[24px] flex flex-col justify-center">
          <div className="flex items-center">
            <AuthLabel htmlFor="name" className="text-[16px]">
              이름
            </AuthLabel>
          </div>
          <div>
            <AuthInput
              {...register('name', { required: '이름은 필수입니다.' })}
              placeholder="이름을 입력해주세요"
              variant={
                errors.name ? 'error' : nameValue ? 'success' : 'default'
              }
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
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
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
          <CommonButton onClick={handleSubmit(findId)} text="아이디 찾기" />
          {/*아이디 찾기 버튼에는, 이름  */}
        </div>
      )}
    </div>
  )
}
