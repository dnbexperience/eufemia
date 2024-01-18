/**
 * ProgressIndicator Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { render, screen } from '@testing-library/react'
import ProgressIndicator, {
  ProgressIndicatorProps,
} from '../ProgressIndicator'
import { format } from '../../number-format/NumberUtils'

const props: ProgressIndicatorProps = {}

describe('Circular ProgressIndicator component', () => {
  const mainLineSelector =
    'svg.dnb-progress-indicator__circular__line.dark[style]'

  it('has to have a stroke-dashoffset of 44 on 50%', () => {
    render(<ProgressIndicator {...props} type="circular" progress={50} />)
    expect(
      document.querySelector(mainLineSelector).getAttribute('style')
    ).toBe('stroke-dashoffset: 44;')
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
    ).toBe('stroke-dashoffset: 17.599999999999994;')
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
})

describe('ProgressIndicator ARIA', () => {
  it('should validate with ARIA rules on type circular', async () => {
    const Comp = render(
      <ProgressIndicator {...props} type="circular" progress={50} />
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules on type linear', async () => {
    const Comp = render(
      <ProgressIndicator {...props} type="linear" progress={50} />
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
