import { convertStringToDate } from '../DatePickerCalc'

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

  it('returns null for invalid date', () => {
    const log = jest.fn()
    const mock = jest.spyOn(console, 'log').mockImplementation(log)

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
