/**
 * ProgressIndicator Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { render, screen } from '@testing-library/react'
import ProgressIndicator from '../ProgressIndicator'
import { ProgressIndicatorAllProps } from '../types'
import { format } from '../../number-format/NumberUtils'

const props: ProgressIndicatorAllProps = {}

describe('Circular ProgressIndicator component', () => {
  const mainLineSelector =
    'svg.dnb-progress-indicator__circular__line.dark[style]'

  it('has to have a stroke-dashoffset of 44 on 50%', () => {
    render(<ProgressIndicator {...props} type="circular" progress={50} />)
    expect(
      document.querySelector(mainLineSelector).getAttribute('style')
    ).toBe(`stroke-dashoffset: ${Math.PI * 50}%;`)
  })

  it('has to have a aria-label with a 50% value', () => {
    render(<ProgressIndicator {...props} type="circular" progress={50} />)
    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('aria-label')).toBe(
      format(50, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has role of alert or progressbar depending if progress has a value', () => {
    const { rerender } = render(
      <ProgressIndicator {...props} type="circular" progress={undefined} />
    )
    expect(screen.queryByRole('alert')).toBeInTheDocument()

    rerender(
      <ProgressIndicator {...props} type="circular" progress={80} />
    )
    expect(screen.queryByRole('progressbar')).toBeInTheDocument()
  })

  it('has to react to a progress value of 80%', () => {
    render(<ProgressIndicator {...props} type="circular" progress={80} />)
    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('aria-label')).toBe(
      format(80, {
        decimals: 2,
        percent: true,
      })
    )
    expect(
      document.querySelector(mainLineSelector).getAttribute('style')
    ).toBe(`stroke-dashoffset: ${Math.PI * 20}%;`)
  })

  it('has aria-label set to the value of progress property when title is default', () => {
    render(<ProgressIndicator {...props} type="circular" progress={1} />)

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('aria-label')).toBe(
      format(1, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has title set to the value of progress property when title is default', () => {
    render(<ProgressIndicator {...props} type="circular" progress={1} />)

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('title')).toBe(
      format(1, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('does not have aria-label when progress, and title is both null', () => {
    render(
      <ProgressIndicator
        {...props}
        type="circular"
        progress={null}
        title={null}
      />
    )

    const indicator = screen.getByRole('alert')
    expect(indicator.getAttribute('aria-label')).not.toBeInTheDocument()
  })

  it('does not have title when progress, and title is both null', () => {
    render(
      <ProgressIndicator
        {...props}
        type="circular"
        progress={null}
        title={null}
      />
    )

    const indicator = screen.getByRole('alert')
    expect(indicator.getAttribute('title')).not.toBeInTheDocument()
  })

  it('has aria-label set to the value of title property', () => {
    const title = 'loading'
    render(
      <ProgressIndicator
        {...props}
        type="circular"
        progress={1}
        title={title}
      />
    )

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('aria-label')).toBe(title)
  })

  it('has title set to the value of title property', () => {
    const title = 'loading'
    render(
      <ProgressIndicator
        {...props}
        type="circular"
        progress={1}
        title={title}
      />
    )

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('title')).toBe(title)
  })

  it('should support spacing props', () => {
    render(
      <ProgressIndicator type="circular" progress={1} top="2rem" hidden />
    )

    const indicator = document.querySelector('.dnb-progress-indicator')
    expect(Array.from(indicator.classList)).toEqual([
      'dnb-progress-indicator',
      'dnb-space__top--large',
      'dnb-progress-indicator--visible',
      'dnb-progress-indicator--horizontal',
      'dnb-progress-indicator--default',
    ])
  })

  it('should support inline styling', () => {
    render(<ProgressIndicator type="circular" style={{ color: 'red' }} />)

    expect(
      document
        .querySelector('.dnb-progress-indicator')
        .getAttribute('style')
    ).toBe('color: red;')
  })

  it('should support custom attributes', () => {
    render(
      <ProgressIndicator type="circular" progress={1} top="2rem" hidden />
    )

    const indicator = document.querySelector('.dnb-progress-indicator')
    const attributes = Array.from(indicator.attributes).map(
      (attr) => attr.name
    )
    expect(attributes).toEqual(['class', 'hidden'])
  })

  it('should use span elements', () => {
    const { container } = render(
      <ProgressIndicator type="circular" progress={1} showDefaultLabel />
    )

    expect(container.querySelectorAll('div')).toHaveLength(0)
    expect(container.querySelectorAll('span')).toHaveLength(5)
  })

  it('should use span for label element', () => {
    // Because it does not have any advantages over a label element (VoiceOver does not read it as a label)

    const { container } = render(
      <ProgressIndicator type="circular" progress={1} showDefaultLabel />
    )

    expect(
      container.querySelector('.dnb-progress-indicator__label').tagName
    ).toBe('SPAN')
  })

  it('with custom colors', () => {
    const { container } = render(
      <ProgressIndicator
        type="circular"
        customColors={{ line: 'red', shaft: 'green', background: 'blue' }}
      />
    )

    expect(
      container
        .querySelector('.dnb-progress-indicator__circular__background')
        .getAttribute('style')
    ).toBe('background-color: blue;')

    expect(
      container
        .querySelectorAll('.dnb-progress-indicator__circular__circle')[0]
        .getAttribute('style')
    ).toBe('stroke: green;')
    expect(
      container
        .querySelectorAll('.dnb-progress-indicator__circular__circle')[1]
        .getAttribute('style')
    ).toBe('stroke: red;')
    expect(
      container
        .querySelectorAll('.dnb-progress-indicator__circular__circle')[2]
        .getAttribute('style')
    ).toBe('stroke: green;')
  })

  it('with custom size', () => {
    const { container } = render(
      <ProgressIndicator type="circular" size="4.53rem" />
    )

    expect(
      container
        .querySelector('.dnb-progress-indicator')
        .getAttribute('style')
    ).toContain('--progress-indicator-circular-size: 4.53rem;')
    expect(
      container.querySelector('.dnb-progress-indicator__circular')
    ).toHaveClass('dnb-progress-indicator__circular--custom-size')
  })

  it('with custom line width', () => {
    const { container } = render(
      <ProgressIndicator type="circular" customCircleWidth="1.23rem" />
    )

    expect(
      container
        .querySelector('.dnb-progress-indicator')
        .getAttribute('style')
    ).toContain('--progress-indicator-circular-stroke-width: 1.23rem;')

    const circles = container.querySelectorAll(
      'circle.dnb-progress-indicator__circle'
    )
    circles.forEach((circle) =>
      expect(circle.getAttribute('style')).not.toContain(
        '--progress-indicator-circular-stroke-width'
      )
    )
  })

  it('with custom line width in percentage', () => {
    const { container } = render(
      <ProgressIndicator type="circular" customCircleWidth="20%" />
    )

    expect(
      container
        .querySelector('.dnb-progress-indicator')
        .getAttribute('style')
    ).toContain('--progress-indicator-circular-stroke-width: 20%;')

    const circles = container.querySelectorAll(
      'circle.dnb-progress-indicator__circle'
    )
    circles.forEach((circle) =>
      expect(circle.getAttribute('style')).toContain(
        '--progress-indicator-circular-stroke-width: 25%;'
      )
    )
  })
})

describe('Linear ProgressIndicator component', () => {
  const mainLineSelector = '.dnb-progress-indicator__linear__bar'

  it('has to have a transform of translateX(-50%) on 50%', () => {
    render(<ProgressIndicator {...props} type="linear" progress={50} />)
    expect(
      document.querySelector(mainLineSelector).getAttribute('style')
    ).toBe('transform: translateX(-50%);')
  })

  it('has to have a aria-label with a 50% value', () => {
    render(<ProgressIndicator {...props} type="linear" progress={50} />)
    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('aria-label')).toBe(
      format(50, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has to have a title with a 50% value', () => {
    render(<ProgressIndicator {...props} type="linear" progress={50} />)

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('title')).toBe(
      format(50, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has role of alert or progressbar depending if progress has a value', () => {
    const { rerender } = render(
      <ProgressIndicator {...props} type="linear" progress={undefined} />
    )
    expect(screen.queryByRole('alert')).toBeInTheDocument()

    rerender(<ProgressIndicator {...props} type="linear" progress={80} />)
    expect(screen.queryByRole('progressbar')).toBeInTheDocument()
  })

  it('has to react to a progress value of 80%', () => {
    render(<ProgressIndicator {...props} type="linear" progress={80} />)
    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('aria-label')).toBe(
      format(80, {
        decimals: 2,
        percent: true,
      })
    )
    expect(
      document.querySelector(mainLineSelector).getAttribute('style')
    ).toBe('transform: translateX(-20%);')
  })

  it('has aria-label set to the value of progress property when title is default', () => {
    render(<ProgressIndicator {...props} type="linear" progress={1} />)

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('aria-label')).toBe(
      format(1, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('has title set to the value of progress property when title is default', () => {
    render(<ProgressIndicator {...props} type="linear" progress={1} />)

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('title')).toBe(
      format(1, {
        decimals: 2,
        percent: true,
      })
    )
  })

  it('does not have aria-label when progress, and title is both null', () => {
    render(
      <ProgressIndicator
        {...props}
        type="linear"
        progress={null}
        title={null}
      />
    )

    const indicator = screen.getByRole('alert')
    expect(indicator.getAttribute('aria-label')).not.toBeInTheDocument()
  })

  it('does not have title when progress, and title is both null', () => {
    render(
      <ProgressIndicator
        {...props}
        type="linear"
        progress={null}
        title={null}
      />
    )

    const indicator = screen.getByRole('alert')
    expect(indicator.getAttribute('title')).not.toBeInTheDocument()
  })

  it('has aria-label set to the value of title property', () => {
    const title = 'loading'
    render(
      <ProgressIndicator
        {...props}
        type="linear"
        progress={1}
        title={title}
      />
    )

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('aria-label')).toBe(title)
  })

  it('has title set to the value of title property', () => {
    const title = 'loading'
    render(
      <ProgressIndicator
        {...props}
        type="linear"
        progress={1}
        title={title}
      />
    )

    const indicator = screen.getByRole('progressbar')
    expect(indicator.getAttribute('title')).toBe(title)
  })

  it('should support spacing props', () => {
    render(
      <ProgressIndicator type="linear" progress={1} top="2rem" hidden />
    )

    const indicator = document.querySelector('.dnb-progress-indicator')
    expect(Array.from(indicator.classList)).toEqual([
      'dnb-progress-indicator',
      'dnb-space__top--large',
      'dnb-progress-indicator--visible',
      'dnb-progress-indicator--horizontal',
      'dnb-progress-indicator--default',
      'dnb-progress-indicator--full-width',
    ])
  })

  it('should support inline styling', () => {
    render(<ProgressIndicator type="linear" style={{ color: 'red' }} />)

    expect(
      document
        .querySelector('.dnb-progress-indicator')
        .getAttribute('style')
    ).toBe('color: red;')
  })

  it('should support custom attributes', () => {
    render(
      <ProgressIndicator type="linear" progress={1} top="2rem" hidden />
    )

    const indicator = document.querySelector('.dnb-progress-indicator')
    const attributes = Array.from(indicator.attributes).map(
      (attr) => attr.name
    )
    expect(attributes).toEqual(['class', 'hidden'])
  })

  it('should use span elements', () => {
    const { container } = render(
      <ProgressIndicator type="linear" progress={1} showDefaultLabel />
    )

    expect(container.querySelectorAll('div')).toHaveLength(0)
    expect(container.querySelectorAll('span')).toHaveLength(4)
  })

  it('should use span for label element', () => {
    // Because it does not have any advantages over a label element (VoiceOver does not read it as a label)

    const { container } = render(
      <ProgressIndicator type="linear" progress={1} showDefaultLabel />
    )

    expect(
      container.querySelector('.dnb-progress-indicator__label').tagName
    ).toBe('SPAN')
  })

  it('with custom colors', () => {
    const { container } = render(
      <ProgressIndicator
        type="linear"
        customColors={{ line: 'red', shaft: 'green' }}
      />
    )

    expect(
      container
        .querySelector('.dnb-progress-indicator__linear')
        .getAttribute('style')
    ).toBe('background-color: green;')
    expect(
      container
        .querySelectorAll('.dnb-progress-indicator__linear__bar')[0]
        .getAttribute('style')
    ).toBe('background-color: red;')
    expect(
      container
        .querySelectorAll('.dnb-progress-indicator__linear__bar')[1]
        .getAttribute('style')
    ).toBe('background-color: red;')
  })

  it('with custom size', () => {
    const { container } = render(
      <ProgressIndicator type="linear" size="4.53rem" />
    )

    expect(
      container
        .querySelector('.dnb-progress-indicator')
        .getAttribute('style')
    ).toContain('--progress-indicator-linear-size: 4.53rem;')
    expect(
      container.querySelector('.dnb-progress-indicator__linear')
    ).toHaveClass('dnb-progress-indicator__linear--custom-size')
  })
})

describe('ProgressIndicator ARIA', () => {
  it('should validate with ARIA rules on type circular', async () => {
    const Comp = render(
      <ProgressIndicator
        {...props}
        type="circular"
        progress={50}
        showDefaultLabel
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules on type linear', async () => {
    const Comp = render(
      <ProgressIndicator
        {...props}
        type="linear"
        progress={50}
        showDefaultLabel
      />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('ProgressIndicator scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve(
        '../style/themes/dnb-progress-indicator-theme-ui.scss'
      )
    )
    expect(css).toMatchSnapshot()
  })
})
