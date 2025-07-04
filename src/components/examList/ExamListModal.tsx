import { useExamModalQuery } from '@/hooks/examList/useExamModalQuery'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../common/Button'

interface ModalProps {
  setIsModalClose: (isModalOpen: boolean) => void
}
const MAX_LENGTH = 6

export default function ExamListModal({ setIsModalClose }: ModalProps) {
  const [examCode, setExamCode] = useState('')
  const [error, setError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()
  const { data, isSuccess, isError } = useExamModalQuery(
    examCode,
    submitted && examCode.length === MAX_LENGTH
  )

  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/exam/${data.test.id}`, { state: data })
    }
  }, [isSuccess, data, navigate])

  useEffect(() => {
    if (isError && submitted) {
      setError(true)
      setSubmitted(false)
    }
  }, [isError, submitted])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: 참가 코드를 입력 시, POST 요청 후 데이터를 받아서 navigate로 보내주기
    e.preventDefault()

    if (examCode.length !== MAX_LENGTH) {
      setError(true)
      setExamCode('')
      return
    }
    setError(false)
    setSubmitted(true)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Regex:숫자만 허용하고 6자리까지만 제한
    const regex = /^[0-9]*$/
    if (regex.test(e.target.value) && e.target.value.length <= 6) {
      setExamCode(e.target.value)
      setError(false)
      return
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#121212] opacity-50" />
      {/* 모달 */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex h-[360px] w-[396px] flex-col items-center justify-center rounded-[12px] bg-white p-6 shadow-lg"
      >
        <Button
          className="absolute top-6 right-6 text-2xl text-[#9D9D9D]"
          onClick={() => setIsModalClose(false)}
        >
          <X />
        </Button>
        <img
          src="/src/assets/examList/python.png"
          alt="python"
          className="mb-4 h-8"
        />
        {/* 시험명 */}
        <h2 className="my-4 text-lg font-semibold text-[#121212]">
          Python 심화
        </h2>
        {/* 문항수, 제한시간 */}
        <p className="mb-9 text-center text-sm text-[#303030]">
          총 10문항 · <span className="text-[#6201E0]">제한시간 20분</span>
        </p>
        {/* 참가 코드 입력 */}
        <label
          htmlFor="examCode"
          className="w-full self-start font-medium text-[#222]"
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
          className={`h-12 w-full border ${error ? 'border-[#EC0037] text-[#EC0037]' : 'border-[#E0E0E0]'} mb-2 rounded-lg px-4 text-lg focus:outline-[#6C47FF]`}
        />
        {error && (
          <div className="mb-4 w-full text-sm text-[#EC0037]">
            * 코드번호가 일치하지 않습니다.
          </div>
        )}
        {/* 시험시작 버튼 */}
        <button className="h-[48px] w-full rounded-[4px] bg-[#6201E0] text-[16px] font-semibold text-white">
          시험시작
        </button>
      </form>
    </div>
  )
}
