/**
 * Component Test
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import Input from '../../../components/input/Input'
import HelpButton from '../../../components/help-button/HelpButton'
import Context from '../../Context'

describe('Suffix', () => {
  it('context works as expeted with the Modal component', () => {
    const inputValue = 'Input Value'
    const inputLabel = 'Input Label'
    const modalContent = 'Modal Content'
    let more_info: string

    render(
      <Context.Consumer>
        {(context) => {
          more_info = context.translation.HelpButton.title
          return (
            <Input
              label={inputLabel}
              suffix={<HelpButton>{modalContent}</HelpButton>}
            >
              {inputValue}
            </Input>
          )
        }}
      </Context.Consumer>
    )

    expect(
      document
        .querySelector('button.dnb-modal__trigger')
        .getAttribute('aria-label')
    ).toBe(more_info)
  })

  it('has skeleton wrapper when children is a string', () => {
    const suffixContent = 'Modal Content'

    render(
      <Input suffix={suffixContent} skeleton>
        Input Value
      </Input>
    )

    expect(document.querySelector('.dnb-suffix').textContent).toBe(
      suffixContent
    )
    expect(
      Array.from(document.querySelector('.dnb-suffix').classList)
    ).toEqual([
      'dnb-suffix',
      'dnb-input__suffix',
      'dnb-skeleton',
      'dnb-skeleton--font',
    ])
  })

  it('has not skeleton when children is a valid React Element', () => {
    render(
      <Input suffix={<HelpButton skeleton />} skeleton>
        Input Value
      </Input>
    )

    expect(
      Array.from(document.querySelector('.dnb-suffix').classList)
    ).toEqual(['dnb-suffix', 'dnb-input__suffix'])
    expect(
      Array.from(document.querySelector('.dnb-help-button').classList)
    ).toEqual(
      expect.arrayContaining([
        'dnb-button',
        'dnb-button--secondary',
        'dnb-skeleton',
        'dnb-skeleton--shape',
        'dnb-help-button',
      ])
    )
  })
})
