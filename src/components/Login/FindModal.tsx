//공통 모달 컴포넌트
type FindModalProps = {
  onClose: () => void
  children: React.ReactNode
}
export default function FindModal({ onClose, children }: FindModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(18, 18, 18, 0.6)' }}
    >
      {/* 모달 내용 박스  */}
      <div
        className="w-[396px] rounded-[12px] bg-white"
        style={{
          top: '280px',
          bottom: '278px',
          left: '762px',
          right: '762px',
        }}
      >
        <div className="mt-[24px] mr-[24px] mb-[24px] ml-[24px] flex justify-end">
          <img
            src="src/assets/closeIcon.png"
            alt="close"
            onClick={onClose}
            className="h-[12px] w-[12px]"
          />
        </div>
        {children}
      </div>
    </div>
  )
}
