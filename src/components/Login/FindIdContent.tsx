// 아이디 찾기 내용 컴포넌트
import CommonButton from './CommonButton'
import { useFindForm } from '@/hooks/FindIdPw/useFindForm'
import FindIdHeader from './FindIdHeader'
import FindIdInitialSection from './FindIdInitialSection'

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
          />

          <CommonButton onClick={handleSubmit(findId)} text="아이디 찾기" />
          {/*아이디 찾기 버튼에는, 이름  */}
        </div>
      )}
    </div>
  )
}
