import { z, zodErrorsToFormErrors } from '../zod'
import type * as zType from 'zod'

describe('zod not_multiple_of', () => {
  it('extracts multipleOf value from a real Zod schema error', () => {
    const schema = z.number().multipleOf(0.5)
    const result = schema.safeParse(0.3)

    expect(result.success).toBe(false)
    if (result.success) {
      return // stop here
    }

    const errors = zodErrorsToFormErrors(result.error.issues)

    expect(errors['/'].message).toBe('NumberField.errorMultipleOf')
    expect(errors['/'].messageValues).toEqual({ multipleOf: '0.5' })
  })

  it('reads the `divisor` property instead of relying on the message text', () => {
    // Zod v4 emits the value on `divisor`. Use a non-English message that does
    // not contain "multiple of", so only the `divisor` lookup can resolve it.
    const issue = {
      code: 'not_multiple_of',
      origin: 'number',
      divisor: 0.5,
      path: [],
      message: 'Må kunne deles på 0,5',
    } as unknown as zType.core.$ZodIssue

    const errors = zodErrorsToFormErrors([issue])

    expect(errors['/'].messageValues).toEqual({ multipleOf: '0.5' })
  })
})
