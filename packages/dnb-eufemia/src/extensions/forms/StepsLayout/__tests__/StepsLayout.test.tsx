import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import StepsLayout from '../StepsLayout'
import { Field } from '../..'

jest.mock('../../../../shared/component-helper', () => {
  const original = jest.requireActual(
    '../../../../shared/component-helper'
  )
  return {
    ...original,
    warn: jest.fn(),
  }
})

describe('StepsLayout', () => {
  it('should have "strict" mode as the default mode', () => {
    render(
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <StepsLayout.NextButton />
        </StepsLayout.Step>
        <StepsLayout.Step title="Step 2">
          <StepsLayout.NextButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    const [first] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    expect(first.querySelector('button')).toBeInTheDocument()
  })

  it('should call event listener onStepChange', () => {
    const onChange = jest.fn()

    render(
      <StepsLayout onStepChange={onChange} mode="loose">
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    const [first, second] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    fireEvent.click(second.querySelector('button'))
    expect(document.querySelector('output').textContent).toBe('Step 2')
    expect(onChange).not.toHaveBeenCalledWith(2)
    expect(onChange).toHaveBeenCalledTimes(0)

    fireEvent.click(first.querySelector('button'))
    expect(document.querySelector('output').textContent).toBe('Step 1')
    expect(onChange).not.toHaveBeenCalledWith(1)
    expect(onChange).toHaveBeenCalledTimes(0)

    const nextButton = document.querySelector('.dnb-forms-next-button')
    fireEvent.click(nextButton)
    expect(onChange).toHaveBeenCalledWith(1)
    expect(nextButton).not.toBeInTheDocument()

    const previousButton = document.querySelector(
      '.dnb-forms-previous-button'
    )
    fireEvent.click(previousButton)
    expect(onChange).toHaveBeenCalledWith(1)
    expect(previousButton).not.toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('should scroll to top on step change when scrollTopOnStepChange is true', () => {
    const scrollTo = jest.fn()
    jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

    render(
      <StepsLayout mode="loose" scrollTopOnStepChange>
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    const nextButton = document.querySelector('.dnb-forms-next-button')
    fireEvent.click(nextButton)
    expect(scrollTo).toHaveBeenCalledTimes(1)

    const previousButton = document.querySelector(
      '.dnb-forms-previous-button'
    )
    fireEvent.click(previousButton)
    expect(scrollTo).toHaveBeenCalledTimes(2)

    const [first, second] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    fireEvent.click(second.querySelector('button'))
    expect(document.querySelector('output').textContent).toBe('Step 2')
    expect(scrollTo).toHaveBeenCalledTimes(2)

    fireEvent.click(first.querySelector('button'))
    expect(document.querySelector('output').textContent).toBe('Step 1')
    expect(scrollTo).toHaveBeenCalledTimes(2)
  })

  it('should show remaining errors on step change', () => {
    render(
      <StepsLayout mode="loose" scrollTopOnStepChange>
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <Field.String required />
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    const nextButton = document.querySelector('.dnb-forms-next-button')

    expect(screen.queryByRole('alert')).toBeNull()

    fireEvent.click(nextButton)

    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  it('should support drawer variant', () => {
    const { rerender } = render(
      <StepsLayout variant="drawer">
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
        </StepsLayout.Step>
      </StepsLayout>
    )

    const sidebar = document.querySelector(
      '.dnb-forms-steps-layout__sidebar'
    )

    const stepTrigger = () =>
      sidebar.querySelector('.dnb-step-indicator__trigger')

    const stepsList = () =>
      sidebar.querySelector('.dnb-step-indicator__list')

    expect(stepTrigger()).toBeInTheDocument()
    expect(stepsList()).not.toBeInTheDocument()

    rerender(
      <StepsLayout sidebarId="drawer-please">
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
        </StepsLayout.Step>
      </StepsLayout>
    )

    expect(stepTrigger()).toBeInTheDocument()
    expect(stepsList()).not.toBeInTheDocument()
  })
})
