import { useState } from 'react'

interface ModalProps {
  setIsModalClose: (isModalOpen: boolean) => void
}

export default function ExamListModal({ setIsModalClose }: ModalProps) {
  const [examCode, setExamCode] = useState('')
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Regex:숫자만 허용하고 6자리까지만 제한
    const regex = /^[0-9]*$/
    if (regex.test(e.target.value) && e.target.value.length <= 6) {
      setExamCode(e.target.value)
      setError(false)
      return
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: 참가 코드를 입력 시, POST 요청 후 데이터를 받아서 navigate로 보내주기
    e.preventDefault()
    if (examCode.length !== 6) {
      setError(true)
      setExamCode('')
      return
    }
    setError(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-[#121212] opacity-50" />
      {/* 모달 */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[396px] h-[360px] bg-white rounded-[12px] flex flex-col items-center justify-center shadow-lg p-6"
      >
        <button
          type="button"
          className="absolute top-6 right-6 text-2xl text-[#9D9D9D]"
          onClick={() => setIsModalClose(true)}
        >
          x
        </button>
        <img
          src="/src/assets/examList/python.png"
          alt="python"
          className="h-8 mb-4"
        />
        {/* 시험명 */}
        <h2 className="text-lg font-semibold text-[#121212] my-4">
          Python 심화
        </h2>
        {/* 문항수, 제한시간 */}
        <p className="text-sm text-[#303030] mb-9 text-center">
          총 10문항 · <span className="text-[#6201E0]">제한시간 20분</span>
        </p>
        {/* 참가 코드 입력 */}
        <label
          htmlFor="examCode"
          className="self-start w-full text-[#222] font-medium"
        >
          참가 코드입력
        </label>
        <input
          id="examCode"
          type="text"
          value={examCode}
          onChange={(e) => {
            handleChange(e)
            setError(false)
          }}
          placeholder="6자리를 입력해주세요"
          maxLength={6}
          className={`w-full h-12 border ${error ? 'border-[#EC0037] text-[#EC0037]' : 'border-[#E0E0E0]'} rounded-lg px-4 mb-2 text-lg focus:outline-[#6C47FF]`}
        />
        {error && (
          <div className="w-full mb-4 text-sm text-[#EC0037]">
            * 코드번호가 일치하지 않습니다.
          </div>
        )}
        {/* 시험시작 버튼 */}
        <button className="w-full h-[48px] bg-[#6201E0] text-white text-[16px] font-semibold rounded-[4px]">
          시험시작
        </button>
      </form>
    </div>
  )
}
