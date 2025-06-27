interface CheckBoxTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
  student_answer?: string
  correct_answer?: string
  is_correct?: boolean
}

export default function CheckBoxType({
  options,
  question_Id,
  disabled = false,
}: CheckBoxTypeProps) {
  return (
    <div className="w-[1000px] h-[144px] pr-[26px] pl-8 flex flex-col">
      {options.map((option, index) => {
        return (
          <label
            key={question_Id}
            className={`flex items-center cursor-pointer w-[942px] h-[27px] ${index !== 0 ? 'mt-3' : ''}`}
          >
            <div className="relative w-[18px] h-[18px] mt-[4.5px] mb-[4.5px] mr-3">
              <input
                type="checkbox"
                name={option}
                value={option}
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
            <span className="text-base font-medium">{option}</span>
          </label>
        )
      })}
    </div>
  )
}
