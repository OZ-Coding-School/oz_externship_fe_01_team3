import type { StatusBadgeProps } from '@/types/examList/examList'

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === 'submitted') {
    return (
      <span className="inline-flex h-[24px] w-[57px] items-center justify-center rounded-[2px] bg-[#CAF6E6] text-[12px] font-medium text-[#085036]">
        응시완료
      </span>
    )
  }
  return (
    <span className="inline-flex h-[24px] w-[57px] items-center justify-center rounded-[2px] bg-[#FFC1D0] text-[12px] font-medium text-[#5E0016]">
      미응시
    </span>
  )
}
