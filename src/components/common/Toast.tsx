import type { ToastProps } from '@/types/common/Toast'
import checkIcon from '@/assets/SuccessCheck.svg'
import errorIcon from '@/assets/alert.svg'

export const Toast = ({ toast }: { toast: ToastProps | null }) => {
  if (!toast) return null

  const isError = toast.type === 'error'
  const icon = isError ? errorIcon : checkIcon
  const centeredTitleColor = isError ? 'text-[#ec0037]' : 'text-[#121212]'
  const defaultTextColor = isError ? 'text-[#ec0037]' : 'text-[#4d4d4d]'

  if (toast.layout === 'centered') {
    return (
      <div className="fixed inset-0 bg-black/60">
        <div className="fixed top-1/2 left-1/2 flex h-[128px] w-[396px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-[12px] bg-[#ffffff] text-center">
          <div className="h-[24px] w-[24px]">
            <img src={icon} alt={toast.type} className="h-full w-full" />
          </div>
          <div
            className={`text-[20px] ${centeredTitleColor} leading-[1.4] font-bold tracking-[-0.03em]`}
          >
            {toast.message}
          </div>
          {toast.subMessage && (
            <div className="text-sm leading-[1.4] tracking-[-0.03em] text-[#4d4d4d]">
              {toast.subMessage}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed top-[100px] left-1/2 flex h-[48px] w-[240px] -translate-x-1/2 items-center rounded-md border border-[#ECECEC] bg-[#fafafa] px-3 pl-2 [box-shadow:4px_4px_4px_0_rgba(131,131,131,0.25)] ${toast.className || ''}`}
    >
      <img src={icon} alt={toast.type} className="mr-1 h-[24px] w-[24px]" />
      <span
        className={`text-[14px] leading-[1.4] font-medium tracking-[-0.03em] ${defaultTextColor} whitespace-nowrap`}
      >
        {toast.message}
      </span>
    </div>
  )
}
