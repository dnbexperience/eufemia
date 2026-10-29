import { useContext, useMemo } from 'react'
import { useTranslation } from '../../../shared'
import SharedContext from '../../../shared/Context'
import type { DateFormatOptions } from '../../date-format/DateFormatUtils'
import {
  formatDate,
  formatDateRange,
} from '../../date-format/DateFormatUtils'

export default function useSelectedDateTitle({
  startDate,
  endDate,
  isRange,
}: {
  startDate?: Date
  endDate?: Date
  isRange?: boolean
}) {
  const { selectedDate, selectedDateRange } = useTranslation().DatePicker
  const { locale } = useContext(SharedContext)

  return useMemo(() => {
    if (!startDate) {
      return ''
    }

    const options: DateFormatOptions = {
      locale,
      options: {
        dateStyle: 'full',
      },
    }

    return isRange && endDate
      ? selectedDateRange.replace(
          /%s/,
          formatDateRange({ startDate, endDate }, options)
        )
      : selectedDate.replace(/%s/, formatDate(startDate, options))
  }, [
    startDate,
    endDate,
    isRange,
    locale,
    selectedDate,
    selectedDateRange,
  ])
}
