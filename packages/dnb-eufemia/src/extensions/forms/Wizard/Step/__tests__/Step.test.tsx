import React, { useContext, useEffect, useRef } from 'react'
import userEvent from '@testing-library/user-event'
import { fireEvent, render } from '@testing-library/react'
import { Field, Form, Wizard } from '../../..'
import { PrerenderFieldPropsOfOtherSteps } from '../../Container/PrerenderFieldPropsOfOtherSteps'
import WizardContext from '../../Context'
import WizardStepContext from '../StepContext'
import { Steps } from '../../Context/types'

const log = global.console.log
beforeEach(() => {
  global.console.log = jest.fn((...args) => {
    if (!String(args[1]).includes('initialActiveIndex=')) {
      log(...args)
    }
  })
})
afterEach(() => {
  global.console.log = log
  jest.resetAllMocks()
})

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

  it('should set title as aria-label when wrapped in Wizard.Container', () => {
    render(
      <Form.Handler>
        <Wizard.Container>
          <Wizard.Step title="My Aria Label">Step Content</Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElement).toHaveAttribute('aria-label', 'My Aria Label')
  })

  it('should not render when include is false', () => {
    render(<Wizard.Step include={false}>Step Content</Wizard.Step>)

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElement).toBeNull()
  })

  // Deprecated – active is replaced with include - can be removed in v11
  it('should not render when active is false', () => {
    render(<Wizard.Step active={false}>Step Content</Wizard.Step>)

    const stepElement = document.querySelector('.dnb-forms-step')
    expect(stepElement).toBeNull()
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

  it('should make all nested fields required, when the step is set to be required', () => {
    render(
      <Form.Handler>
        <WizardContext.Provider value={{ activeIndex: 0 }}>
          <Wizard.Step required index={0}>
            <Field.String />
          </Wizard.Step>
        </WizardContext.Provider>
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(document.querySelector('input')).toHaveAttribute(
      'aria-required',
      'true'
    )
  })

  describe('inactive', () => {
    it('should not be clickable', async () => {
      render(
        <Form.Handler>
          <Wizard.Container
            mode="loose"
            initialActiveIndex={1}
            expandedInitially
          >
            <Wizard.Step title="Step 1" inactive>
              1
            </Wizard.Step>
            <Wizard.Step title="Step 2" inactive>
              2
            </Wizard.Step>
            <Wizard.Step title="Step 3" inactive>
              3
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const [s1, s2, s3] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )

      expect(Array.from(s1.classList)).toEqual([
        'dnb-step-indicator__item',
        'dnb-step-indicator__item--inactive',
        'dnb-step-indicator__item--visited',
      ])
      expect(Array.from(s2.classList)).toEqual([
        'dnb-step-indicator__item',
        'dnb-step-indicator__item--current',
        'dnb-step-indicator__item--inactive',
      ])
      expect(Array.from(s3.classList)).toEqual([
        'dnb-step-indicator__item',
        'dnb-step-indicator__item--inactive',
      ])

      expect(s1.querySelector('.dnb-anchor').tagName).toBe('SPAN')
      expect(s2.querySelector('.dnb-anchor').tagName).toBe('SPAN')
      expect(s3.querySelector('.dnb-anchor').tagName).toBe('SPAN')
    })

    it('should make steps inactive in loose mode', async () => {
      render(
        <Form.Handler>
          <Wizard.Container
            mode="loose"
            initialActiveIndex={1}
            expandedInitially
          >
            <Wizard.Step title="Step 1" inactive>
              1
            </Wizard.Step>
            <Wizard.Step title="Step 2">2</Wizard.Step>
            <Wizard.Step title="Step 3">3</Wizard.Step>
            <Wizard.Step title="Step 4" inactive>
              4
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const [s1, s2, s3, s4] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )
      expect(s1).toHaveClass('dnb-step-indicator__item--inactive')
      expect(s2).toHaveClass('dnb-step-indicator__item--current')
      expect(s3).not.toHaveClass('dnb-step-indicator__item--inactive')
      expect(s4).toHaveClass('dnb-step-indicator__item--inactive')
    })

    it('should make steps inactive in strict mode', async () => {
      render(
        <Form.Handler>
          <Wizard.Container
            mode="strict"
            initialActiveIndex={1}
            expandedInitially
          >
            <Wizard.Step title="Step 1" inactive>
              1
            </Wizard.Step>
            <Wizard.Step title="Step 2" inactive>
              2
            </Wizard.Step>

            <Wizard.Buttons />
          </Wizard.Container>
        </Form.Handler>
      )

      const [s1, s2] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )
      const [b1, b2] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item .dnb-anchor')
      )

      expect(s1).toHaveClass('dnb-step-indicator__item--inactive')
      expect(s1).toHaveClass('dnb-step-indicator__item--visited')
      expect(b1.tagName).toBe('SPAN')

      expect(s2).toHaveClass('dnb-step-indicator__item--inactive')
      expect(s2).toHaveClass('dnb-step-indicator__item--current')
      expect(b2.tagName).toBe('SPAN')

      await userEvent.click(
        document.querySelector('.dnb-forms-previous-button')
      )

      expect(s1).toHaveClass('dnb-step-indicator__item--inactive')
      expect(s1).toHaveClass('dnb-step-indicator__item--current')
      expect(b1.tagName).toBe('SPAN')

      expect(s2).toHaveClass('dnb-step-indicator__item--inactive')
      expect(b2.tagName).toBe('SPAN')
    })
  })

  describe('keepInDOM', () => {
    it('should keep the step in the DOM', () => {
      const activeIndex = 0

      render(
        <WizardContext.Provider value={{ activeIndex }}>
          <Wizard.Step index={0}>Active Content</Wizard.Step>
          <Wizard.Step index={1} keepInDOM>
            keepInDOM Content
          </Wizard.Step>
          <Wizard.Step index={2}>Hidden Content</Wizard.Step>
        </WizardContext.Provider>
      )

      const [step1, step2, step3] = Array.from(
        document.querySelectorAll('.dnb-forms-step')
      )

      expect(step1).toHaveTextContent('Active Content')
      expect(step2).toHaveTextContent('keepInDOM Content')
      expect(step2.parentElement).toHaveAttribute('hidden')
      expect(step3).toBeUndefined()
    })

    it('should prerender the step', () => {
      const whatStepsDidRender = []

      const CheckPrerender = () => {
        const wizardStepContext = useContext(WizardStepContext)
        const { index } = wizardStepContext || {}
        const ref = useRef<HTMLDivElement>()

        useEffect(() => {
          if (
            typeof index === 'number' &&
            ref.current.parentElement.parentElement.classList.contains(
              'dnb-forms-step'
            )
          ) {
            whatStepsDidRender.push(index)
          }
        }, [index])

        return <div ref={ref}>content</div>
      }

      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step>
              <CheckPrerender />
            </Wizard.Step>
            <Wizard.Step keepInDOM>
              <CheckPrerender />
            </Wizard.Step>
            <Wizard.Step>
              <CheckPrerender />
            </Wizard.Step>
            <Wizard.Step>
              <CheckPrerender />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      // Only steps with a step context will be pre rendered.
      // The first step is the current step, and is therefore not pre rendered.
      expect(whatStepsDidRender).toEqual([0, 1])
    })

    it('should not prerender the step', () => {
      const step0 = jest.fn()
      const step1 = jest.fn()
      const step2 = jest.fn()
      const step3 = jest.fn()

      const prerenderFieldPropsRef = {
        current: {
          'step-0': {
            index: 0,
            fn: step0,
          },
          'step-1': {
            index: 1,
            fn: step1,
          },
          'step-2': {
            index: 2,
            fn: step2,
          },
          'step-3': {
            index: 3,
            fn: step3,
          },
        },
      }
      const stepsRef = {
        current: new Map([
          [0, {}],
          [1, { keepInDOM: true }],
          [2, {}],
          [3, {}],
        ]),
      } as React.MutableRefObject<Steps>

      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step>content</Wizard.Step>
            <Wizard.Step keepInDOM>content</Wizard.Step>
            <Wizard.Step>content</Wizard.Step>
            <Wizard.Step>content</Wizard.Step>

            <PrerenderFieldPropsOfOtherSteps
              prerenderFieldPropsRef={prerenderFieldPropsRef}
              stepsRef={stepsRef}
            />
          </Wizard.Container>
        </Form.Handler>
      )

      expect(step0).toHaveBeenCalledTimes(0) // because its the current step
      expect(step1).toHaveBeenCalledTimes(0) // because of keepInDOM
      expect(step2).toHaveBeenCalledTimes(1)
      expect(step3).toHaveBeenCalledTimes(1)
    })
  })
})
