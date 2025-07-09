import Timer from '@/components/common/Timer'
import { flexCenterStyle, roundedPillStyle } from '../style'

interface ShowOptionHeaderProps {
  time: number
  cheatingCount: number
}

export default function ShowOptionHeader({
  time,
  cheatingCount,
}: ShowOptionHeaderProps) {
  return (
    <div className="flex items-center gap-6">
      <h3
        className={`h-[45px] w-[169px] text-[18px] font-semibold text-[#6201E0] ${flexCenterStyle} ${roundedPillStyle}`}
      >
        <Timer time={time} />
        &nbsp;뒤에 끝나요
      </h3>
      <div
        className={`flex h-[45px] w-[183px] items-center gap-2 px-3 ${roundedPillStyle}`}
      >
        <h3 className="text-[18px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#303030]">
          부정행위
        </h3>
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => {
            const color = 'border-[#FFAE00] bg-[#FFAE00] text-white'
            return (
              //TODO: 카운트 변경 로직 리펙토링
              <span
                key={index}
                className={`${flexCenterStyle} * h-[26.67px] w-[20px] rounded-[2px] border-[1.5px] text-[16px] font-bold text-[#bdbdbd] ${
                  cheatingCount > index
                    ? index === 2 && cheatingCount >= 3
                      ? 'border-[#EC0037] bg-[#EC0037] text-white'
                      : color
                    : 'border-[#bdbdbd] bg-[#fafafa] text-[#bdbdbd]'
                }`}
              >
                !
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
