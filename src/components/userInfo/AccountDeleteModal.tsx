import { X } from 'lucide-react'
import { useState } from 'react'

interface Props {
  onClose: () => void
}

export default function AccountDeleteModal({ onClose }: Props) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [deleteAccount, setDeleteAccount] = useState(false)

  const handleDelete = () => {
    setDeleteAccount(true)
    console.log('계정 삭제')
  }

  const OPTIONS = [
    { value: 1, label: '원하는 종류의 강의가 없어서' },
    { value: 2, label: '타 부트캠프에 더 양질의 컨텐츠가 있어서' },
    { value: 3, label: '사이트내 UX/UI가 불편해서' },
    { value: 4, label: '부트캠프를 수강 완료해서' },
    { value: 5, label: '기타(직접입력)' },
  ]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#121212]/60">
      <div className="flex h-143 max-h-143 w-161 flex-col rounded-lg bg-[#ffffff]">
        <div className="mx-6 mt-6 flex justify-end">
          <X
            className="cursor-pointer text-base text-[#9D9D9D]"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="h-97 w-150">
            <div className="flex h-22 w-150 flex-col gap-10">
              <p className="mt-3 text-xl font-bold text-[#121212]">
                오즈코딩스쿨을 탈퇴하시는 이유는 무엇인가요?
              </p>
              <p className="text-base text-[#bdbdbd]">
                계정을 삭제하시면 회원님의 모든 콘텐츠와 활동 기록, 수강 기간 /
                포인트 / 쿠폰 내역이 사라지며 환불되지 않습니다. 삭제된 정보는
                복구할 수 없습니다.
              </p>
            </div>
            <div className="relative mt-20 w-72 rounded-sm">
              <button
                className="flex h-12 w-72 items-center justify-between rounded-sm border border-[#707070] px-4 text-sm"
                onClick={() => setOpen((prev) => !prev)}
              >
                <span
                  className={selectedValue === null ? 'text-[#121212]' : ''}
                >
                  {selectedValue === null
                    ? '해당되는 항목을 선택해 주세요'
                    : OPTIONS.find((o) => o.value === selectedValue)?.label}
                </span>
                <svg
                  className="h-4 w-4 rotate-180 text-[#121212]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {open && (
                <ul className="absolute z-10 mt-2 flex w-72 flex-col rounded-sm border border-[#707070] bg-[#ffffff]">
                  {OPTIONS.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        setSelectedValue(option.value)
                        setOpen(false)
                      }}
                      className={`mx-1 flex h-12 w-69 cursor-pointer items-center justify-between rounded-sm px-3 text-sm hover:bg-[#efe6fc] ${
                        selectedValue === option.value
                          ? 'text-purple-primary font-semibold'
                          : 'text-[#121212]'
                      }`}
                    >
                      <span>{option.label}</span>
                      {selectedValue === option.value && (
                        <svg
                          className="text-purple-primary h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {selectedValue === 5 && (
              <div className="mt-5 flex flex-col gap-5">
                <p>
                  서비스를 이용하시면서 불편했 점이나 보완할 수 있는 방안을
                  알려주시면, 서비스 개선에 적극적으로 반영하겠습니다.
                  감사합니다!
                </p>
                <textarea
                  name=""
                  id=""
                  placeholder="소중한 의견을 반영해 더 좋은 서비스를 위해 노력하겠습니다."
                  className="h-33 w-150 resize-none rounded-sm border border-[#bdbdbd] bg-[#fafafa] outline-none"
                ></textarea>
              </div>
            )}
          </div>
          {selectedValue !== null && (
            <div className="flex items-center justify-center">
              <button
                className="border-purple-primary text-purple-primary mt-5 h-12 w-36 cursor-pointer rounded-sm border bg-purple-100 text-base font-semibold"
                onClick={handleDelete}
              >
                {deleteAccount ? '탈퇴 처리 중 입니다...' : '회원 탈퇴하기'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
