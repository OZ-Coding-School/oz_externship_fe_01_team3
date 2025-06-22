import { useState } from 'react'

interface QuestionEmptyTextProps {
  placeholder: string
  onChange: (value: string) => void
}

const QuestionEmptyText = ({ onChange }: QuestionEmptyTextProps) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }
  return (
    <div>
      {/* <div className="flex flex-col gap-[16px]">
        <p>
          1. 변수나 함수의 매개변수, 반환값에 타입을 명시하는 것을
          (A)______이라고 한다.
        </p>
        <p>
          2. interface 또는 type 키워드를 사용하여 객체의 구조를 정의할 수
          있는데, 이렇게 만든 타입을 (B)______이라고 부른다.
        </p>
      </div> */}

      <div className="flex items-center bg-[#f2f3f5] w-[308px] h-[48px] rounded-[4px] px-[12px]">
        <span className="text-[18px] font-semibold text-[#222222] mr-[12px] leading-[1.4] tracking-[-0.03em]">
          A
        </span>
        <input
          className="bg-transparent flex-1 text-[16px] font-medium leading-[1.4] tracking-[-0.03em] outline-none placeholder:text-[#999999]"
          type="text"
          value={value}
          placeholder="정답을 입력해 주세요."
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default QuestionEmptyText
