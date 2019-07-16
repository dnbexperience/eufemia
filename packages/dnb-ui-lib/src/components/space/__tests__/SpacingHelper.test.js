/**
 * Helper Tests
 *
 */

// import React from 'react'
import '../../../core/jest/jestSetup'
import {
  spacePatterns
  // translateSpace,
  // splitTypes,
  // sumTypes,
  // createTypeModifyers,
  // findType,
  // findNearestTypes,
  // isValidType,
  // createStyleObject
} from '../SpacingHelper'

describe('spacePatterns', () => {
  it('should be an object with valid keys', () => {
    expect(spacePatterns).toHaveProperty('small')
    expect(spacePatterns.small).toBe(1)
  })
})
