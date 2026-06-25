import { z, zodErrorsToFormErrors } from '../zod'

describe('zod custom vs default message detection', () => {
  afterEach(() => {
    // Restore the default (English) Zod error map and clear any global
    // customError a test may have configured
    z.config({ ...z.locales.en(), customError: undefined })
  })

  it('normalizes Zod default messages to our translation keys', () => {
    const result = z.string().min(2).safeParse('a')
    expect(result.success).toBe(false)
    if (result.success) {
      return // stop here
    }

    const errors = zodErrorsToFormErrors(result.error.issues)
    expect(errors['/'].message).toBe('StringField.errorMinLength')
    expect(errors['/'].messageValues).toEqual({ minLength: '2' })
  })

  it('preserves user-provided custom messages', () => {
    const result = z.string().min(2, 'My custom message').safeParse('a')
    expect(result.success).toBe(false)
    if (result.success) {
      return // stop here
    }

    const errors = zodErrorsToFormErrors(result.error.issues)
    expect(errors['/'].message).toBe('My custom message')
  })

  it('preserves custom messages provided via an error function', () => {
    const result = z
      .string()
      .min(2, { error: () => 'From a function' })
      .safeParse('a')
    expect(result.success).toBe(false)
    if (result.success) {
      return // stop here
    }

    const errors = zodErrorsToFormErrors(result.error.issues)
    expect(errors['/'].message).toBe('From a function')
  })

  it('recognizes localized Zod default messages as defaults (not custom)', () => {
    // Configure a non-English global Zod error map.
    z.config(z.locales.no())

    const result = z.string().min(2).safeParse('a')
    expect(result.success).toBe(false)
    if (result.success) {
      return // stop here
    }

    // The localized default must still be normalized to our key, not
    // mistaken for a user-provided custom message.
    const errors = zodErrorsToFormErrors(result.error.issues)
    expect(errors['/'].message).toBe('StringField.errorMinLength')
    expect(errors['/'].messageValues).toEqual({ minLength: '2' })
  })

  it('still preserves custom messages when a non-English locale is configured', () => {
    z.config(z.locales.no())

    const result = z
      .string()
      .min(2, 'Min egendefinerte melding')
      .safeParse('a')
    expect(result.success).toBe(false)
    if (result.success) {
      return // stop here
    }

    const errors = zodErrorsToFormErrors(result.error.issues)
    expect(errors['/'].message).toBe('Min egendefinerte melding')
  })

  it('maps integer errors structurally regardless of locale', () => {
    z.config(z.locales.no())

    const result = z.int().safeParse(1.5)
    expect(result.success).toBe(false)
    if (result.success) {
      return // stop here
    }

    const errors = zodErrorsToFormErrors(result.error.issues)
    expect(errors['/'].message).toBe('NumberField.errorInteger')
  })

  it('preserves a globally configured customError as a custom message', () => {
    // A global customError is a consumer-defined override, not a built-in
    // default, so it must be preserved rather than normalized to our key.
    z.config({ customError: () => 'Global override' })

    const result = z.string().min(2).safeParse('a')
    expect(result.success).toBe(false)
    if (result.success) {
      return // stop here
    }

    const errors = zodErrorsToFormErrors(result.error.issues)
    expect(errors['/'].message).toBe('Global override')
  })
})
