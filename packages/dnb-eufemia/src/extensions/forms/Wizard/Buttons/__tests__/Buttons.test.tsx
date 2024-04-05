import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, Wizard } from '../../..'

describe('Wizard.Buttons', () => {
  const Step = ({ title }) => {
    return (
      <Wizard.Step>
        <output>{title}</output>
        <Wizard.Buttons />
      </Wizard.Step>
    )
  }

  it('should show previous button only when on step greater than 0', async () => {
    render(
      <Form.Handler>
        <Wizard.Container mode="loose">
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
        </Wizard.Container>
      </Form.Handler>
    )

    const getButtons = () =>
      Array.from(document.querySelectorAll('.dnb-forms-buttons button'))
    const output = () => document.querySelector('output')

    expect(output()).toHaveTextContent('Step 1')
    expect(getButtons()).toHaveLength(1)

    await userEvent.click(getButtons()[0])

    expect(output()).toHaveTextContent('Step 2')
    expect(getButtons()).toHaveLength(2)

    await userEvent.click(getButtons()[1])

    expect(output()).toHaveTextContent('Step 3')
    expect(getButtons()).toHaveLength(1)
    expect(getButtons()[0]).toHaveClass('dnb-forms-previous-button')

    await userEvent.click(getButtons()[0])

    expect(output()).toHaveTextContent('Step 2')
    expect(getButtons()).toHaveLength(2)

    await userEvent.click(getButtons()[0])

    expect(output()).toHaveTextContent('Step 1')
    expect(getButtons()).toHaveLength(1)
    expect(getButtons()[0]).toHaveClass('dnb-forms-next-button')
  })
})
