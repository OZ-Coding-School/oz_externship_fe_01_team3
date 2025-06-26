interface Option {
  id: number
  test: string
}

interface CheckBoxTypeProps {
  options: Option[]
  questionId: string
  disabled?: boolean
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

      <CheckBoxType options={test} questionId="w"></CheckBoxType>

*/

export default function CheckBoxType({
  options,
  questionId,
  disabled = false,
}: CheckBoxTypeProps) {
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
                type="checkbox"
                name={questionId}
                value={option.id}
                className="
                  appearance-none w-full h-full border rounded-[2px] cursor-pointer 
                  border-[#BDBDBD] checked:bg-[#6200FF] checked:border-[#6200FF] peer
                "
                disabled={disabled}
              />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                           opacity-0 peer-checked:opacity-100 transition-opacity duration-200 w-4"
              >
                <img src="/src/assets/check.svg " className="w-full h-full" />
              </div>
            </div>
            <span className="text-base font-medium">{option.test}</span>
          </label>
        )
      })}
    </div>
  )
}
