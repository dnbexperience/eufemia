import { parseISO, isValid, isAfter } from 'date-fns'

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'

export function splitValue(
  value: string,
  dateFormat = DEFAULT_DATE_FORMAT
) {
  if (typeof value !== 'string' || !value) {
    return [undefined, undefined, undefined]
  }

  // Create a regex pattern based on the date format
  const formatPattern = dateFormat
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special regex characters
    .replace(/yyyy/g, '(\\d{4})')
    .replace(/MM/g, '(\\d{2})')
    .replace(/dd/g, '(\\d{2})')

  const regex = new RegExp(`^${formatPattern}$`)
  const match = value.match(regex)

  if (!match) {
    return [undefined, undefined, undefined]
  }

  // Extract year, month, day based on their position in the format
  const yearIndex = dateFormat.indexOf('yyyy')
  const monthIndex = dateFormat.indexOf('MM')
  const dayIndex = dateFormat.indexOf('dd')

  // Create array of indices sorted by position in format
  const sortedIndices = [yearIndex, monthIndex, dayIndex].sort(
    (a, b) => a - b
  )

  // Map sorted indices to their corresponding match groups
  const result = sortedIndices.map((originalIndex, sortedPosition) => {
    const matchGroupIndex = sortedPosition + 1 // +1 because match[0] is the full match
    return match[matchGroupIndex]
  })

  // Now map back to [year, month, day] order
  const year = result[sortedIndices.indexOf(yearIndex)]
  const month = result[sortedIndices.indexOf(monthIndex)]
  const day = result[sortedIndices.indexOf(dayIndex)]

  return [year, month, day]
}

type DateOfBirthErrorMessages = {
  errorDateOfBirth: string
  errorDateOfBirthFuture: string
}

export function dateOfBirthValidator(
  value: string,
  {
    errorDateOfBirth,
    errorDateOfBirthFuture,
    dateFormat = DEFAULT_DATE_FORMAT,
  }: DateOfBirthErrorMessages & { dateFormat?: string }
): Error | undefined {
  const [year, month, day] = splitValue(value, dateFormat)

  if (year && month && day) {
    const isoValue = `${year}-${month}-${day}`
    const dateValue = parseISO(isoValue)

    if (!isValid(dateValue)) {
      return Error(errorDateOfBirth)
    }

    if (isAfter(dateValue, new Date())) {
      return Error(errorDateOfBirthFuture)
    }
  }

  return undefined
}
