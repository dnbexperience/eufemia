import React from 'react'
import { render, screen } from '@testing-library/react'
import Badge, { BadgeProps } from '../Badge'
import { confetti as Confetti } from '../../../icons'
import Icon from '../../Icon'
import Avatar from '../../Avatar'

import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('Badge', () => {
  it('renders without properties', () => {
    const props: BadgeProps = {}
    render(<Badge {...props} />)

    expect(document.querySelector('.dnb-badge')).toBeInTheDocument()
  })

  it('renders content as text', () => {
    const string = 'A'
    render(<Badge content={string} />)

    expect(screen.queryByText(string)).toBeInTheDocument()
  })

  it('renders content as number', () => {
    const number = 1
    const label = 'Notifications:'
    render(<Badge content={number} label={label} />)

    expect(screen.queryByText(number)).toBeInTheDocument()
    expect(screen.queryByText(label)).toBeInTheDocument()
  })

  it('renders 9+ when content is a number with value greater than 9', () => {
    const number = 10
    const label = 'Notifications:'
    render(<Badge content={number} variant="notification" label={label} />)

    expect(screen.queryByText('9+')).toBeInTheDocument()
    expect(screen.queryByText(label)).toBeInTheDocument()
  })

  it('renders the label as string', () => {
    const label = 'Money:'
    const content = 100
    render(<Badge label={label} content={content} />)

    expect(screen.queryByText(label)).toBeInTheDocument()
    expect(screen.queryByText(content)).toBeInTheDocument()
  })

  it('renders the label as a react node', () => {
    const label = <span data-testid="react-node">ReactNode</span>
    render(<Badge label={label} content="something" />)

    expect(screen.queryByTestId('react-node')).toBeInTheDocument()
  })

  it('renders children as content', () => {
    render(
      <Badge content={<Icon icon={Confetti} />}>
        <Avatar.Group label="children:">
          <Avatar>A</Avatar>
        </Avatar.Group>
      </Badge>
    )

    expect(screen.queryByTestId('confetti icon')).toBeInTheDocument()
  })

  it('warns when notification badge content is a string', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Badge variant="notification" content="string" />)
    expect(global.console.log).toHaveBeenCalled()
  })

  it('does not warn when notification badge content is a number', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(
      <Badge variant="notification" content={1} label="Notifications:" />
    )
    expect(global.console.log).not.toHaveBeenCalled()
  })

  it('supports inline styling', () => {
    render(<Badge style={{ color: 'red' }}>A</Badge>)

    expect(
      document.querySelector('.dnb-badge').getAttribute('style')
    ).toBe('color: red;')
  })

  it('warns when Badge content is a number and is missing a label', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Badge content={1} />)
    expect(global.console.log).toHaveBeenCalled()
  })

  it('does not warn when Badge content is a string and label is missing', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Badge content="text" />)
    expect(global.console.log).not.toHaveBeenCalled()
  })

  it('does not warn when Badge content is a number and has a label', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Badge content="text" label="Notifications:" />)
    expect(global.console.log).not.toHaveBeenCalled()
  })

  it('should support spacing props', () => {
    render(
      <Badge
        top="2rem"
        aria-label="Info about the badge"
        content="content"
      />
    )

    const element = document.querySelector('.dnb-badge')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['role', 'class', 'aria-label'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-badge',
      'dnb-badge--variant-information',
      'dnb-space__top--large',
      'dnb-badge--inline',
    ])
  })

  it('should have role="status"', () => {
    render(<Badge content="content" />)

    const element = document.querySelector('.dnb-badge')

    expect(element.getAttribute('role')).toBe('status')
  })

  it('should inherit skeleton prop from provider', () => {
    render(
      <Provider skeleton>
        <Badge content="content" />
      </Provider>
    )

    const element = document.querySelector('.dnb-badge')

    expect(Array.from(element.classList)).toEqual([
      'dnb-badge',
      'dnb-badge--variant-information',
      'dnb-skeleton',
      'dnb-skeleton--shape',
      'dnb-badge--inline',
    ])
  })

  it('should support vertical alignment when used inline', () => {
    render(
      <p>
        This is text with a <Badge content={9} vertical="top" />
      </p>
    )

    const badge = document.querySelector('.dnb-badge')

    expect(badge).toHaveClass('dnb-badge--inline')
  })

  describe('default values', () => {
    it('has variant information as default', () => {
      render(<Badge />)

      expect(
        document.getElementsByClassName('dnb-badge--variant-information')
      ).toHaveLength(1)
    })
  })
})

describe('Badge aria', () => {
  it('should validate', async () => {
    const Component = render(<Badge content="1" />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Badge scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-badge-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
