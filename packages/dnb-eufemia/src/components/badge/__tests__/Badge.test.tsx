import React from 'react'
import { render, screen, within } from '@testing-library/react'
import Badge from '../Badge'
import { confetti as Confetti } from '../../../icons'
import Icon from '../../Icon'
import Avatar from '../../Avatar'

import {
  loadScss,
  axeComponent,
  mount,
} from '../../../core/jest/jestSetup'

describe('Badge', () => {
  it('renders without properties', () => {
    render(<Badge />)

    expect(screen.queryByTestId('badge')).not.toBeNull()
  })

  it('renders content as text', () => {
    const string = 'A'
    render(<Badge content={string} />)

    expect(screen.queryByTestId('badge').textContent).toBe(string)
  })

  it('renders content as number', () => {
    const number = 1
    const label = 'Notifications:'
    render(<Badge content={number} label={label} />)

    expect(screen.queryByTestId('badge').textContent).toBe(
      `${label} ${number}`
    )
  })

  it('renders 9+ when content is a number with value greater than 9', () => {
    const number = 10
    const label = 'Notifications:'
    render(<Badge content={number} variant="notification" label={label} />)

    expect(screen.queryByTestId('badge').textContent).toBe(`${label} 9+`)
  })

  it('renders the label as string', () => {
    const label = 'Money:'
    const content = 100
    render(<Badge label={label} content={content} />)

    expect(screen.queryByTestId('badge-label').textContent).toBe(
      `${label} `
    )
    expect(screen.queryByTestId('badge').textContent).toBe(
      `${label} ${content}`
    )
  })

  it('renders the label as a react node', () => {
    const label = <span data-testid="react-node">ReactNode</span>
    render(<Badge label={label} content="something" />)

    expect(
      within(screen.queryByTestId('badge-label')).queryByTestId(
        'react-node'
      )
    ).not.toBeNull()
  })

  it('renders children as content', () => {
    render(
      <Badge content={<Icon icon={Confetti} />}>
        <Avatar.Group label="children:">
          <Avatar>A</Avatar>
        </Avatar.Group>
      </Badge>
    )

    const badgeRoot = screen.queryByTestId('badge-root')
    expect(within(badgeRoot).queryByTestId('confetti icon')).not.toBeNull()
  })

  it('warns when notification badge content is a string', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Badge variant="notification" content="string" />)
    expect(global.console.log).toBeCalled()
  })

  it('does not warn when notification badge content is a number', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(
      <Badge variant="notification" content={1} label="Notifications:" />
    )
    expect(global.console.log).not.toBeCalled()
  })

  it('warns when Badge content is a number and is missing a label', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Badge content={1} />)
    expect(global.console.log).toBeCalled()
  })

  it('does not warn when Badge content is a string and label is missing', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Badge content="text" />)
    expect(global.console.log).not.toBeCalled()
  })

  it('does not warn when Badge content is a number and has a label', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Badge content="text" label="Notifications:" />)
    expect(global.console.log).not.toBeCalled()
  })

  describe('default values', () => {
    it('has variant information as default', () => {
      render(<Badge />)
      expect(screen.queryByTestId('badge').className).toMatch(
        'dnb-badge--variant-information'
      )
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
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-badge-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
