import { useEffect, useState } from 'react'

interface TimerProps {
  time?: number
  onComplete?: () => void
}

export default function Timer({ time, onComplete }: TimerProps) {
  const Minutes_In_Ms = time ? time * 60 * 1000 : 0
  const Interval = 1000
  const [timeLeft, setTimeLeft] = useState<number>(Minutes_In_Ms)

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0'
  )
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const nextTime = prevTime - Interval
        if (nextTime <= 0) {
          clearInterval(timer)
          onComplete?.()
          return 0
        }
        return nextTime
      })
    }, Interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {minutes}:{seconds}
    </div>
  )
}
