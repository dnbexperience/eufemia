/**
 * Default Component Test Setup
 *
 */

import fakeProps from 'react-fake-props'
import * as enzyme from './enzyme'
import enzymeToJson from 'enzyme-to-json'
import * as emotion from 'emotion'
import { createSerializer } from 'jest-emotion'
import providerProps from './providerProps'
import '../startup/required'

expect.addSnapshotSerializer(
  createSerializer(emotion, {
    classNameReplacer(className, index) {
      return `jest-class-name-${index}`
    }
  })
)

module.exports = {
  ...enzyme,
  fakeProps,
  enzymeToJson,
  providerProps,
  toJson: enzymeToJson
}
