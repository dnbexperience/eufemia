import React from 'react'
import { render, screen, within } from '@testing-library/react'
import Avatar from '../Avatar'
import { confetti as Confetti } from '../../../icons'
import Icon from '../../Icon'

import { loadScss, axeComponent } from '../../../core/jest/jestSetup'

describe('Avatar', () => {
  it('renders without properties', () => {
    render(<Avatar />)

    expect(screen.queryByTestId('avatar')).not.toBeNull()
  })

  it('renders children as text', () => {
    const children = 'E'
    render(<Avatar>{children}</Avatar>)

    expect(screen.queryByTestId('avatar').textContent).toBe(children)
  })

  it('renders children as Icon', () => {
    render(
      <Avatar>
        <Icon icon={Confetti} data-testid="confetti-icon" />
      </Avatar>
    )

    const avatar = screen.queryByTestId('avatar')
    expect(within(avatar).queryByTestId('confetti-icon')).not.toBeNull()
  })

  it('renders img from src', () => {
    const img_src = '/android-chrome-192x192.png'
    render(<Avatar src={img_src} alt="custom_alt_label" />)

    expect(screen.queryByRole('img').getAttribute('src')).toBe(img_src)
  })

  it('renders alt for img from src', () => {
    const img_alt = 'custom_alt_label'
    render(<Avatar alt={img_alt} src="/android-chrome-192x192.png" />)

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

    render(<Avatar imgProps={imgProps} />)

    const avatar = screen.queryByTestId('avatar')
    const image = within(avatar).queryByRole('img')

    expect(image.getAttribute('src')).toBe(img_src)
    expect(image.getAttribute('alt')).toBe(img_alt)
    expect(image.getAttribute('width')).toBe(img_width)
    expect(image.getAttribute('height')).toBe(img_height)
  })

  describe('AvatarGroup', () => {
    it('renders the "elements left"-avatar when having more avatars than maxElements', () => {
      render(
        <Avatar.Group maxElements={2}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed = screen.queryAllByTestId('avatar')
      const avatarElementsLeft = screen.queryByTestId('elements-left')

      expect(avatarElementsLeft).not.toBeNull()
      expect(avatarElementsLeft.textContent).toBe('+2')

      expect(avatarsDisplayed.length).toBe(1)
    })

    it('renders the "elements left"-avatar when having multiple avatars, and maxElement 1', () => {
      render(
        <Avatar.Group maxElements={1}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed = screen.queryAllByTestId('avatar')
      const avatarElementsLeft = screen.queryByTestId('elements-left')

      expect(avatarElementsLeft).not.toBeNull()
      expect(avatarElementsLeft.textContent).toBe('+3')

      expect(avatarsDisplayed.length).toBe(0)
    })

    it('does not render "elements left"-avatar when num of avatars is the same as maxElements', () => {
      render(
        <Avatar.Group maxElements={3}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed = screen.queryAllByTestId('avatar')

      expect(screen.queryByTestId('elements-left')).toBeNull()
      expect(avatarsDisplayed.length).toBe(3)
    })

    it('does not render "elements left"-avatar when num of avatars is less than maxElements', () => {
      render(
        <Avatar.Group maxElements={4}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed = screen.queryAllByTestId('avatar')

      expect(screen.queryByTestId('elements-left')).toBeNull()
      expect(avatarsDisplayed.length).toBe(3)
    })

    it('does not render "elements left"-avatar when maxElements is 0', () => {
      render(
        <Avatar.Group maxElements={0}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed = screen.queryAllByTestId('avatar')

      expect(screen.queryByTestId('elements-left')).toBeNull()
      expect(avatarsDisplayed.length).toBe(3)
    })

    it('does not render "elements left"-avatar when maxElements is not a number', () => {
      render(
        <Avatar.Group maxElements={null}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed = screen.queryAllByTestId('avatar')

      expect(screen.queryByTestId('elements-left')).toBeNull()
      expect(avatarsDisplayed.length).toBe(2)
    })

    it('renders "elements left"-avatar when maxElements is not a number, and five or more avatars', () => {
      render(
        <Avatar.Group maxElements={null}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
          <Avatar>E</Avatar>
        </Avatar.Group>
      )

      const avatarsDisplayed = screen.queryAllByTestId('avatar')

      expect(screen.queryByTestId('elements-left')).not.toBeNull()
      expect(avatarsDisplayed.length).toBe(3)
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
