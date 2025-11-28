/**
 * Component Test: TermDefinition
 */

import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TermDefinition from '../TermDefinition'
import defaultLocales from '../../../shared/locales'
import { wait } from '../../../core/jest/jestSetup'

const term = 'unusual words'
const definition =
  'Unusual words are words that are not commonly used or that many people might not know the meaning of.'
const translations = defaultLocales['nb-NO'].TermDefinition

describe('TermDefinition', () => {
  it('renders trigger with closed state by default', () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    expect(trigger.tagName).toBe('SPAN')
    expect(trigger).toHaveAttribute('role', 'button')
    expect(trigger).toHaveAttribute('tabindex', '0')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-controls')
    expect(trigger).toHaveAttribute('aria-describedby')
    expect(trigger).toHaveAttribute('title', translations.openTriggerTitle)

    const description = document.getElementById(
      trigger.getAttribute('aria-describedby')
    )
    expect(description).toHaveTextContent(translations.openTriggerTitle)
    expect(description).toHaveAttribute('aria-hidden', 'true')

    const tooltip = document.querySelector('.dnb-term-definition')
    expect(tooltip).not.toBeNull()
    expect(tooltip.classList.contains('dnb-tooltip--active')).toBe(false)
  })

  it('links aria attributes to the tooltip and description elements', () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    const controlsId = trigger.getAttribute('aria-controls')
    expect(controlsId).toBeTruthy()
    const tooltipElement = document.getElementById(controlsId)
    expect(tooltipElement.classList.contains('dnb-popover__content')).toBe(
      true
    )

    const describedById = trigger.getAttribute('aria-describedby')
    expect(describedById).toBeTruthy()
    const description = document.getElementById(describedById)
    expect(description.classList.contains('dnb-sr-only')).toBe(true)
  })

  it('opens tooltip on click and shows translated content', async () => {
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

  it('renders tooltip content inside the term-definition portal root', async () => {
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

  it('keeps tooltip content unfocusable via class and tabIndex', async () => {
    render(<TermDefinition content={definition}>{term}</TermDefinition>)
    const trigger = document.querySelector('.dnb-term-definition__trigger')

    await userEvent.click(trigger)
    await waitFor(() => {
      const content = document.querySelector('.dnb-popover__content')
      expect(content.classList.contains('dnb-no-focus')).toBe(true)
      expect(content.getAttribute('tabindex')).toBe('-1')
    })
  })

  it('applies spacing utility classes when spacing props are used', () => {
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

  it('renders close button after the tooltip content', async () => {
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

  it('moves focus into tooltip when opened and back on escape', async () => {
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
    expect(document.activeElement).toBe(trigger)
  })

  it('closes tooltip when clicking outside', async () => {
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

  it('closes tooltip when the close button is clicked', async () => {
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
    expect(document.activeElement).toBe(trigger)
  })

  it('closes tooltip when a keyup happens outside the tooltip content', async () => {
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
    expect(document.activeElement).toBe(trigger)
  })

  it('supports keyboard activation and close button interaction', async () => {
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
    expect(document.activeElement).toBe(trigger)
  })
})
