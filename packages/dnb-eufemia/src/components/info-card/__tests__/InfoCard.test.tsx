import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import InfoCard, { InfoCardAllProps } from '../InfoCard'
import { confetti as Confetti } from '../../../icons'

import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('InfoCard', () => {
  it('renders with no props', () => {
    const props: InfoCardAllProps = { text: 'text' }
    render(<InfoCard {...props} />)

    expect(
      document.querySelector('.dnb-info-card__text')
    ).toBeInTheDocument()
  })

  it('renders the title as string', () => {
    const title = 'my title'

    render(<InfoCard text="text" title={title} />)

    expect(
      document.querySelector('.dnb-info-card__title')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-info-card__title').textContent
    ).toMatch(title)
  })

  it('should support inline styling', () => {
    render(<InfoCard text="text" style={{ color: 'red' }} />)

    expect(
      document.querySelector('.dnb-info-card').getAttribute('style')
    ).toBe('color: red;')
  })

  it('renders the title as react node', () => {
    const title = <span data-testid="react-node">ReactNode</span>

    render(<InfoCard text="text" title={title} />)

    expect(
      document.querySelector('.dnb-info-card__title')
    ).toBeInTheDocument()
    expect(
      within(
        document.querySelector('.dnb-info-card__title')
      ).queryByTestId('react-node')
    ).toBeInTheDocument()
  })

  it('renders the text as string', () => {
    const text = 'my-text'

    render(<InfoCard text={text} />)

    expect(
      document.querySelector('.dnb-info-card__text')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-info-card__text').textContent
    ).toMatch(text)
  })

  it('renders the text as react node', () => {
    const text = <span data-testid="react-node">ReactNode</span>

    render(<InfoCard text={text} />)

    expect(
      document.querySelector('.dnb-info-card__text')
    ).toBeInTheDocument()
    expect(
      within(document.querySelector('.dnb-info-card__text')).queryByTestId(
        'react-node'
      )
    ).toBeInTheDocument()
  })

  it('renders the icon', () => {
    const icon = <Confetti data-testid="custom-icon" />

    render(<InfoCard text="text" icon={icon} />)

    expect(screen.queryByTestId('custom-icon')).toBeInTheDocument()
  })

  it('renders the image', () => {
    const img_src = '/dnb/android-chrome-192x192.png'

    render(
      <InfoCard text="text" imgProps={{ alt: 'alt-text', src: img_src }} />
    )

    expect(screen.queryByRole('img').getAttribute('src')).toBe(img_src)
  })

  it('renders imgProps', () => {
    const img_src = '/dnb/android-chrome-192x192.png'
    const img_width = '16'
    const img_height = '16'
    const img_alt = 'custom_alt_label'
    const imgProps = {
      width: img_width,
      height: img_height,
      src: img_src,
      alt: img_alt,
    }

    render(<InfoCard text="text" imgProps={imgProps} />)

    const infoCard = document.querySelector(
      '.dnb-info-card'
    ) as HTMLElement
    const image = within(infoCard).queryByRole('img')

    expect(image.getAttribute('src')).toBe(img_src)
    expect(image.getAttribute('alt')).toBe(img_alt)
    expect(image.getAttribute('width')).toBe(img_width)
    expect(image.getAttribute('height')).toBe(img_height)
  })

  it('does not render the buttons', () => {
    render(<InfoCard text="text" />)

    expect(
      document.querySelector('.dnb-info-card__buttons__accept-button')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-info-card__buttons__close-button')
    ).not.toBeInTheDocument()
  })

  it('renders the accept button when on_accept is provided', () => {
    const onAccept = jest.fn()
    render(<InfoCard text="text" onAccept={onAccept} />)

    const buttonElement = document.querySelector(
      '.dnb-info-card__buttons__accept-button'
    )

    expect(buttonElement).toBeInTheDocument()

    fireEvent.click(buttonElement)

    expect(onAccept).toHaveBeenCalled()
  })

  it('renders the accept button text as string', () => {
    const acceptButtonText = 'some text'
    render(<InfoCard text="text" acceptButtonText={acceptButtonText} />)

    const buttonElement = document.querySelector(
      '.dnb-info-card__buttons__accept-button'
    )

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement.textContent).toMatch(acceptButtonText)
  })

  it('renders the accept button text as react node', () => {
    const acceptButtonText = (
      <span data-testid="react-node">ReactNode</span>
    )

    render(<InfoCard text="text" acceptButtonText={acceptButtonText} />)

    expect(
      document.querySelector('.dnb-info-card__buttons__accept-button')
    ).toBeInTheDocument()
    expect(
      within(
        document.querySelector('.dnb-info-card__buttons__accept-button')
      ).queryByTestId('react-node')
    ).toBeInTheDocument()
  })

  it('renders the close button when on_close is provided', () => {
    const onClose = jest.fn()
    render(<InfoCard text="text" onClose={onClose} />)

    const buttonElement = document.querySelector(
      '.dnb-info-card__buttons__close-button'
    )

    expect(buttonElement).toBeInTheDocument()

    fireEvent.click(buttonElement)

    expect(onClose).toHaveBeenCalled()
  })

  it('renders the close button text as string', () => {
    const closeButtonText = 'some text'
    render(<InfoCard text="text" closeButtonText={closeButtonText} />)

    const buttonElement = document.querySelector(
      '.dnb-info-card__buttons__close-button'
    )

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement.textContent).toMatch(closeButtonText)
  })

  it('renders the close button text as react node', () => {
    const closeButtonText = <span data-testid="react-node">ReactNode</span>

    render(<InfoCard text="text" closeButtonText={closeButtonText} />)

    expect(
      document.querySelector('.dnb-info-card__buttons__close-button')
    ).toBeInTheDocument()
    expect(
      within(
        document.querySelector('.dnb-info-card__buttons__close-button')
      ).queryByTestId('react-node')
    ).toBeInTheDocument()
  })

  it('renders the accept button with additional props', () => {
    const href = 'href'

    render(
      <InfoCard
        text="text"
        acceptButtonText="accept"
        acceptButtonAttributes={{ href }}
      />
    )

    const buttonElement = document.querySelector(
      '.dnb-info-card__buttons__accept-button'
    )

    expect(buttonElement.getAttribute('href')).toMatch(href)
  })

  it('renders the close button with additional props', () => {
    const href = 'href'

    render(
      <InfoCard
        text="text"
        closeButtonText="accept"
        closeButtonAttributes={{ href }}
      />
    )

    const buttonElement = document.querySelector(
      '.dnb-info-card__buttons__close-button'
    )

    expect(buttonElement.getAttribute('href')).toMatch(href)
  })

  it('renders skeleton if skeleton is true', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(<InfoCard skeleton text="skeleton" />)

    expect(
      document.querySelector('.dnb-info-card__text').className
    ).toMatch(skeletonClassName)
  })

  it('inherits skeleton prop from provider', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Provider skeleton>
        <InfoCard text="skeleton" />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-info-card__text').className
    ).toMatch(skeletonClassName)
  })

  it('should support spacing props', () => {
    render(<InfoCard text="text" top="2rem" />)

    const element = document.querySelector('.dnb-info-card')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-info-card',
      'dnb-space__top--large',
      'dnb-info-card--shadow',
    ])
  })

  it('renders the drop shadow if dropShadow is true', () => {
    const shadowClassName = 'dnb-info-card--shadow'

    render(<InfoCard dropShadow text="drop-shadow" />)

    expect(document.querySelector('.dnb-info-card').className).toMatch(
      shadowClassName
    )
  })

  it('should not contain heading element', () => {
    render(<InfoCard title="heading" text="text" />)

    const element = document.querySelector('.dnb-info-card')
    expect(element.querySelector('h3')).not.toBeInTheDocument()
  })

  describe('InfoCard aria', () => {
    it('should validate', async () => {
      const Component = render(<InfoCard text="text" />)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })
  })

  describe('InfoCard scss', () => {
    it('has to match style dependencies css', () => {
      const css = loadScss(require.resolve('../style/deps.scss'))
      expect(css).toMatchSnapshot()
    })
  })
})
