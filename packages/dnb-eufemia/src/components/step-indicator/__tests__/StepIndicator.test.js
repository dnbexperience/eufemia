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
import Component from '../StepIndicator'
import MatchMediaMock from 'jest-matchmedia-mock'

const matchMedia = new MatchMediaMock()

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
      </>
    )
  }

  it('have to match snapshot', () => {
    const Comp = renderComponent('unique-id-loose-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 50em)')
    const Comp = renderComponent('unique-id-loose-mobile')
    expect(
      Comp.at(1).exists('button.dnb-step-indicator__trigger__button')
    ).toBe(true)
  })

  it('has correct states on steps', () => {
    matchMedia.useMediaQuery('(min-width: 50em)')
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
    matchMedia.useMediaQuery('(min-width: 50em)')
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
      </>
    )
  }

  it('have to match snapshot', () => {
    const Comp = renderComponent('unique-id-strict-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 50em)')
    const Comp = renderComponent('unique-id-strict-mobile')
    expect(
      Comp.at(1).exists('button.dnb-step-indicator__trigger__button')
    ).toBe(true)
  })

  it('has correct states on steps', () => {
    matchMedia.useMediaQuery('(min-width: 50em)')
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
    matchMedia.useMediaQuery('(min-width: 50em)')
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
      </>
    )
  }

  it('have to match snapshot', () => {
    const Comp = renderComponent('unique-id-static-snapshot')
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has trigger button when mobile', () => {
    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 50em)')
    const Comp = renderComponent('unique-id-static-mobile')
    expect(
      Comp.at(1).exists('button.dnb-step-indicator__trigger__button')
    ).toBe(true)
  })

  it('has correct states on steps', () => {
    matchMedia.useMediaQuery('(min-width: 50em)')
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
