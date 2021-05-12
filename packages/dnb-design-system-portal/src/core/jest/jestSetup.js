/**
 * Default Component Test Setup
 *
 */

import { createSerializer } from 'jest-emotion'
import fakeProps from 'react-fake-props'
import { mount, render } from './enzyme'
import toJson from 'enzyme-to-json'

export { mount, render }
export { fakeProps }
export { toJson }

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `jest-class-name-${index}`
    },
  })
)
