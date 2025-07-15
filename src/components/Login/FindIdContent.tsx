// 아이디 찾기 내용 컴포넌트
import CommonButton from './CommonButton'
import { useFindForm } from '@/hooks/FindIdPw/useFindForm'
import FindIdHeader from './FindIdHeader'
import FindIdInitialSection from './FindIdInitialSection'
import { api } from '@/API/axiosInstance'
import { useState } from 'react'
import type { AxiosError } from 'axios'

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
    // successFindId,
    // setSuccessFindId,
    // findId,
  } = useFindForm(setModalContentType)

  const [errorMessage, setErrorMessage] = useState('')
  const [foundId, setFoundId] = useState('') // 아이디 저장용
  const [successFindId, setSuccessFindId] = useState(false) //성공시 모달 보여줄 용

  const handleFindId = async () => {
    try {
      const res = await api.post('/api/v1/auth/account/find-email/', {
        name: nameValue,
        phone_number: phoneValue,
      })

      console.log(res.data.message)
      alert('아이디 찾기 성공 입니다!') //성공시, "코드 전송 되었습니다!!"
      setSuccessFindId(true)
      setFoundId(res.data.email)
    } catch (error) {
      const axiosError = error as AxiosError<any>

      console.error(error)
      setErrorMessage(
        '입력한 이름과 휴대폰 번호로 등록된\n 이메일이 존재하지 않습니다. '
      )

      // 서버 에러 메시지 보여주기
      if (axiosError.response?.data?.message) {
        alert(axiosError.response.data.message)
      } else {
        alert('코드 전송에 실패했습니다.')
      }
    }
  }

  return (
    <div>
      {/* 상단 아이콘과 제목, 에러메시지 영억  */}
      <FindIdHeader errorMessage={errorMessage} foundId={foundId} />

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
          {/* 아이디찾기 첫 모달 기본 화면(찾는 화면 이메일, 비밀번호 입력하는 칸)  */}
          <FindIdInitialSection
            register={register}
            errors={errors}
            nameValue={nameValue}
            phoneValue={phoneValue}
            phoneCodeValue={phoneCodeValue}
            setSuccessFindId={setSuccessFindId}
          />

          <CommonButton
            onClick={handleSubmit(handleFindId)}
            text="아이디 찾기"
          />
          {/*아이디 찾기 버튼에는, 이름  */}
        </div>
      )}
    </div>
  )
}
