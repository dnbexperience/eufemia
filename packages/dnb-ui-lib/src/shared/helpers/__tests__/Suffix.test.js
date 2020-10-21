/**
 * Component Test
 *
 */

import React from 'react'
import { mount } from '../../../core/jest/jestSetup'
import Input from '../../../components/input/Input'
import Modal from '../../../components/modal/Modal'
import Context from '../../Context'

describe('Suffix context', () => {
  it('works as expeted with the Modal component', () => {
    const inputValue = 'Input Value'
    const inputLabel = 'Input Label'
    const modalContent = 'Modal Content'
    let more_info

    const Comp = mount(
      <Context.Consumer>
        {(context) => {
          more_info = context.translation.HelpButton.title
          return (
            <Input
              label={inputLabel}
              suffix={<Modal>{modalContent}</Modal>}
            >
              {inputValue}
            </Input>
          )
        }}
      </Context.Consumer>
    )

    expect(
      Comp.find('button.dnb-modal__trigger')
        .instance()
        .getAttribute('aria-label')
    ).toBe(more_info)
  })
})
