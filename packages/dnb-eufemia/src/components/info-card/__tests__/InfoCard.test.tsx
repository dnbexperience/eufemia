import React from 'react'
import { render, screen, within } from '@testing-library/react'
import InfoCard from '../InfoCard'
import { confetti as Confetti } from '../../../icons'

describe('InfoCard', () => {
  it('renders with no props', () => {
    render(<InfoCard />)

    expect(screen.queryByTestId('info-card')).not.toBeNull()
  })

  it('renders the title', () => {
    const title = 'my title'

    render(<InfoCard title={title} />)

    expect(screen.queryByTestId('info-card-title')).not.toBeNull()
    expect(screen.queryByTestId('info-card-title').textContent).toMatch(
      title
    )
  })

  it('renders the children', () => {
    const children = 'my child'

    render(<InfoCard>{children}</InfoCard>)

    expect(screen.queryByText(children)).not.toBeNull()
  })

  it('renders the children', () => {
    const children = 'my child'

    render(<InfoCard>{children}</InfoCard>)

    expect(screen.queryByText(children)).not.toBeNull()
  })
  it('renders the text', () => {
    const children = 'my child'
    const text = 'my-text'

    render(<InfoCard text={text}>{children}</InfoCard>)

    expect(screen.queryByText(children)).toBeNull()
    expect(screen.queryByTestId('info-card-text')).not.toBeNull()
    expect(screen.queryByTestId('info-card-text').textContent).toMatch(
      text
    )
  })

  it('renders the icon', () => {
    const icon = <Confetti data-testid="custom-icon" />

    render(<InfoCard icon={icon} />)

    const iconContainer = screen.queryByTestId('info-card-icon')

    expect(iconContainer).not.toBeNull()
    expect(
      within(iconContainer).queryByTestId('custom-icon')
    ).not.toBeNull()
  })

  it('renders the image', () => {
    const img_src = '/android-chrome-192x192.png'

    render(<InfoCard src={img_src} />)

    expect(screen.queryByRole('img').getAttribute('src')).toBe(img_src)
  })

  it('renders imgProps', () => {
    const img_src = '/android-chrome-192x192.png'
    const img_width = '16'
    const img_height = '16'
    const img_alt = 'custom_alt_label'
    const imgProps = {
      width: img_width,
      height: img_height,
      src: img_src,
      alt: img_alt,
    }

    render(<InfoCard imgProps={imgProps} />)

    const infoCard = screen.queryByTestId('info-card')
    const image = within(infoCard).queryByRole('img')

    expect(image.getAttribute('src')).toBe(img_src)
    expect(image.getAttribute('alt')).toBe(img_alt)
    expect(image.getAttribute('width')).toBe(img_width)
    expect(image.getAttribute('height')).toBe(img_height)
  })
})
