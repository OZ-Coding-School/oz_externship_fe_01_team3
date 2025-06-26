export default function SideBarButton({
  name,
  disabled,
  onClick,
}: {
  name: string
  disabled: boolean
  onClick?: () => void
}) {
  return (
    <button
      className={`mb-[1px] h-[32px] w-[180px] px-[12px] text-left text-[18px] leading-[1.4] font-semibold tracking-[-0.03em] text-[#9d9d9d] hover:bg-[#efe6fc] hover:text-[#6201E0] ${!disabled ? 'active:ml-[2px] active:border-l active:border-[#6201E0] active:bg-transparent active:text-[#6201E0]' : ''} disabled:bg-[#ececec] disabled:text-[#bdbdbd]`}
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        onClick?.()
      }}
    >
      {name}
    </button>
  )
}
