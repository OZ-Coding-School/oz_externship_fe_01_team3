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
      className={`
      text-left
      w-[180px] h-[32px]
      px-[12px]
      mb-[1px]
      text-[18px] text-[#9d9d9d]
      font-semibold
      tracking-[-0.03em] leading-[1.4]
    hover:text-[#6201E0] hover:bg-[#efe6fc]
      ${!disabled ? 'active:text-[#6201E0] active:ml-[2px] active:border-l active:border-[#6201E0] active:bg-transparent' : ''}
      disabled:text-[#bdbdbd] disabled:bg-[#ececec] 
  `}
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
