export const containerStyle = (showOption: boolean) =>
  `flex ${
    showOption ? 'justify-around items-center' : 'items-center justify-start'
  } max-w-screen h-[128px] bg-[#fafafa] border-b border-[#bdbdbd] px-4`

export const leftContainerStyle = (showOption: boolean) =>
  `flex gap-5 ${!showOption && `relative left-[360px]`}`

export const flexCenterStyle = 'flex items-center justify-center'

export const roundedPillStyle =
  'rounded-[99px] border border-[#ececec] bg-white'

export const QustionTitleFontStyle =
  'text-[#121212] leading-[1.4] tracking-[-0.03em]'
