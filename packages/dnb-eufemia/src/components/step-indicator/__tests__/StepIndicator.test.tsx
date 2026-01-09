/**
 * StepIndicator Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
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
} from '../StepIndicator';
import StepIndicator from '../StepIndicator'
import MatchMediaMock from 'jest-matchmedia-mock'

const matchMedia = new MatchMediaMock()

beforeEach(() => {
  matchMedia.useMediaQuery('(min-width: 60em)')
  document.body.innerHTML = `<div id="root"></div>`
})

function simulateSmallScreen() {
  matchMedia.useMediaQuery('(min-width: 0) and (max-width: 60em)')
}

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

  it('should support spacing props with no sidebar', () => {
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

  it('should support aria-labelledby with no sidebar', () => {
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

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent({ expandedInitially: false })
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

  it('should keep the current step on re-render', () => {
    const { rerender } = render(
      <StepIndicator
        currentStep={1}
        mode="loose"
        data={stepIndicatorListData}
        expandedInitially
      />
    )

    expect(
      document.querySelectorAll('li.dnb-step-indicator__item')
    ).toHaveLength(4)
    expect(
      document.querySelector('li.dnb-step-indicator__item--current')
        .textContent
    ).toContain('2.Step BSteg 2 av 4')

    simulateSmallScreen()

    rerender(
      <StepIndicator
        currentStep={1}
        mode="loose"
        data={stepIndicatorListData}
      />
    )
    expect(
      document.querySelector('.dnb-step-indicator__trigger').textContent
    ).toContain('Steg 2 av 4:Step B')
  })

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
    const onChange = jest.fn()
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

  it('should render button when no Sidebar was found', () => {
    const { rerender } = render(
      <StepIndicator
        currentStep={1}
        mode="loose"
        data={stepIndicatorListData}
      />
    )

    expect(
      document.querySelector('label.dnb-step-indicator__label').textContent
    ).toContain('Steg 2 av 4:')
    expect(
      document.querySelector('button.dnb-step-indicator__trigger__button')
        .textContent
    ).toContain('Step B')

    simulateSmallScreen()

    rerender(
      <StepIndicator
        currentStep={1}
        mode="loose"
        data={stepIndicatorListData}
      />
    )
    expect(
      document.querySelector('label.dnb-step-indicator__label').textContent
    ).toContain('Steg 2 av 4:')
    expect(
      document.querySelector('button.dnb-step-indicator__trigger__button')
        .textContent
    ).toContain('Step B')
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

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent({
      expandedInitially: false,
    })
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

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
    const onChange = jest.fn()
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
  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent()
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

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

  it('should have aria-hidden on the form label to avoid duplicate information', () => {
    render(<StepIndicator mode="loose" data={stepIndicatorListData} />)

    // Find the form label within the trigger
    const formLabel = document.querySelector('.dnb-step-indicator__label')
    expect(formLabel).toBeInTheDocument()

    // Verify it has aria-hidden attribute
    expect(formLabel).toHaveAttribute('aria-hidden', 'true')
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

  it('should have aria-label on trigger button to support NVDA properly', () => {
    render(<StepIndicator mode="loose" data={stepIndicatorListData} />)

    // Find the trigger button
    const triggerButton = document.querySelector(
      '.dnb-step-indicator__trigger__button'
    )
    expect(triggerButton).toBeInTheDocument()

    // Since there seems to be a React/DOM timing issue, we'll check the HTML directly
    // The aria-label should be present in the rendered HTML
    const buttonHTML = triggerButton.outerHTML
    expect(buttonHTML).toContain('aria-label=')

    // Verify the aria-label contains step information (e.g., "Steg 1 av 4:")
    expect(buttonHTML).toMatch(/aria-label="Steg \d+ av \d+:"/)
  })
})

describe('StepIndicator scss', () => {
  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('should match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-step-indicator-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
