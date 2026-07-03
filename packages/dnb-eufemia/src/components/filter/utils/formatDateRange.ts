import {
  formatDate,
  formatDateRange as formatRange,
} from '../../date-format/DateFormatUtils'

export default function formatDateRange(
  from: string | null | undefined,
  to: string | null | undefined,
  locale?: string
): string | undefined {
  if (!from && !to) {
    return undefined
  }

  if (from && to && to !== from) {
    return formatRange(
      { startDate: from, endDate: to },
      { locale, options: { dateStyle: 'long' } }
    )
  }

  // At this point the early return above guarantees that at least one of
  // `from`/`to` is set, so `singleDate` is always a string here.
  const singleDate = from || to
  if (!singleDate) {
    return undefined
  }

  return formatDate(singleDate, {
    locale,
    options: { dateStyle: 'long' },
  })
}
