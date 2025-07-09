import { useState } from 'react'
import CommonButton from './CommonButton'

//모달 내용
export default function StudentRegisterContent() {
  //수강중인 드롭다운 열림? 닫힘? 상태
  const [isOpen, setIsOpen] = useState(false)
  // 수강중인 드롭다운 선택한 것 저장 상태
  const [selected, setSelected] = useState('')
  // 수강중인 드롭 다운 내용 배열
  const options = [
    '웹 개발 초격차 프론트엔드 부트캠프',
    '웹 개발 초격차 백엔드 부트캠프',
    'IT스타트업 실무형 사업 개발자(BD) 부트캠프',
    '스타트업 맞춤형 프로덕트 디자이너',
    'IT스타트업 실무형 풀스택 웹 개발 부트캠프 (React + Node.js)',
  ]
  const handleOptionClick = (option: any) => {
    setIsOpen(false)
    setSelected(option)
  }

  //기수 드롭다운 열림? 닫힘? 상태
  const [isNumOpen, setIsNumOpen] = useState(false)
  //기수 선택한 것 저장 상태
  const [numSelected, setNumSelected] = useState('기수')
  //기수 드롭 다운 내용 배욜
  const nums = ['8', '9', '10', '11', '12']

  const handleNumClick = (num: any) => {
    setIsNumOpen(false)
    setNumSelected(num)
  }

  return (
    <div className="mt-[10px] flex flex-col items-center justify-center text-left font-normal">
      <img
        src="src/assets/CheckPurple.svg"
        alt="register"
        className="mb-[16px] h-[28px] w-[28px]"
      />
      <p className="mb-[16px] text-[20px] leading-none font-bold text-[#121212]">
        내 과정 선택하기
      </p>
      <p className="text-center text-sm leading-none text-[#4D4D4D]">
        해당하는 과정과 기수를 선택해 주세요.
      </p>
      {/* 과정 드롭다운 */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={` ${
            isOpen
              ? 'mt-[40px] h-[48px] w-[348px] rounded-[4px] border border-[#121212] text-left text-[#121212]'
              : 'mt-[40px] h-[48px] w-[348px] rounded-[4px] border border-[#BDBDBD] text-left text-[#BDBDBD]'
          }`}
        >
          <div className="flex w-full items-center justify-between px-4">
            <span className="text-sm">
              {selected || '수강중인 과정을 선택해 주세요.'}
            </span>
            {isOpen ? (
              <img src="src/assets/DropdownUp.png" className="h-5 w-5" />
            ) : (
              <img src="src/assets/DropdownDown.png" className="h-5 w-5" />
            )}
          </div>
        </button>
        {isOpen && (
          <ul className="absolute z-10 mt-2 rounded border border-[#121212] bg-white shadow">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`mx-[12px] my-[5px] cursor-pointer rounded-[4px] px-4 py-2 text-sm hover:bg-[#EFE6FC] ${
                  selected === option
                    ? 'flex items-center justify-between text-[#6201E0]'
                    : 'text-[#4D4D4D]'
                }`}
              >
                {option}
                {selected === option && (
                  <img
                    src="src/assets/DropCheck.png" // 선택 표시용 이미지 (체크 아이콘 등)
                    alt="selected"
                    className="h-4 w-4"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* 기수 드롭다운 */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsNumOpen(!isNumOpen)}
          className={` ${
            isNumOpen
              ? 'mt-[16px] h-[48px] w-[348px] rounded-[4px] border border-[#121212] text-left text-[#121212]'
              : 'mt-[16px] h-[48px] w-[348px] rounded-[4px] border border-[#BDBDBD] text-left text-[#BDBDBD]'
          }`}
          disabled={!selected}
        >
          <div className="flex w-full items-center justify-between px-4">
            <span className="text-sm">{numSelected}</span>
            {isNumOpen ? (
              <img src="src/assets/DropdownUp.png" className="h-5 w-5" />
            ) : (
              <img src="src/assets/DropdownDown.png" className="h-5 w-5" />
            )}
          </div>
        </button>
        {isNumOpen && (
          <ul className="absolute mt-2 w-[348px] rounded border border-[#121212] bg-white shadow">
            {nums.map((num) => (
              <li
                key={num}
                onClick={() => handleNumClick(num)}
                className={`mx-[12px] my-[5px] cursor-pointer rounded-[4px] px-4 py-2 text-sm hover:bg-[#EFE6FC] ${
                  numSelected === num
                    ? 'flex items-center justify-between rounded text-[#6201E0]'
                    : 'text-[#4D4D4D]'
                }`}
              >
                <span>{num}</span>
                {numSelected === num && (
                  <img
                    src="src/assets/DropCheck.png" // 선택 표시용 이미지 (체크 아이콘 등)
                    alt="selected"
                    className="h-4 w-4"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <CommonButton text="등록하기" />
    </div>
  )
}
