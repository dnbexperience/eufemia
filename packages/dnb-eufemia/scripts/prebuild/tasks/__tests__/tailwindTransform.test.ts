import {
  convertVariablesToTailwindFormat,
  SUPPORTED_BRANDS,
  TAILWIND_NAMESPACES,
  NAMESPACE_MAPPINGS,
  VALID_TAILWIND_NAMESPACES,
  validateTailwindVariables,
  isValidTailwindVariable,
  getTailwindNamespace,
} from '../tailwindTransform'

describe('convertVariablesToTailwindFormat', () => {
  describe('Basic --sb-* to Tailwind namespace conversion', () => {
    it('should convert --sb-color-* to --color-sb-*', () => {
      const input = {
        '--sb-color-black': '#000',
        '--sb-color-purple': '#1c1b4e',
        '--sb-color-green': '#92eecd',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--color-sb-black': '#000',
        '--color-sb-purple': '#1c1b4e',
        '--color-sb-green': '#92eecd',
      })
    })

    it('should convert --sb-font-family-* to --font-sb-*', () => {
      const input = {
        '--sb-font-family-default': "'Roboto', sans-serif",
        '--sb-font-family-heading': "'Helvetica', sans-serif",
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--font-sb-default': "'Roboto', sans-serif",
        '--font-sb-heading': "'Helvetica', sans-serif",
      })
    })

    it('should convert --sb-font-weight-* to --font-weight-sb-*', () => {
      const input = {
        '--sb-font-weight-normal': 'normal',
        '--sb-font-weight-bold': '700',
        '--sb-font-weight-medium': '500',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--font-weight-sb-normal': 'normal',
        '--font-weight-sb-bold': '700',
        '--font-weight-sb-medium': '500',
      })
    })

    it('should convert --sb-font-size-* to --text-sb-*', () => {
      const input = {
        '--sb-font-size-small': '0.875rem',
        '--sb-font-size-medium': '1.25rem',
        '--sb-font-size-large': '2rem',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--text-sb-small': '0.875rem',
        '--text-sb-medium': '1.25rem',
        '--text-sb-large': '2rem',
      })
    })

    it('should convert --sb-line-height-* to --leading-sb-*', () => {
      const input = {
        '--sb-line-height-small': '1.25rem',
        '--sb-line-height-medium': '2rem',
        '--sb-line-height-large': '2.375rem',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--leading-sb-small': '1.25rem',
        '--leading-sb-medium': '2rem',
        '--leading-sb-large': '2.375rem',
      })
    })

    it('should convert --sb-spacing-* to --spacing-sb-*', () => {
      const input = {
        '--sb-spacing-small': '1rem',
        '--sb-spacing-medium': '1.5rem',
        '--sb-spacing-large': '2rem',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--spacing-sb-small': '1rem',
        '--spacing-sb-medium': '1.5rem',
        '--spacing-sb-large': '2rem',
      })
    })

    it('should convert --sb-shadow-* to --shadow-sb-*', () => {
      const input = {
        '--sb-shadow-small': '0 2px 4px rgba(0,0,0,0.1)',
        '--sb-shadow-medium': '0 5px 20px rgba(0,0,0,0.1)',
        '--sb-shadow-large': '0 8px 16px rgba(0,0,0,0.2)',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--shadow-sb-small': '0 2px 4px rgba(0,0,0,0.1)',
        '--shadow-sb-medium': '0 5px 20px rgba(0,0,0,0.1)',
        '--shadow-sb-large': '0 8px 16px rgba(0,0,0,0.2)',
      })
    })

    it('should convert --sb-easing-* to --ease-sb-*', () => {
      const input = {
        '--sb-easing-default': 'cubic-bezier(0.42, 0, 0, 1)',
        '--sb-easing-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--ease-sb-default': 'cubic-bezier(0.42, 0, 0, 1)',
        '--ease-sb-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      })
    })

    it('should convert --sb-layout-* to --breakpoint-sb-*', () => {
      const input = {
        '--sb-layout-small': '40em',
        '--sb-layout-medium': '60em',
        '--sb-layout-large': '72em',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--breakpoint-sb-small': '40em',
        '--breakpoint-sb-medium': '60em',
        '--breakpoint-sb-large': '72em',
      })
    })

    it('should convert --layout-* to --breakpoint-* (non-brand variables)', () => {
      const input = {
        '--layout-small': '40em',
        '--layout-medium': '60em',
        '--layout-large': '72em',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--breakpoint-small': '40em',
        '--breakpoint-medium': '60em',
        '--breakpoint-large': '72em',
      })
    })
  })

  describe('var() reference conversion', () => {
    it('should convert var(--sb-*) references to var(--*-sb-*)', () => {
      const input = {
        '--font-size-small': 'var(--sb-font-size-small)',
        '--line-height-medium': 'var(--sb-line-height-medium)',
        '--easing-default': 'var(--sb-easing-default)',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--text-small': 'var(--text-sb-small)',
        '--leading-medium': 'var(--leading-sb-medium)',
        '--ease-default': 'var(--ease-sb-default)',
      })
    })

    it('should convert complex var() references', () => {
      const input = {
        '--custom-shadow':
          'var(--sb-shadow-medium) 0 0 0 1px var(--sb-color-black)',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--custom-shadow':
          'var(--shadow-sb-medium) 0 0 0 1px var(--color-sb-black)',
      })
    })

    it('should handle multiple var() references in single value', () => {
      const input = {
        '--complex-value':
          'var(--sb-spacing-small) var(--sb-color-purple) var(--sb-easing-default)',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--complex-value':
          'var(--spacing-sb-small) var(--color-sb-purple) var(--ease-sb-default)',
      })
    })
  })

  describe('Mixed variable handling', () => {
    it('should handle mixed --sb-* and regular variables', () => {
      const input = {
        '--sb-color-black': '#000',
        '--regular-variable': '1rem',
        '--sb-font-size-small': '0.875rem',
        '--another-regular': 'normal',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--color-sb-black': '#000',
        '--regular-variable': '1rem',
        '--text-sb-small': '0.875rem',
        '--another-regular': 'normal',
      })
    })

    it('should convert base variables to Tailwind format', () => {
      const input = {
        '--color-primary': '#007bff',
        '--font-size-base': '1rem',
        '--spacing-unit': '0.25rem',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--color-primary': '#007bff',
        '--text-base': '1rem',
        '--spacing-unit': '0.25rem',
      })
    })

    it('should convert base layout variables to breakpoint format', () => {
      const input = {
        '--layout-small': '40em',
        '--layout-large': '72em',
        '--font-size-small': '1rem',
        '--font-size-large': '1.625rem',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--breakpoint-small': '40em',
        '--breakpoint-large': '72em',
        '--text-small': '1rem',
        '--text-large': '1.625rem',
      })
    })
  })

  describe('Edge cases', () => {
    it('should handle empty input', () => {
      const input = {}
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({})
    })

    it('should handle variables with --em suffix', () => {
      const input = {
        '--sb-font-size-basis--em': '1em',
        '--sb-line-height-basis--em': '1.5em',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--text-sb-basis--em': '1em',
        '--leading-sb-basis--em': '1.5em',
      })
    })

    it('should handle variables with complex values', () => {
      const input = {
        '--sb-color-rgba': 'rgba(0, 0, 0, 0.5)',
        '--sb-easing-complex': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--color-sb-rgba': 'rgba(0, 0, 0, 0.5)',
        '--ease-sb-complex': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      })
    })

    it('should handle variables that already have correct format', () => {
      const input = {
        '--color-sb-black': '#000',
        '--text-sb-small': '0.875rem',
        '--spacing-sb-medium': '1.5rem',
      }
      const result = convertVariablesToTailwindFormat(input)

      expect(result).toEqual({
        '--color-sb-black': '#000',
        '--text-sb-small': '0.875rem',
        '--spacing-sb-medium': '1.5rem',
      })
    })
  })
})

describe('SUPPORTED_BRANDS', () => {
  it('should contain expected brands', () => {
    expect(SUPPORTED_BRANDS).toContain('sb')
    expect(SUPPORTED_BRANDS).toHaveLength(1)
  })
})

describe('TAILWIND_NAMESPACES', () => {
  it('should contain all expected namespaces', () => {
    expect(TAILWIND_NAMESPACES).toContain('color')
    expect(TAILWIND_NAMESPACES).toContain('font-family')
    expect(TAILWIND_NAMESPACES).toContain('font-weight')
    expect(TAILWIND_NAMESPACES).toContain('font-size')
    expect(TAILWIND_NAMESPACES).toContain('line-height')
    expect(TAILWIND_NAMESPACES).toContain('spacing')
    expect(TAILWIND_NAMESPACES).toContain('shadow')
    expect(TAILWIND_NAMESPACES).toContain('easing')
  })
})

describe('NAMESPACE_MAPPINGS', () => {
  it('should contain expected namespace mappings', () => {
    expect(NAMESPACE_MAPPINGS).toEqual({
      'font-family': 'font',
      'font-size': 'text',
      'line-height': 'leading',
      easing: 'ease',
      layout: 'breakpoint',
    })
  })
})

describe('validateTailwindVariables', () => {
  it('should validate correctly formatted Tailwind variables', () => {
    const variables = {
      '--color-sb-black': '#000',
      '--text-sb-small': '0.875rem',
      '--spacing-sb-medium': '1.5rem',
    }
    const result = validateTailwindVariables(variables)

    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should detect remaining --sb- prefixes', () => {
    const variables = {
      '--color-sb-black': '#000',
      '--sb-color-white': '#fff', // Invalid: still has --sb- prefix
    }
    const result = validateTailwindVariables(variables)

    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'Variable --sb-color-white still contains --sb- prefix'
    )
  })

  it('should detect invalid namespace patterns', () => {
    const variables = {
      '--color-sb-black': '#000',
      '--invalid-namespace': '1rem', // Invalid: not a valid Tailwind namespace
    }
    const result = validateTailwindVariables(variables)

    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      "Variable --invalid-namespace doesn't follow Tailwind namespace conventions"
    )
  })

  it('should handle empty variables object', () => {
    const variables = {}
    const result = validateTailwindVariables(variables)

    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('should detect multiple validation errors', () => {
    const variables = {
      '--sb-color-black': '#000', // Invalid: --sb- prefix
      '--invalid-namespace': '1rem', // Invalid: wrong namespace
      '--color-sb-white': '#fff', // Valid
    }
    const result = validateTailwindVariables(variables)

    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(2)
    expect(result.errors).toContain(
      'Variable --sb-color-black still contains --sb- prefix'
    )
    expect(result.errors).toContain(
      "Variable --invalid-namespace doesn't follow Tailwind namespace conventions"
    )
  })
})

describe('isValidTailwindVariable', () => {
  it('should return true for valid Tailwind variables', () => {
    expect(isValidTailwindVariable('--color-sb-black')).toBe(true)
    expect(isValidTailwindVariable('--text-sb-small')).toBe(true)
    expect(isValidTailwindVariable('--spacing-sb-medium')).toBe(true)
    expect(isValidTailwindVariable('--font-sb-default')).toBe(true)
    expect(isValidTailwindVariable('--font-weight-sb-bold')).toBe(true)
    expect(isValidTailwindVariable('--leading-sb-tight')).toBe(true)
    expect(isValidTailwindVariable('--shadow-sb-large')).toBe(true)
    expect(isValidTailwindVariable('--ease-sb-default')).toBe(true)
  })

  it('should return false for variables with --sb- prefix', () => {
    expect(isValidTailwindVariable('--sb-color-black')).toBe(false)
    expect(isValidTailwindVariable('--sb-font-size-small')).toBe(false)
  })

  it('should return false for variables not starting with --', () => {
    expect(isValidTailwindVariable('color-black')).toBe(false)
    expect(isValidTailwindVariable('font-size-small')).toBe(false)
  })

  it('should return false for invalid namespace patterns', () => {
    expect(isValidTailwindVariable('--invalid-namespace')).toBe(false)
    expect(isValidTailwindVariable('--random-prefix')).toBe(false)
  })
})

describe('getTailwindNamespace', () => {
  it('should return correct namespace for valid variables', () => {
    expect(getTailwindNamespace('--color-sb-black')).toBe('--color-sb-')
    expect(getTailwindNamespace('--text-sb-small')).toBe('--text-sb-')
    expect(getTailwindNamespace('--spacing-sb-medium')).toBe(
      '--spacing-sb-'
    )
    expect(getTailwindNamespace('--font-sb-default')).toBe('--font-sb-')
    expect(getTailwindNamespace('--font-weight-sb-bold')).toBe(
      '--font-weight-sb-'
    )
    expect(getTailwindNamespace('--leading-sb-tight')).toBe(
      '--leading-sb-'
    )
    expect(getTailwindNamespace('--shadow-sb-large')).toBe('--shadow-sb-')
    expect(getTailwindNamespace('--ease-sb-default')).toBe('--ease-sb-')
  })

  it('should return null for invalid variables', () => {
    expect(getTailwindNamespace('--sb-color-black')).toBe(null)
    expect(getTailwindNamespace('--invalid-namespace')).toBe(null)
    expect(getTailwindNamespace('color-black')).toBe(null)
  })
})

describe('VALID_TAILWIND_NAMESPACES', () => {
  it('should contain all expected Tailwind namespaces', () => {
    expect(VALID_TAILWIND_NAMESPACES).toContain('--color-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--color-sb-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--font-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--font-sb-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--font-weight-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--font-weight-sb-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--text-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--text-sb-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--leading-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--leading-sb-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--spacing-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--spacing-sb-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--shadow-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--shadow-sb-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--ease-')
    expect(VALID_TAILWIND_NAMESPACES).toContain('--ease-sb-')
  })

  it('should be a readonly array', () => {
    // TypeScript readonly arrays can still be mutated at runtime
    // This test just verifies the array exists and has the expected structure
    expect(Array.isArray(VALID_TAILWIND_NAMESPACES)).toBe(true)
    expect(VALID_TAILWIND_NAMESPACES.length).toBeGreaterThan(0)
  })
})
