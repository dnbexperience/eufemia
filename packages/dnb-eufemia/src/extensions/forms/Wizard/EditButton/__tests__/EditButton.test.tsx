import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditButton from '../EditButton'
import { Provider } from '../../../../../shared'

import nbNO from '../../../constants/locales/nb-NO'
import enGB from '../../../constants/locales/en-GB'
import { Form, Wizard } from '../../..'

const nb = nbNO['nb-NO'].Step
const en = enGB['en-GB'].Step

describe('EditButton', () => {
  it('should have default text', () => {
    render(<EditButton />)

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button).toHaveTextContent(nb.edit)
  })

  it('should use en-GB text', () => {
    render(
      <Provider locale="en-GB">
        <EditButton />
      </Provider>
    )

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button).toHaveTextContent(en.edit)
  })

  it('should support custom text', () => {
    render(<EditButton text="Custom" />)

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button).toHaveTextContent('Custom')
  })

  it('should be tertiary variant', () => {
    render(<EditButton />)

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button).toHaveClass('dnb-button--tertiary')
  })

  it('should have edit left icon', () => {
    render(<EditButton />)

    const button = document.querySelector('.dnb-forms-edit-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'edit icon'
    )
  })

  it('should got to index when toStep is set', async () => {
    render(
      <Form.Handler>
        <Wizard.Container>
          <Wizard.Step>
            <output>Step 1</output>
            <EditButton toStep={1} />
          </Wizard.Step>
          <Wizard.Step>
            <output>Step 2</output>
            <EditButton toStep={0} />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    await userEvent.click(document.querySelector('.dnb-forms-edit-button'))
    expect(document.querySelector('output')).toHaveTextContent('Step 2')

    await userEvent.click(document.querySelector('.dnb-forms-edit-button'))
    expect(document.querySelector('output')).toHaveTextContent('Step 1')

    await userEvent.click(document.querySelector('.dnb-forms-edit-button'))
    expect(document.querySelector('output')).toHaveTextContent('Step 2')
  })
})
