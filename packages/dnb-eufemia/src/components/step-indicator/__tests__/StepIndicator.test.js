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
import { render } from '@testing-library/react'
import Component from '../StepIndicator'
import Provider from '../../../shared/Provider'
import MatchMediaMock from 'jest-matchmedia-mock'

const matchMedia = new MatchMediaMock()

beforeEach(() => {
  matchMedia.useMediaQuery('(min-width: 50em)')
  document.body.innerHTML = `<div id="root"></div>`
})

function simulateSmallScreen() {
  matchMedia.useMediaQuery('(min-width: 0) and (max-width: 50em)')
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
    const Comp = mount(
      <Provider StepIndicator={{ data: ['one', 'two', 'three'] }}>
        <Component.Sidebar
          sidebar_id="unique-id-initial"
          showInitialData
        />
      </Provider>
    )

    expect(Comp.find('li.dnb-step-indicator__item')).toHaveLength(3)
  })

  it('has to use data prop for initial SSR render', () => {
    const Comp = mount(
      <Component.Sidebar
        sidebar_id="unique-id-initial"
        data={['one', 'two', 'three']}
        showInitialData
      />
    )
    expect(Comp.find('li.dnb-step-indicator__item')).toHaveLength(3)
  })

  it('has to remove data from Sidebar when mounted', () => {
    const Comp = mount(
      <Component.Sidebar
        sidebar_id="unique-id-initial"
        data={['one', 'two', 'three']}
      />
    )
    expect(Comp.exists('li.dnb-step-indicator__item')).toBe(false)
  })

  it('has to show skeleton when no data is given to Sidebar', () => {
    const Comp = mount(
      <Component.Sidebar sidebar_id="unique-id-initial" showInitialData />
    )
    expect(Comp.find('li.dnb-step-indicator__item')).toHaveLength(4)
    expect(
      Comp.find('li.dnb-step-indicator__item')
        .at(0)
        .exists('.dnb-skeleton--show-font')
    ).toBe(true)
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
    render(<Component data={stepIndicatorListData} top="large" />)

    const element = document.querySelector('.dnb-step-indicator')

    expect(Array.from(element.classList)).toEqual([
      'dnb-step-indicator',
      'dnb-space__top--large',
    ])
  })
})

describe('StepIndicator in loose mode', () => {
  const renderComponent = (id, props = null) => {
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

  it('have to match snapshot', () => {
    const Comp = renderComponent('unique-id-loose-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match snapshot on small screen', () => {
    simulateSmallScreen()
    const Comp = renderComponent('unique-id-loose-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    const Comp = renderComponent('unique-id-loose-mobile')
    expect(
      Comp.at(1).exists('button.dnb-step-indicator__trigger__button')
    ).toBe(true)
  })

  it('has to keep the current step on re-render', () => {
    const Comp = renderComponent('unique-id-loose-mobile')
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
    const Comp = renderComponent('unique-id-loose-states')
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
        .at(1)
        .instance()
        .classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
    expect(items.at(1).instance().getAttribute('aria-current')).toBe(
      'step'
    )
    expect(items.at(0).exists('button')).toBe(true)
    expect(items.at(1).exists('button')).toBe(true)
    expect(items.at(2).exists('button')).toBe(true)
    expect(items.at(3).exists('button')).toBe(true)
  })

  it('has correct state after change', () => {
    const on_change = jest.fn()
    const Comp = renderComponent('unique-id-loose-simulate', { on_change })
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
    const Comp = renderComponent('unique-id-sidebar', {
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

    expect(Comp.find('li.dnb-step-indicator__item--current')).toHaveLength(
      1
    )
    expect(
      Comp.find('li.dnb-step-indicator__item')
        .at(2)
        .instance()
        .classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)

    // Make state change
    Comp.find('li.dnb-step-indicator__item')
      .at(0)
      .find('button')
      .simulate('click')

    expect(Comp.find('li.dnb-step-indicator__item--current')).toHaveLength(
      1
    )
    expect(
      Comp.find('li.dnb-step-indicator__item')
        .at(0)
        .instance()
        .classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
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
    const Comp = renderComponent('unique-id-loose-simulate', {
      current_step: null,
    })

    expect(Comp.exists('li.dnb-step-indicator__item--current')).toBe(false)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = renderComponent('unique-id-loose-aria')
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator in strict mode', () => {
  const renderComponent = (id, props = null) => {
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

  it('have to match snapshot', () => {
    const Comp = renderComponent('unique-id-strict-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match snapshot on small screen', () => {
    simulateSmallScreen()
    const Comp = renderComponent('unique-id-strict-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    const Comp = renderComponent('unique-id-strict-mobile')
    expect(
      Comp.at(1).exists('button.dnb-step-indicator__trigger__button')
    ).toBe(true)
  })

  it('has correct states on steps', () => {
    const Comp = renderComponent('unique-id-strict-states')
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
        .at(1)
        .instance()
        .classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
    expect(items.at(1).instance().getAttribute('aria-current')).toBe(
      'step'
    )
    expect(items.at(0).exists('button')).toBe(true)
    expect(items.at(1).exists('button')).toBe(true)
    expect(items.at(2).exists('button')).toBe(false)
    expect(items.at(3).exists('button')).toBe(false)
  })

  it('has correct state after change', () => {
    const on_change = jest.fn()
    const Comp = renderComponent('unique-id-strict-simulate', {
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

  it('should validate with ARIA rules', async () => {
    const Comp = renderComponent('unique-id-strict-aria')
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator in static mode', () => {
  const renderComponent = (id, props = null) => {
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

  it('have to match snapshot', () => {
    const Comp = renderComponent('unique-id-static-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match snapshot on small screen', () => {
    simulateSmallScreen()
    const Comp = renderComponent('unique-id-static-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    simulateSmallScreen()

    const Comp = renderComponent('unique-id-static-mobile')
    expect(
      Comp.at(1).exists('button.dnb-step-indicator__trigger__button')
    ).toBe(true)
  })

  it('has correct states on steps', () => {
    const Comp = renderComponent('unique-id-static-states')
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
        .at(1)
        .instance()
        .classList.contains('dnb-step-indicator__item--current')
    ).toBe(true)
    expect(items.at(1).instance().getAttribute('aria-current')).toBe(
      'step'
    )
    expect(items.at(0).exists('button')).toBe(false)
    expect(items.at(1).exists('button')).toBe(false)
    expect(items.at(2).exists('button')).toBe(false)
    expect(items.at(3).exists('button')).toBe(false)
  })

  it('should validate with ARIA rules', async () => {
    const Comp = renderComponent('unique-id-static-aria')
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('StepIndicator scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-step-indicator.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-step-indicator-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
