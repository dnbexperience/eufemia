import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { Field, Validator } from '../../..'
import { createMinimumAgeValidator } from '../NationalIdentityNumber'

import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.NationalIdentityNumber with adultValidator', () => {
  const errorAgeValidator =
    nb.NationalIdentityNumber.errorAgeValidator.replace('{age}', '18')
  const adultValidator = createMinimumAgeValidator(18)
  const extendingDnrAndFnrValidatorWithAdultValidator: Validator<
    string
  > = (value, { validators }) => {
    const { dnrAndFnrValidator } = validators

    return [dnrAndFnrValidator, adultValidator]
  }

  const extendingDnrValidatorWithAdultValidator: Validator<string> = (
    value,
    { validators }
  ) => {
    const { dnrValidator } = validators

    return [dnrValidator, adultValidator]
  }

  const extendingFnrValidatorWithAdultValidator: Validator<string> = (
    value,
    { validators }
  ) => {
    const { fnrValidator } = validators

    return [fnrValidator, adultValidator]
  }

  const myAdultValidator: Validator<string> = () => {
    return [adultValidator]
  }

  it('should display error if required and validateInitially', async () => {
    render(
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultValidator}
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
        onBlurValidator={myAdultValidator}
        validateInitially
        value="123"
      />
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        errorAgeValidator
      )
    })
  })

  it('should not display error when validateInitially and no value', async () => {
    render(
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultValidator}
        validateInitially
      />
    )

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).neverToResolve()
  })

  describe('should validate if identity numbers is adult(18 years and older)', () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-10-09').getTime())
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

    const invalidDnums = ['69020112345', '690']
    const invalidFnrs = ['29020112345', '290']

    describe('when provided as the only validator validation function', () => {
      it.each(validIds)(
        'Identity number is 18 years or older : %s',
        async (validId) => {
          render(
            <Field.NationalIdentityNumber
              validator={myAdultValidator}
              onBlurValidator={false}
              validateInitially
              value={validId}
            />
          )

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).neverToResolve()
        }
      )

      it.each(invalidIds)(
        'Invalid identity number is not 18 years or older: %s',
        async (invalidId) => {
          render(
            <Field.NationalIdentityNumber
              validator={myAdultValidator}
              onBlurValidator={false}
              validateInitially
              value={invalidId}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              errorAgeValidator
            )
          })
        }
      )
    })

    describe('when provided as the only onBlurValidation validation function', () => {
      it.each(validIds)(
        'Identity number is 18 years or older : %s',
        async (validId) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={myAdultValidator}
              validateInitially
              value={validId}
            />
          )

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).neverToResolve()
        }
      )

      it.each(invalidIds)(
        'Invalid identity number is not 18 years or older: %s',
        async (invalidId) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={myAdultValidator}
              validateInitially
              value={invalidId}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              errorAgeValidator
            )
          })
        }
      )
    })

    describe('when extending the dnrAndFnrValidator as validator', () => {
      it.each(validIds)(
        'Identity number is 18 years or older : %s',
        async (validId) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingDnrAndFnrValidatorWithAdultValidator}
              validateInitially
              value={validId}
            />
          )

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).neverToResolve()
        }
      )

      it.each(invalidIds)(
        'Invalid identity number is not 18 years or older: %s',
        async (invalidId) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingDnrAndFnrValidatorWithAdultValidator}
              validateInitially
              value={invalidId}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              errorAgeValidator
            )
          })
        }
      )

      it.each(invalidDnums)(
        'Invalid identity number is not 18 years or older: %s',
        async (invalidDnum) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingDnrAndFnrValidatorWithAdultValidator}
              validateInitially
              value={invalidDnum}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.NationalIdentityNumber.errorDnr
            )
          })
        }
      )

      it.each(invalidFnrs)(
        'Invalid identity number is not 18 years or older: %s',
        async (invalidFnr) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingDnrAndFnrValidatorWithAdultValidator}
              validateInitially
              value={invalidFnr}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.NationalIdentityNumber.errorFnr
            )
          })
        }
      )
    })

    describe('when extending the dnrAndFnrValidator as onBlurValidator', () => {
      it.each(validIds)(
        'Identity number is 18 years or older : %s',
        async (validId) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={
                extendingDnrAndFnrValidatorWithAdultValidator
              }
              validateInitially
              value={validId}
            />
          )

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).neverToResolve()
        }
      )

      it.each(invalidIds)(
        'Invalid identity number is not 18 years or older: %s',
        async (invalidId) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={
                extendingDnrAndFnrValidatorWithAdultValidator
              }
              validateInitially
              value={invalidId}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              errorAgeValidator
            )
          })
        }
      )

      it.each(invalidDnums)(
        'Invalid identity number is not 18 years or older: %s',
        async (invalidDnum) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={
                extendingDnrAndFnrValidatorWithAdultValidator
              }
              validateInitially
              value={invalidDnum}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.NationalIdentityNumber.errorDnr
            )
          })
        }
      )

      it.each(invalidFnrs)(
        'Invalid identity number is not 18 years or older: %s',
        async (invalidFnr) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={
                extendingDnrAndFnrValidatorWithAdultValidator
              }
              validateInitially
              value={invalidFnr}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.NationalIdentityNumber.errorFnr
            )
          })
        }
      )
    })

    describe('when extending the dnrValidator as validator', () => {
      it.each(dnr18YearsOldAndOlder)(
        'D number is 18 years or older : %s',
        async (validDnum) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingDnrValidatorWithAdultValidator}
              validateInitially
              value={validDnum}
            />
          )

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).neverToResolve()
        }
      )

      it.each(dnrUnder18YearsOld)(
        'D number is not 18 years or older: %s',
        async (invalidDnum) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingDnrValidatorWithAdultValidator}
              validateInitially
              value={invalidDnum}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              errorAgeValidator
            )
          })
        }
      )

      it.each([...invalidDnums, ...invalidFnrs, ...fnr18YearsOldAndOlder])(
        'Invalid d number: %s',
        async (invalidDnum) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingDnrValidatorWithAdultValidator}
              validateInitially
              value={invalidDnum}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.NationalIdentityNumber.errorDnr
            )
          })
        }
      )
    })

    describe('when extending the dnrValidator as onBlurValidator', () => {
      it.each(dnr18YearsOldAndOlder)(
        'D number is 18 years or older : %s',
        async (validDnum) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={extendingDnrValidatorWithAdultValidator}
              validateInitially
              value={validDnum}
            />
          )

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).neverToResolve()
        }
      )

      it.each(dnrUnder18YearsOld)(
        'D number is not 18 years or older: %s',
        async (invalidDnum) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={extendingDnrValidatorWithAdultValidator}
              validateInitially
              value={invalidDnum}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              errorAgeValidator
            )
          })
        }
      )

      it.each([
        ...invalidDnums,
        ...invalidFnrs,
        ...fnr18YearsOldAndOlder,
        ...fnrUnder18YearsOld,
      ])('Invalid d number: %s', async (invalidDnum) => {
        render(
          <Field.NationalIdentityNumber
            onBlurValidator={extendingDnrValidatorWithAdultValidator}
            validateInitially
            value={invalidDnum}
          />
        )
        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.NationalIdentityNumber.errorDnr
          )
        })
      })
    })

    describe('when extending the fnrValidator as validator', () => {
      it.each(fnr18YearsOldAndOlder)(
        'Identity number(fnr) is 18 years or older : %s',
        async (validFnr) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingFnrValidatorWithAdultValidator}
              validateInitially
              value={validFnr}
            />
          )

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).neverToResolve()
        }
      )

      it.each(fnrUnder18YearsOld)(
        'Identity number(fnr) is not 18 years or older: %s',
        async (invalidFnr) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingFnrValidatorWithAdultValidator}
              validateInitially
              value={invalidFnr}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              errorAgeValidator
            )
          })
        }
      )

      it.each([...invalidFnrs, ...invalidDnums, ...dnr18YearsOldAndOlder])(
        'Invalid identity number(fnr): %s',
        async (invalidFnr) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={false}
              validator={extendingFnrValidatorWithAdultValidator}
              validateInitially
              value={invalidFnr}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              nb.NationalIdentityNumber.errorFnr
            )
          })
        }
      )
    })

    describe('when extending the fnrValidator as onBlurValidator', () => {
      it.each(fnr18YearsOldAndOlder)(
        'Identity number(fnr) is 18 years or older : %s',
        async (validFnr) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={extendingFnrValidatorWithAdultValidator}
              validateInitially
              value={validFnr}
            />
          )

          await expect(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
          }).neverToResolve()
        }
      )

      it.each(fnrUnder18YearsOld)(
        'Identity number(fnr) is not 18 years or older: %s',
        async (invalidFnr) => {
          render(
            <Field.NationalIdentityNumber
              onBlurValidator={extendingFnrValidatorWithAdultValidator}
              validateInitially
              value={invalidFnr}
            />
          )
          await waitFor(() => {
            expect(screen.queryByRole('alert')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).toHaveTextContent(
              errorAgeValidator
            )
          })
        }
      )

      it.each([
        ...invalidFnrs,
        ...invalidDnums,
        ...dnr18YearsOldAndOlder,
        ...dnrUnder18YearsOld,
      ])('Invalid identity number(fnr): %s', async (invalidFnr) => {
        render(
          <Field.NationalIdentityNumber
            onBlurValidator={extendingFnrValidatorWithAdultValidator}
            validateInitially
            value={invalidFnr}
          />
        )
        await waitFor(() => {
          expect(screen.queryByRole('alert')).toBeInTheDocument()
          expect(screen.queryByRole('alert')).toHaveTextContent(
            nb.NationalIdentityNumber.errorFnr
          )
        })
      })
    })
  })
})
