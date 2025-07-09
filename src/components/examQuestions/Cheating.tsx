import { X } from 'lucide-react'

interface CheatingProps {
  cheatingCount?: number
  hidden: boolean
  onClose: () => void
}

export default function Cheating({
  cheatingCount,
  hidden,
  onClose,
}: CheatingProps) {
  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-[#121212]/60 ${
        hidden ? 'hidden' : ''
      }`}
    >
      <div className="flex h-85 w-99 items-center justify-center rounded-xl bg-[#FFFFFF]">
        <div className="flex h-73 w-87 flex-col gap-[10px] bg-[#FFFFFF]">
          <div className="flex h-7 w-87 justify-end bg-[#FFFFFF] px-[6px] pt-[3px]">
            <X
              size={16}
              color="#9D9D9D"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          <div className="flex h-65 w-87 flex-col justify-center gap-6 bg-[#FFFFFF]">
            <div className="flex h-47 w-87 flex-col items-center justify-center bg-[#FFFFFF]">
              {(cheatingCount ?? 0) > 2 ? (
                <img
                  src="/src/assets/RedCard.svg"
                  className="mb-4 size-[105px]"
                  alt=""
                />
              ) : (
                <img
                  src="/src/assets/YellowCard.svg"
                  className="mb-4 size-[105px]"
                  alt=""
                />
              )}
              <div className="flex h-16 w-87 flex-col items-center justify-center bg-[#FFFFFF]">
                <h2 className="mb-3 text-lg font-semibold">
                  부정행위
                  <span
                    className={
                      (cheatingCount ?? 0) > 2
                        ? 'text-[#EC0037]'
                        : 'text-[#FFAE00]'
                    }
                  >
                    {cheatingCount}회
                  </span>
                  감지
                </h2>
                <div className="flex flex-col items-center justify-center text-sm text-[#303030]">
                  {(cheatingCount ?? 0) > 2 ? (
                    <>
                      <p>세 번째 이탈이 감지됐어요.</p>
                      <p>부정행위로 처리되어 시험이 종료됩니다.</p>
                    </>
                  ) : (
                    <>
                      <p>다른 탭을 열거나 화면을 이탈하면</p>
                      <p>부정행위로 간주돼 시험이 중단될 수 있어요</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="h-12 w-87 cursor-pointer rounded border-black bg-[#6201E0] text-base font-semibold text-[#FAFAFA]"
            >
              {(cheatingCount ?? 0) > 2 ? '시험종료' : '확인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
