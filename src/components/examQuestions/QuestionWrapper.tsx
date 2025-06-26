import type { ReactNode } from 'react'

interface QusetionWrapperProps {
  children: ReactNode
}

export default function QusetionWrapper({ children }: QusetionWrapperProps) {
  return (
    <div className="w-[1000px] h-auto flex flex-col gap-[20px]">{children}</div>
  )
}
