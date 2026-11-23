import AnimatedNumber from '../../fragments/animated-digits/AnimatedNumber'
import { getReturnValueParts } from './utils/formatCore'
import type { NumberFormatReturnValue } from './utils'

const numberPartTypes = new Set([
  'integer',
  'group',
  'decimal',
  'fraction',
  'compact',
])

export default function AnimatedNumberFormat({
  result,
  reserveWidth,
}: {
  result: NumberFormatReturnValue
  reserveWidth?: string
}) {
  const parts = getReturnValueParts(result)
  const numericValue = Number(result.value)

  if (!parts) {
    return result.number
  }

  const start = parts.findIndex(({ type }) => numberPartTypes.has(type))
  if (start < 0) {
    return result.number
  }

  let end = parts.length - 1
  while (end > start && !numberPartTypes.has(parts[end].type)) {
    end--
  }

  const before = parts
    .slice(0, start)
    .map(({ value }) => value)
    .join('')
  const number = parts
    .slice(start, end + 1)
    .map(({ value }) => value)
    .join('')
  const after = parts
    .slice(end + 1)
    .map(({ value }) => value)
    .join('')

  return (
    <>
      <span className="dnb-number-format__symbol">
        <AnimatedNumber value={before} numericValue={numericValue} />
      </span>
      <AnimatedNumber
        value={number}
        numericValue={numericValue}
        reserveWidth={reserveWidth}
      />
      <span className="dnb-number-format__symbol">
        <AnimatedNumber value={after} numericValue={numericValue} />
      </span>
    </>
  )
}
