import React from 'react'
import { render, screen } from '@testing-library/react'
import Avatar from '../Avatar'
import { confetti as Confetti } from '../../../icons'
import Icon from '../../Icon'

import {
  loadScss,
  axeComponent,
  mount,
} from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('Avatar', () => {
  it('renders without properties', () => {
    render(
      <Avatar.Group label="label">
        <Avatar />
      </Avatar.Group>
    )

    expect(document.querySelector('.dnb-avatar')).not.toBeNull()
  })

  it('renders children as text', () => {
    const children = 'E'
    render(
      <Avatar.Group label="label">
        <Avatar>{children}</Avatar>
      </Avatar.Group>
    )

    expect(screen.queryAllByText(children)).toBeTruthy()
  })

  it('renders text children by first char uppercased', () => {
    const children = 'easy'
    render(
      <Avatar.Group label="label">
        <Avatar>{children}</Avatar>
      </Avatar.Group>
    )

    expect(screen.queryByText('E')).toBeTruthy()
  })

  it('renders a label for screen readers when passing children as text', () => {
    const children = 'Ola Nordmann'
    render(
      <Avatar.Group label="label">
        <Avatar>{children}</Avatar>
      </Avatar.Group>
    )

    expect(screen.queryByText(children)).toBeTruthy()
  })

  it('renders children as Icon', () => {
    render(
      <Avatar.Group label="label">
        <Avatar>
          <Icon icon={Confetti} />
        </Avatar>
      </Avatar.Group>
    )

    expect(screen.queryByTestId('confetti icon')).not.toBeNull()
    expect(screen.queryByTestId('avatar-label')).toBeNull()
  })

  it('renders img from src', () => {
    const img_src = '/android-chrome-192x192.png'
    render(
      <Avatar.Group label="label">
        <Avatar src={img_src} alt="custom_alt_label" />
      </Avatar.Group>
    )

    expect(screen.queryByRole('img').getAttribute('src')).toBe(img_src)
  })

  it('renders alt for img from src', () => {
    const img_alt = 'custom_alt_label'
    render(
      <Avatar.Group label="label">
        <Avatar alt={img_alt} src="/android-chrome-192x192.png" />
      </Avatar.Group>
    )

    expect(screen.findByAltText(img_alt)).not.toBeNull()
    expect(screen.queryByRole('img').getAttribute('alt')).toBe(img_alt)
  })

  it('renders imgProps', () => {
    const img_src = '/android-chrome-192x192.png'
    const img_width = '48'
    const img_height = '48'
    const img_alt = 'custom_alt_label'
    const imgProps = {
      width: img_width,
      height: img_height,
      src: img_src,
      alt: img_alt,
    }

    render(
      <Avatar.Group label="label">
        <Avatar imgProps={imgProps} />
      </Avatar.Group>
    )

    const image = screen.queryByRole('img')

    expect(image.getAttribute('src')).toBe(img_src)
    expect(image.getAttribute('alt')).toBe(img_alt)
    expect(image.getAttribute('width')).toBe(img_width)
    expect(image.getAttribute('height')).toBe(img_height)
  })

  it('warns when Avatar is used without a Avatar.Group as parent component', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Avatar />)
    expect(global.console.log).toBeCalled()
  })

  it('will not warn when hasLabel is true', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Avatar hasLabel />)
    expect(global.console.log).not.toBeCalled()
  })

  it('renders skeleton if skeleton is true', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Avatar.Group skeleton label="label">
        <Avatar>A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.getElementsByClassName(skeletonClassName)
    ).toHaveLength(1)
  })

  it('inherits skeleton prop from provider', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Provider skeleton>
        <Avatar.Group label="label">
          <Avatar>A</Avatar>
        </Avatar.Group>
      </Provider>
    )

    expect(
      document.getElementsByClassName(skeletonClassName)
    ).toHaveLength(1)
  })

  it('should support spacing props', () => {
    const img_alt = 'custom_alt_label'

    render(
      <Avatar.Group label="label" top>
        <Avatar
          top="2rem"
          alt={img_alt}
          src="/android-chrome-192x192.png"
        />
      </Avatar.Group>
    )

    const element = document.querySelector('.dnb-avatar')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-avatar',
      'dnb-avatar--primary',
      'dnb-avatar--size-medium',
      'dnb-space__top--large',
    ])
  })

  describe('AvatarGroup', () => {
    it('renders the label as string', () => {
      const label = 'avatar'
      render(
        <Avatar.Group label={label} maxElements={2}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      expect(screen.queryByText(label)).toBeTruthy()
    })

    it('renders the label as react node', () => {
      const label = <span data-testid="react-node">ReactNode</span>
      render(
        <Avatar.Group label={label} maxElements={2}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )
      expect(screen.queryByTestId('react-node')).not.toBeNull()
    })

    it('renders the "elements left"-avatar when having more avatars than maxElements', () => {
      render(
        <Avatar.Group maxElements={2} label="label">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed =
        document.getElementsByClassName('dnb-avatar')

      expect(screen.queryByText('+2')).toBeTruthy()

      expect(avatarsDisplayed).toHaveLength(1)
    })

    it('renders the "elements left"-avatar when having multiple avatars, and maxElement 1', () => {
      render(
        <Avatar.Group maxElements={1} label="label">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed =
        document.getElementsByClassName('dnb-avatar')

      expect(screen.queryByText('+3')).toBeTruthy()

      expect(avatarsDisplayed).toHaveLength(0)
    })

    it('does not render "elements left"-avatar when num of avatars is the same as maxElements', () => {
      render(
        <Avatar.Group maxElements={3} label="label">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed =
        document.getElementsByClassName('dnb-avatar')

      expect(
        document.querySelector('.dnb-avatar__group--elements-left')
      ).toBeNull()

      expect(avatarsDisplayed).toHaveLength(3)
    })

    it('does not render "elements left"-avatar when num of avatars is less than maxElements', () => {
      render(
        <Avatar.Group maxElements={4} label="label">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed =
        document.getElementsByClassName('dnb-avatar')

      expect(
        document.querySelector('.dnb-avatar__group--elements-left')
      ).toBeNull()
      expect(avatarsDisplayed).toHaveLength(3)
    })

    it('does not render "elements left"-avatar when maxElements is 0', () => {
      render(
        <Avatar.Group maxElements={0} label="label">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed =
        document.getElementsByClassName('dnb-avatar')

      expect(
        document.querySelector('.dnb-avatar__group--elements-left')
      ).toBeNull()
      expect(avatarsDisplayed).toHaveLength(3)
    })

    it('does not render "elements left"-avatar when maxElements is not a number', () => {
      render(
        <Avatar.Group maxElements={null} label="label">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed =
        document.getElementsByClassName('dnb-avatar')

      expect(
        document.querySelector('.dnb-avatar__group--elements-left')
      ).toBeNull()
      expect(avatarsDisplayed).toHaveLength(2)
    })

    it('renders "elements left"-avatar when maxElements is not a number, and five or more avatars', () => {
      render(
        <Avatar.Group maxElements={null} label="label">
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
          <Avatar>E</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed =
        document.getElementsByClassName('dnb-avatar')

      expect(
        document.querySelector('.dnb-avatar__group--elements-left')
      ).not.toBeNull()
      expect(avatarsDisplayed).toHaveLength(3)
    })
  })
})

describe('Avatar aria', () => {
  it('should validate', async () => {
    const Component = render(<Avatar>E</Avatar>)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Avatar scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-avatar.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-avatar-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
