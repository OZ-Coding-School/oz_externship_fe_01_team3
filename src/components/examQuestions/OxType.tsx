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
  Answer = 'default',
}: OxTypeProps) {
  const padding = 'pt-[10px] pr-[16px] pb-[10px] pl-[16px]'
  const statusClass = {
    default: 'text-[#222222]',
    correct: 'text-[#14C786]',
    wrong: 'text-[#EC0037]',
  }
  return (
    <div className="w-[340px] h-[108px] pl-[32px] flex flex-col">
      {options.map((option, index) => {
        return (
          <label
            key={option.id}
            className={`flex items-center cursor-pointer w-[308px] h-[48px] justify-between rounded-[4px]  ${padding} bg-[#F2F3F5] ${index !== 0 ? 'mt-3' : ''}`}
          >
            <div className="flex flex-row justify-center items-center">
              {option.OX ? (
                <div className=" w-[16px] h-[16px] mr-[8px] bg-white border-2 border-[#14C786] rounded-full"></div>
              ) : (
                <X className="text-[#EC0037] w-[20px] h-[20px] mr-[4px]"></X>
              )}

              <input
                type="radio"
                disabled={disabled}
                name={questionId}
                value={option.id}
                className="appearance-none"
              />
              <span className={`font-medium text-base ${statusClass[Answer]}`}>
                {option.test}
              </span>
            </div>
            <img src="/src/assets/check-OX.svg " className="w-[20px] " />
          </label>
        )
      })}
    </div>
  )
}
