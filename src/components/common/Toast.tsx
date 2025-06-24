import type { ToastProps } from '@/types/common/Toast'
import checkIcon from '@/assets/check.svg'
import errorIcon from '@/assets/alert.svg'

export const Toast = ({ toast }: { toast: ToastProps | null }) => {
  if (!toast) return null

  const isError = toast.type === 'error'
  const icon = isError ? errorIcon : checkIcon
  const centeredTitleColor = isError ? 'text-[#ec0037]' : 'text-[#121212]'
  const defaultTextColor = isError ? 'text-[#ec0037]' : 'text-[#4d4d4d]'

  if (toast.layout === 'centered') {
    return (
      <div className="fixed flex flex-col items-center gap-2 justify-center w-[396px] h-[128px] top-[422px] left-[762px] bg-[#ffffff] rounded-[12px] text-center ">
        <div className="w-[24px] h-[24px]">
          <img src={icon} alt={toast.type} className="w-full h-full" />
        </div>
        <div
          className={`text-[20px] ${centeredTitleColor} font-bold leading-[1.4] tracking-[-0.03em]`}
        >
          {toast.message}
        </div>
        {toast.subMessage && (
          <div className="text-sm text-[#4d4d4d] leading-[1.4] tracking-[-0.03em]">
            {toast.subMessage}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`fixed top-[204px] left-[836px] flex items-center w-[248px] h-[48px] pl-2 px-3 bg-[#fafafa] border border-[#ECECEC] rounded-md [box-shadow:4px_4px_4px_0_rgba(131,131,131,0.25)] ${toast.className || ''}`}
    >
      <img src={icon} alt={toast.type} className="w-[24px] h-[24px] mr-1" />
      <span
        className={`text-[14px] font-medium leading-[1.4] tracking-[-0.03em] ${defaultTextColor} whitespace-nowrap`}
      >
        {toast.message}
      </span>
    </div>
  )
}
