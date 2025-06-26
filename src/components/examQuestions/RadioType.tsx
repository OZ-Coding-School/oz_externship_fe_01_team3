interface RadioTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
}

export default function RadioType({
  options,
  question_Id,
  disabled = false,
}: RadioTypeProps) {
  return (
    <div className="w-[1000px] h-[144px] pr-[26px] pl-[32px] flex flex-col">
      {options.map((option, index) => {
        return (
          <label
            className={`flex items-center cursor-pointer w-[942px] h-[27px] ${index !== 0 ? 'mt-3' : ''}`}
          >
            <div className="relative w-[18px] h-[18px] mt-[4.5px] mb-[4.5px] mr-[12px]">
              <input
                type="radio"
                name={`question-${question_Id}`}
                value={option}
                className="
                  appearance-none
                  w-full h-full
                  border-1
                  rounded-full
                   border-[#BDBDBD]
                  checked:bg-[#6200FF] checked:border-[#6200FF]
                  peer
                "
                disabled={disabled}
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
              />
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
              />
            </div>
            <span className={`text-base font-medium`}>{option}</span>
          </label>
        )
      })}
    </div>
  )
}
