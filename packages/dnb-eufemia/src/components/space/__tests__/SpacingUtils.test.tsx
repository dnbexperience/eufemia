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
} from '../SpacingUtils'
import { spacingPropTypes } from '../SpacingHelper'

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
    expect(translateSpace('medium-x2')).toBe(3)
  })
})

describe('splitTypes', () => {
  it('should split types correctly', () => {
    expect(splitTypes('large medium')).toEqual(['large', 'medium'])
    expect(splitTypes(['large', 'medium'])).toEqual(['large', 'medium'])
    expect(splitTypes(2)).toEqual([2])
    expect(splitTypes(true)).toEqual(['small'])
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
  it('should return correct spacing classes', () => {
    expect(createSpacingClasses({ right: 'large x-small' })).toEqual([
      'dnb-space__right--large',
      'dnb-space__right--x-small',
    ])
  })

  it('should return a class with zero classes', () => {
    expect(createSpacingClasses({ right: false })).toEqual([
      'dnb-space__right--zero',
    ])
    expect(createSpacingClasses({ right: 0 })).toEqual([
      'dnb-space__right--zero',
    ])
    expect(createSpacingClasses({ right: null })).toEqual([])
  })

  it('should handle frozen props', () => {
    const props = Object.freeze({ space: true })
    expect(createSpacingClasses(props)).toEqual([
      'dnb-space__left--small',
      'dnb-space__bottom--small',
      'dnb-space__right--small',
      'dnb-space__top--small',
    ])
  })

  it('should handle the space prop for in all directions', () => {
    expect(createSpacingClasses({ space: false })).toEqual([]) // we may extend that with all four "--zero" in future
    expect(createSpacingClasses({ space: 0 })).toEqual([
      'dnb-space__left--zero',
      'dnb-space__bottom--zero',
      'dnb-space__right--zero',
      'dnb-space__top--zero',
    ])
    expect(createSpacingClasses({ space: true })).toEqual([
      'dnb-space__left--small',
      'dnb-space__bottom--small',
      'dnb-space__right--small',
      'dnb-space__top--small',
    ])
    expect(createSpacingClasses({ space: '1rem' })).toEqual([
      'dnb-space__left--small',
      'dnb-space__bottom--small',
      'dnb-space__right--small',
      'dnb-space__top--small',
    ])
    expect(createSpacingClasses({ space: null })).toEqual([])
  })
})

describe('SpacingHelper', () => {
  it('should have valid spacingPropTypes', () => {
    expect(typeof spacingPropTypes.space).toBe('function')
  })
})
