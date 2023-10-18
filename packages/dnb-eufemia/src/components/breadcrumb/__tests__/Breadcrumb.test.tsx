import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Breadcrumb, { BreadcrumbItem, BreadcrumbProps } from '../Breadcrumb'
import { Provider } from '../../../shared'
import IconPrimary from '../../icon-primary/IconPrimary'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { BreadcrumbItemProps } from '../BreadcrumbItem'
import { AnchorAllProps } from '../../Anchor'

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Breadcrumb', () => {
  it('renders without properties', () => {
    const props: BreadcrumbProps = {}
    render(<Breadcrumb {...props} />)

    expect(screen.queryByRole('button')).toBeInTheDocument()
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

    expect(screen.queryByText('Home')).toBeInTheDocument()
    expect(screen.queryByText('Page 1')).toBeInTheDocument()
    expect(screen.queryByText('Page 2')).toBeInTheDocument()

    expect(screen.queryAllByRole('link')).toHaveLength(2)
  })

  it('renders a breadcrumb with a single item by data prop', () => {
    render(
      <Breadcrumb data={[{ href: '/page1/page2', text: 'Page 2' }]} />
    )

    expect(screen.queryByText('Page 2')).toBeInTheDocument()
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

    expect(screen.queryByText('Home')).toBeInTheDocument()
    expect(screen.queryByText('Page 1')).toBeInTheDocument()
    expect(screen.queryByText('Page 2')).toBeInTheDocument()

    expect(screen.queryAllByRole('link')).toHaveLength(3)
  })

  it('renders a breadcrumb with a single item by children', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item text="Page item #1" href="/page1" />
      </Breadcrumb>
    )

    expect(screen.queryByText('Page item #1')).toBeInTheDocument()
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

    expect(screen.queryByText('Page item #1')).toBeInTheDocument()
    expect(screen.queryByText('Page item #2')).toBeInTheDocument()
    expect(screen.queryByText('Page item #3')).toBeInTheDocument()
    expect(screen.queryByText('Page item #4')).toBeInTheDocument()

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

    expect(
      document.querySelector('.dnb-breadcrumb__multible')
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    expect(
      document.querySelector('.dnb-breadcrumb__multible')
    ).not.toBeInTheDocument()
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
      document.querySelector('.dnb-breadcrumb__multible')
    ).toBeDefined()
  })

  it('inherits skeleton prop from provider', () => {
    render(
      <Provider skeleton>
        <Breadcrumb data={[{ onClick: jest.fn(), text: 'Page 1' }]} />
      </Provider>
    )

    expect(screen.getAllByRole('button')[0].className).toMatch(
      'dnb-skeleton'
    )
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
    it('renders without properties', () => {
      const props: BreadcrumbItemProps = {}
      render(<BreadcrumbItem {...props} />)

      expect(screen.queryByRole('listitem')).toBeInTheDocument()
    })

    it('renders breadcrumbitem as a link', () => {
      render(<BreadcrumbItem href="/url" text="Page" />)

      expect(screen.queryByRole('link')).toBeDefined()
      expect(screen.queryByRole('link').getAttribute('href')).toBe('/url')
    })

    it('renders breadcrumbitem as a button', () => {
      render(<BreadcrumbItem onClick={jest.fn()} text="Page" />)

      expect(screen.queryByRole('button')).toBeDefined()
    })

    it('will use given element', () => {
      const CustomElement = React.forwardRef(
        (props: AnchorAllProps, ref) => {
          return (
            <span
              {...props}
              ref={ref as React.RefObject<HTMLAnchorElement>}
              className="custom-element"
            />
          )
        }
      )

      render(
        <BreadcrumbItem element={CustomElement} text="Page" href="/" />
      )

      expect(
        document.querySelector('span.custom-element')
      ).toBeInTheDocument()
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

      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(screen.queryByText(text)).toBeInTheDocument()
    })

    it('will render custom icon', () => {
      const CustomIcon = <IconPrimary icon="bell" />
      render(<BreadcrumbItem text="Just text" icon={CustomIcon} />)

      const element = screen.queryByTestId('bell icon')
      expect(element).toBeInTheDocument()
    })

    it('renders a skeleton if skeleton is true', () => {
      render(
        <BreadcrumbItem skeleton onClick={jest.fn()} text="skeleton" />
      )

      expect(screen.getByRole('button').className).toMatch('dnb-skeleton')
    })

    it('inherits skeleton prop from provider', () => {
      render(
        <Provider skeleton>
          <BreadcrumbItem onClick={jest.fn()} text="skeleton" />
        </Provider>
      )

      expect(screen.getByRole('button').className).toMatch('dnb-skeleton')
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
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
