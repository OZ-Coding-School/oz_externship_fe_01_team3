import { mockMyPageData } from '@/mock/myPageData'
import { useState } from 'react'
import Timer from '../common/Timer'

export default function MyPageEdit() {
  const [timer, setTimer] = useState(false)
  const [isAuthRequested, setIsAuthRequested] = useState(false)
  const [isExpired, setIsExpired] = useState(false) // 시간 초과 상태
  const [code, setCode] = useState('')

  const USER = mockMyPageData

  const handleTimer = () => {
    setIsAuthRequested(true)
    setIsExpired(false) // 시간 초과 문구 초기화
    setTimer(false) // 타이머 초기화
    setTimeout(() => setTimer(true), 10) // 타이머 시작
  }

  /* 임시 인증 번호 */
  const handleCheckCode = () => {
    if (code === '123123') {
      alert('인증 성공')
      setTimer(false)
      setIsAuthRequested(false)
      setIsExpired(false)
    } else {
      alert('인증번호가 틀렸습니다.')
    }
  }

  const handleTimerExpired = () => {
    setIsExpired(true) // 타이머 종료 시 상태 변경
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[700px] rounded-xl border border-[#d1d1d1] bg-white px-13 py-11">
        <p className="border-b border-[#bdbdbd] pb-4 text-xl font-bold text-[#721ae3]">
          프로필 수정
        </p>

        <div className="mt-8 flex justify-center">
          <div className="relative">
            <img
              src=""
              alt="프로필 사진"
              className="h-46 w-46 rounded-full bg-purple-300"
            />
            <div className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#d9d9d9]">
              카메라
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <label htmlFor="nickname" className="text-base font-semibold">
            닉네임
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              className="h-12 w-[500px] rounded-sm border border-[#bdbdbd] px-4"
              placeholder={USER.nickname}
            />
            <button className="h-12 w-28 cursor-pointer rounded-sm border border-[#cecece] bg-[#ececec] text-base font-semibold text-[#4d4d4d]">
              중복확인
            </button>
          </div>
          <span className="text-sm font-normal text-[#9d9d9d]">
            *한글 8자, 영문 및 숫자 16자까지 혼용할 수 있어요.
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-2">
          <label htmlFor="email" className="text-base font-semibold">
            이메일 (아이디)
          </label>
          <input
            type="text"
            placeholder={USER.email}
            disabled
            className="h-12 w-full rounded-sm border border-[#bdbdbd] bg-[#ececec] px-4"
          />
        </div>

        <div className="mt-20">
          <p className="border-b border-[#bdbdbd] pb-4 text-xl font-bold text-[#721ae3]">
            개인 정보 수정
          </p>

          <div className="mt-10 flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-semibold">
              이름
            </label>
            <input
              type="text"
              placeholder={USER.name}
              disabled
              className="h-12 w-full rounded-sm border border-[#bdbdbd] bg-[#ececec] px-4"
            />
          </div>

          <div className="relative mt-10 flex flex-col gap-2">
            <label htmlFor="phone" className="text-base font-semibold">
              휴대전화
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  className={`h-12 ${isAuthRequested ? 'w-110' : 'w-118'} rounded-sm border border-[#bdbdbd] px-4 pr-20`}
                  placeholder={USER.phone_number}
                />
                {/* 타이머 */}
                {timer && (
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-[#ec0037]">
                    <Timer time={5} onComplete={handleTimerExpired} />
                  </div>
                )}
              </div>

              <button
                onClick={handleTimer}
                className={`${isAuthRequested ? 'w-35' : 'w-28'} h-12 w-28 cursor-pointer rounded-sm border border-[#cecece] bg-[#efe6fc] text-base font-semibold text-purple-600`}
              >
                {isAuthRequested ? '재전송' : '변경'}
              </button>
            </div>

            {isAuthRequested && (
              <div className="mt-4 flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="인증 번호 입력"
                    className="h-12 w-110 rounded-sm border border-[#bdbdbd] px-4"
                  />
                </div>

                <button
                  onClick={handleCheckCode}
                  className="h-12 w-35 cursor-pointer rounded-sm border border-[#cecece] bg-[#efe6fc] text-base font-semibold text-[#4d4d4d]"
                >
                  인증번호 확인
                </button>
              </div>
            )}

            {isExpired && (
              <p className="text-xs font-normal text-[#ec0037]">
                *인증번호 전송 시간이 초과되었습니다. 인증번호를 재전송해
                주세요.
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <label htmlFor="birthday" className="text-base font-semibold">
              생년월일
            </label>
            <input
              type="text"
              placeholder={USER.birthday}
              disabled
              className="h-12 w-full rounded-sm border border-[#bdbdbd] bg-[#ececec] px-4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
