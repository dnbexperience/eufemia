import { format, parseISO, isValid } from 'date-fns'

export default function formatDateRange(
  from: string | null | undefined,
  to: string | null | undefined,
  dateFormat: string
): string | undefined {
  const parts: string[] = []

  if (from) {
    const date = parseISO(from)
    parts.push(isValid(date) ? format(date, dateFormat) : from)
  }

  if (to && to !== from) {
    const date = parseISO(to)
    parts.push(isValid(date) ? format(date, dateFormat) : to)
  }

  return parts.length > 0 ? parts.join(' – ') : undefined
}
