// 아이디 찾기 내용 컴포넌트
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CommonButton from './CommonButton'

type FindIdContentProps = {
  setModalContentType: (
    value: 'findIdType' | 'findPwType' | 'deactivatedInfo'
  ) => void
}
interface FindIdContentsPropsType {
  name: string
  phone: string
  phoneCode: string
}

export default function FindIdContent({
  setModalContentType,
}: FindIdContentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FindIdContentsPropsType>({ mode: 'onChange' })

  const nameValue = watch('name')
  const phoneValue = watch('phone')
  const phoneCodeValue = watch('phoneCode')

  const [errorMessage, setErrorMessage] = useState('')
  const [successFindId, setSuccessFindId] = useState(false) //성공시 모달 보여줄 용
  const [foundId, setFoundId] = useState('') //백엔드 연결 전 가짜 아이디 저장용

  //누르면, 비밀번호 찾기 화면 상태로 바꾸는 함수
  const handleClickFindPw = () => {
    setModalContentType('findPwType')
  }

  //백엔드 전 임시 (오류메세지 설정용)
  const findId = (data: any) => {
    console.log('제출된 데이터:', data)

    if (data.name === '홍길동') {
      setErrorMessage('')
      setSuccessFindId(true)
      setFoundId('hong123@ozcoding.com')
      // 성공 시 처리
    } else {
      setErrorMessage(
        '입력한 이름과 휴대폰 번호로 등록된\n 이메일이 존재하지 않습니다. '
      )
      setSuccessFindId(false)
    }
  }

  // 이메일 도메인 마스킹 처리하는 함수
  function maskEmailDomain(email: string) {
    const [localPart, domain] = email.split('@')

    // domain 예: example.com
    // domain을 '.' 기준으로 나눠서 앞부분과 뒷부분 분리
    const [domainName, domainExt] = domain.split('.')

    // domainName은 앞 3글자만 남기고 나머지는 *로 마스킹
    const maskedDomainName =
      domainName.slice(0, 3) + '*'.repeat(domainName.length - 3)

    return `${localPart}@${maskedDomainName}.${domainExt}`
  }

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
            <label
              htmlFor="name"
              className="mr-[16px] mb-[20px] text-[16px] text-[#121212]"
            >
              이름<span className="text-[#EC0037]">*</span>
            </label>
          </div>
          <div>
            <input
              {...register('name', { required: '이름은 필수입니다.' })}
              className={`h-[48px] w-[348px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] ${errors.name ? 'border-[#EC0037]' : nameValue ? 'border-[#14C786]' : 'border-[#BDBDBD]'} focus:border-[#6201E0] focus:outline-none`}
              placeholder="이름을 입력해주세요"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}

            {/*휴대전화*/}

            <div className="mt-[32px] flex items-center">
              <label
                htmlFor="phone"
                className="mr-[16px] mb-[20px] text-[16px] text-[#121212]"
              >
                휴대전화<span className="text-[#EC0037]">*</span>
              </label>
            </div>
            <div className="flex">
              <div className="flex items-center">
                <input
                  {...register('phone', {
                    required: '번호를 입력해주세요.',
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: '11자리 숫자를 입력해주세요.',
                    },
                  })}
                  maxLength={11}
                  inputMode="numeric"
                  onInput={(e: any) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                  }
                  className={`h-[48px] w-[228px] rounded-[4px] border-[1px] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none ${
                    errors.phone
                      ? 'border-red-500' // 에러가 있으면 빨간색
                      : watch('phone') && !errors.phone // 값이 있고 에러가 없으면 (성공 시) 녹색
                        ? 'border-green-500'
                        : 'border-[#BDBDBD]' // 그 외 기본 색상
                  }`}
                  placeholder="숫자만 입력해주세요"
                />
              </div>
              <button
                className={`ml-[8px] h-[48px] w-[112px] rounded-[4px] border ${phoneValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
                onClick={() => alert('전송버튼 클릭됨!')}
              >
                인증번호전송
              </button>
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}

            {/*휴대전화 인증 번호*/}

            <div className="mt-[16px] flex">
              <input
                {...register('phoneCode', {
                  required: '인증코드를 입력해주세요.',
                })}
                className={`h-[48px] w-[228px] rounded-[4px] border-[1px] border-[#BDBDBD] pt-[10px] pr-[16px] pb-[10px] pl-[16px] text-[#333] placeholder-[#BDBDBD] focus:border-[#6201E0] focus:outline-none`}
                placeholder="인증번호 6자리를 입력해주세요"
              />
              <button
                className={`ml-[8px] h-[48px] w-[112px] rounded-[4px] border ${phoneCodeValue ? 'border-[#6201E0] bg-[#EFE6FC] text-[#6201E0]' : 'border-[#BDBDBD] bg-[#ECECEC] text-[#888]'} `}
              >
                인증번호확인
              </button>
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
