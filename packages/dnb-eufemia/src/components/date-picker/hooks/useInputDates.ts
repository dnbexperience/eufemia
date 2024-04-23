import { useEffect, useState } from 'react'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'

import { Dates } from './useDates'

export type InputDates = {
  __startDay?: string
  __startMonth?: string
  __startYear?: string
  __endDay?: string
  __endMonth?: string
  __endYear?: string
}

export function useInputDates(
  startDate: Dates['startDate'],
  endDate: Dates['endDate']
) {
  const hasValidStartDate = isValid(startDate)
  const hasValidEndDate = isValid(endDate)

  const [hasHadValidDate, setHasHadValidDate] = useState<boolean>(
    hasValidStartDate || hasValidEndDate
  )

  const [dates, setDates] = useState<InputDates>({
    __startDay: hasValidStartDate ? pad(format(startDate, 'dd'), 2) : null,
    __startMonth: hasValidStartDate
      ? pad(format(startDate, 'MM'), 2)
      : null,
    __startYear: hasValidStartDate ? format(startDate, 'yyyy') : null,
    __endDay: hasValidEndDate ? pad(format(endDate, 'dd'), 2) : null,
    __endMonth: hasValidEndDate ? pad(format(endDate, 'MM'), 2) : null,
    __endYear: hasValidEndDate ? format(endDate, 'yyyy') : null,
  })

  useEffect(() => {
    const datesToUpdate = {}
    let vali = false

    if (isValid(startDate)) {
      datesToUpdate['__startDay'] = pad(format(startDate, 'dd'), 2)
      datesToUpdate['__startMonth'] = pad(format(startDate, 'MM'), 2)
      datesToUpdate['__startYear'] = format(startDate, 'yyyy')
      vali = true
    } else if (startDate === undefined) {
      datesToUpdate['__startDay'] = null
      datesToUpdate['__startMonth'] = null
      datesToUpdate['__startYear'] = null
    }

    if (isValid(endDate)) {
      datesToUpdate['__endDay'] = pad(format(endDate, 'dd'), 2)
      datesToUpdate['__endMonth'] = pad(format(endDate, 'MM'), 2)
      datesToUpdate['__endYear'] = format(endDate, 'yyyy')
      vali = true
    } else if (endDate === undefined) {
      datesToUpdate['__endDay'] = null
      datesToUpdate['__endMonth'] = null
      datesToUpdate['__endYear'] = null
    }

    setDates(datesToUpdate)
    setHasHadValidDate(vali)
  }, [startDate, endDate])

  return [dates, hasHadValidDate] as const
}

export const pad = (num, size) => ('000000000' + num).substr(-size)
