/**
 * FormStatus Test
 *
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { axeComponent, loadScss } from '../../../core/test-utils/testSetup'
import { eufemiaCssOptimizer } from '../../../style/vite-plugin'
import type { FormStatusProps } from '../FormStatus'
import FormStatus, {
  ErrorIcon,
  InfoIcon,
  MarketingIcon,
  SuccessIcon,
  WarnIcon,
} from '../FormStatus'
import Input from '../../input/Input'
import Icon from '../../icon/Icon'
import { render, waitFor } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  initializeTestSetup,
  nextAnimationFrame,
  runAnimation,
  simulateAnimationEnd,
} from '../../height-animation/__tests__/HeightAnimationUtils'
import Provider from '../../../shared/Provider'
import GlobalStatus from '../../GlobalStatus'

const props: FormStatusProps = {
  text: 'text',
}

// To be able to test the height animation / cached content
initializeTestSetup()

describe('FormStatus component', () => {
  it('should set correct max-width', () => {
    render(
      <Input
        style={{ width: '10rem' }}
        status="Long status pulvinar per ad varius nostra faucibus enim ante posuere in"
      />
    )

    expect(
      document.querySelector('.dnb-input__input').getAttribute('style')
    ).toBe('width: 10rem;')
    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toContain('max-width: 30rem;')
  })

  it('should have correct icon label', () => {
    render(<Input status="Error message" statusState="error" />)
    expect(
      document.querySelector('[role="presentation"]')
    ).toHaveAttribute('data-testid', 'ErrorIcon icon')
    expect(
      document.querySelector('.dnb-form-status__text')
    ).toHaveTextContent('Error message')
  })

  it('should re-calculate max-width', () => {
    const { rerender } = render(
      <Input style={{ width: '10rem' }} status="status message" />
    )

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('--duration: 600ms; max-width: 30rem;')

    rerender(
      <Input
        status="status message"
        statusProps={{ text: 'change width to 35rem' }}
        style={{ width: '35rem' }}
      />
    )

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('--duration: 600ms; max-width: 35rem;')

    rerender(
      <Input
        status="status message"
        statusProps={{ text: 'change width to 40rem' }}
        style={{ width: '40rem' }}
      />
    )

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('--duration: 600ms; max-width: 40rem;')

    rerender(
      <Input
        status="status message"
        statusProps={{ text: 'change width to 10rem' }}
        style={{ width: '10rem' }}
      />
    )

    window.dispatchEvent(new Event('resize'))

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('--duration: 600ms; max-width: 30rem;')
  })

  it('should set correct id', () => {
    render(<Input id="custom-id" status="status text" />)

    expect(
      document.querySelector('.dnb-form-status').getAttribute('id')
    ).toBe('custom-id-form-status')
    expect(
      document.querySelector('.dnb-form-status__text').getAttribute('id')
    ).toBe('custom-id-status')
  })

  it('should be modifiable with status_prop', () => {
    render(
      <Input
        status="status message"
        statusProps={{
          variant: 'outlined',
        }}
      />
    )
    expect(document.querySelector('.dnb-form-status').classList).toContain(
      'dnb-form-status__variant--outlined'
    )
  })

  it('should update children when they change', () => {
    const { rerender } = render(<FormStatus>content</FormStatus>)

    rerender(<FormStatus>content-a</FormStatus>)

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'content-a'
    )

    rerender(<FormStatus>content-b</FormStatus>)

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'content-b'
    )
  })

  it('should have correct attributes once the "hidden" prop changes', async () => {
    const { rerender } = render(<FormStatus {...props} hidden />)
    expect(
      document.querySelector('.dnb-form-status[hidden]')
    ).toBeInTheDocument()

    rerender(<FormStatus {...props} hidden={false} />)

    expect(
      document.querySelector('.dnb-form-status[hidden]')
    ).not.toBeInTheDocument()
  })

  it('has to have a text value as defined in the prop', () => {
    render(<FormStatus {...props} />)

    expect(
      document.querySelector('.dnb-form-status__text').textContent
    ).toBe(props.text)
  })

  it('should interact with GlobalStatus via Provider props', async () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)

    // Should be rendered as closed
    const { rerender } = render(
      <>
        <GlobalStatus id="my-status" />
        <Provider
          FormStatus={{
            globalStatus: {
              id: 'my-status',
              show: false,
            },
          }}
        >
          <FormStatus />
        </Provider>
      </>
    )

    expect(document.querySelector('.dnb-form-status')).toBeNull()
    expect(document.querySelector('.dnb-global-status__title')).toBeNull()

    // Set a custom class
    rerender(
      <>
        <GlobalStatus id="my-status" />
        <Provider
          FormStatus={{
            className: 'foo',
            globalStatus: {
              id: 'my-status',
              show: false,
            },
          }}
        >
          <FormStatus text="has error" />
        </Provider>
      </>
    )

    expect(document.querySelector('.dnb-form-status')).toHaveClass('foo')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'has error'
    )
    expect(document.querySelector('.dnb-global-status__title')).toBeNull()

    // Show the GlobalStatus and set a custom title
    rerender(
      <>
        <GlobalStatus id="my-status" />
        <Provider
          FormStatus={{
            className: 'bar',
            globalStatus: {
              id: 'my-status',
              show: true,
              title: 'Custom GlobalStatus Title',
            },
          }}
        >
          <FormStatus text="has error" />
        </Provider>
      </>
    )

    expect(document.querySelector('.dnb-form-status')).toHaveClass('bar')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-global-status__title')
      ).toHaveTextContent('Custom GlobalStatus Title')
    })

    expect(
      document.querySelector('.dnb-global-status__message__content')
    ).toHaveTextContent('has error')

    // Close the GlobalStatus
    rerender(
      <>
        <GlobalStatus id="my-status" />
        <Provider
          FormStatus={{
            globalStatus: {
              id: 'my-status',
              show: false,
            },
          }}
        >
          <FormStatus />
        </Provider>
      </>
    )

    await waitFor(() => {
      simulateAnimationEnd()

      expect(
        document.querySelector('.dnb-global-status__title')
      ).toBeNull()
    })

    // Show the GlobalStatus and set a custom title
    rerender(
      <>
        <GlobalStatus id="my-status" />
        <Provider
          FormStatus={{
            className: 'bar',
            globalStatus: {
              id: 'my-status',
              show: true,
              title: 'Custom GlobalStatus Title',
            },
          }}
        >
          <FormStatus>has error given as children</FormStatus>
        </Provider>
      </>
    )

    expect(document.querySelector('.dnb-form-status')).toHaveClass('bar')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-global-status__title')
      ).toHaveTextContent('Custom GlobalStatus Title')
    })

    expect(
      document.querySelector('.dnb-global-status__message__content')
    ).toHaveTextContent('has error given as children')
  })

  it('should support spacing props', () => {
    render(<FormStatus top="2rem">test</FormStatus>)

    const element = document.querySelector('.dnb-form-status')

    expect(element).toHaveClass(
      'dnb-space dnb-height-animation dnb-form-status dnb-form-status__size--default dnb-form-status--error dnb-form-status--has-content dnb-space__top--large dnb-height-animation--is-visible dnb-height-animation--is-in-dom',
      { exact: true }
    )
  })

  it('should support "shellSpace" spacing props', () => {
    const { rerender } = render(
      <FormStatus shellSpace={{ top: '2rem' }}>test</FormStatus>
    )

    const element = document.querySelector('.dnb-form-status__shell')

    expect(element).toHaveClass(
      'dnb-form-status__shell dnb-space__top--large'
    )
    expect(element).not.toHaveAttribute('style')

    rerender(<FormStatus shellSpace="2rem">test</FormStatus>)

    expect(element).toHaveClass(
      'dnb-form-status__shell dnb-space__top--large dnb-space__bottom--large dnb-space__right--large dnb-space__left--large'
    )
    expect(element).not.toHaveAttribute('style')
  })

  it('cache content and update it', () => {
    const { rerender } = render(
      <FormStatus {...props} noAnimation={false} />
    )

    const element = document.querySelector('.dnb-form-status__text')

    expect(element).toHaveTextContent(String(props.text))

    rerender(<FormStatus {...props} noAnimation={false} text="new text" />)

    expect(element).toHaveTextContent('new text')

    rerender(<FormStatus {...props} noAnimation={false} text="" />)

    expect(element).toHaveTextContent('new text')

    runAnimation()

    expect(element).not.toBeInTheDocument()
  })

  it('cache state and update it', () => {
    const { rerender } = render(
      <FormStatus {...props} noAnimation={false} state="information" />
    )

    const element = document.querySelector('.dnb-form-status')

    expect(element).toHaveClass('dnb-form-status--information')

    rerender(<FormStatus {...props} noAnimation={false} state="error" />)

    expect(element).toHaveClass('dnb-form-status--error')

    rerender(
      <FormStatus
        {...props}
        noAnimation={false}
        text=""
        state={undefined}
      />
    )

    expect(element).toHaveClass('dnb-form-status--error')

    nextAnimationFrame()

    expect(element).toHaveClass('dnb-form-status--error')

    nextAnimationFrame()

    expect(element).toHaveClass('dnb-form-status--error')

    simulateAnimationEnd()

    expect(element).not.toBeInTheDocument()
  })
})

describe('FormStatus scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})

describe('FormStatus role', () => {
  it('should have role alert', () => {
    render(<FormStatus text="status text" />)

    expect(
      document.querySelector('.dnb-form-status').getAttribute('role')
    ).toBe('alert')
  })

  it('should have role status when state is information', () => {
    render(<FormStatus text="status text" state="information" />)

    expect(
      document.querySelector('.dnb-form-status').getAttribute('role')
    ).toBe('status')
  })

  it('should be able to override role', () => {
    render(<FormStatus role="none" text="status text" />)

    expect(
      document.querySelector('.dnb-form-status').getAttribute('role')
    ).not.toBe('alert')
    expect(
      document.querySelector('.dnb-form-status').getAttribute('role')
    ).toBe('none')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<FormStatus {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('FormStatus formElement', () => {
  it('should inherit formElement skeleton', () => {
    render(
      <Provider formElement={{ skeleton: true }}>
        <FormStatus text="status text" />
      </Provider>
    )

    const element = document.querySelector('.dnb-form-status')
    expect(element.querySelector('.dnb-skeleton')).toBeInTheDocument()
  })
})

describe('FormStatus icons', () => {
  const allIcons = (
    <>
      <ErrorIcon />
      <WarnIcon />
      <InfoIcon />
      <InfoIcon state="success" />
      <SuccessIcon />
      <MarketingIcon />
    </>
  )

  const getParts = (container: HTMLElement) =>
    Array.from(container.querySelectorAll('svg')).map((svg) =>
      Array.from(svg.querySelectorAll('path, circle'))
    )

  it('should render the success icon for the success state', () => {
    render(<FormStatus text="Saved" state="success" />)

    expect(
      document.querySelector('[role="presentation"]')
    ).toHaveAttribute('data-testid', 'SuccessIcon icon')
  })

  const getStylesheet = () =>
    String(loadScss(require.resolve('../style/dnb-form-status.scss')))

  // The app source does not contain the words "fill" or "stroke", so
  // PurgeCSS removes any rule that depends on them.
  const getOptimizedStylesheet = async () => {
    const root = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'eufemia-form-status-'))
    )

    try {
      fs.mkdirSync(path.join(root, 'src'))
      fs.writeFileSync(
        path.join(root, 'src/App.tsx'),
        `import { Input } from '@dnb/eufemia'
        export const App = () => <Input status="Message" />`
      )

      const plugin = eufemiaCssOptimizer()
      plugin.configResolved({ root, logger: { info: vi.fn() } })

      const result = await plugin.transform(
        getStylesheet(),
        path.join(
          root,
          'node_modules/@dnb/eufemia/style/dnb-ui-components.css'
        )
      )

      return result.code
    } finally {
      fs.rmSync(root, { recursive: true, force: true })
    }
  }

  describe.each([
    ['the stylesheet', getStylesheet],
    [
      'the stylesheet optimized by eufemiaCssOptimizer',
      getOptimizedStylesheet,
    ],
  ])('with %s', (_, getCss) => {
    let style: HTMLStyleElement

    beforeAll(async () => {
      style = document.createElement('style')
      style.textContent = await getCss()
      document.head.appendChild(style)
    })

    afterAll(() => {
      style.remove()
    })

    // [fill, stroke] token of every path and circle, null when not set
    const getColors = (el: Element) => {
      const computed = getComputedStyle(el)
      const token = computed.getPropertyValue('--form-status-icon-color')
      const fromToken = (value: string) =>
        value === 'var(--form-status-icon-color)' ? token : null

      return [fromToken(computed.fill), fromToken(computed.stroke)]
    }

    it('should use theme tokens for the icon colors', () => {
      const { container } = render(allIcons)

      const [error, warning, info, infoSuccess, success, marketing] =
        getParts(container).map((parts) => parts.map(getColors))

      expect(error).toEqual([
        ['var(--token-color-background-error)', null],
        ['var(--token-color-icon-neutral-ondark)', null],
        [null, 'var(--token-color-icon-neutral-ondark)'],
      ])
      expect(warning).toEqual([
        ['var(--token-color-icon-warning)', null],
        ['var(--token-color-icon-neutral-static)', null],
        [null, 'var(--token-color-icon-neutral-static)'],
      ])
      expect(info).toEqual([
        ['var(--token-color-icon-info)', null],
        [
          'var(--token-color-icon-neutral-inverse)',
          'var(--token-color-icon-neutral-inverse)',
        ],
        [null, 'var(--token-color-icon-neutral-inverse)'],
      ])
      expect(infoSuccess[0]).toEqual([
        'var(--token-color-background-positive)',
        null,
      ])
      expect(success).toEqual([
        ['var(--token-color-background-positive)', null],
        [null, 'var(--token-color-icon-neutral-inverse)'],
      ])
      expect(marketing).toEqual([
        ['var(--token-color-icon-marketing)', null],
      ])
    })
  })

  // The FormStatus rules come last here, so only a lower specificity lets the
  // Icon `inheritColor` rules win.
  it('should let Icon inheritColor override the icon colors', () => {
    const style = document.createElement('style')
    style.textContent = [
      '../../icon/style/dnb-icon.scss',
      '../style/dnb-form-status.scss',
    ]
      .map((file) => String(loadScss(require.resolve(file))))
      .join('\n')
    document.head.appendChild(style)

    try {
      render(
        <div style={{ color: 'rgb(1, 2, 3)' }}>
          <Icon icon={<ErrorIcon />} />
          <Icon icon={<ErrorIcon />} inheritColor={false} />
        </div>
      )

      const [inherited, themed] = Array.from(
        document.querySelectorAll('.dnb-form-status-icon-path--error')
      ).map((el) => getComputedStyle(el).fill)

      expect(inherited).toBe('rgb(1, 2, 3)')
      expect(themed).toBe('var(--form-status-icon-color)')
    } finally {
      style.remove()
    }
  })

  // Used when the stylesheet is not loaded. The same as the DNB light tokens.
  it('should have DNB colors as fill and stroke attributes', () => {
    const { container } = render(allIcons)

    const [error, warning, info, infoSuccess, success, marketing] =
      getParts(container).map((parts) =>
        parts.map((el) => [
          el.getAttribute('fill'),
          el.getAttribute('stroke'),
        ])
      )

    expect(error).toEqual([
      ['#d52525', null],
      ['#fff', null],
      [null, '#fff'],
    ])
    expect(warning).toEqual([
      ['#fdbb31', null],
      ['#333', null],
      [null, '#333'],
    ])
    expect(info).toEqual([
      ['#007272', null],
      ['#fff', '#fff'],
      [null, '#fff'],
    ])
    expect(infoSuccess[0]).toEqual(['#007b5e', null])
    expect(success).toEqual([
      ['#007b5e', null],
      [null, '#fff'],
    ])
    expect(marketing).toEqual([['#333', null]])
  })

  // A strict Content Security Policy (style-src without 'unsafe-inline')
  // blocks style attributes in server-rendered HTML. The icons were then
  // invisible, because their paths inherit fill="none" from the svg.
  it('should not use inline styles', () => {
    expect(renderToStaticMarkup(allIcons)).not.toContain('style=')
  })
})
