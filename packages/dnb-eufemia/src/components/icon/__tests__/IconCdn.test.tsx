import { createRef } from 'react'
import { act, render } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import Icon, { prerenderIcon } from '../Icon'
import IconPrimary from '../../icon-primary/IconPrimary'
import Provider from '../../../shared/Provider'
import Button from '../../button/Button'
import bell from '../../../icons/bell'

const baseUrl = 'https://assets.eufemia.dnb.no/icons/dnb'
const getImage = () =>
  document.querySelector<HTMLElement>('.dnb-icon__cdn')

describe('Icon CDN rendering', () => {
  it('renders a runtime name without an inline SVG or icon catalogue', () => {
    render(<Icon icon="future_icon" />)

    expect(getImage().style.maskImage).toBe(
      `url("${baseUrl}/future_icon.svg")`
    )
    expect(document.querySelector('svg')).not.toBeInTheDocument()
    expect(document.querySelector('.dnb-icon')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
    expect(document.querySelector('.dnb-icon')).not.toHaveAttribute('cdn')
  })

  it('updates the URL when the runtime name changes', () => {
    const { rerender } = render(<Icon icon="bell" />)
    rerender(<Icon icon="arrowRight" />)

    expect(getImage().style.maskImage).toContain('/arrow_right.svg')
  })

  it.each(['medium', '24', 'large', 'x-large', 'xx-large'] as const)(
    'uses the medium asset for size %s',
    (size) => {
      render(<Icon icon="bell" size={size} />)
      expect(getImage().style.maskImage).toContain('/bell_medium.svg')
    }
  )

  it('keeps an explicit medium asset and infers its size', () => {
    render(<Icon icon="bell_medium" />)
    expect(getImage().style.maskImage).toContain('/bell_medium.svg')
    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--medium'
    )
  })

  it('preserves explicit dimensions and color', () => {
    render(
      <Icon icon="bell" size="40" width="60" height="30" color="red" />
    )
    expect(getImage().style.width).toBe('60px')
    expect(getImage().style.height).toBe('30px')
    expect(getImage().style.color).toBe('red')
    expect(getImage().style.maskImage).toContain('/bell_medium.svg')
  })

  it('supports font-relative sizing', () => {
    render(<Icon icon="bell" size="auto" />)
    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--auto'
    )
    expect(getImage().style.width).toBe('100%')
  })

  it.each([
    [
      'https://assets.eufemia.dnb.no/v11.14.1/icons/dnb/',
      'https://assets.eufemia.dnb.no/v11.14.1/icons/dnb/bell.svg',
    ],
    ['/my-icons', '/my-icons/bell.svg'],
  ])('supports a custom directory %s', (iconBaseUrl, expected) => {
    render(
      <Provider iconBaseUrl={iconBaseUrl}>
        <Icon icon="bell" />
      </Provider>
    )
    expect(getImage().style.maskImage).toBe(`url("${expected}")`)
  })

  it.each([
    '../bell',
    'https://example.com/bell',
    'bell?x=1',
    'bell#id',
    'bell.svg',
    'bell"',
    '',
  ])('rejects invalid names: %s', (icon) => {
    render(<Icon icon={icon} />)
    expect(getImage()).not.toBeInTheDocument()
  })

  it.each([
    'javascript:alert(1)',
    '//example.com/icons',
    'https://user:pass@example.com/icons',
    'https://example.com/icons?query=1',
  ])('rejects invalid directories: %s', (iconBaseUrl) => {
    render(
      <Provider iconBaseUrl={iconBaseUrl}>
        <Icon icon="bell" />
      </Provider>
    )
    expect(getImage()).not.toBeInTheDocument()
  })

  it('preserves SVG colors when inheritColor is false', () => {
    render(<Icon icon="bell" inheritColor={false} alt="Notifications" />)
    expect(getImage().style.backgroundImage).toBe(
      `url("${baseUrl}/bell.svg")`
    )
    expect(getImage().style.maskImage).toBe('')
    expect(document.querySelector('.dnb-icon')).toHaveAttribute(
      'aria-label',
      'Notifications'
    )
  })

  it('supports a provider asset directory without affecting imported icons', () => {
    render(
      <Provider iconBaseUrl="/my-icons">
        <Icon icon="bell" />
        <Icon icon={bell} />
      </Provider>
    )
    expect(getImage().style.maskImage).toContain('/my-icons/bell.svg')
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('preserves imported icons with automatic CDN loading', () => {
    render(<Icon icon={bell} />)
    expect(document.querySelector('svg')).toBeInTheDocument()
    expect(getImage()).not.toBeInTheDocument()
  })

  it('preserves data images with automatic CDN loading', () => {
    const dataImage = 'data:image/svg+xml;base64,PHN2Zy8+'
    render(<Icon icon={dataImage} />)
    expect(document.querySelector('img')).toHaveAttribute('src', dataImage)
    expect(getImage()).not.toBeInTheDocument()
  })

  it('preserves refs, spacing and the accessible name in a button', () => {
    const ref = createRef<HTMLSpanElement>()
    const { getByRole } = render(
      <Button
        text="Notifications"
        icon={<Icon icon="bell" ref={ref} right="small" />}
      />
    )
    expect(
      getByRole('button', { name: 'Notifications' })
    ).toBeInTheDocument()
    expect(ref.current).toHaveClass('dnb-icon', 'dnb-space__right--small')
    expect(getImage()).toBeInTheDocument()
  })

  it('renders the resource and dimensions on the server', () => {
    const html = renderToString(
      <Icon icon="bell" size="medium" alt="Notifications" />
    )
    expect(html).toContain(`${baseUrl}/bell_medium.svg`)
    expect(html).toContain('aria-label="Notifications"')
    expect(html).toContain('dnb-icon--medium')
  })

  it('supports CDN rendering in IconPrimary', () => {
    render(<IconPrimary icon="future_icon" size="medium" />)
    expect(getImage().style.maskImage).toContain('/future_icon_medium.svg')
    expect(document.querySelector('svg')).not.toBeInTheDocument()
  })

  it.each(['bell', 'question', 'question_medium'])(
    'keeps bundled primary icon %s inline',
    (icon) => {
      render(<IconPrimary icon={icon} />)
      expect(document.querySelector('svg path')).toBeInTheDocument()
      expect(getImage()).not.toBeInTheDocument()
    }
  )

  it('falls back for a secondary icon in a button', () => {
    const { getByRole } = render(<Button icon="heart" text="Favorite" />)
    expect(getByRole('button', { name: 'Favorite' })).toBeInTheDocument()
    expect(getImage().style.maskImage).toContain('/heart.svg')
  })

  it('switches between a primary icon and a CDN fallback', () => {
    const { rerender } = render(<IconPrimary icon="bell" />)
    rerender(<IconPrimary icon="heart" />)
    expect(document.querySelector('svg')).not.toBeInTheDocument()
    expect(getImage().style.maskImage).toContain('/heart.svg')
    rerender(<IconPrimary icon="bell" />)
    expect(document.querySelector('svg')).toBeInTheDocument()
    expect(getImage()).not.toBeInTheDocument()
  })

  it('disables remote loading without affecting bundled or imported icons', () => {
    render(
      <Provider iconBaseUrl={false}>
        <Icon icon="heart" />
        <IconPrimary icon="heart" />
        <IconPrimary icon="bell" />
        <Icon icon={bell} />
      </Provider>
    )
    expect(document.querySelectorAll('svg')).toHaveLength(2)
    expect(getImage()).not.toBeInTheDocument()
  })

  it('uses the nearest provider configuration', () => {
    render(
      <Provider iconBaseUrl={false}>
        <Provider iconBaseUrl="/my-icons">
          <IconPrimary icon="heart" />
        </Provider>
      </Provider>
    )
    expect(getImage().style.maskImage).toContain('/my-icons/heart.svg')
  })

  it('updates the fallback when the provider configuration changes', () => {
    const { rerender } = render(
      <Provider iconBaseUrl="/first">
        <Button icon="heart" text="Favorite" />
      </Provider>
    )
    expect(getImage().style.maskImage).toContain('/first/heart.svg')
    rerender(
      <Provider iconBaseUrl={false}>
        <Button icon="heart" text="Favorite" />
      </Provider>
    )
    expect(getImage()).not.toBeInTheDocument()
    rerender(
      <Provider iconBaseUrl="/second">
        <Button icon="heart" text="Favorite" />
      </Provider>
    )
    expect(getImage().style.maskImage).toContain('/second/heart.svg')
    expect(document.querySelector('button')).not.toHaveAttribute(
      'iconBaseUrl'
    )
  })

  it('retains legacy nested icon maps', () => {
    expect(
      prerenderIcon({ icon: 'bell', listOfIcons: { dnbIcons: { bell } } })
    ).toBe(bell)
  })

  it('does not resolve inherited object properties as bundled icons', () => {
    render(<IconPrimary icon="constructor" />)
    expect(getImage().style.maskImage).toContain('/constructor.svg')
  })

  it('preserves the default height when only width is given', () => {
    render(<Icon icon="bell" width="60" />)
    expect(getImage().style.width).toBe('60px')
    expect(getImage().style.height).toBe('1em')
  })

  it('infers medium size for normalized names', () => {
    render(<Icon icon="arrowRightMedium" />)
    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--medium'
    )
    expect(getImage().style.maskImage).toContain('/arrow_right_medium.svg')
  })

  it('supports a name passed as children', () => {
    render(<Icon alt="Notifications">bell_medium</Icon>)
    expect(getImage().style.maskImage).toContain('/bell_medium.svg')
    expect(document.querySelector('.dnb-icon')).toHaveClass(
      'dnb-icon--medium'
    )
    expect(document.querySelector('.dnb-icon')).toHaveAttribute(
      'aria-label',
      'Notifications'
    )
  })

  it('switches between CDN and imported icons', () => {
    const { rerender } = render(<Icon icon="bell" />)
    rerender(<Icon icon={bell} />)
    expect(getImage()).not.toBeInTheDocument()
    expect(document.querySelector('svg')).toBeInTheDocument()
    rerender(<Icon icon="heart" />)
    expect(document.querySelector('svg')).not.toBeInTheDocument()
    expect(getImage().style.maskImage).toContain('/heart.svg')
  })

  it('hydrates server markup without replacing it or reporting a mismatch', async () => {
    const element = <Icon icon="bell" alt="Notifications" />
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    const serverIcon = container.firstElementChild
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>

    await act(async () => {
      root = hydrateRoot(container, element, { onRecoverableError })
    })
    expect(container.firstElementChild).toBe(serverIcon)
    expect(onRecoverableError).not.toHaveBeenCalled()
    await act(async () => root.unmount())
  })

  it('keeps an explicit accessible label', () => {
    render(<Icon icon="bell" alt="Bell" aria-label="Notifications" />)
    expect(document.querySelector('.dnb-icon')).toHaveAttribute(
      'aria-label',
      'Notifications'
    )
  })
})
