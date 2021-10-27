import { cleanNumber } from '../NumberUtils'

describe('NumberUtil typescript implementation', () => {
  it('cleanNumber should return the type supplied to the function', () => {
    expect(typeof cleanNumber('prefix 815 493 00 suffix')).toBe('string')
    expect(typeof cleanNumber(81549300)).toBe('number')
  })
})
