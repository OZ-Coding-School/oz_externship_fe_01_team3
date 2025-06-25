import { useEffect, useState } from 'react'

interface TimerProps {
  time?: number
}

export default function Timer({ time }: TimerProps) {
  const Minutes_In_Ms = time ? time * 60 * 1000 : 0
  const Interval = 1000
  const [timeLeft, setTimeLeft] = useState<number>(Minutes_In_Ms)

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0'
  )
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - Interval)
    }, Interval)
    if (timeLeft <= 0) {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div>
      {minutes}:{seconds}
    </div>
  )
}
