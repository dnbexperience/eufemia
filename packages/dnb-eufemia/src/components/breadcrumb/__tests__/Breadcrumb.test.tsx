import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Breadcrumb, { BreadcrumbItem } from '../Breadcrumb'
import { Provider } from '../../../shared'
import MatchMediaMock from 'jest-matchmedia-mock'

const matchMedia = new MatchMediaMock()

describe('Breadcrumb', () => {
  it('renders a breadcrumb', () => {
    const { queryByTestId } = render(<Breadcrumb />)

    expect(queryByTestId('breadcrumb')).not.toBeNull()
  })

  it('renders a breadcrumb with multiple items by data prop', () => {
    const { queryAllByTestId } = render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
      />
    )

    expect(queryAllByTestId('breadcrumb-item')).toHaveLength(3)
  })

  it('renders a breadcrumb with multiple items by children', () => {
    const { queryAllByTestId } = render(
      <Breadcrumb>
        <Breadcrumb.Item text="Home" />
        <Breadcrumb.Item text="Page item" />
        <Breadcrumb.Item text="Page item" />
      </Breadcrumb>
    )

    expect(queryAllByTestId('breadcrumb-item')).toHaveLength(3)
  })

  it('renders a breadcrumb with one item', () => {
    const { queryAllByTestId, getByTestId } = render(
      <Provider locale="en-GB">
        <Breadcrumb href="/" />
      </Provider>
    )

    expect(queryAllByTestId('breadcrumb-item')).toHaveLength(1)

    expect(screen.getByText('Back')).toBeDefined()
  })

  it('overrides collapse value', () => {
    matchMedia.useMediaQuery('(min-width: 50em)')

    const overrideCollapse = true
    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
        variant="collapse"
        isCollapsed={overrideCollapse}
        onClick={jest.fn()}
      />
    )

    fireEvent.click(screen.getByRole('button'))

    expect(screen.queryByTestId('breadcrumb-collapse')).toBeNull()
  })

  it('variant collapse opens the collapsed content on click', () => {
    matchMedia.useMediaQuery('(min-width: 0) and (max-width: 50em)')

    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
        variant="collapse"
      />
    )

    fireEvent.click(screen.getByRole('button'))

    expect(screen.queryByTestId('breadcrumb-collapse')).toBeDefined()
  })

  describe('BreadcrumbItem', () => {
    it('renders breadcrumbitem as a link', () => {
      render(<BreadcrumbItem href="/" text="Page" />)

      expect(screen.queryByRole('link')).toBeDefined()
    })

    it('renders breadcrumbitem as a button', () => {
      render(<BreadcrumbItem onClick={jest.fn()} text="Page" />)

      expect(screen.queryByRole('button')).toBeDefined()
    })

    it('renders breadcrumbitem as text, not button or link', () => {
      render(<BreadcrumbItem text="Just text" />)

      expect(screen.queryByRole('link')).toBeNull()
      expect(screen.queryByRole('button')).toBeNull()
    })
  })
})
