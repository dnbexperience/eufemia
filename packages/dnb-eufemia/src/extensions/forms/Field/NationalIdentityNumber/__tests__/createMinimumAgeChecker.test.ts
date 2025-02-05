import { createMinimumAgeChecker } from '../NationalIdentityNumber'

describe('createMinimumAgeChecker', () => {
  jest.useFakeTimers().setSystemTime(new Date('2024-10-09').getTime())

  it('should validate with true', () => {
    const isAdult = createMinimumAgeChecker(18)
    expect(isAdult('09100654021')).toBe(true)
  })

  it('should validate with false', () => {
    const isAdult = createMinimumAgeChecker(18)
    expect(isAdult('10072476609')).toBe(false)
  })

  it('should validate with false when value is invalid', () => {
    const isAdult = createMinimumAgeChecker(18)
    expect(isAdult(undefined)).toBe(false)
    expect(isAdult(null)).toBe(false)
    expect(isAdult('invalid')).toBe(false)
    expect(isAdult('123')).toBe(false)
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

    const isAdult = createMinimumAgeChecker(18)

    it.each(validIds)(
      'Identity number is 18 years or older : %s',
      (validId) => {
        expect(isAdult(validId)).toBe(true)
      }
    )

    it.each(invalidIds)(
      'Invalid identity number is not 18 years or older: %s',
      (invalidId) => {
        expect(isAdult(invalidId)).toBe(false)
      }
    )
  })
})
