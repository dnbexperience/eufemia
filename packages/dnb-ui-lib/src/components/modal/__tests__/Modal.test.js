/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeDataForProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import fs from 'fs'
import * as reactDocs from 'react-docgen'
import Component from '../Modal'
// just to make sure we re-run the test in watch mode due to changes in this file
import '../style/dnb-modal.scss'

// TODO: replace this code later, once "react-fake-props" is exporting fakeDataForProps properly
const source = fs.readFileSync(require.resolve('../Modal'), 'utf-8')
const componentInfo = reactDocs.parse(
  source,
  reactDocs.resolver.findAllComponentDefinitions
)
const props = componentInfo.props
  ? fakeDataForProps(componentInfo.props, {
      optional: true
    })
  : {}

describe('Modal component', () => {
  const ComponentWrap = mount(
    <Component {...props} modal_content="modal_content" />
  )
  ComponentWrap.setState({
    modalActive: true
  })
  it('have to match snapshot', () => {
    expect(toJson(ComponentWrap)).toMatchSnapshot()
  })
})

describe('Modal scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-modal.scss'))
    expect(scss).toMatchSnapshot()
  })
})
