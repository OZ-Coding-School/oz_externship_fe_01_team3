import { X } from 'lucide-react'

type Status = 'default' | 'correct' | 'wrong'

interface Option {
  id: number
  test: string
  OX: boolean
}

interface OxTypeProps {
  options: Option[]
  questionId: string
  disabled?: boolean
  Answer?: Status
}

export default function OxType({
  options,
  questionId,
  disabled = false,
}: OxTypeProps) {
  const padding = 'pt-[10px] pr-[16px] pb-[10px] pl-[16px]'

  return (
    <div className="w-[340px] h-auto pl-[32px] flex flex-col">
      {options.map((option, index) => {
        const inputId = `${questionId}-${option.id}`

        return (
          <div
            key={option.id}
            className={`w-[308px] h-[48px] ${index !== 0 ? 'mt-3' : ''}`}
          >
            <input
              type="radio"
              id={inputId}
              name={questionId}
              value={option.id}
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
                {option.OX ? (
                  <div className=" w-[16px] h-[16px] mr-[8px] bg-[#F2F3F5] border-3 border-[#BDBDBD] group-peer-checked:border-[#14C786] rounded-full"></div>
                ) : (
                  <X className="group-peer-checked:text-[#EC0037] text-[#BDBDBD] w-[20px] h-[20px] mr-[4px]" />
                )}

                <span className="font-medium text-base">{option.test}</span>
              </div>

              <div className="flex items-center">
                <img
                  src="/src/assets/check-OX.svg"
                  className="w-[20px] group-peer-checked:hidden"
                />
                <img
                  src="/src/assets/check-OX-answer.svg"
                  className="w-[20px] hidden group-peer-checked:block"
                />
              </div>
            </label>
          </div>
        )
      })}
    </div>
  )
}
