import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Breadcrumb, { BreadcrumbItem } from '../Breadcrumb'
import { Provider } from '../../../shared'
import MatchMediaMock from 'jest-matchmedia-mock'
import IconPrimary from '../../icon-primary/IconPrimary'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'

const matchMedia = new MatchMediaMock()

describe('Breadcrumb', () => {
  it('renders without properties', () => {
    render(<Breadcrumb />)

    expect(screen.queryByTestId('breadcrumb-nav')).not.toBeNull()
  })

  it('renders a breadcrumb with multiple items by data prop', () => {
    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
      />
    )

    expect(screen.queryAllByTestId('breadcrumb-item')).toHaveLength(3)
  })

  it('renders a breadcrumb with multiple items by children', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item text="Home" />
        <Breadcrumb.Item text="Page item" />
        <Breadcrumb.Item text="Page item" />
      </Breadcrumb>
    )

    expect(screen.queryAllByTestId('breadcrumb-item')).toHaveLength(3)
  })

  it('renders a breadcrumb with one item', () => {
    render(
      <Provider locale="en-GB">
        <Breadcrumb href="/url" />
      </Provider>
    )

    expect(screen.queryAllByTestId('breadcrumb-item')).toHaveLength(0)
    expect(screen.queryByRole('link').getAttribute('href')).toBe('/url')

    expect(screen.getByText('Back')).toBeDefined()
  })

  it('overrides collapse value', () => {
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

    expect(screen.queryByTestId('breadcrumb-collapse')).toBeNull()

    fireEvent.click(screen.getByRole('button'))

    expect(screen.queryByTestId('breadcrumb-collapse')).toBeNull()
  })

  it('will handle last item as current', () => {
    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
      />
    )

    expect(screen.getAllByTestId('breadcrumb-item')).toHaveLength(3)
    const lastElem = screen.getAllByTestId('breadcrumb-item').slice(-1)[0]
    expect(
      lastElem.querySelector('.dnb-breadcrumb__item__span').textContent
    ).toBe('Page 2')
  })

  it('current item will have aria-current="page', () => {
    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
      />
    )

    const lastElem = screen.getAllByTestId('breadcrumb-item').slice(-1)[0]
    expect(lastElem.getAttribute('aria-current')).toBe('page')
  })

  it('variant collapse opens the collapsed content on click', () => {
    matchMedia.useMediaQuery('(max-width: 50em)')

    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
      />
    )

    fireEvent.click(screen.getByRole('button'))

    expect(screen.queryByTestId('breadcrumb-collapse')).toBeDefined()
  })

  it('inherits skeleton prop from provider', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Provider skeleton>
        <Breadcrumb data={[{ onClick: jest.fn(), text: 'Page 1' }]} />
      </Provider>
    )

    expect(screen.getByRole('button').className).toMatch(skeletonClassName)
  })

  it('should support spacing props', () => {
    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
        top="2rem"
      />
    )

    const element = screen.getByTestId('breadcrumb-nav')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['aria-label', 'class', 'data-testid'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-breadcrumb',
      'dnb-space__top--large',
    ])
  })

  describe('BreadcrumbItem', () => {
    it('renders breadcrumbitem as a link', () => {
      render(<BreadcrumbItem href="/url" text="Page" />)

      expect(screen.queryByRole('link')).toBeDefined()
      expect(screen.queryByRole('link').getAttribute('href')).toBe('/url')
    })

    it('renders breadcrumbitem as a button', () => {
      render(<BreadcrumbItem onClick={jest.fn()} text="Page" />)

      expect(screen.queryByRole('button')).toBeDefined()
    })

    it('fires onClick event', () => {
      const onClick = jest.fn()
      render(<BreadcrumbItem onClick={onClick} text="Page" />)

      fireEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('renders breadcrumbitem as text, not button or link', () => {
      render(<BreadcrumbItem text="Just text" />)

      expect(screen.queryByRole('link')).toBeNull()
      expect(screen.queryByRole('button')).toBeNull()
      expect(
        screen.queryByTestId('breadcrumb-item-text').textContent
      ).toBe('Just text')
    })

    it('will render custom icon', () => {
      const CustomIcon = <IconPrimary icon="bell" />
      render(<BreadcrumbItem text="Just text" icon={CustomIcon} />)

      const element = screen.queryByTestId('bell icon')
      expect(element).not.toBeNull()
    })

    it('renders a skeleton if skeleton is true', () => {
      const skeletonClassName = 'dnb-skeleton'

      render(
        <BreadcrumbItem skeleton onClick={jest.fn()} text="skeleton" />
      )

      expect(screen.getByRole('button').className).toMatch(
        skeletonClassName
      )
    })

    it('inherits skeleton prop from provider', () => {
      const skeletonClassName = 'dnb-skeleton'

      render(
        <Provider skeleton>
          <BreadcrumbItem onClick={jest.fn()} text="skeleton" />
        </Provider>
      )

      expect(screen.getByRole('button').className).toMatch(
        skeletonClassName
      )
    })
  })
})

describe('Breadcrumb aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
        variant="collapse"
        isCollapsed={false}
      />
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Breadcrumb scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-breadcrumb.scss'))
    expect(scss).toMatchSnapshot()
  })
})
