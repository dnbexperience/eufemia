import React from 'react'
import { render } from '@testing-library/react'
import { Wizard } from '../../..'
import WizardContext from '../../Context'

describe('Step', () => {
  it('should render the step when activeIndex matches the index prop', () => {
    const activeIndex = 0
    const index = 0
    render(
      <WizardContext.Provider value={{ activeIndex }}>
        <Wizard.Step index={index}>Step Content</Wizard.Step>
      </WizardContext.Provider>
    )

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElement).toBeInTheDocument()
    expect(stepElement).toHaveTextContent('Step Content')
  })

  it('should not render the step when activeIndex does not match the index prop', () => {
    const activeIndex = 1
    const index = 0
    render(
      <WizardContext.Provider value={{ activeIndex }}>
        <Wizard.Step index={index}>Step Content</Wizard.Step>
      </WizardContext.Provider>
    )

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElement).not.toBeInTheDocument()
  })

  it('should use section element', () => {
    render(
      <WizardContext.Provider value={{}}>
        <Wizard.Step>Step Content</Wizard.Step>
      </WizardContext.Provider>
    )

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElement.tagName).toBe('SECTION')
  })

  it('should have tabIndex of -1', () => {
    render(
      <WizardContext.Provider value={{}}>
        <Wizard.Step>Step Content</Wizard.Step>
      </WizardContext.Provider>
    )

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElement).toHaveAttribute('tabindex', '-1')
  })

  it('should set stepElementRef', () => {
    const stepElementRef = { current: null }

    render(
      <WizardContext.Provider value={{ stepElementRef }}>
        <Wizard.Step>Step Content</Wizard.Step>
      </WizardContext.Provider>
    )

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElementRef.current).toBe(stepElement)
  })

  it('should set title as aria-label', () => {
    const { rerender } = render(
      <Wizard.Step title="Aria Label">Step Content</Wizard.Step>
    )

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElement).toHaveAttribute('aria-label', 'Aria Label')

    rerender(
      <Wizard.Step title={<div>Other Aria Label</div>}>
        Step Content
      </Wizard.Step>
    )
    expect(stepElement).toHaveAttribute('aria-label', 'Other Aria Label')
  })

  it('should not focus the step element when activeIndex does not match the index prop', () => {
    const activeIndex = 1
    const index = 0
    render(
      <WizardContext.Provider value={{ activeIndex }}>
        <Wizard.Step index={index}>Step Content</Wizard.Step>
      </WizardContext.Provider>
    )

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(document.activeElement).not.toBe(stepElement)
  })
})
