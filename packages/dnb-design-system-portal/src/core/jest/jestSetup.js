/**
 * Default Component Test Setup
 *
 */

import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'
import '../startup/required'
import fakeProps from 'react-fake-props'
import { mount, render, shallow } from './enzyme'
import toJson from 'enzyme-to-json'
import providerProps from './providerProps'

export { mount, render, shallow }
export { fakeProps }
export { toJson }
export { providerProps }

expect.addSnapshotSerializer(
  createSerializer(emotion, {
    classNameReplacer(className, index) {
      return `jest-class-name-${index}`
    }
  })
)
