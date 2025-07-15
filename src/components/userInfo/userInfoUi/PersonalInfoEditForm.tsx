import { useState } from 'react'
import LabeledInput from './LabelInput'
import Timer from '@/components/common/Timer'
import type { MyPage } from '@/types/mypage/myPage'
import { useCheckPhoneNumber } from '@/hooks/mypage/usePhoneCode'
import { useVerifyCode } from '@/hooks/mypage/useVerifyCode'

interface PersonalInfoEditFormProps {
  USER: MyPage
  phone: string
  setPhone: React.Dispatch<React.SetStateAction<string>>
}

export default function PersonalInfoEditForm({
  phone,
  setPhone,
  USER,
}: PersonalInfoEditFormProps) {
  const [timer, setTimer] = useState(false)
  const [isAuthRequested, setIsAuthRequested] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [code, setCode] = useState('')
  const [isWrongCode, setIsWrongCode] = useState(false)

  const { mutate: requestCode, isPending: isSending } = useCheckPhoneNumber()
  const { mutate: verifyCode, isPending: isVerifying } = useVerifyCode()

  const handleTimer = () => {
    if (!phone) {
      alert('전화번호를 입력하세요.')
      return
    }

    requestCode(phone, {
      onSuccess: () => {
        setIsAuthRequested(true)
        setIsExpired(false)
        setTimer(false)
        setTimeout(() => setTimer(true), 10)
        alert('인증번호가 전송되었습니다.')
      },
      onError: () => {
        alert('인증번호 요청에 실패했습니다.')
      },
    })
  }

  const handleCheckCode = () => {
    if (!code) {
      alert('인증번호를 입력하세요.')
      return
    }

    verifyCode(
      { phone, code },
      {
        onSuccess: () => {
          alert('인증 성공')
          setTimer(false)
          setIsAuthRequested(false)
          setIsExpired(false)
          setIsWrongCode(false)
        },
        onError: () => {
          setIsWrongCode(true)
          alert('인증번호가 틀렸습니다.')
        },
      }
    )
  }

  const handleTimerExpired = () => {
    setIsExpired(true)
  }

  const phoneInputClass = `pr-20 outline-none ${isAuthRequested ? 'w-110' : 'w-118'}`
  const authInputClass = `w-110 outline-none ${
    isExpired ? 'border-[#ec0037]' : 'border-[#bdbdbd]'
  }`

  return (
    <div className="mt-20">
      <p className="border-b border-[#bdbdbd] pb-4 text-xl font-bold text-[#721ae3]">
        개인 정보 수정
      </p>

      <div className="mt-10 flex flex-col gap-2">
        <LabeledInput label="이름" id="name" placeholder={USER.name} disabled />
      </div>

      <div className="relative mt-10 flex flex-col gap-2">
        <label htmlFor="phone" className="text-base font-semibold">
          휴대전화
        </label>
        <div className="flex items-center gap-4">
          <div className="relative">
            <LabeledInput
              id="phone"
              value={USER.phone_number}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={USER.phone_number}
              className={phoneInputClass}
            />
            {timer && (
              <div className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-[#ec0037]">
                <Timer time={5} onComplete={handleTimerExpired} />
              </div>
            )}
          </div>
          <button
            onClick={handleTimer}
            disabled={isSending}
            className={`${
              isAuthRequested ? 'w-35' : 'w-28'
            } mt-2 h-12 cursor-pointer rounded-sm border border-[#cecece] bg-[#efe6fc] text-base font-semibold text-purple-600`}
          >
            {isAuthRequested ? '재전송' : '변경'}
          </button>
        </div>

        {isAuthRequested && (
          <div className="mt-4 flex items-center gap-4">
            <LabeledInput
              id="authCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증 번호 입력"
              className={authInputClass}
            />
            <button
              onClick={handleCheckCode}
              disabled={isVerifying}
              className="mt-2 h-12 w-35 cursor-pointer rounded-sm border border-[#cecece] bg-[#efe6fc] text-base font-semibold text-[#4d4d4d]"
            >
              인증번호 확인
            </button>
          </div>
        )}

        {isExpired && (
          <p className="text-xs font-normal text-[#ec0037]">
            *인증번호 전송 시간이 초과되었습니다. 인증번호를 재전송해 주세요.
          </p>
        )}
        {isWrongCode && (
          <p className="text-xs font-normal text-[#ec0037]">
            *잘못된 인증 번호를 입력하였습니다.
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <LabeledInput
          label="생년월일"
          id="birthday"
          placeholder={USER.birthday}
          disabled
        />
      </div>
    </div>
  )
}
