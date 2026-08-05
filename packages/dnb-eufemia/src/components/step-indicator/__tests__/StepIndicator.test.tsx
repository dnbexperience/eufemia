/**
 * StepIndicator Test
 *
 */

import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'
import {
  fireEvent,
  render,
  screen,
  within,
  act,
} from '@testing-library/react'
import type {
  StepIndicatorData,
  StepIndicatorProps,
} from '../StepIndicator'
import StepIndicator from '../StepIndicator'
import Card from '../../card/Card'
import { getStepIndicatorBulletType } from '../StepIndicatorItem'

beforeEach(() => {
  document.body.innerHTML = `<div id="root"></div>`
})

const stepIndicatorListData: StepIndicatorData = [
  {
    title: 'Step A',
  },
  {
    title: 'Step B',
  },
  {
    title: 'Step C',
  },
  {
    title: 'Step D',
  },
]

describe('StepIndicator in general', () => {
  it('renders with empty props', () => {
    const stepIndicatorProps = {} as StepIndicatorProps
    render(<StepIndicator {...stepIndicatorProps} />)

    expect(
      document.querySelector('.dnb-step-indicator-wrapper')
    ).toBeInTheDocument()
  })

  it('should support spacing props', () => {
    render(
      <>
        <StepIndicator
          top="large"
          currentStep={1}
          mode="loose"
          data={stepIndicatorListData}
        />
      </>
    )

    const element = document.querySelector('.dnb-step-indicator')

    expect(Array.from(element.classList)).toContain(
      'dnb-space__top--large'
    )
  })

  it('should support spacing props in static mode', () => {
    render(
      <StepIndicator
        top="large"
        mode="static"
        currentStep={1}
        data={stepIndicatorListData}
      />
    )

    const element = document.querySelector('.dnb-step-indicator')

    expect(Array.from(element.classList)).toContain(
      'dnb-space__top--large'
    )
  })

  it('should support aria-labelledby', () => {
    render(
      <>
        <StepIndicator
          top="large"
          currentStep={1}
          mode="loose"
          data={stepIndicatorListData}
          aria-labelledby="element"
        />
      </>
    )

    const element = document.querySelector('.dnb-step-indicator__trigger')

    expect(element.getAttribute('aria-labelledby')).toBe('element')
  })

  it('should support aria-labelledby in static mode', () => {
    render(
      <StepIndicator
        top="large"
        mode="static"
        currentStep={1}
        data={stepIndicatorListData}
        aria-labelledby="element"
      />
    )

    const element = document.querySelector('.dnb-step-indicator__trigger')

    expect(element.getAttribute('aria-labelledby')).toBe('element')
  })
})

describe('StepIndicator redesign', () => {
  it('should set aria-expanded', () => {
    render(
      <>
        <StepIndicator
          mode="loose"
          data={stepIndicatorListData}
          expandedInitially
        />
      </>
    )
    expect(
      document
        .querySelector('.dnb-step-indicator__trigger__button')
        .attributes.getNamedItem('aria-expanded').value
    ).toBe('true')

    act(() => {
      document
        .querySelector<HTMLButtonElement>(
          'button.dnb-step-indicator__trigger__button--expanded'
        )
        ?.click()
    })

    expect(
      document
        .querySelector('.dnb-step-indicator__trigger__button')
        .attributes.getNamedItem('aria-expanded').value
    ).toBe('false')
  })

  it('should not display numbers in list for screen readers', () => {
    render(
      <>
        <StepIndicator
          mode="loose"
          data={stepIndicatorListData}
          expandedInitially
        />
      </>
    )
    expect(
      document.querySelector('.dnb-step-indicator__item-content')
        .textContent
    ).toEqual('1.Step A')
    expect(
      document.querySelector('.dnb-step-indicator__item-content__number')
    ).toHaveAttribute('aria-hidden')
  })

  it('should hide numbers in list', () => {
    render(
      <>
        <StepIndicator
          mode="loose"
          data={stepIndicatorListData}
          hideNumbers
          expandedInitially
        />
      </>
    )
    expect(
      document.querySelector('.dnb-step-indicator__item-content')
        .textContent
    ).toEqual('Step A')
  })

  it('should expand with click', () => {
    render(
      <>
        <StepIndicator mode="loose" data={stepIndicatorListData} />
      </>
    )

    expect(
      document.querySelector('button.dnb-step-indicator__trigger__button')
    ).toHaveClass('dnb-step-indicator__trigger__button--collapsed')
    expect(
      document.querySelectorAll('li.dnb-step-indicator__item')
    ).toHaveLength(0)

    act(() => {
      document
        .querySelector<HTMLButtonElement>(
          'button.dnb-step-indicator__trigger__button--collapsed'
        )
        ?.click()
    })

    expect(
      document.querySelector('button.dnb-step-indicator__trigger__button')
    ).toHaveClass('dnb-step-indicator__trigger__button--expanded')

    expect(
      document.querySelectorAll('li.dnb-step-indicator__item')
    ).toHaveLength(4)
  })
})

describe('StepIndicator in loose mode', () => {
  const renderComponent = (props = null) => {
    return render(
      <StepIndicator
        currentStep={1}
        mode="loose"
        data={stepIndicatorListData}
        expandedInitially
        {...props}
      />
    )
  }

  it('has correct states on steps', () => {
    renderComponent()
    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(items[0].classList).toContain(
      'dnb-step-indicator__item--visited'
    )
    expect(items[1].classList).toContain(
      'dnb-step-indicator__item--current'
    )
    expect(items[1].getAttribute('aria-current')).toBe('step')
    expect(screen.queryAllByRole('button')).toHaveLength(5)
  })

  it('has correct state after change', () => {
    const onChange = vi.fn()
    renderComponent({
      onChange,
    })
    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(items[0].classList).toContain(
      'dnb-step-indicator__item--visited'
    )
    expect(items[0].classList).not.toContain(
      'dnb-step-indicator__item--current'
    )

    fireEvent.click(items[0].querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].currentStep).toBe(0)
    expect(typeof onChange.mock.calls[0][0].event.preventDefault).toBe(
      'function'
    )

    expect(items[0].classList).toContain(
      'dnb-step-indicator__item--current'
    )
    expect(
      document.querySelectorAll('li.dnb-step-indicator__item--current')
    ).toHaveLength(1)
  })

  it('should have only one "current" at a time', () => {
    renderComponent({
      currentStep: null,
      data: [
        {
          title: 'Step A',
        },
        {
          title: 'Step B',
        },
        {
          title: 'Step C',
          isCurrent: true,
        },
      ],
    })

    expect(
      screen.queryAllByRole('listitem', { current: 'step' })
    ).toHaveLength(1)
    expect(
      within(screen.getByRole('listitem', { current: 'step' })).getByRole(
        'button',
        { name: 'Step C' }
      )
    ).toBeInTheDocument()

    act(() => {
      // Make state change
      within(screen.queryAllByRole('listitem')[0])
        .getByRole('button')
        .click()
    })

    expect(
      screen.queryAllByRole('listitem', { current: 'step' })
    ).toHaveLength(1)
    expect(
      within(screen.getByRole('listitem', { current: 'step' })).getByRole(
        'button',
        { name: 'Step A' }
      )
    ).toBeInTheDocument()
  })

  it('should react on isCurrent data prop change', () => {
    const TestComp = (props) => {
      return <StepIndicator mode="loose" expandedInitially {...props} />
    }

    const data1 = [
      {
        title: 'Step A',
      },
      {
        title: 'Step B',
      },
      {
        title: 'Step C',
        isCurrent: true,
      },
    ]

    const { rerender } = render(<TestComp data={data1} />)

    expect(
      document.querySelector('li.dnb-step-indicator__item--current')
        .textContent
    ).toContain('3.Step CSteg 3 av 3')

    const data2 = [
      {
        title: 'Step A',
      },
      {
        title: 'Step B',
        isCurrent: true,
      },
      {
        title: 'Step C',
      },
    ]

    rerender(<TestComp data={data2} />)

    expect(
      document.querySelector('li.dnb-step-indicator__item--current')
        .textContent
    ).toContain('2.Step BSteg 2 av 3')
  })

  it('should react on currentStep prop change', () => {
    const TestComp = ({ ...props }) => {
      return (
        <StepIndicator
          currentStep={1}
          mode="loose"
          data={stepIndicatorListData}
          expandedInitially
          {...props}
        />
      )
    }

    const { rerender } = render(<TestComp />)

    rerender(<TestComp currentStep={2} />)

    expect(
      document.querySelector('li.dnb-step-indicator__item--current')
        .textContent
    ).toContain('3.Step CSteg 3 av 4')
  })

  it('should render trigger button', () => {
    render(
      <StepIndicator
        currentStep={1}
        mode="loose"
        data={stepIndicatorListData}
      />
    )

    expect(
      document.querySelector('button.dnb-step-indicator__trigger__button')
        .textContent
    ).toContain('Steg 2 av 4')
  })

  it('should have no current if currentStep is not given', () => {
    renderComponent({
      currentStep: null,
    })

    expect(
      screen.queryAllByRole('listitem', { current: 'step' })
    ).toHaveLength(0)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = renderComponent()
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator in strict mode', () => {
  const renderComponent = (props = null) => {
    return render(
      <StepIndicator
        currentStep={1}
        mode="strict"
        data={stepIndicatorListData}
        expandedInitially
        {...props}
      />
    )
  }

  it('has correct states on steps', () => {
    renderComponent()
    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(items[0].classList).toContain(
      'dnb-step-indicator__item--visited'
    )
    expect(items[1].classList).toContain(
      'dnb-step-indicator__item--current'
    )
    expect(items[1].getAttribute('aria-current')).toBe('step')

    expect(screen.queryAllByRole('button')).toHaveLength(3)
  })

  it('has correct state after change', () => {
    const onChange = vi.fn()
    renderComponent({
      onChange,
    })
    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(items[0].classList).toContain(
      'dnb-step-indicator__item--visited'
    )
    expect(items[0].classList).not.toContain(
      'dnb-step-indicator__item--current'
    )

    act(() => {
      document
        .querySelectorAll<HTMLButtonElement>(
          'button.dnb-step-indicator__button'
        )[0]
        .click()
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(items[0].classList).toContain(
      'dnb-step-indicator__item--current'
    )

    expect(
      screen.queryAllByRole('listitem', { current: 'step' })
    ).toHaveLength(1)
  })
})

describe('StepIndicator in static mode', () => {
  const renderComponent = (props = null) => {
    return render(
      <StepIndicator
        currentStep={1}
        mode="static"
        data={stepIndicatorListData}
        expandedInitially
        {...props}
      />
    )
  }

  it('has correct states on steps', () => {
    renderComponent()

    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(items[0].classList).toContain(
      'dnb-step-indicator__item--visited'
    )
    expect(items[1].classList).toContain(
      'dnb-step-indicator__item--current'
    )
    expect(items[1].getAttribute('aria-current')).toBe('step')
    expect(screen.queryAllByRole('button')).toHaveLength(1)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = renderComponent()
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator ARIA', () => {
  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <StepIndicator
        currentStep={1}
        mode="loose"
        data={stepIndicatorListData}
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should have correct aria-label on trigger section', () => {
    render(
      <StepIndicator
        mode="loose"
        data={stepIndicatorListData}
        overviewTitle="Custom Overview Title"
      />
    )

    // The aria-label is on the section element that contains the trigger
    const triggerSection = document.querySelector(
      'section[aria-label="Custom Overview Title"]'
    )
    expect(triggerSection).toBeInTheDocument()

    // Verify it contains the trigger div
    const triggerDiv = triggerSection.querySelector(
      '.dnb-step-indicator__trigger'
    )
    expect(triggerDiv).toBeInTheDocument()
  })

  it('should have default aria-label when overviewTitle is not provided', () => {
    render(<StepIndicator mode="loose" data={stepIndicatorListData} />)

    // The aria-label is on the section element that contains the trigger
    // The default value gets translated, so we check for any section with an aria-label
    const triggerSection = document.querySelector('section[aria-label]')
    expect(triggerSection).toBeInTheDocument()

    // Verify it contains the trigger div
    const triggerDiv = triggerSection.querySelector(
      '.dnb-step-indicator__trigger'
    )
    expect(triggerDiv).toBeInTheDocument()

    // Verify the aria-label is not empty
    const ariaLabel = triggerSection.getAttribute('aria-label')
    expect(ariaLabel).toBeTruthy()
    expect(ariaLabel.length).toBeGreaterThan(0)
  })

  it('should have aria-hidden on step item elements to avoid duplicate information', () => {
    render(
      <StepIndicator
        mode="loose"
        data={stepIndicatorListData}
        expandedInitially
      />
    )

    // Find step items
    const stepItems = document.querySelectorAll(
      'li.dnb-step-indicator__item'
    )
    expect(stepItems.length).toBeGreaterThan(0)

    // Check the first step item for aria-hidden attributes
    const firstStepItem = stepItems[0]

    // Check that the step number has aria-hidden (when numbers are shown)
    const stepNumber = firstStepItem.querySelector(
      '.dnb-step-indicator__item-content__number'
    )
    expect(stepNumber).toBeInTheDocument()
    expect(stepNumber).toHaveAttribute('aria-hidden')

    // Check that the screen reader only span has aria-hidden
    const srOnlySpan = firstStepItem.querySelector('.dnb-sr-only')
    expect(srOnlySpan).toBeInTheDocument()
    expect(srOnlySpan).toHaveAttribute('aria-hidden')
  })

  it('connects a step status message to the step button via aria-describedby', () => {
    render(
      <StepIndicator
        mode="loose"
        expandedInitially
        data={[
          { title: 'Step A', status: 'Step A has an error' },
          { title: 'Step B' },
        ]}
      />
    )

    const firstStepItem = document.querySelectorAll(
      'li.dnb-step-indicator__item'
    )[0]

    // The status message of the first step
    const statusText = firstStepItem.querySelector(
      '.dnb-step-indicator__item-content__status .dnb-form-status__text'
    )
    expect(statusText).toBeInTheDocument()
    expect(statusText).toHaveTextContent('Step A has an error')

    const statusTextId = statusText.getAttribute('id')
    expect(statusTextId).toBeTruthy()

    // The step button must reference both the screen-reader label and the status
    const button = firstStepItem.querySelector(
      '.dnb-step-indicator__button'
    )
    const describedBy = (
      button.getAttribute('aria-describedby') || ''
    ).split(/\s+/)

    const srOnlyId = firstStepItem
      .querySelector('.dnb-sr-only')
      .getAttribute('id')

    expect(describedBy).toContain(srOnlyId)
    expect(describedBy).toContain(statusTextId)
  })

  it('does not reference a status id when the step has no status', () => {
    render(
      <StepIndicator
        mode="loose"
        expandedInitially
        data={[{ title: 'Step A' }, { title: 'Step B' }]}
      />
    )

    const firstStepItem = document.querySelectorAll(
      'li.dnb-step-indicator__item'
    )[0]
    const button = firstStepItem.querySelector(
      '.dnb-step-indicator__button'
    )
    const describedBy = button.getAttribute('aria-describedby') || ''

    // No "-status" reference at all when there is no status
    const statusRefs = describedBy
      .split(/\s+/)
      .filter((refId) => refId.endsWith('-status'))
    expect(statusRefs).toHaveLength(0)
  })
})

describe('getStepIndicatorBulletType', () => {
  it('returns "current" for the active step regardless of status', () => {
    expect(getStepIndicatorBulletType({ index: 1, activeStep: 1 })).toBe(
      'current'
    )

    expect(
      getStepIndicatorBulletType({
        index: 1,
        activeStep: 1,
        status: 'Something is wrong',
        statusState: 'error',
      })
    ).toBe('current')
  })

  it('returns the statusState for non-current steps with a status', () => {
    expect(
      getStepIndicatorBulletType({
        index: 0,
        activeStep: 2,
        status: 'msg',
        statusState: 'warning',
      })
    ).toBe('warning')

    expect(
      getStepIndicatorBulletType({
        index: 0,
        activeStep: 2,
        status: 'msg',
        statusState: 'error',
      })
    ).toBe('error')

    expect(
      getStepIndicatorBulletType({
        index: 0,
        activeStep: 2,
        status: 'msg',
        statusState: 'information',
      })
    ).toBe('information')
  })

  it('defaults statusState to "warning" when a status is set without one', () => {
    expect(
      getStepIndicatorBulletType({
        index: 0,
        activeStep: 2,
        status: 'msg',
      })
    ).toBe('warning')
  })

  it('returns "check" for visited steps without a status', () => {
    expect(getStepIndicatorBulletType({ index: 0, activeStep: 2 })).toBe(
      'check'
    )
  })

  it('returns "empty" for future steps without a status', () => {
    expect(getStepIndicatorBulletType({ index: 3, activeStep: 1 })).toBe(
      'empty'
    )
  })
})

describe('StepIndicator progress bar', () => {
  const mixedData: StepIndicatorData = [
    { title: 'Step A' },
    { title: 'Step B', status: 'Heads up', statusState: 'warning' },
    { title: 'Step C', status: 'Broken', statusState: 'error' },
    { title: 'Step D', status: 'FYI', statusState: 'information' },
    { title: 'Step E' },
  ]

  const bulletTypeFor = (index: number, activeStep: number) =>
    getStepIndicatorBulletType({
      index,
      activeStep,
      status: (mixedData[index] as { status?: string }).status,
      statusState: (
        mixedData[index] as {
          statusState?: 'warning' | 'error' | 'information'
        }
      ).statusState,
    })

  it('renders one segment per step', () => {
    render(<StepIndicator mode="loose" data={mixedData} currentStep={0} />)
    expect(
      document.querySelectorAll(
        '.dnb-step-indicator__progress-bar__segment'
      )
    ).toHaveLength(mixedData.length)
  })

  it('uses the same bullet type helper as the item bullet', () => {
    const activeStep = 2
    render(
      <StepIndicator
        mode="loose"
        data={mixedData}
        currentStep={activeStep}
        expandedInitially
      />
    )

    const segments = document.querySelectorAll(
      '.dnb-step-indicator__progress-bar__segment'
    )
    const bullets = document.querySelectorAll(
      '.dnb-step-indicator__item__bullet'
    )

    expect(segments).toHaveLength(mixedData.length)
    expect(bullets).toHaveLength(mixedData.length)

    mixedData.forEach((_, i) => {
      const expected = bulletTypeFor(i, activeStep)

      expect(segments[i]).toHaveClass(
        `dnb-step-indicator__progress-bar__segment--${expected}`
      )

      expect(bullets[i]).toHaveClass(
        `dnb-step-indicator__item__bullet--${expected}`
      )
    })
  })
})

describe('StepIndicator scss', () => {
  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})

describe('StepIndicator inside a Card', () => {
  it('should not outset the inner list Card when nested in a parent Card', () => {
    render(
      <Card outset>
        <StepIndicator
          mode="static"
          expandedInitially
          data={stepIndicatorListData}
        />
      </Card>
    )

    const parentCard = document.querySelector('.dnb-card')
    const innerListCard = parentCard.querySelector(
      '.dnb-step-indicator__card'
    )

    expect(innerListCard).toBeInTheDocument()

    expect(parentCard).toHaveStyle('--outset--medium: 1')
    expect(parentCard).toHaveStyle('--outset--large: 1')

    expect(innerListCard).toHaveStyle('--outset--small: 0')
    expect(innerListCard).toHaveStyle('--outset--medium: 0')
    expect(innerListCard).toHaveStyle('--outset--large: 0')
  })
})
