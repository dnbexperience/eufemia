/**
 * Helper Tests
 *
 */

import '../../../core/jest/jestSetup'
import {
  spacePatterns,
  translateSpace,
  splitTypes,
  sumTypes,
  calc,
  createTypeModifiers,
  findType,
  findNearestTypes,
  isValidSpaceProp,
  createSpacingClasses,
  createSpacingProperties,
  applySpacing,
} from '../SpacingUtils'
import type { SpaceType } from '../types'

describe('spacePatterns', () => {
  it('should be an object with valid keys', () => {
    expect(spacePatterns).toHaveProperty('small')
    expect(spacePatterns.small).toBe(1)
  })
})

describe('isValidSpaceProp', () => {
  it('should confirm our valid spacing types', () => {
    expect(isValidSpaceProp('right')).toBe(true)
    expect(isValidSpaceProp('left')).toBe(true)
    expect(isValidSpaceProp('top')).toBe(true)
    expect(isValidSpaceProp('bottom')).toBe(true)
    expect(isValidSpaceProp('x')).toBe(false)
  })
})

describe('translateSpace', () => {
  it('should translate and calc types', () => {
    expect(translateSpace('large')).toBe(2)
    expect(translateSpace('xx-large-x2')).toBe(7)
  })

  it('should translate and calc types -x2', () => {
    // These types/values(except xx-large-x2) is not typed, hence the type assertion.
    // However translateSpace supports adding -x2 as a suffix to types, to double its value.
    expect(translateSpace('xx-small-x2' as SpaceType)).toBe(0.5)
    expect(translateSpace('x-small-x2' as SpaceType)).toBe(1)
    expect(translateSpace('small-x2' as SpaceType)).toBe(2)
    expect(translateSpace('medium-x2' as SpaceType)).toBe(3)
    expect(translateSpace('large-x2' as SpaceType)).toBe(4)
    expect(translateSpace('x-large-x2' as SpaceType)).toBe(6)
    expect(translateSpace('xx-large-x2-x2' as SpaceType)).toBe(14)
  })
})

describe('splitTypes', () => {
  it('should split types correctly', () => {
    expect(splitTypes('large medium')).toEqual(['large', 'medium'])
    expect(splitTypes(['large', 'medium'])).toEqual(['large', 'medium'])
    expect(splitTypes(2)).toEqual([2])
    expect(splitTypes(true)).toEqual(['small'])
    expect(splitTypes(false)).toEqual([0])
    expect(splitTypes(['large', false, 'small'])).toEqual([
      'large',
      'small',
    ])
    expect(splitTypes(null)).toBeNull()
  })
})

describe('sumTypes', () => {
  it('should calc types with correct sum', () => {
    expect(sumTypes('large x-small')).toEqual(2.5)
  })
})

describe('calc', () => {
  it('should return null if invalid', () => {
    expect(calc()).toEqual(null)
    expect(calc(null)).toEqual(null)
    expect(calc(undefined)).toEqual(null)
  })

  it('should output calc based on string types', () => {
    expect(calc('large x-small')).toEqual(
      'calc(var(--spacing-large) + var(--spacing-x-small))'
    )
  })

  it('should output calc based on argument types', () => {
    expect(calc('large', 'x-small')).toEqual(
      'calc(var(--spacing-large) + var(--spacing-x-small))'
    )
  })

  it('should output calc based on rem numbers', () => {
    expect(calc(2, 0.5)).toEqual(
      'calc(var(--spacing-large) + var(--spacing-x-small))'
    )
  })

  it('should output calc based on rem strings', () => {
    expect(calc('2rem', '0.5rem')).toEqual(
      'calc(var(--spacing-large) + var(--spacing-x-small))'
    )
  })

  it('should output calc based on pixel values', () => {
    expect(calc('32px', '8px')).toEqual(
      'calc(var(--spacing-large) + var(--spacing-x-small))'
    )
  })

  it('should output calc with mixed spacing types', () => {
    expect(calc('32px', 'x-small', 1)).toEqual(
      'calc(var(--spacing-large) + var(--spacing-x-small) + var(--spacing-small))'
    )
  })

  it('should correct to its nearest type', () => {
    expect(calc('17px')).toEqual('calc(var(--spacing-small))')
    expect(calc('33px')).toEqual('calc(var(--spacing-large))')
    expect(calc('43px')).toEqual(
      'calc(var(--spacing-large) + var(--spacing-x-small))'
    )
  })

  it('should sum all types', () => {
    expect(calc('800px')).toEqual(
      'calc(var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-xx-large) + var(--spacing-small))'
    )
  })

  it('should calc documented examples', () => {
    expect(calc('medium large')).toEqual(
      'calc(var(--spacing-medium) + var(--spacing-large))'
    )
    expect(calc('medium', 'large')).toEqual(
      'calc(var(--spacing-medium) + var(--spacing-large))'
    )
    expect(calc('1.5rem', '2rem')).toEqual(
      'calc(var(--spacing-medium) + var(--spacing-large))'
    )
    expect(calc('24px', '32px')).toEqual(
      'calc(var(--spacing-medium) + var(--spacing-large))'
    )
  })

  it('should cache valid calls', () => {
    globalThis.CALC_CACHE = {}

    calc('medium', 'large')
    calc('medium small')
    calc('0.5rem', '24px')

    expect(globalThis.CALC_CACHE).toEqual({
      '0.5rem|24px':
        'calc(var(--spacing-x-small) + var(--spacing-medium))',
      'medium small': 'calc(var(--spacing-medium) + var(--spacing-small))',
      'medium|large': 'calc(var(--spacing-medium) + var(--spacing-large))',
    })
  })

  it('should not cache invalid calls', () => {
    globalThis.CALC_CACHE = {}

    expect(calc(undefined)).toBe(null)

    expect(globalThis.CALC_CACHE).toEqual({})
  })
})

describe('createTypeModifiers', () => {
  it('should return an array with modifiers', () => {
    expect(createTypeModifiers('0.5 1 2')).toEqual([
      'x-small',
      'small',
      'large',
    ])
    expect(createTypeModifiers('2 0.5')).toEqual(['large', 'x-small'])
    expect(createTypeModifiers(1)).toEqual(['small'])
    expect(createTypeModifiers(true)).toEqual(['small'])
    expect(createTypeModifiers(null)).toEqual([])
  })
})

describe('findNearestTypes', () => {
  it('should find the nearest type in correct order', () => {
    expect(findNearestTypes(2.5)).toEqual(['large', 'x-small'])
    expect(findNearestTypes(5)).toEqual(['xx-large', 'medium'])
    expect(findNearestTypes(8)).toEqual(['xx-large', 'xx-large', 'small'])
  })

  it('should multiply type duplications', () => {
    expect(findNearestTypes(8, true)).toEqual(['xx-large-x2', 'small'])
  })
})

describe('findType', () => {
  it('should find from a value the equivalent type', () => {
    expect(findType(2)).toBe('large')
    expect(findType(3.5)).toBe('xx-large')
  })
})

describe('createSpacingClasses', () => {
  it('should return empty array for margin direction props', () => {
    // Margin direction classes are no longer generated;
    // margins are now handled via CSS custom properties by createSpacingProperties
    expect(createSpacingClasses({ right: 'large x-small' })).toEqual([])
    expect(createSpacingClasses({ space: true })).toEqual([])
    expect(createSpacingClasses({ top: 'large' })).toEqual([])
  })

  it('should return noCollapse class', () => {
    expect(createSpacingClasses({ noCollapse: true })).toEqual([
      'dnb-space--no-collapse',
    ])
  })

  it('should ignore innerSpace', () => {
    expect(createSpacingClasses({ innerSpace: 'large' })).toEqual([])
  })
})

describe('createSpacingProperties for margins', () => {
  it('should return correct margin CSS variables for direction props', () => {
    const result = createSpacingProperties({ right: 'large x-small' })
    expect(result).toHaveProperty('--margin-r-s')
  })

  it('should handle the space prop for all directions', () => {
    const result = createSpacingProperties({ space: true })
    expect(result).toHaveProperty('--margin-t-s')
    expect(result).toHaveProperty('--margin-r-s')
    expect(result).toHaveProperty('--margin-b-s')
    expect(result).toHaveProperty('--margin-l-s')
  })

  it('should handle frozen props', () => {
    const props = Object.freeze({ space: true })
    const result = createSpacingProperties(props)
    expect(result).toHaveProperty('--margin-t-s')
    expect(result).toHaveProperty('--margin-r-s')
    expect(result).toHaveProperty('--margin-b-s')
    expect(result).toHaveProperty('--margin-l-s')
  })

  it('should handle zero values', () => {
    const result = createSpacingProperties({ right: 0 })
    expect(result).toHaveProperty('--margin-r-s', '0')
  })

  it('should handle space prop with individual overrides', () => {
    const result = createSpacingProperties({ space: 0, left: 'small' })
    expect(result['--margin-l-s']).toBe('1rem')
    expect(result['--margin-t-s']).toBe('0')
    expect(result['--margin-r-s']).toBe('0')
    expect(result['--margin-b-s']).toBe('0')
  })

  it('should not return margin properties for null/undefined', () => {
    expect(createSpacingProperties({ right: null })).toEqual({})
    expect(createSpacingProperties({ space: null })).toEqual({})
    expect(createSpacingProperties({ space: false })).toEqual({})
  })
})

describe('createSpacingProperties', () => {
  it('should return correct spacing properties', () => {
    expect(
      createSpacingProperties({ innerSpace: { right: 'large x-small' } })
    ).toEqual({
      '--space-r-l': '2.5rem',
      '--space-r-m': '2.5rem',
      '--space-r-s': '2.5rem',
    })
  })

  it('should support inline and block shorthand', () => {
    expect(
      createSpacingProperties({
        innerSpace: { inline: 'small', block: 'large' },
      })
    ).toEqual({
      '--space-b-l': '2rem',
      '--space-l-l': '1rem',
      '--space-r-l': '1rem',
      '--space-t-l': '2rem',
      '--space-b-m': '2rem',
      '--space-l-m': '1rem',
      '--space-r-m': '1rem',
      '--space-t-m': '2rem',
      '--space-b-s': '2rem',
      '--space-l-s': '1rem',
      '--space-r-s': '1rem',
      '--space-t-s': '2rem',
    })
  })

  it('should let explicit directions override inline and block shorthand', () => {
    expect(
      createSpacingProperties({
        innerSpace: {
          inline: 'small',
          block: 'large',
          left: 'medium',
          top: false,
        },
      })
    ).toEqual({
      '--space-b-l': '2rem',
      '--space-l-l': '1.5rem',
      '--space-r-l': '1rem',
      '--space-t-l': '0',
      '--space-b-m': '2rem',
      '--space-l-m': '1.5rem',
      '--space-r-m': '1rem',
      '--space-t-m': '0',
      '--space-b-s': '2rem',
      '--space-l-s': '1.5rem',
      '--space-r-s': '1rem',
      '--space-t-s': '0',
    })
  })

  it('should return properties with zero', () => {
    expect(
      createSpacingProperties({ innerSpace: { right: false } })
    ).toEqual({
      '--space-r-l': '0',
      '--space-r-m': '0',
      '--space-r-s': '0',
    })
    expect(createSpacingProperties({ innerSpace: { right: 0 } })).toEqual({
      '--space-r-l': '0',
      '--space-r-m': '0',
      '--space-r-s': '0',
    })
    expect(
      createSpacingProperties({ innerSpace: { right: null } })
    ).toEqual({})
  })

  it('should include media query sizes', () => {
    expect(
      createSpacingProperties({
        innerSpace: {
          small: {
            right: 'large small',
            top: 'large',
            left: '1.5rem',
            bottom: '16px',
          },
          medium: {
            right: 'large small',
            top: 'large',
            left: '1.5rem',
            bottom: '16px',
          },
          large: {
            right: 'large small',
            top: 'large',
            left: '1.5rem',
            bottom: '16px',
          },
        },
      })
    ).toEqual({
      '--space-b-l': '1rem',
      '--space-l-l': '1.5rem',
      '--space-r-l': '3rem',
      '--space-t-l': '2rem',
      '--space-b-m': '1rem',
      '--space-l-m': '1.5rem',
      '--space-r-m': '3rem',
      '--space-t-m': '2rem',
      '--space-b-s': '1rem',
      '--space-l-s': '1.5rem',
      '--space-r-s': '3rem',
      '--space-t-s': '2rem',
    })
    expect(
      createSpacingProperties({ innerSpace: { small: { right: 0 } } })
    ).toEqual({ '--space-r-s': '0' })
    expect(
      createSpacingProperties({
        innerSpace: { small: { block: 'large' } },
      })
    ).toEqual({
      '--space-b-s': '2rem',
      '--space-t-s': '2rem',
    })
    expect(
      createSpacingProperties({
        innerSpace: { small: { inline: 'x-small' } },
      })
    ).toEqual({
      '--space-l-s': '0.5rem',
      '--space-r-s': '0.5rem',
    })
    expect(
      createSpacingProperties({ innerSpace: { small: { right: null } } })
    ).toEqual({})
    expect(
      createSpacingProperties({
        innerSpace: { small: true },
      })
    ).toEqual({
      '--space-b-s': '1rem',
      '--space-l-s': '1rem',
      '--space-r-s': '1rem',
      '--space-t-s': '1rem',
    })
  })

  it('should handle frozen props', () => {
    const props = Object.freeze({ innerSpace: true })
    expect(createSpacingProperties(props)).toEqual({
      '--space-b-l': '1rem',
      '--space-l-l': '1rem',
      '--space-r-l': '1rem',
      '--space-t-l': '1rem',
      '--space-b-m': '1rem',
      '--space-l-m': '1rem',
      '--space-r-m': '1rem',
      '--space-t-m': '1rem',
      '--space-b-s': '1rem',
      '--space-l-s': '1rem',
      '--space-r-s': '1rem',
      '--space-t-s': '1rem',
    })
  })

  it('should handle the space prop for in all directions', () => {
    expect(createSpacingProperties({ innerSpace: false })).toEqual({}) // we may extend that with all four "--zero" in future
    expect(createSpacingProperties({ innerSpace: 0 })).toEqual({})
    expect(createSpacingProperties({ innerSpace: true })).toEqual({
      '--space-b-l': '1rem',
      '--space-l-l': '1rem',
      '--space-r-l': '1rem',
      '--space-t-l': '1rem',
      '--space-b-m': '1rem',
      '--space-l-m': '1rem',
      '--space-r-m': '1rem',
      '--space-t-m': '1rem',
      '--space-b-s': '1rem',
      '--space-l-s': '1rem',
      '--space-r-s': '1rem',
      '--space-t-s': '1rem',
    })
    expect(createSpacingProperties({ innerSpace: '1rem' })).toEqual({
      '--space-b-l': '1rem',
      '--space-l-l': '1rem',
      '--space-r-l': '1rem',
      '--space-t-l': '1rem',
      '--space-b-m': '1rem',
      '--space-l-m': '1rem',
      '--space-r-m': '1rem',
      '--space-t-m': '1rem',
      '--space-b-s': '1rem',
      '--space-l-s': '1rem',
      '--space-r-s': '1rem',
      '--space-t-s': '1rem',
    })
    expect(createSpacingProperties({ innerSpace: null })).toEqual({})
  })

  it('should generate margin properties from top/right/bottom/left', () => {
    expect(createSpacingProperties({ top: 'large' })).toEqual({
      '--margin-t-l': '2rem',
      '--margin-t-m': '2rem',
      '--margin-t-s': '2rem',
    })
    expect(createSpacingProperties({ right: 'large x-small' })).toEqual({
      '--margin-r-l': '2.5rem',
      '--margin-r-m': '2.5rem',
      '--margin-r-s': '2.5rem',
    })
  })

  it('should generate margin properties from space shorthand', () => {
    expect(createSpacingProperties({ space: 'small' })).toEqual({
      '--margin-b-l': '1rem',
      '--margin-b-m': '1rem',
      '--margin-b-s': '1rem',
      '--margin-l-l': '1rem',
      '--margin-l-m': '1rem',
      '--margin-l-s': '1rem',
      '--margin-r-l': '1rem',
      '--margin-r-m': '1rem',
      '--margin-r-s': '1rem',
      '--margin-t-l': '1rem',
      '--margin-t-m': '1rem',
      '--margin-t-s': '1rem',
    })
  })

  it('should let explicit directions override space shorthand for margin', () => {
    expect(
      createSpacingProperties({ space: 'small', top: 'large' })
    ).toEqual({
      '--margin-b-l': '1rem',
      '--margin-b-m': '1rem',
      '--margin-b-s': '1rem',
      '--margin-l-l': '1rem',
      '--margin-l-m': '1rem',
      '--margin-l-s': '1rem',
      '--margin-r-l': '1rem',
      '--margin-r-m': '1rem',
      '--margin-r-s': '1rem',
      '--margin-t-l': '2rem',
      '--margin-t-m': '2rem',
      '--margin-t-s': '2rem',
    })
  })

  it('should handle space object with direction overrides for margin', () => {
    expect(
      createSpacingProperties({
        space: { top: 'small' },
        top: 'large',
      })
    ).toEqual({
      '--margin-t-l': '2rem',
      '--margin-t-m': '2rem',
      '--margin-t-s': '2rem',
    })
  })

  it('should handle margin zero and false values', () => {
    expect(createSpacingProperties({ top: 0 })).toEqual({
      '--margin-t-l': '0',
      '--margin-t-m': '0',
      '--margin-t-s': '0',
    })
    expect(createSpacingProperties({ top: false })).toEqual({
      '--margin-t-l': '0',
      '--margin-t-m': '0',
      '--margin-t-s': '0',
    })
    expect(createSpacingProperties({ top: null })).toEqual({})
  })

  it('should handle space: false and space: 0 for margin', () => {
    expect(createSpacingProperties({ space: false })).toEqual({})
    expect(createSpacingProperties({ space: 0 })).toEqual({
      '--margin-b-l': '0',
      '--margin-b-m': '0',
      '--margin-b-s': '0',
      '--margin-l-l': '0',
      '--margin-l-m': '0',
      '--margin-l-s': '0',
      '--margin-r-l': '0',
      '--margin-r-m': '0',
      '--margin-r-s': '0',
      '--margin-t-l': '0',
      '--margin-t-m': '0',
      '--margin-t-s': '0',
    })
    expect(createSpacingProperties({ space: true })).toEqual({
      '--margin-b-l': '1rem',
      '--margin-b-m': '1rem',
      '--margin-b-s': '1rem',
      '--margin-l-l': '1rem',
      '--margin-l-m': '1rem',
      '--margin-l-s': '1rem',
      '--margin-r-l': '1rem',
      '--margin-r-m': '1rem',
      '--margin-r-s': '1rem',
      '--margin-t-l': '1rem',
      '--margin-t-m': '1rem',
      '--margin-t-s': '1rem',
    })
  })

  it('should generate both innerSpace and margin properties', () => {
    expect(
      createSpacingProperties({
        innerSpace: 'small',
        top: 'large',
      })
    ).toEqual({
      '--space-b-l': '1rem',
      '--space-b-m': '1rem',
      '--space-b-s': '1rem',
      '--space-l-l': '1rem',
      '--space-l-m': '1rem',
      '--space-l-s': '1rem',
      '--space-r-l': '1rem',
      '--space-r-m': '1rem',
      '--space-r-s': '1rem',
      '--space-t-l': '1rem',
      '--space-t-m': '1rem',
      '--space-t-s': '1rem',
      '--margin-t-l': '2rem',
      '--margin-t-m': '2rem',
      '--margin-t-s': '2rem',
    })
  })
})

describe('applySpacing', () => {
  it('should return target unchanged when there are no spacing props', () => {
    const target = { className: 'dnb-foo', id: 'x' }
    const result = applySpacing({}, target)
    expect(result).toBe(target)
  })

  it('should merge spacing classes into existing className', () => {
    const result = applySpacing(
      { noCollapse: true },
      { className: 'dnb-foo' }
    )
    expect(result.className).toBe('dnb-foo dnb-space--no-collapse')
  })

  it('should set className when target has none', () => {
    const result = applySpacing(
      { noCollapse: true },
      {} as { className?: string }
    )
    expect(result.className).toBe('dnb-space--no-collapse')
  })

  it('should merge spacing style on top of target style', () => {
    const result = applySpacing(
      { top: 'large' },
      { style: { color: 'red' } }
    )
    expect(result.style).toEqual({
      color: 'red',
      '--margin-t-l': '2rem',
      '--margin-t-m': '2rem',
      '--margin-t-s': '2rem',
    })
  })

  it('should set style when target has none', () => {
    const result = applySpacing(
      { top: 'large' },
      {} as { style?: React.CSSProperties }
    )
    expect(result.style).toEqual({
      '--margin-t-l': '2rem',
      '--margin-t-m': '2rem',
      '--margin-t-s': '2rem',
    })
  })

  it('should not clobber other properties in target', () => {
    const result = applySpacing(
      { top: 'large', noCollapse: true },
      {
        className: 'dnb-foo',
        id: 'x',
        'data-test': 'y',
        style: { color: 'red' },
      }
    )
    expect(result.id).toBe('x')
    expect(result['data-test']).toBe('y')
    expect(result.className).toBe('dnb-foo dnb-space--no-collapse')
    expect(result.style).toMatchObject({
      color: 'red',
      '--margin-t-l': '2rem',
    })
  })

  it('should let spacing win when user style sets the same CSS custom property', () => {
    const result = applySpacing(
      { top: 'large' },
      { style: { '--margin-t-l': '5rem' } as React.CSSProperties }
    )
    expect(result.style['--margin-t-l']).toBe('2rem')
  })

  it('should accept clsx-compatible className values', () => {
    const result = applySpacing(
      { noCollapse: true },
      { className: ['dnb-foo', 'dnb-bar'] }
    )
    expect(result.className).toBe('dnb-foo dnb-bar dnb-space--no-collapse')
  })

  it('should return a new object (non-mutating)', () => {
    const target = { className: 'dnb-foo' }
    const result = applySpacing({ top: 'large' }, target)
    expect(result).not.toBe(target)
    expect(target).toEqual({ className: 'dnb-foo' })
  })

  it('should forward elementName for inline detection', () => {
    const result = applySpacing(
      { noCollapse: true },
      { className: 'dnb-foo' },
      'h1'
    )
    expect(result.className).toContain('dnb-space--no-collapse')
    expect(result.className).toContain('dnb-space--inline')
  })
})
