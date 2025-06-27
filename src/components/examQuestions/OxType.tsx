import { X } from 'lucide-react'


interface OxTypeProps {
  options: string[]
  question_Id: number
  disabled?: boolean
  student_answer?: string
  correct_answer?: string
  is_correct?: boolean
}


export default function OxType({
  options,
  question_Id,
  disabled = false,
}: OxTypeProps) {
  const padding = 'pt-[10px] pr-[16px] pb-[10px] pl-[16px]'

  return (
    <div className="w-[340px] h-auto pl-8 flex flex-col">
      {options.map((option, index) => {
        const inputId = `question-${question_Id}-${index}`
        return (
          <div
            key={inputId}
            className={`w-[308px] h-12 ${index !== 0 ? 'mt-3' : ''}`}
          >
            <input
              id={inputId}
              type="radio"
              name={`question-${question_Id}`}
              value={option}
              disabled={disabled}
              className="peer hidden"
            />
            <label
              htmlFor={inputId}
              className={`flex items-center cursor-pointer justify-between rounded-[4px] ${padding}
          bg-[#F2F3F5] 
          peer-checked:bg-[#EFE6FC] 
          transition-colors duration-200 group`}
            >
              <div className="flex flex-row justify-center items-center">
                {option === 'O' ? (
                  <div className="w-[16px] h-[16px] mr-2 bg-[#F2F3F5] border-[3px] border-[#BDBDBD] group-peer-checked:border-[#14C786] rounded-full"></div>
                ) : (
                  <X className="group-peer-checked:text-[#EC0037] text-[#BDBDBD] w-5 h-5 mr-[4px]" />
                )}

                <span className="font-medium text-base">
                  {option === 'O' ? '맞아요' : '아니에요'}
                </span>
              </div>

              <div className="flex items-center">
                <img
                  src="/src/assets/check-OX.svg"
                  className="w-5 group-peer-checked:hidden"
                />
                <img
                  src="/src/assets/check-OX-answer.svg"
                  className="w-5 hidden group-peer-checked:block"
                />
              </div>
            </label>
          </div>
        )
      })}
    </div>
  )
}
