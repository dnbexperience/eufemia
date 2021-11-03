/**
 * Default Component Test Setup
 *
 */

import { createSerializer } from 'jest-emotion'

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `jest-class-name-${index}`
    },
  })
)
