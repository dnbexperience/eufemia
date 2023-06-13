/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import { render, screen, within } from '@testing-library/react'
import Component from '../StepIndicator'
import Provider from '../../../shared/Provider'
import MatchMediaMock from 'jest-matchmedia-mock'

const matchMedia = new MatchMediaMock()

beforeEach(() => {
  matchMedia.useMediaQuery('(min-width: 60em)')
  document.body.innerHTML = `<div id="root"></div>`
})

function simulateSmallScreen() {
  matchMedia.useMediaQuery('(min-width: 0) and (max-width: 60em)')
}

const stepIndicatorListData = [
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
  it('has to inherit Provider data for initial SSR render', () => {
    render(
      <Provider StepIndicator={{ data: ['one', 'two', 'three'] }}>
        <Component.Sidebar
          sidebar_id="unique-id-initial"
          showInitialData
        />
      </Provider>
    )

    expect(screen.queryAllByRole('listitem')).toHaveLength(3)
  })

  it('has to use data prop for initial SSR render', () => {
    render(
      <Component.Sidebar
        sidebar_id="unique-id-initial"
        data={['one', 'two', 'three']}
        showInitialData
      />
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(3)
  })

  it('has to remove data from Sidebar when mounted', () => {
    render(
      <Component.Sidebar
        sidebar_id="unique-id-initial"
        data={['one', 'two', 'three']}
      />
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('has to show skeleton when no data is given to Sidebar', () => {
    render(
      <Component.Sidebar sidebar_id="unique-id-initial" showInitialData />
    )
    expect(screen.queryAllByRole('listitem')).toHaveLength(4)

    const element = document.querySelector('.dnb-button__text')

    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining(['dnb-skeleton--show-font'])
    )
  })

  it('should support spacing props', () => {
    render(
      <Component.Sidebar
        sidebar_id="unique-id-initial"
        data={['one', 'two', 'three']}
        showInitialData
        top="large"
      />
    )

    const element = document.querySelector('.dnb-step-indicator__sidebar')

    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-step-indicator__sidebar',
        'dnb-space__top--large',
      ])
    )
  })
})

describe('StepIndicator in general', () => {
  it('should support spacing props', () => {
    const id = 'unique-id-spacing'
    render(
      <>
        <Component.Sidebar sidebar_id={id} />
        <Component
          top="large"
          current_step={1}
          mode="loose"
          sidebar_id={id}
          data={stepIndicatorListData}
        />
      </>
    )

    const element = document.querySelector('.dnb-step-indicator')

    expect(Array.from(element.classList)).toEqual([
      'dnb-step-indicator',
      'dnb-space__top--large',
    ])
  })

  it('should support spacing props with no sidebar', () => {
    render(
      <Component
        sidebar_id="unique-id-no-sidebar"
        top="large"
        mode="static"
        current_step={1}
        data={stepIndicatorListData}
      />
    )

    const element = document.querySelector('.dnb-step-indicator__trigger')

    expect(Array.from(element.classList)).toEqual([
      'dnb-step-indicator__trigger',
      'dnb-space__top--large',
    ])
  })

  it('should not add spacing props to dnb-step-indicator with no sidebar', () => {
    render(
      <Component
        sidebar_id="unique-id-no-sidebar"
        top="large"
        mode="static"
        current_step={1}
        data={stepIndicatorListData}
      />
    )

    document.querySelector('button').click()

    const element = document.querySelector('.dnb-step-indicator')

    expect(Array.from(element.classList)).toEqual(['dnb-step-indicator'])
  })

  it('should support aria-labelledby', () => {
    render(
      <>
        <Component.Sidebar sidebar_id="unique-id-aria-labelledby" />
        <Component
          top="large"
          current_step={1}
          mode="loose"
          sidebar_id="unique-id-aria-labelledby"
          data={stepIndicatorListData}
          aria-labelledby="element"
        />
      </>
    )

    const element = document.querySelector('.dnb-step-indicator')

    expect(element.getAttribute('aria-labelledby')).toBe(
      'element unique-id-aria-labelledby'
    )
  })

  it('should support aria-labelledby with no sidebar', () => {
    render(
      <Component
        sidebar_id="unique-id-aria-labelledby-no-sidebar"
        top="large"
        mode="static"
        current_step={1}
        data={stepIndicatorListData}
        aria-labelledby="element"
      />
    )

    document.querySelector('button').click()

    const element = document.querySelector('.dnb-step-indicator__list')

    expect(element.getAttribute('aria-labelledby')).toBe(
      'element unique-id-aria-labelledby-no-sidebar'
    )
  })
})

describe('StepIndicator in loose mode', () => {
  // This helper function should be removed, as it uses mount, and we move away from using enzyme.
  const renderComponentUsingMount = (id, props = null) => {
    return mount(
      <>
        <Component.Sidebar sidebar_id={id} />
        <Component
          current_step={1}
          mode="loose"
          sidebar_id={id}
          data={stepIndicatorListData}
          {...props}
        />
      </>,
      { attachTo: document.getElementById('root') }
    )
  }

  const renderComponent = (id, props = null) => {
    return render(
      <>
        <Component.Sidebar sidebar_id={id} />
        <Component
          current_step={1}
          mode="loose"
          sidebar_id={id}
          data={stepIndicatorListData}
          {...props}
        />
      </>
    )
  }

  it('have to match snapshot', () => {
    const Comp = renderComponentUsingMount('unique-id-loose-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match snapshot on small screen', () => {
    simulateSmallScreen()
    const Comp = renderComponentUsingMount('unique-id-loose-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent('unique-id-loose-mobile')
    expect(screen.queryByRole('button')).toBeTruthy()
  })

  it('has to keep the current step on re-render', () => {
    const Comp = renderComponentUsingMount('unique-id-loose-mobile')
    expect(
      Comp.at(1).exists('button.dnb-step-indicator__trigger__button')
    ).toBe(false)

    expect(Comp.find('li.dnb-step-indicator__item')).toHaveLength(4)
    expect(
      Comp.find('li.dnb-step-indicator__item--current').text()
    ).toContain('2.Step BSteg 2 av 4')

    simulateSmallScreen()

    // re-render
    document.body.innerHTML = `<div id="root"></div>`
    Comp.update()

    expect(
      Comp.find('button.dnb-step-indicator__trigger__button').text()
    ).toContain('‌2.Step B')
  })

  it('has correct states on steps', () => {
    renderComponent('unique-id-loose-states')
    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(
      items[0].classList.contains('dnb-step-indicator__item--visited')
    ).toBe(true)
    expect(
      items[1].classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
    expect(items[1].getAttribute('aria-current')).toBe('step')
    expect(screen.queryAllByRole('button')).toHaveLength(4)
  })

  it('has correct state after change', () => {
    const on_change = jest.fn()
    const Comp = renderComponentUsingMount('unique-id-loose-simulate', {
      on_change,
    })
    const items = Comp.find('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(
      items
        .at(0)
        .instance()
        .classList.contains('dnb-step-indicator__item--visited')
    ).toBe(true)
    expect(
      items
        .at(0)
        .instance()
        .classList.contains('dnb-step-indicator__item--current')
    ).toBe(false)

    items.at(0).find('button').simulate('click')

    expect(on_change).toBeCalledTimes(1)
    expect(on_change.mock.calls[0][0].currentStep).toBe(0)
    expect(typeof on_change.mock.calls[0][0].event.preventDefault).toBe(
      'function'
    )
    expect(
      items
        .at(0)
        .instance()
        .classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
    expect(Comp.find('li.dnb-step-indicator__item--current')).toHaveLength(
      1
    )
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
    ).toBeTruthy()

    // Make state change
    within(screen.queryAllByRole('listitem')[0])
      .getByRole('button')
      .click()

    expect(
      screen.queryAllByRole('listitem', { current: 'step' })
    ).toHaveLength(1)
    expect(
      within(screen.getByRole('listitem', { current: 'step' })).getByRole(
        'button',
        { name: 'Step A' }
      )
    ).toBeTruthy()
  })

  it('should react on current_step prop change', () => {
    const TestComp = ({ id, ...props }) => {
      return (
        <>
          <Component.Sidebar sidebar_id={id} />
          <Component
            current_step={1}
            mode="loose"
            sidebar_id={id}
            data={stepIndicatorListData}
            {...props}
          />
        </>
      )
    }

    const renderComponent = (id, props = null) => {
      return mount(<TestComp id={id} {...props} />, {
        attachTo: document.getElementById('root'),
      })
    }
    const Comp = renderComponent('unique-id-loose-simulate')

    Comp.setProps({
      current_step: 2,
    })

    expect(
      Comp.find('li.dnb-step-indicator__item--current').text()
    ).toContain('3.Step CSteg 3 av 4')
  })

  it('should render button when no Sidebar was found', () => {
    const Comp = mount(
      <Component
        current_step={1}
        mode="loose"
        sidebar_id="unique-id-loose-simulate"
        data={stepIndicatorListData}
      />,
      {
        attachTo: document.getElementById('root'),
      }
    )

    expect(
      Comp.find('button.dnb-step-indicator__trigger__button').text()
    ).toContain('‌2.Step B')

    simulateSmallScreen()

    // re-render
    document.body.innerHTML = `<div id="root"></div>`
    Comp.update()

    expect(
      Comp.find('button.dnb-step-indicator__trigger__button').text()
    ).toContain('‌2.Step B')
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
  // This helper function should be removed, as it uses mount, and we move away from using enzyme.
  const renderComponentUsingMount = (id, props = null) => {
    return mount(
      <>
        <Component.Sidebar sidebar_id={id} />
        <Component
          current_step={1}
          mode="strict"
          sidebar_id={id}
          data={stepIndicatorListData}
          {...props}
        />
      </>,
      { attachTo: document.getElementById('root') }
    )
  }

  const renderComponent = (id, props = null) => {
    return render(
      <>
        <Component.Sidebar sidebar_id={id} />
        <Component
          current_step={1}
          mode="strict"
          sidebar_id={id}
          data={stepIndicatorListData}
          {...props}
        />
      </>
    )
  }

  it('have to match snapshot', () => {
    const Comp = renderComponentUsingMount('unique-id-strict-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match snapshot on small screen', () => {
    simulateSmallScreen()
    const Comp = renderComponentUsingMount('unique-id-strict-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent('unique-id-strict-mobile')
    expect(screen.queryByRole('button')).toBeTruthy()
  })

  it('has correct states on steps', () => {
    renderComponent('unique-id-strict-states')
    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(
      items[0].classList.contains('dnb-step-indicator__item--visited')
    ).toBe(true)
    expect(
      items[1].classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
    expect(items[1].getAttribute('aria-current')).toBe('step')

    expect(screen.queryAllByRole('button')).toHaveLength(2)
  })

  it('has correct state after change', () => {
    const on_change = jest.fn()
    renderComponent('unique-id-strict-simulate', {
      on_change,
    })
    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(
      items[0].classList.contains('dnb-step-indicator__item--visited')
    ).toBe(true)
    expect(
      items[0].classList.contains('dnb-step-indicator__item--current')
    ).toBe(false)

    screen.queryAllByRole('button')[0].click()

    expect(on_change).toBeCalledTimes(1)
    expect(
      items[0].classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
    expect(
      screen.queryAllByRole('listitem', { current: 'step' })
    ).toHaveLength(1)
  })
})

describe('StepIndicator in static mode', () => {
  // This helper function should be removed, as it uses mount, and we move away from using enzyme.
  const renderComponentUsingMount = (id, props = null) => {
    return mount(
      <>
        <Component.Sidebar sidebar_id={id} />
        <Component
          current_step={1}
          mode="static"
          sidebar_id={id}
          data={stepIndicatorListData}
          {...props}
        />
      </>,
      { attachTo: document.getElementById('root') }
    )
  }

  const renderComponent = (id, props = null) => {
    return render(
      <>
        <Component.Sidebar sidebar_id={id} />
        <Component
          current_step={1}
          mode="static"
          sidebar_id={id}
          data={stepIndicatorListData}
          {...props}
        />
      </>
    )
  }

  it('have to match snapshot', () => {
    const Comp = renderComponentUsingMount('unique-id-static-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match snapshot on small screen', () => {
    simulateSmallScreen()
    const Comp = renderComponentUsingMount('unique-id-static-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    renderComponent('unique-id-static-mobile')
    expect(screen.queryByRole('button')).toBeTruthy()
  })

  it('has correct states on steps', () => {
    renderComponent('unique-id-static-states')
    const items = document.querySelectorAll('li.dnb-step-indicator__item')

    expect(items.length).toBe(4)
    expect(
      items[0].classList.contains('dnb-step-indicator__item--visited')
    ).toBe(true)
    expect(
      items[1].classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
    expect(items[1].getAttribute('aria-current')).toBe('step')
    expect(screen.queryAllByRole('button')).toHaveLength(0)
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
        <Component.Sidebar sidebar_id="unique-id-strict-aria" />
        <Component
          current_step={1}
          mode="loose"
          sidebar_id="unique-id-strict-aria"
          data={stepIndicatorListData}
        />
      </>
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-step-indicator-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
