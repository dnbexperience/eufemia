/**
 * Component Test: TermDefinition
 */

import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TermDefinition from '../TermDefinition'
import defaultLocales from '../../../shared/locales'
import { wait } from '../../../core/jest/jestSetup'
import { Field } from '../../../extensions/forms'

const term = 'unusual words'
const definition =
  'Unusual words are words that are not commonly used or that many people might not know the meaning of.'
const translations = defaultLocales['nb-NO'].TermDefinition

describe('TermDefinition', () => {
  it('should render trigger with closed state by default', () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    expect(trigger.tagName).toBe('SPAN')
    expect(trigger).toHaveAttribute('role', 'button')
    expect(trigger).toHaveAttribute('tabindex', '0')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-describedby')
    expect(trigger).toHaveAttribute('title', translations.openTriggerTitle)
    expect(trigger).not.toHaveAttribute('aria-controls')

    const description = document.getElementById(
      trigger.getAttribute('aria-describedby')
    )
    expect(description).toHaveTextContent(translations.openTriggerTitle)
    expect(description).toHaveAttribute('aria-hidden', 'true')
    expect(description).toHaveClass('dnb-sr-only')

    const tooltip = document.querySelector('.dnb-term-definition')
    expect(tooltip).toBeNull()
  })

  it('links aria attributes and description elements', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    const describedById = trigger.getAttribute('aria-describedby')
    expect(describedById).toBeTruthy()
    const description = document.getElementById(describedById)
    expect(description.classList.contains('dnb-sr-only')).toBe(true)

    // When closed, aria-controls should not be set
    expect(trigger).not.toHaveAttribute('aria-controls')

    // When opened, aria-controls should be set and link to the popover
    await userEvent.click(trigger)
    await waitFor(() => {
      const controlsId = trigger.getAttribute('aria-controls')
      expect(controlsId).toBeTruthy()
      const tooltipElement = document.getElementById(controlsId)
      expect(
        tooltipElement.classList.contains('dnb-popover__content')
      ).toBe(true)
    })
  })

  it('opens popover on click and shows translated content', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)

    await waitFor(() => {
      const textElem = document.querySelector('.dnb-popover__body')
      expect(textElem.textContent).toBe(definition)
    })
    const tooltipText = document.querySelector('.dnb-popover__body')
    expect(tooltipText.textContent).toBe(definition)
    expect(tooltipText).toBeVisible()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAttribute(
      'title',
      translations.closeTriggerTitle
    )
    expect(
      document.getElementById(trigger.getAttribute('aria-describedby'))
    ).toHaveTextContent(translations.closeTriggerTitle)

    const headerTerm = document.querySelector('.dnb-popover__title strong')
    expect(headerTerm.textContent).toBe(term)

    const closeButton = document.querySelector('.dnb-popover__close')
    expect(closeButton).toBeInTheDocument()
  })

  it('should render content inside the term-definition portal root', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const portalRoot = document.querySelector(
        '.dnb-term-definition__portal'
      )
      expect(portalRoot).not.toBeNull()
      expect(
        portalRoot.querySelector('.dnb-term-definition')
      ).not.toBeNull()
    })
  })

  it('should keep content unfocusable via class and tabIndex', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const content = document.querySelector('.dnb-popover__content')
      expect(content.classList.contains('dnb-no-focus')).toBe(true)
      expect(content.getAttribute('tabindex')).toBe('-1')
    })
  })

  it('should apply spacing utility classes when spacing props are used', () => {
    render(
      <TermDefinition content={definition} top="large">
        {term}
      </TermDefinition>
    )
    const trigger = document.querySelector('.dnb-term-definition__trigger')
    expect(trigger.classList.contains('dnb-space__top--large')).toBe(true)
  })

  it('toggles open and closed state by pressing the trigger', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const textElem = document.querySelector('.dnb-popover__body')
      expect(textElem?.textContent).toBe(definition)
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    await wait(150)
    await userEvent.click(trigger)
    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    const activeTooltip = document.querySelector(
      '.dnb-term-definition.dnb-tooltip--active'
    )
    expect(activeTooltip).toBeNull()
  })

  it('should render close button after  content', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const tooltip = document.querySelector('.dnb-term-definition')
      const content = tooltip.querySelector('.dnb-popover__content')
      const closeButton = tooltip.querySelector('.dnb-popover__close')
      expect(closeButton.previousElementSibling).toBe(content)
    })
  })

  it('moves focus into popover when opened and back on escape', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const textElem = document.querySelector('.dnb-popover__body')
      expect(textElem.textContent).toBe(definition)
    })
    await wait(120) // wait for the focus timeout inside the component

    const content = document.querySelector('.dnb-popover__content')
    expect(document.activeElement).toBe(content)

    fireEvent.keyDown(content, { key: 'Escape' })
    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
    })
  })

  it('closes when clicking outside', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const textElem = document.querySelector('.dnb-popover__body')
      expect(textElem.textContent).toBe(definition)
    })
    await wait(120)

    fireEvent.mouseDown(document.documentElement)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )

    const tooltip = document.querySelector('.dnb-term-definition')
    expect(tooltip.classList.contains('dnb-tooltip--active')).toBe(false)
  })

  it('closes the popover when the close button is clicked', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const textElem = document.querySelector('.dnb-popover__body')
      expect(textElem.textContent).toBe(definition)
    })

    const closeButton = document.querySelector('.dnb-popover__close')
    fireEvent.click(closeButton)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
    })
  })

  it('closes popover when a keyup happens outside content', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const textElem = document.querySelector('.dnb-popover__body')
      expect(textElem.textContent).toBe(definition)
    })
    await wait(120)

    fireEvent.keyUp(document.documentElement, {
      key: 'Tab',
    })

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
    })
  })

  it('should support keyboard activation and close button interaction', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    fireEvent.keyDown(trigger, { key: ' ' })
    await waitFor(() => {
      const textElem = document.querySelector('.dnb-popover__body')
      expect(textElem.textContent).toBe(definition)
    })

    const closeButton = document.querySelector('.dnb-popover__close')
    fireEvent.click(closeButton)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger)
    })
  })

  it('should call focus with preventScroll when closing', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector(
      '.dnb-term-definition__trigger'
    ) as HTMLElement

    const focusSpy = jest.spyOn(trigger, 'focus')

    await userEvent.click(trigger)
    await waitFor(() => {
      const textElem = document.querySelector('.dnb-popover__body')
      expect(textElem.textContent).toBe(definition)
    })

    const closeButton = document.querySelector('.dnb-popover__close')
    fireEvent.click(closeButton)

    await waitFor(() =>
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
    )

    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
    focusSpy.mockRestore()
  })

  it('should work with Field.Email label containing TermDefinition', async () => {
    const emailDefinition =
      'Email is a method of exchanging messages between people using electronic devices.'

    render(
      <Field.Email
        label={
          <>
            Email address{' '}
            <TermDefinition content={emailDefinition}>
              what is email?
            </TermDefinition>
          </>
        }
      />
    )

    // Verify the field is rendered
    const input = document.querySelector(
      'input[autocomplete="email"]'
    ) as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('autocomplete', 'email')

    // Verify the label contains the term definition trigger
    const label = document.querySelector('label')
    expect(label).toBeInTheDocument()

    const termTrigger = label.querySelector(
      '.dnb-term-definition__trigger'
    )
    expect(termTrigger).toBeInTheDocument()
    expect(termTrigger).toHaveTextContent('what is email?')

    // Verify the term definition can be opened
    await userEvent.click(termTrigger)
    await waitFor(() => {
      const tooltipBody = document.querySelector('.dnb-popover__body')
      expect(tooltipBody).toBeInTheDocument()
      expect(tooltipBody.textContent).toBe(emailDefinition)
      const tooltipContent = document.querySelector(
        '.dnb-popover__content'
      )
      expect(document.activeElement).toBe(tooltipContent)
    })

    // Close the term definition
    await userEvent.click(input)
    await waitFor(() => {
      expect(termTrigger).toHaveAttribute('aria-expanded', 'false')
      expect(document.activeElement).toBe(termTrigger)
    })

    // Verify the input is still functional by focusing and typing
    await userEvent.click(input)
    expect(document.activeElement).toBe(input)

    // Type into the input field
    await userEvent.type(input, 'test')
    expect(input).toHaveValue('test')
  })

  it('should open popover with keyboard without focusing the input', async () => {
    const emailDefinition =
      'Email is a method of exchanging messages between people using electronic devices.'

    render(
      <Field.Email
        label={
          <>
            Email address{' '}
            <TermDefinition content={emailDefinition}>
              what is email?
            </TermDefinition>
          </>
        }
      />
    )

    const input = document.querySelector(
      'input[autocomplete="email"]'
    ) as HTMLInputElement
    const label = document.querySelector('label')
    const termTrigger = label.querySelector(
      '.dnb-term-definition__trigger'
    ) as HTMLElement

    // Tab to the term definition trigger
    termTrigger.focus()
    expect(document.activeElement).toBe(termTrigger)

    // Press Enter to open the term definition
    fireEvent.keyDown(termTrigger, { key: 'Enter' })

    // Verify the term definition opened
    await waitFor(() => {
      const tooltipBody = document.querySelector('.dnb-popover__body')
      expect(tooltipBody).toBeInTheDocument()
      expect(tooltipBody.textContent).toBe(emailDefinition)
    })

    // Verify the input did NOT receive focus
    expect(document.activeElement).not.toBe(input)
    expect(input).not.toHaveFocus()
  })
})
