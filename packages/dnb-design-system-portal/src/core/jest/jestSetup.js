/**
 * Default Component Test Setup
 *
 */

// import '@babel/polyfill' // jest v24 may have usage of this
import { createSerializer } from 'jest-emotion'
import fakeProps from 'react-fake-props'
import { mount, render, shallow } from './enzyme'
import toJson from 'enzyme-to-json'
import providerProps from './providerProps'

export { mount, render, shallow }
export { fakeProps }
export { toJson }
export { providerProps }

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `jest-class-name-${index}`
    }
  })
)
