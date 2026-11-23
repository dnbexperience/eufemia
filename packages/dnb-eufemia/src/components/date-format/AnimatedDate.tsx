import { useState } from 'react'
import AnimatedDigits, {
  hasRtlText,
} from '../../fragments/animated-digits/AnimatedDigits'

type Props = {
  value: string
  timestamp: number
}

export default function AnimatedDate({ value, timestamp }: Props) {
  const [change, setChange] = useState({
    value,
    timestamp,
    previous: value,
    decreasing: false,
  })

  if (change.value !== value || change.timestamp !== timestamp) {
    setChange({
      value,
      timestamp,
      previous: change.timestamp !== timestamp ? change.value : value,
      decreasing: timestamp < change.timestamp,
    })
  }

  // Match digit groups independently so a shorter day cannot shift the year.
  const parts = value.split(/(\p{Nd}+)/u)
  const previousParts = change.previous.split(/(\p{Nd}+)/u)
  const hasSameParts = parts.length === previousParts.length

  if (hasRtlText(value)) {
    return <>{value}</>
  }

  return (
    <span className="dnb-animated-digits__formatted" dir="ltr">
      <span className="dnb-animated-digits__formatted-text">{value}</span>
      <span
        className="dnb-animated-digits__formatted-visual"
        aria-hidden="true"
      >
        {parts.map((part, index) =>
          index % 2 === 0 ? (
            <span
              key={index}
              className="dnb-animated-digits__formatted-literal"
              data-text={part}
            />
          ) : (
            <AnimatedDigits
              key={index}
              value={part}
              previousValue={hasSameParts ? previousParts[index] : part}
              direction={change.decreasing ? 'down' : 'up'}
              decorative
            />
          )
        )}
      </span>
    </span>
  )
}
