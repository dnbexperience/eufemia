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
} from '../StepIndicator'
import StepIndicator from '../StepIndicator'
import Provider from '../../../shared/Provider'
import MatchMediaMock from 'jest-matchmedia-mock'
import type { StepIndicatorSidebarProps } from '../StepIndicatorSidebar'

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

describe('StepIndicator Sidebar', () => {
  it('renders with empty props', () => {
    const props = { sidebar_id: 'id' } as StepIndicatorSidebarProps
    render(
      <Provider StepIndicator={{ data: ['one', 'two', 'three'] }}>
        <StepIndicator.Sidebar {...props} />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-step-indicator__sidebar')
    ).toBeInTheDocument()
  })

  // it('has to inherit Provider data for initial SSR render', () => {
  //   render(
  //     <Provider StepIndicator={{ data: ['one', 'two', 'three'] }}>
  //       <StepIndicator.Sidebar
  //         sidebar_id="unique-id-initial"
  //         showInitialData
  //       />
  //     </Provider>
  //   )

  //   expect(screen.queryAllByRole('listitem')).toHaveLength(3)
  // })

  // it('has to use data prop for initial SSR render', () => {
  //   render(
  //     <StepIndicator.Sidebar
  //       sidebar_id="unique-id-initial"
  //       data={['one', 'two', 'three']}
  //       showInitialData
  //     />
  //   )
  //   expect(screen.queryAllByRole('listitem')).toHaveLength(3)
  // })

  // it('has to remove data from Sidebar when mounted', () => {
  //   render(
  //     <StepIndicator.Sidebar
  //       sidebar_id="unique-id-initial"
  //       data={['one', 'two', 'three']}
  //     />
  //   )
  //   expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  // })

  // it('has to show skeleton when no data is given to Sidebar', () => {
  //   render(
  //     <StepIndicator.Sidebar
  //       sidebar_id="unique-id-initial"
  //       showInitialData
  //     />
  //   )
  //   expect(screen.queryAllByRole('listitem')).toHaveLength(1)

  //   const element = document.querySelector('.dnb-button__text')

  //   expect(Array.from(element.classList)).toEqual(
  //     expect.arrayContaining(['dnb-skeleton--show-font'])
  //   )
  // })

  // it('should support spacing props', () => {
  //   render(
  //     <StepIndicator.Sidebar
  //       sidebar_id="unique-id-initial"
  //       data={['one', 'two', 'three']}
  //       showInitialData
  //       top="large"
  //     />
  //   )

  //   const element = document.querySelector('.dnb-step-indicator__sidebar')

  //   expect(Array.from(element.classList)).toEqual(
  //     expect.arrayContaining([
  //       'dnb-step-indicator__sidebar',
  //       'dnb-space__top--large',
  //     ])
  //   )
  // })
})

describe('StepIndicator in general', () => {
  it('renders with empty props', () => {
    const sidebar_id = 'unique-id-spacing'

    const sidebarProps = { sidebar_id } as StepIndicatorSidebarProps
    const stepIndicatorProps = { sidebar_id } as StepIndicatorProps
    render(
      <>
        <StepIndicator.Sidebar {...sidebarProps} />
        <StepIndicator {...stepIndicatorProps} />
      </>
    )

    expect(
      document.querySelector('.dnb-step-indicator-wrapper')
    ).toBeInTheDocument()
  })

  it('should support spacing props', () => {
    const id = 'unique-id-spacing'
    render(
      <>
        <StepIndicator.Sidebar sidebar_id={id} />
        <StepIndicator
          top="large"
          current_step={1}
          mode="loose"
          sidebar_id={id}
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
        sidebar_id="unique-id-no-sidebar"
        top="large"
        mode="static"
        current_step={1}
        data={stepIndicatorListData}
      />
    )

    const element = document.querySelector('.dnb-step-indicator')

    expect(Array.from(element.classList)).toContain(
      'dnb-space__top--large'
    )
  })

  // eslint-disable-next-line jest/no-commented-out-tests, multiline-comment-style
  /* 
  it('should not add spacing props to dnb-step-indicator with no sidebar', async () => {
    render(
      <StepIndicator
        sidebar_id="unique-id-no-sidebar"
        top="large"
        mode="static"
        current_step={1}
        data={stepIndicatorListData}
      />
    )
    act(() => {
      document.querySelector('button').click()
    })

    const element = document.querySelector('.dnb-step-indicator')

    expect(Array.from(element.classList)).toEqual(['dnb-step-indicator'])
  })
  */

  it('should support aria-labelledby', () => {
    render(
      <>
        <StepIndicator.Sidebar sidebar_id="unique-id-aria-labelledby" />
        <StepIndicator
          top="large"
          current_step={1}
          mode="loose"
          sidebar_id="unique-id-aria-labelledby"
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
        sidebar_id="unique-id-aria-labelledby-no-sidebar"
        top="large"
        mode="static"
        current_step={1}
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
          hide_numbers
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
  const renderComponent = (id, props = null) => {
    return render(
      <>
        <StepIndicator.Sidebar sidebar_id={id} />
        <StepIndicator
          current_step={1}
          mode="loose"
          sidebar_id={id}
          data={stepIndicatorListData}
          expandedInitially
          {...props}
        />
      </>
    )
  }

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent('unique-id-loose-mobile', { expandedInitially: false })
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

  it('should keep the current step on re-render', () => {
    const id = 'unique-id-loose-mobile'

    const { rerender } = render(
      <>
        <StepIndicator.Sidebar sidebar_id={id} />
        <StepIndicator
          current_step={1}
          mode="loose"
          sidebar_id={id}
          data={stepIndicatorListData}
          expandedInitially
        />
      </>
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
      <>
        <StepIndicator.Sidebar sidebar_id={id} />
        <StepIndicator
          current_step={1}
          mode="loose"
          sidebar_id={id}
          data={stepIndicatorListData}
        />
      </>
    )
    expect(
      document.querySelector('.dnb-step-indicator__trigger').textContent
    ).toContain('Steg 2 av 4:Step B')
  })

  it('has correct states on steps', () => {
    renderComponent('unique-id-loose-states')
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
    const on_change = jest.fn()
    renderComponent('unique-id-loose-simulate', {
      on_change,
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

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change.mock.calls[0][0].currentStep).toBe(0)
    expect(typeof on_change.mock.calls[0][0].event.preventDefault).toBe(
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
    renderComponent('unique-id-sidebar', {
      current_step: null,
      data: [
        {
          title: 'Step A',
        },
        {
          title: 'Step B',
        },
        {
          title: 'Step C',
          is_current: true,
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

  it('should react on is_current data prop change', () => {
    const TestComp = (props) => {
      return (
        <>
          <StepIndicator.Sidebar sidebar_id="unique-id-loose-simulate" />
          <StepIndicator
            mode="loose"
            sidebar_id="unique-id-loose-simulate"
            expandedInitially
            {...props}
          />
        </>
      )
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
        is_current: true,
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
        is_current: true,
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

  it('should react on current_step prop change', () => {
    const TestComp = ({ id, ...props }) => {
      return (
        <>
          <StepIndicator.Sidebar sidebar_id={id} />
          <StepIndicator
            current_step={1}
            mode="loose"
            sidebar_id={id}
            data={stepIndicatorListData}
            expandedInitially
            {...props}
          />
        </>
      )
    }

    const { rerender } = render(<TestComp id="unique-id-loose-simulate" />)

    rerender(<TestComp id="unique-id-loose-simulate" current_step={2} />)

    expect(
      document.querySelector('li.dnb-step-indicator__item--current')
        .textContent
    ).toContain('3.Step CSteg 3 av 4')
  })

  it('should render button when no Sidebar was found', () => {
    const { rerender } = render(
      <StepIndicator
        current_step={1}
        mode="loose"
        sidebar_id="unique-id-loose-simulate"
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
        current_step={1}
        mode="loose"
        sidebar_id="unique-id-loose-simulate"
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

  it('should have no current if current_step is not given', () => {
    renderComponent('unique-id-loose-simulate', {
      current_step: null,
    })

    expect(
      screen.queryAllByRole('listitem', { current: 'step' })
    ).toHaveLength(0)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = renderComponent('unique-id-loose-aria')
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator in strict mode', () => {
  const renderComponent = (id, props = null) => {
    return render(
      <>
        <StepIndicator.Sidebar sidebar_id={id} />
        <StepIndicator
          current_step={1}
          mode="strict"
          sidebar_id={id}
          data={stepIndicatorListData}
          expandedInitially
          {...props}
        />
      </>
    )
  }

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent('unique-id-strict-mobile', {
      expandedInitially: false,
    })
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

  it('has correct states on steps', () => {
    renderComponent('unique-id-strict-states')
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
    const on_change = jest.fn()
    renderComponent('unique-id-strict-simulate', {
      on_change,
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

    expect(on_change).toHaveBeenCalledTimes(1)
    expect(items[0].classList).toContain(
      'dnb-step-indicator__item--current'
    )

    expect(
      screen.queryAllByRole('listitem', { current: 'step' })
    ).toHaveLength(1)
  })
})

describe('StepIndicator in static mode', () => {
  const renderComponent = (id, props = null) => {
    return render(
      <>
        <StepIndicator.Sidebar sidebar_id={id} />
        <StepIndicator
          current_step={1}
          mode="static"
          sidebar_id={id}
          data={stepIndicatorListData}
          expandedInitially
          {...props}
        />
      </>
    )
  }
  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent('unique-id-static-mobile')
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })

  it('has correct states on steps', () => {
    renderComponent('unique-id-static-states')

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
    const Comp = renderComponent('unique-id-static-aria')
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator ARIA', () => {
  it('should validate with ARIA rules', async () => {
    const Comp = render(
      <>
        <StepIndicator.Sidebar sidebar_id="unique-id-strict-aria" />
        <StepIndicator
          current_step={1}
          mode="loose"
          sidebar_id="unique-id-strict-aria"
          data={stepIndicatorListData}
        />
      </>
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should have correct aria-label on trigger section', () => {
    render(
      <StepIndicator
        mode="loose"
        data={stepIndicatorListData}
        overview_title="Custom Overview Title"
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

  it('should have default aria-label when overview_title is not provided', () => {
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
