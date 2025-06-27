import type { ReactNode } from 'react'

interface ExamWrapperProps {
  children: ReactNode
}

export default function ExamWrapper({ children }: ExamWrapperProps) {
  return (
    <div className="w-[1000px] h-auto flex flex-col gap-[100px]">
      {children}
    </div>
  )
}
