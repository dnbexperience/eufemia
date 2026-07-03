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

  const single = from || to
  if (single) {
    return formatDate(single, {
      locale,
      options: { dateStyle: 'long' },
    })
  }

  return undefined
}
