import { useState } from 'react'

export default function useHoverDate() {
  const [hoverDate, setHoverDate] = useState<Date>(null)

  return { hoverDate, setHoverDate }
}
