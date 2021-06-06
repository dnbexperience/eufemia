/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../ProgressIndicator'
import { format } from '../../number-format/NumberUtils'

const props = fakeProps(require.resolve('../ProgressIndicator'), {
  all: true,
  optional: true,
})

describe('Circular ProgressIndicator component', () => {
  const mainLineSelector =
    'svg.dnb-progress-indicator__circular__line.dark[style]'
  const Comp = mount(
    <Component {...props} type="circular" progress={50} />
  )

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has to have a stroke-dashoffset of 44 on 50%', () => {
    expect(
      Comp.find(mainLineSelector).instance().getAttribute('style')
    ).toBe('stroke-dashoffset: 44;')
  })

  it('has to have a aria-label with a 50% value', () => {
    expect(
      Comp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('aria-label')
    ).toBe(
      format(50, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has role of alert or progressbar depending if progress has a value', () => {
    Comp.setProps({
      progress: undefined,
    })
    expect(
      Comp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('role')
    ).toBe('alert')

    Comp.setProps({
      progress: 80,
    })
    expect(
      Comp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('role')
    ).toBe('progressbar')
  })

  it('has to react to a progress value of 80%', () => {
    Comp.setProps({
      progress: 80,
    })
    expect(
      Comp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('aria-label')
    ).toBe(
      format(80, {
        decimals: 2,
        percent: true,
      })
    )
    expect(
      Comp.find(mainLineSelector).instance().getAttribute('style')
    ).toBe('stroke-dashoffset: 17.599999999999994;')
    Comp.setProps({
      progress: 50,
    })
  })

  it('has aria-label set to the value of progress property when title is default', () => {
    const CircularComp = mount(
      <Component {...props} type="circular" progress={1} />
    )
    expect(
      CircularComp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('aria-label')
    ).toBe(
      format(1, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has title set to the value of progress property when title is default', () => {
    const CircularComp = mount(
      <Component {...props} type="circular" progress={1} />
    )
    expect(
      CircularComp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('title')
    ).toBe(
      format(1, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('does not have aria-label when progress, and title is both null', () => {
    const CircularComp = mount(
      <Component {...props} type="circular" progress={null} title={null} />
    )
    expect(
      CircularComp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('aria-label')
    ).toBeNull()
  })

  it('does not have title when progress, and title is both null', () => {
    const CircularComp = mount(
      <Component {...props} type="circular" progress={null} title={null} />
    )
    expect(
      CircularComp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('title')
    ).toBeNull()
  })

  it('has aria-label set to the value of title property', () => {
    const CircularComp = mount(
      <Component {...props} type="circular" progress={1} title="loading" />
    )
    expect(
      CircularComp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('aria-label')
    ).toBe('loading')
  })

  it('has title set to the value of title property', () => {
    const CircularComp = mount(
      <Component {...props} type="circular" progress={1} title="loading" />
    )
    expect(
      CircularComp.find('.dnb-progress-indicator__circular')
        .instance()
        .getAttribute('title')
    ).toBe('loading')
  })

  it('should validate with ARIA rules as a svg element', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Linear ProgressIndicator component', () => {
  const mainLineSelector = '.dnb-progress-indicator__linear__bar'
  const Comp = mount(<Component {...props} type="linear" progress={50} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has to have a transform of translateX(-50%) on 50%', () => {
    expect(
      Comp.find(mainLineSelector).instance().getAttribute('style')
    ).toBe('transform: translateX(-50%);')
  })

  it('has to have a aria-label with a 50% value', () => {
    expect(
      Comp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('aria-label')
    ).toBe(
      format(50, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has to have a title with a 50% value', () => {
    expect(
      Comp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('title')
    ).toBe(
      format(50, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has role of alert or progressbar depending if progress has a value', () => {
    Comp.setProps({
      progress: undefined,
    })
    expect(
      Comp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('role')
    ).toBe('alert')

    Comp.setProps({
      progress: 80,
    })
    expect(
      Comp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('role')
    ).toBe('progressbar')
  })

  it('has to react to a progress value of 80%', () => {
    Comp.setProps({
      progress: 80,
    })
    expect(
      Comp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('aria-label')
    ).toBe(
      format(80, {
        decimals: 2,
        percent: true,
      })
    )
    expect(
      Comp.find(mainLineSelector).instance().getAttribute('style')
    ).toBe('transform: translateX(-20%);')
    Comp.setProps({
      progress: 50,
    })
  })

  it('has aria-label set to the value of progress property when title is default', () => {
    const LinearComp = mount(
      <Component {...props} type="linear" progress={1} />
    )
    expect(
      LinearComp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('aria-label')
    ).toBe(
      format(1, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has title set to the value of progress property when title is default', () => {
    const LinearComp = mount(
      <Component {...props} type="linear" progress={1} d />
    )
    expect(
      LinearComp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('title')
    ).toBe(
      format(1, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('does not have aria-label when progress, and title is both null', () => {
    const LinearComp = mount(
      <Component {...props} type="linear" progress={null} title={null} />
    )
    expect(
      LinearComp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('aria-label')
    ).toBeNull()
  })

  it('does not have title when progress, and title is both null', () => {
    const LinearComp = mount(
      <Component {...props} type="linear" progress={null} title={null} />
    )
    expect(
      LinearComp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('title')
    ).toBeNull()
  })

  it('has aria-label set to the value of title property', () => {
    const LinearComp = mount(
      <Component {...props} type="linear" progress={1} title="loading" />
    )
    expect(
      LinearComp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('aria-label')
    ).toBe('loading')
  })

  it('has title set to the value of title property', () => {
    const LinearComp = mount(
      <Component {...props} type="linear" progress={1} title="loading" />
    )
    expect(
      LinearComp.find('.dnb-progress-indicator__linear')
        .instance()
        .getAttribute('title')
    ).toBe('loading')
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('ProgressIndicator scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-progress-indicator.scss')
    )
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve(
        '../style/themes/dnb-progress-indicator-theme-ui.scss'
      )
    )
    expect(scss).toMatchSnapshot()
  })
})
