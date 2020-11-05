/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../HelpButton'

const snapshotProps = fakeProps(require.resolve('../HelpButton'), {})
snapshotProps.id = 'help-button'

const modal_props = {}
modal_props.content_id = null
modal_props.no_animation = true

const props = { modal_props }
props.id = 'help-button'

describe('HelpButton component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...snapshotProps} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should have correct default icon', () => {
    const Comp = mount(<Component {...props} />)
    expect(
      Comp.find('.dnb-icon').instance().getAttribute('aria-label')
    ).toBe('question icon')
  })

  it('should have correct role description', () => {
    const Comp = mount(<Component {...props} />)
    expect(
      Comp.find('.dnb-button')
        .instance()
        .getAttribute('aria-roledescription')
    ).toBe('Hjelp-knapp')
  })

  it('should open a modal if children are given', () => {
    const modalContent = 'Modal Content'
    const Comp = mount(<Component {...props}>{modalContent}</Component>)

    Comp.find('button.dnb-modal__trigger').simulate('click')

    const id = `dnb-modal-${props.id}`
    const modalElem = document.getElementById(id)
    const textContent = String(modalElem.textContent).replace(
      /\u200C/g,
      ''
    )

    expect(textContent).toContain(modalContent)
  })
})

describe('HelpButton scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-help-button.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-help-button-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
