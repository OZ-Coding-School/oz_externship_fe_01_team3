import Timer from '@/components/common/Timer'
import { flexCenterStyle, roundedPillStyle } from '../style'

interface ShowOptionHeaderProps {
  time: number
}

export default function ShowOptionHeader({ time }: ShowOptionHeaderProps) {
  return (
    <div className="flex gap-6 items-center">
      <h3
        className={`w-[169px] h-[45px] text-[18px] text-[#6201E0] font-semibold ${flexCenterStyle} ${roundedPillStyle}`}
      >
        <Timer time={time} />
        &nbsp;뒤에 끝나요
      </h3>
      <div
        className={`flex items-center gap-2 w-[183px] h-[45px] px-3 ${roundedPillStyle}`}
      >
        <h3 className="text-[18px] text-[#303030] font-semibold leading-[1.4] tracking-[-0.03em]">
          부정행위
        </h3>
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <span
              key={index}
              className={`${flexCenterStyle} w-[20px] h-[26.67px] rounded-[2px] border-[1.5px] border-[#bdbdbd] bg-[#fafafa] text-[16px] text-[#bdbdbd] font-bold`}
            >
              !
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
