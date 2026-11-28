import { useState } from 'react'
import AnimatedDigits from './AnimatedDigits'

type Props = {
  value: string
  numericValue: number
  reserveWidth?: string
  decorative?: boolean
}

export default function AnimatedNumber({
  value,
  numericValue,
  reserveWidth,
  decorative,
}: Props) {
  const [change, setChange] = useState({
    value,
    numericValue,
    previous: value,
    decreasing: false,
  })

  if (
    change.value !== value ||
    !Object.is(change.numericValue, numericValue)
  ) {
    setChange({
      value,
      numericValue,
      previous:
        Number.isFinite(change.numericValue) &&
        Number.isFinite(numericValue) &&
        change.numericValue !== numericValue
          ? change.value
          : value,
      decreasing: numericValue < change.numericValue,
    })
  }

  return (
    <AnimatedDigits
      value={value}
      previousValue={change.previous}
      direction={change.decreasing ? 'down' : 'up'}
      reserveWidth={reserveWidth}
      decorative={decorative}
    />
  )
}
