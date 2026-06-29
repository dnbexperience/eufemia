import { render, waitFor, screen } from '@testing-library/react'
import type { Validator } from '../../..'
import { Field } from '../../..'
import { createMinimumAgeValidator } from '../NationalIdentityNumber'
import { FormError } from '../../../utils'

import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']
const getToday = () => new Date('2024-10-09')

describe('createMinimumAgeValidator', () => {
  const errorMinimumAgeValidator =
    nb.NationalIdentityNumber.errorMinimumAgeValidator.replace(
      '{age}',
      '18'
    )

  const minimum18YearsValidator = createMinimumAgeValidator(18, getToday)
  const extendingDnrAndFnrValidatorWithMin18Validator: Validator<
    string
  > = (value, { validators }) => {
    const { dnrAndFnrValidator } = validators

    return [dnrAndFnrValidator, minimum18YearsValidator]
  }

  const extendingDnrValidatorWithMin18Validator: Validator<string> = (
    value,
    { validators }
  ) => {
    const { dnrValidator } = validators

    return [dnrValidator, minimum18YearsValidator]
  }

  const extendingFnrValidatorWithMin18Validator: Validator<string> = (
    value,
    { validators }
  ) => {
    const { fnrValidator } = validators

    return [fnrValidator, minimum18YearsValidator]
  }

  const myMinimum18YearsValidator: Validator<string> = () => {
    return [minimum18YearsValidator]
  }

  it('should display error if required and validateInitially', async () => {
    render(
      <Field.NationalIdentityNumber
        onBlurValidator={myMinimum18YearsValidator}
        required
        validateInitially
      />
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.NationalIdentityNumber.errorRequired
      )
    })
  })

  it('should display error when value is invalid', async () => {
    render(
      <Field.NationalIdentityNumber
        onBlurValidator={myMinimum18YearsValidator}
        validateInitially
        value="123"
      />
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.NationalIdentityNumber.errorMinimumAgeValidatorLength
      )
    })
  })

  it('should not display error when validateInitially and no value', async () => {
    render(
      <Field.NationalIdentityNumber
        onBlurValidator={myMinimum18YearsValidator}
        validateInitially
      />
    )

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
  })

  describe('should validate if identity numbers is adult(18 years and older)', () => {
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

    const invalidDnums = ['69020112345']
    const invalidFnrs = ['29020112345']

    describe('as a pure validator function', () => {
      it.each(fnr18YearsOldAndOlder)(
        'returns no error for an fnr that is 18 years or older: %s',
        (validFnr) => {
          expect(minimum18YearsValidator(validFnr)).toBeUndefined()
        }
      )

      it.each(dnr18YearsOldAndOlder)(
        'returns no error for a dnr that is 18 years or older: %s',
        (validDnr) => {
          expect(minimum18YearsValidator(validDnr)).toBeUndefined()
        }
      )

      it.each(fnrUnder18YearsOld)(
        'returns a minimum-age error for an fnr under 18: %s',
        (invalidFnr) => {
          const result = minimum18YearsValidator(invalidFnr)
          expect(result).toBeInstanceOf(FormError)
          expect(result).toHaveProperty(
            'message',
            'NationalIdentityNumber.errorMinimumAgeValidator'
          )
          expect(result).toHaveProperty('messageValues', { age: '18' })
        }
      )

      it.each(dnrUnder18YearsOld)(
        'returns a minimum-age error for a dnr under 18: %s',
        (invalidDnr) => {
          const result = minimum18YearsValidator(invalidDnr)
          expect(result).toBeInstanceOf(FormError)
          expect(result).toHaveProperty(
            'message',
            'NationalIdentityNumber.errorMinimumAgeValidator'
          )
          expect(result).toHaveProperty('messageValues', { age: '18' })
        }
      )

      it('returns a length error when the value has fewer than 7 digits', () => {
        const result = minimum18YearsValidator('123456')
        expect(result).toBeInstanceOf(FormError)
        expect(result).toHaveProperty(
          'message',
          'NationalIdentityNumber.errorMinimumAgeValidatorLength'
        )
      })

      it('returns no error for non-string values', () => {
        expect(
          minimum18YearsValidator(undefined as unknown as string)
        ).toBeUndefined()
        expect(
          minimum18YearsValidator(null as unknown as string)
        ).toBeUndefined()
        expect(
          minimum18YearsValidator(123 as unknown as string)
        ).toBeUndefined()
      })

      it('includes the configured age in the error message values', () => {
        const minimum21YearsValidator = createMinimumAgeValidator(
          21,
          getToday
        )
        const result = minimum21YearsValidator(fnr17YearsOld[0])
        expect(result).toBeInstanceOf(FormError)
        expect(result).toHaveProperty('messageValues', { age: '21' })
      })

      it('uses the current date when no getToday is provided', () => {
        const validator = createMinimumAgeValidator(18)
        // fnr99Years numbers are born in the 1920s, so they are adults
        // regardless of the current date.
        expect(validator(fnr99Years[0])).toBeUndefined()
      })
    })

    describe('integrated into Field.NationalIdentityNumber', () => {
      const adultFnr = fnr18Years[0]
      const adultDnr = dnr18YearsOldAndOlder[0]
      const underageFnr = fnr17YearsOld[0]
      const underageDnr = dnrUnder18YearsOld[0]
      const invalidDnum = invalidDnums[0]
      const invalidFnr = invalidFnrs[0]

      const expectNoAlert = async () => {
        await expect(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
        }).toNeverResolve()
      }

      const expectAlertWithText = async (text: string) => {
        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(text)
        })
      }

      describe('with the minimum-age validator only', () => {
        it('passes a valid adult value as onChangeValidator', async () => {
          render(
            <Field.NationalIdentityNumber
              onChangeValidator={myMinimum18YearsValidator}
              onBlurValidator={false}
              validateInitially
              value={adultFnr}
            />
          )
          await expectNoAlert()
        })

        it('rejects an underage value as onChangeValidator', async () => {
          render(
            <Field.NationalIdentityNumber
              onChangeValidator={myMinimum18YearsValidator}
              onBlurValidator={false}
              validateInitially
              value={underageFnr}
            />
          )
          await expectAlertWithText(errorMinimumAgeValidator)
        })

        it('passes a valid adult value as onBlurValidator', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={myMinimum18YearsValidator}
              validateInitially
              value={adultFnr}
            />
          )
          await expectNoAlert()
        })

        it('rejects an underage value as onBlurValidator', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={myMinimum18YearsValidator}
              validateInitially
              value={underageFnr}
            />
          )
          await expectAlertWithText(errorMinimumAgeValidator)
        })
      })

      describe('when extending the dnrAndFnrValidator', () => {
        it('passes a valid adult value (onChangeValidator)', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={
                extendingDnrAndFnrValidatorWithMin18Validator
              }
              validateInitially
              value={adultDnr}
            />
          )
          await expectNoAlert()
        })

        it('shows the minimum-age error for a valid but underage value', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={
                extendingDnrAndFnrValidatorWithMin18Validator
              }
              validateInitially
              value={underageFnr}
            />
          )
          await expectAlertWithText(errorMinimumAgeValidator)
        })

        it('shows the dnr error for an invalid d-number', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={
                extendingDnrAndFnrValidatorWithMin18Validator
              }
              validateInitially
              value={invalidDnum}
            />
          )
          await expectAlertWithText(nb.NationalIdentityNumber.errorDnr)
        })

        it('shows the fnr error for an invalid f-number', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={
                extendingDnrAndFnrValidatorWithMin18Validator
              }
              validateInitially
              value={invalidFnr}
            />
          )
          await expectAlertWithText(nb.NationalIdentityNumber.errorFnr)
        })

        it('also validates as an onBlurValidator', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={
                extendingDnrAndFnrValidatorWithMin18Validator
              }
              validateInitially
              value={underageFnr}
            />
          )
          await expectAlertWithText(errorMinimumAgeValidator)
        })
      })

      describe('when extending the dnrValidator', () => {
        it('passes a valid adult d-number', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={extendingDnrValidatorWithMin18Validator}
              validateInitially
              value={adultDnr}
            />
          )
          await expectNoAlert()
        })

        it('shows the minimum-age error for an underage d-number', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={extendingDnrValidatorWithMin18Validator}
              validateInitially
              value={underageDnr}
            />
          )
          await expectAlertWithText(errorMinimumAgeValidator)
        })

        it('shows the dnr error when given an f-number', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={extendingDnrValidatorWithMin18Validator}
              validateInitially
              value={adultFnr}
            />
          )
          await expectAlertWithText(nb.NationalIdentityNumber.errorDnr)
        })
      })

      describe('when extending the fnrValidator', () => {
        it('passes a valid adult f-number', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={extendingFnrValidatorWithMin18Validator}
              validateInitially
              value={adultFnr}
            />
          )
          await expectNoAlert()
        })

        it('shows the minimum-age error for an underage f-number', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={extendingFnrValidatorWithMin18Validator}
              validateInitially
              value={underageFnr}
            />
          )
          await expectAlertWithText(errorMinimumAgeValidator)
        })

        it('shows the fnr error when given a d-number', async () => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              onChangeValidator={extendingFnrValidatorWithMin18Validator}
              validateInitially
              value={adultDnr}
            />
          )
          await expectAlertWithText(nb.NationalIdentityNumber.errorFnr)
        })
      })
    })
  })
})
