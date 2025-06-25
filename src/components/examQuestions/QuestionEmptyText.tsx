import { useState } from 'react'
import Input from '@/components/common/Input'

interface QuestionEmptyTextProps {
  placeholder: string
  name: string
  onChange: (value: string) => void
}

export default function QuestionEmptyText({
  name,
  onChange,
}: QuestionEmptyTextProps) {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }
  return (
    <div className="flex flex-col gap-[16px]">
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

      <div className="flex items-center bg-[#f2f3f5] w-[288px] h-[48px] rounded-[4px] px-[12px]">
        <span className="text-[18px] font-semibold bg-[#f2f3f5] text-[#222222] mr-[12px] leading-[1.4] tracking-[-0.03em]">
          {name}
        </span>
        <Input
          type="text"
          value={value}
          placeholder="정답을 입력해 주세요."
          onChange={handleChange}
          classNames="w-[272px] h-[48px] bg-[#f2f3f5] rounded-[4px] outline-none"
        />
      </div>
    </div>
  )
}
