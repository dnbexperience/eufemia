/**
 * Default Component Test Setup
 *
 */

export fakeProps from 'react-fake-props'
export * from './enzyme'
export toJson from 'enzyme-to-json'
import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'
export providerProps from './providerProps'
import '../startup/required'

expect.addSnapshotSerializer(
  createSerializer(emotion, {
    classNameReplacer(className, index) {
      return `jest-class-name-${index}`
    }
  })
)
