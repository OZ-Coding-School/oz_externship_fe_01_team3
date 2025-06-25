import Timer from '@/components/common/Timer'

interface ShowOptionHeaderProps {
  time: number
}

const ShowOptionHeader = ({ time }: ShowOptionHeaderProps) => {
  return (
    <div className="flex gap-6 items-center">
      <h3 className={timerStyle}>
        <Timer time={time} />
        &nbsp;뒤에 끝나요
      </h3>
      <div className={cheatContainerStyle}>
        <h3 className={cheatTitleStyle}>부정행위</h3>
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <span key={index} className={warningCardStyle}>
              !
            </span>
          ))}
          {/* 컴포넌트로 뺴기기 */}
        </div>
      </div>
    </div>
  )
}

export default ShowOptionHeader

const warningCardStyle =
  'w-[20px] h-[26.67px] rounded-[2px] border-[1.5px] border-[#bdbdbd] bg-[#fafafa] text-[16px] text-[#bdbdbd] font-bold flex items-center justify-center'
const timerStyle =
  'w-[169px] h-[45px] bg-[#ffffff] border border-[#ececec] text-[18px] text-[#6201E0] font-semibold rounded-[99px] flex items-center justify-center'
const cheatContainerStyle =
  'flex items-center gap-2 w-[183px] h-[45px] bg-[#ffffff] border border-[#ececec] rounded-[99px] px-3'
const cheatTitleStyle =
  'text-[18px] text-[#303030] font-semibold leading-[1.4] tracking-[-0.03em]'
