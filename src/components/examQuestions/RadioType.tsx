interface Option {
  id: number
  test: string
}

interface RadioTypeProps {
  options: Option[]
  questionId: string
}
/*
사용법!!

  대략적으로 들어올 배열 아직 어떻게 들어올지 모름 추후 수정 가능

  const test = [
    { id: 1, test: '나는야 승준티비 대빵이지' },
    { id: 2, test: '나는야 지향티비 열정걸이지' },
    { id: 3, test: '나는야 우수티비 매우 우수하지' },
    { id: 4, test: '나는야 성진티비 입대하지' },
  ]

      <RadioType options={test} questionId="w"></RadioType>
      
*/

export default function RadioType({ options, questionId }: RadioTypeProps) {
  return (
    <div className="w-[1000px] h-[144px] pr-[26px] pl-[32px] flex flex-col">
      {options.map((option, index) => {
        return (
          <label
            key={option.id}
            className={`flex items-center cursor-pointer w-[942px] h-[27px] ${index !== 0 ? 'mt-3' : ''}`}
          >
            <div className="relative w-[18px] h-[18px] mt-[4.5px] mb-[4.5px] mr-[12px]">
              <input
                type="radio"
                name={questionId}
                value={option.id}
                className="
                  appearance-none
                  w-full h-full
                  border-1
                  rounded-full
                   border-[#BDBDBD]
                  checked:bg-[#6200FF] checked:border-[#6200FF]
                  peer
                "
              />
              {/* 내부 원 기본 형태 */}
              <div
                className="
                absolute top-1/2 left-1/2
                w-[10px] h-[10px]
                rounded-full bg-[#ECECEC]
                transform -translate-x-1/2 -translate-y-1/2
                transition-opacity duration-200
                peer-checked:opacity-0
              "
              ></div>
              {/* 내부 원 클릭 형태 */}
              <div
                className="
                absolute top-1/2 left-1/2
                w-[10px] h-[10px]
                rounded-full bg-white
                transform -translate-x-1/2 -translate-y-1/2
                transition-opacity duration-200
                opacity-0 peer-checked:opacity-100
              "
              ></div>
            </div>
            <span className="text-base font-medium">{option.test}</span>
          </label>
        )
      })}
    </div>
  )
}
