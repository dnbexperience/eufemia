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
  createSpacing,
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

describe('createSpacing', () => {
  it('should return correct spacing classes', () => {
    expect(createSpacing({ right: 'large x-small' }).className).toEqual([
      'dnb-space__right--large',
      'dnb-space__right--x-small',
    ])
  })

  it('should return a class with zero classes', () => {
    expect(createSpacing({ right: false }).className).toEqual([
      'dnb-space__right--zero',
    ])
    expect(createSpacing({ right: 0 }).className).toEqual([
      'dnb-space__right--zero',
    ])
    expect(createSpacing({ right: null }).className).toEqual([])
  })

  it('should handle frozen props', () => {
    const props = Object.freeze({ space: true })
    expect(createSpacing(props).className).toEqual([
      'dnb-space__left--small',
      'dnb-space__bottom--small',
      'dnb-space__right--small',
      'dnb-space__top--small',
    ])
  })

  it('should handle the space prop for in all directions', () => {
    expect(createSpacing({ space: false }).className).toEqual([]) // we may extend that with all four "--zero" in future
    expect(createSpacing({ space: 0 }).className).toEqual([
      'dnb-space__left--zero',
      'dnb-space__bottom--zero',
      'dnb-space__right--zero',
      'dnb-space__top--zero',
    ])
    expect(createSpacing({ space: true }).className).toEqual([
      'dnb-space__left--small',
      'dnb-space__bottom--small',
      'dnb-space__right--small',
      'dnb-space__top--small',
    ])
    expect(createSpacing({ space: '1rem' }).className).toEqual([
      'dnb-space__left--small',
      'dnb-space__bottom--small',
      'dnb-space__right--small',
      'dnb-space__top--small',
    ])
    expect(createSpacing({ space: null }).className).toEqual([])
  })

  it('should handle gracefully the space and top, right, bottom and left prop', () => {
    expect(createSpacing({ space: 0, left: 'small' }).className).toEqual([
      'dnb-space__left--small',
      'dnb-space__bottom--zero',
      'dnb-space__right--zero',
      'dnb-space__top--zero',
    ])
    expect(
      createSpacing({ space: 0, right: 'small small' }).className
    ).toEqual([
      'dnb-space__right--large',
      'dnb-space__left--zero',
      'dnb-space__bottom--zero',
      'dnb-space__top--zero',
    ])
    expect(
      createSpacing({ space: 0, bottom: 'small small small' }).className
    ).toEqual([
      'dnb-space__bottom--x-large',
      'dnb-space__left--zero',
      'dnb-space__right--zero',
      'dnb-space__top--zero',
    ])
    expect(
      createSpacing({ space: 0, top: 'small small' }).className
    ).toEqual([
      'dnb-space__top--large',
      'dnb-space__left--zero',
      'dnb-space__bottom--zero',
      'dnb-space__right--zero',
    ])
    expect(
      createSpacing({ space: { top: 'small' }, top: 'large' }).className
    ).toEqual(['dnb-space__top--large'])
    expect(
      createSpacing({
        space: { right: 'small', left: 0 },
        right: 'large',
      }).className
    ).toEqual(['dnb-space__right--large', 'dnb-space__left--zero'])
  })

  it('should ignore innerSpace', () => {
    expect(createSpacing({ innerSpace: 'large' }).className).toEqual([])
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
})

describe('createSpacing - return shape', () => {
  it('should return an object with className and style', () => {
    const result = createSpacing({ right: 'large x-small' })
    expect(result.className).toEqual([
      'dnb-space__right--large',
      'dnb-space__right--x-small',
    ])
    expect(result.style).toBeUndefined()
  })

  it('should return style for innerSpace and not class', () => {
    const result = createSpacing({ innerSpace: { right: 'large' } })
    expect(result.className).toEqual([])
    expect(result.style).toEqual({
      '--space-r-l': '2rem',
      '--space-r-m': '2rem',
      '--space-r-s': '2rem',
    })
  })

  it('should return undefined style when no innerSpace', () => {
    expect(createSpacing({}).style).toBeUndefined()
  })
})

describe('applySpacing', () => {
  it('should add spacing classes to an existing target className', () => {
    const result = applySpacing(
      { right: 'large' },
      { className: 'dnb-my-component' }
    )
    expect(result.className).toContain('dnb-my-component')
    expect(result.className).toContain('dnb-space__right--large')
  })

  it('should merge spacing CSS custom properties into target style', () => {
    const result = applySpacing(
      { innerSpace: { right: 'large' } },
      {
        className: 'dnb-my-component',
        style: { color: 'red' } as React.CSSProperties,
      }
    )
    expect(result.style).toEqual({
      color: 'red',
      '--space-r-l': '2rem',
      '--space-r-m': '2rem',
      '--space-r-s': '2rem',
    })
  })

  it('should return the target unchanged when no spacing props are present', () => {
    const target = { className: 'dnb-my-component', foo: 'bar' }
    const result = applySpacing({}, target)
    expect(result).toBe(target)
  })

  it('should preserve additional target properties', () => {
    const result = applySpacing(
      { top: 'small' },
      {
        className: 'dnb-my-component',
        id: 'my-id',
        title: 'my-title',
      }
    )
    expect(result.id).toBe('my-id')
    expect(result.title).toBe('my-title')
  })

  it('should handle noCollapse with elementName', () => {
    const result = applySpacing(
      { noCollapse: true } as Parameters<typeof applySpacing>[0],
      { className: 'dnb-heading' },
      'h1'
    )
    expect(result.className).toContain('dnb-space--no-collapse')
    expect(result.className).toContain('dnb-space--inline')
  })

  it('should not mutate the input target', () => {
    const target = { className: 'dnb-my-component' }
    applySpacing({ top: 'small' }, target)
    expect(target).toEqual({ className: 'dnb-my-component' })
  })

  it('should strip spacing props from the returned target', () => {
    const result = applySpacing({ top: 'small', innerSpace: 'small' }, {
      className: 'dnb-my-component',
      space: 'large',
      top: 'small',
      right: 'small',
      bottom: 'small',
      left: 'small',
      innerSpace: 'small',
      noCollapse: true,
      id: 'my-id',
    } as Parameters<typeof applySpacing>[1])
    expect(result).not.toHaveProperty('space')
    expect(result).not.toHaveProperty('top')
    expect(result).not.toHaveProperty('right')
    expect(result).not.toHaveProperty('bottom')
    expect(result).not.toHaveProperty('left')
    expect(result).not.toHaveProperty('innerSpace')
    expect(result).not.toHaveProperty('noCollapse')
    expect(result.id).toBe('my-id')
  })

  it('should strip spacing props even when no spacing is applied', () => {
    const result = applySpacing({}, {
      className: 'dnb-my-component',
      top: 'small',
      id: 'my-id',
    } as Parameters<typeof applySpacing>[1])
    expect(result).not.toHaveProperty('top')
    expect(result.id).toBe('my-id')
    expect(result.className).toBe('dnb-my-component')
  })

  it('should return the same reference when nothing needs to change', () => {
    const target = { className: 'dnb-my-component', id: 'my-id' }
    const result = applySpacing({}, target)
    expect(result).toBe(target)
  })
})
