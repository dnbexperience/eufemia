import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Breadcrumb, { BreadcrumbItem } from '../Breadcrumb'
import { Provider } from '../../../shared'
import MatchMediaMock from 'jest-matchmedia-mock'
import IconPrimary from '../../icon-primary/IconPrimary'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'

const matchMedia = new MatchMediaMock()

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Breadcrumb', () => {
  it('renders without properties', () => {
    render(<Breadcrumb />)

    expect(screen.queryByRole('button')).not.toBeNull()
  })

  it('renders a breadcrumb with multiple items by data prop', () => {
    render(
      <Breadcrumb
        data={[
          { href: '/', text: 'Home' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
      />
    )

    expect(screen.queryByText('Home')).toBeTruthy()
    expect(screen.queryByText('Page 1')).toBeTruthy()
    expect(screen.queryByText('Page 2')).toBeTruthy()

    expect(screen.queryAllByRole('link')).toHaveLength(2)
  })

  it('renders a breadcrumb with a single item by data prop', () => {
    render(
      <Breadcrumb data={[{ href: '/page1/page2', text: 'Page 2' }]} />
    )

    expect(screen.queryByText('Page 2')).toBeTruthy()
    expect(screen.queryAllByRole('link')).toHaveLength(1)
  })

  it('renders a breadcrumb with multiple items by children', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/" text="Home" />
        <Breadcrumb.Item href="/page1" text="Page 1" />
        <Breadcrumb.Item href="/page1/page2" text="Page 2" />
      </Breadcrumb>
    )

    expect(screen.queryByText('Home')).toBeTruthy()
    expect(screen.queryByText('Page 1')).toBeTruthy()
    expect(screen.queryByText('Page 2')).toBeTruthy()

    expect(screen.queryAllByRole('link')).toHaveLength(3)
  })

  it('renders a breadcrumb with a single item by children', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item text="Page item #1" href="/page1" />
      </Breadcrumb>
    )

    expect(screen.queryByText('Page item #1')).toBeTruthy()
    expect(screen.queryAllByRole('link')).toHaveLength(1)
  })

  it('should handle a breadcrumb with a single null as children', () => {
    render(<Breadcrumb>{null}</Breadcrumb>)

    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })

  it('should handle children as null', () => {
    render(
      <Breadcrumb>
        {null}
        <Breadcrumb.Item text="Page item #1" href="/page1" />
        {null}
        {null}
        <Breadcrumb.Item text="Page item #2" href="/page2" />
        {null}
        {null}
        {null}
        <Breadcrumb.Item text="Page item #3" href="/page3" />
        {null}
        {null}
        <Breadcrumb.Item text="Page item #4" href="/page4" />
      </Breadcrumb>
    )

    expect(screen.queryByText('Page item #1')).toBeTruthy()
    expect(screen.queryByText('Page item #2')).toBeTruthy()
    expect(screen.queryByText('Page item #3')).toBeTruthy()
    expect(screen.queryByText('Page item #4')).toBeTruthy()

    expect(screen.queryAllByRole('link')).toHaveLength(4)
  })

  it('renders a breadcrumb with one item', () => {
    render(
      <Provider locale="en-GB">
        <Breadcrumb href="/url" />
      </Provider>
    )

    expect(screen.queryAllByRole('link')).toHaveLength(1)

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

    expect(document.querySelector('.dnb-breadcrumb__animation')).toBeNull()

    fireEvent.click(screen.getByRole('button'))

    expect(document.querySelector('.dnb-breadcrumb__animation')).toBeNull()
  })

  it('will handle last item as current', () => {
    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Last Item' },
        ]}
      />
    )

    const lastElem = screen.getByText('Last Item')
    expect(
      lastElem.parentElement.parentElement.getAttribute('aria-current')
    ).toBe('page')
  })

  it('current item will have aria-current="page', () => {
    render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Current Item', variant: 'current' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
      />
    )

    const currentItem = screen.getByText('Current Item')

    expect(
      currentItem.parentElement.parentElement.getAttribute('aria-current')
    ).toBe('page')
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

    expect(
      document.querySelector('.dnb-breadcrumb__animation')
    ).toBeDefined()
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

    const element = document.querySelector('.dnb-breadcrumb')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['aria-label', 'class'])
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
      const text = 'Just text'
      render(<BreadcrumbItem text={text} />)

      expect(screen.queryByRole('link')).toBeNull()
      expect(screen.queryByRole('button')).toBeNull()
      expect(screen.queryByText(text)).toBeTruthy()
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

    describe('will set animation style', () => {
      render(
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

      const items = document.querySelectorAll('.dnb-breadcrumb__item')

      it.each([0, 1, 2])('--delay=%s', (item) => {
        expect(items[item].getAttribute('style')).toBe(`--delay: ${item};`)
      })
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
