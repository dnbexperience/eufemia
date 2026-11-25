// @vitest-environment node

import { convertStringToDate, getCalendar } from '../DatePickerCalc'

describe('convertStringToDate', () => {
  it('returns null for falsy input', () => {
    expect(convertStringToDate(null)).toBeNull()
    expect(convertStringToDate(undefined as any)).toBeNull()
    expect(convertStringToDate('')).toBeNull()
  })

  it('parses ISO string', () => {
    const date = convertStringToDate('2023-12-25')
    expect(date).toBeInstanceOf(Date)
    expect(date?.getFullYear()).toBe(2023)
    expect(date?.getMonth()).toBe(11) // December is 11
    expect(date?.getDate()).toBe(25)
  })

  it('parses human date formats', () => {
    const date1 = convertStringToDate('25.12.2023')
    expect(date1).toBeInstanceOf(Date)
    expect(date1?.getFullYear()).toBe(2023)
    expect(date1?.getMonth()).toBe(11)
    expect(date1?.getDate()).toBe(25)

    const date2 = convertStringToDate('25/12/2023')
    expect(date2).toBeInstanceOf(Date)
    expect(date2?.getFullYear()).toBe(2023)
    expect(date2?.getMonth()).toBe(11)
    expect(date2?.getDate()).toBe(25)
  })

  it('parses with custom dateFormat', () => {
    const date = convertStringToDate('31-12-2023', {
      dateFormat: 'dd-MM-yyyy',
    })
    expect(date).toBeInstanceOf(Date)
    expect(date?.getFullYear()).toBe(2023)
    expect(date?.getMonth()).toBe(11)
    expect(date?.getDate()).toBe(31)
  })

  it('parses with custom picker dateFormat using month token syntax', () => {
    const date = convertStringToDate('04/01/2019', {
      dateFormat: 'mm/dd/yyyy',
    })
    expect(date).toBeInstanceOf(Date)
    expect(date?.getFullYear()).toBe(2019)
    expect(date?.getMonth()).toBe(3)
    expect(date?.getDate()).toBe(1)
  })

  it('does not log when strictDateFormat is used as a parsing probe', () => {
    const log = vi.fn()
    const mock = vi.spyOn(console, 'log').mockImplementation(log)

    expect(
      convertStringToDate('04/01/2019', {
        dateFormat: 'dd.MM.yyyy',
        strictDateFormat: true,
      })
    ).toBeNull()
    expect(log).not.toHaveBeenCalled()

    mock.mockRestore()
  })

  it('returns null for invalid date', () => {
    const log = vi.fn()
    const mock = vi.spyOn(console, 'log').mockImplementation(log)

    expect(convertStringToDate('not-a-date')).toBeNull()
    expect(log).toHaveBeenCalledWith(
      expect.any(String),
      'convertStringToDate got invalid date:',
      'not-a-date'
    )

    mock.mockRestore()
  })

  it('returns a Date when given a Date', () => {
    const now = new Date(2022, 5, 10)
    const result = convertStringToDate(now)
    expect(result).toBeInstanceOf(Date)
    expect(result?.getTime()).toBe(now.getTime())
  })
})

describe('getCalendar', () => {
  // 1 November 2026 is a Sunday
  const month = new Date(2026, 10, 1)
  const toDay = (date: Date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  const range = (dates: Date[]) => [
    toDay(dates[0]),
    toDay(dates[dates.length - 1]),
    dates.length,
  ]

  it('returns a grid that matches firstDay, regardless of earlier calls', () => {
    expect(range(getCalendar(month, 1))).toEqual([
      '2026-10-26',
      '2026-12-6',
      42,
    ])
    expect(range(getCalendar(month, 0))).toEqual([
      '2026-11-1',
      '2026-12-12',
      42,
    ])
    expect(range(getCalendar(month, 1))).toEqual([
      '2026-10-26',
      '2026-12-6',
      42,
    ])
  })

  it('returns a full grid after an onlyMonth grid of the same month', () => {
    expect(range(getCalendar(month, 1, { onlyMonth: true }))).toEqual([
      '2026-11-1',
      '2026-11-30',
      30,
    ])
    expect(range(getCalendar(month, 1))).toEqual([
      '2026-10-26',
      '2026-12-6',
      42,
    ])
  })

  it('returns a grid that matches hideNextMonthWeek, regardless of earlier calls', () => {
    // 1 September 2026 is a Tuesday, so five weeks fit the month
    const september = new Date(2026, 8, 1)

    expect(
      range(getCalendar(september, 1, { hideNextMonthWeek: true }))
    ).toEqual(['2026-8-31', '2026-10-4', 35])
    expect(range(getCalendar(september, 1))).toEqual([
      '2026-8-31',
      '2026-10-11',
      42,
    ])
    expect(
      range(getCalendar(september, 1, { hideNextMonthWeek: true }))
    ).toEqual(['2026-8-31', '2026-10-4', 35])
  })
})
