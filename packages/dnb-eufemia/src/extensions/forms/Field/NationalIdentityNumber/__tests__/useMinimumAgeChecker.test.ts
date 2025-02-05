import { renderHook } from '@testing-library/react'
import { useMinimumAge } from '../NationalIdentityNumber'

describe('useMinimumAge', () => {
  jest.useFakeTimers().setSystemTime(new Date('2024-10-09').getTime())

  it('should validate with true', () => {
    const { result, rerender } = renderHook(useMinimumAge, {
      initialProps: 18,
    })

    expect(result.current('09100654021')).toBe(true)

    rerender(80)

    expect(result.current('09100654021')).toBe(false)
  })

  it('should validate with false', () => {
    const { result, rerender } = renderHook(useMinimumAge, {
      initialProps: 18,
    })

    expect(result.current('10072476609')).toBe(false)

    rerender(0)

    expect(result.current('10072476609')).toBe(true)
  })

  it('should validate with false when value is invalid', () => {
    const { result } = renderHook(useMinimumAge, {
      initialProps: 18,
    })

    expect(result.current(undefined)).toBe(false)
    expect(result.current(null)).toBe(false)
    expect(result.current('invalid')).toBe(false)
    expect(result.current('123')).toBe(false)
  })

  describe('should validate fnr and dnr', () => {
    const fnr0YearsOld = [
      '10072476609',
      '29082499936',
      '03022450718',
      '11032455001',
      '30082489912',
    ]

    const fnr17YearsOld = [
      '31050752669',
      '10040752779',
      '28050772596',
      '25060798446',
      '07100782566',
      '08100787300',
    ]

    const fnrUnder18YearsOld = [...fnr0YearsOld, ...fnr17YearsOld]

    const fnr18Years = [
      '09100654021',
      '09100696336',
      '24040664900',
      '26020682328',
      '07070663990',
      '11030699302',
      '31010699021',
    ]
    const fnr99Years = [
      '14102535759',
      '20042528022',
      '14082523414',
      '01022537632',
      '01022504416',
    ]
    const fnr18YearsOldTo99 = [
      '25047441741',
      '06118836551',
      '19042648291',
      '18053526132',
      '29075642618',
    ]
    const fnr99To120YearsOld = [
      '22041330302',
      '02061234694',
      '23020704845',
      '28021741177',
      '10121933999',
    ]
    const fnr18YearsOldAndOlder = [
      ...fnr18Years,
      ...fnr99Years,
      ...fnr18YearsOldTo99,
      ...fnr99To120YearsOld,
    ]

    const dnrUnder18YearsOld = [
      '42011660597',
      '44011957371',
      '45010886213',
      '60050972871',
      '65052062378',
      '70121275293',
      '71072354979',
      '43072496079',
      '44052351836',
      '56052459244',
      '59082354829',
      '63032486179',
      '48100754692',
    ]
    const dnr18YearsOldAndOlder = [
      '49100651997',
      '49100697466',
      '41070663889',
      '42020653633',
      '41012413597',
      '41062421922',
      '41080422588',
      '44081020024',
      '71081924796',
      '60067139081',
      '60075812380',
    ]

    const validIds = [...fnr18YearsOldAndOlder, ...dnr18YearsOldAndOlder]
    const invalidIds = [...fnrUnder18YearsOld, ...dnrUnder18YearsOld]

    const { result } = renderHook(useMinimumAge, {
      initialProps: 18,
    })

    it.each(validIds)(
      'Identity number is 18 years or older : %s',
      (validId) => {
        expect(result.current(validId)).toBe(true)
      }
    )

    it.each(invalidIds)(
      'Invalid identity number is not 18 years or older: %s',
      (invalidId) => {
        expect(result.current(invalidId)).toBe(false)
      }
    )
  })
})
