import React from 'react'
import { render, screen } from '@testing-library/react'
import Avatar, { AvatarImgProps, AvatarProps } from '../Avatar'
import { confetti as Confetti } from '../../../icons'
import Icon from '../../Icon'

import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('Avatar', () => {
  it('renders without properties', () => {
    const props: AvatarProps = {}
    render(
      <Avatar.Group {...props} label="label">
        <Avatar />
      </Avatar.Group>
    )

    expect(document.querySelector('.dnb-avatar')).toBeInTheDocument()
  })

  it('renders children as text', () => {
    const children = 'E'
    render(
      <Avatar.Group label="label">
        <Avatar>{children}</Avatar>
      </Avatar.Group>
    )

    expect(screen.queryAllByText(children)[0]).toBeInTheDocument()
  })

  it('renders text children by first char uppercased', () => {
    const children = 'easy'
    render(
      <Avatar.Group label="label">
        <Avatar>{children}</Avatar>
      </Avatar.Group>
    )

    expect(screen.queryByText('E')).toBeInTheDocument()
    expect(screen.queryByText('e')).not.toBeInTheDocument()
  })

  it('renders a label for screen readers when passing children as text', () => {
    const children = 'Ola Nordmann'
    render(
      <Avatar.Group label="label">
        <Avatar>{children}</Avatar>
      </Avatar.Group>
    )

    expect(screen.queryByText(children)).toBeInTheDocument()
  })

  it('renders children as Icon', () => {
    render(
      <Avatar.Group label="label">
        <Avatar>
          <Icon icon={Confetti} />
        </Avatar>
      </Avatar.Group>
    )

    expect(screen.queryByTestId('confetti icon')).toBeInTheDocument()
  })

  it('children icon has correct auto size', () => {
    render(
      <Avatar.Group label="label">
        <Avatar>
          <Icon icon={Confetti} />
        </Avatar>
      </Avatar.Group>
    )

    const element = document.querySelector('.dnb-icon')

    expect(Array.from(element.classList)).toEqual([
      'dnb-icon',
      'dnb-icon--auto',
      'dnb-icon--inherit-color',
    ])
  })

  it('children icon can set own size', () => {
    render(
      <Avatar.Group label="label">
        <Avatar>
          <Icon icon={Confetti} size="small" />
        </Avatar>
      </Avatar.Group>
    )

    const element = document.querySelector('.dnb-icon')

    expect(Array.from(element.classList)).toEqual([
      'dnb-icon',
      'dnb-icon--small',
      'dnb-icon--inherit-color',
    ])
  })

  it('prop icon has correct auto size', () => {
    render(
      <Avatar.Group label="label">
        <Avatar icon={Confetti} />
      </Avatar.Group>
    )

    const element = document.querySelector('.dnb-icon')

    expect(Array.from(element.classList)).toEqual([
      'dnb-icon',
      'dnb-icon--auto',
      'dnb-icon--inherit-color',
    ])
  })

  it('prop icon can set own size', () => {
    render(
      <Avatar.Group label="label">
        <Avatar icon={<Icon icon={Confetti} size="small" />} />
      </Avatar.Group>
    )

    const element = document.querySelector('.dnb-icon')

    expect(Array.from(element.classList)).toEqual([
      'dnb-icon',
      'dnb-icon--small',
      'dnb-icon--inherit-color',
    ])
  })

  it('renders img from src', () => {
    const imgSrc = '/dnb/android-chrome-192x192.png'
    render(
      <Avatar.Group label="label">
        <Avatar src={imgSrc} alt="custom_alt_label" />
      </Avatar.Group>
    )

    expect(screen.queryByRole('img').getAttribute('src')).toBe(imgSrc)
  })

  it('renders alt for img from src', () => {
    const imgAlt = 'custom_alt_label'
    render(
      <Avatar.Group label="label">
        <Avatar alt={imgAlt} src="/dnb/android-chrome-192x192.png" />
      </Avatar.Group>
    )

    expect(screen.getByAltText(imgAlt)).toBeInTheDocument()
    expect(screen.queryByRole('img').getAttribute('alt')).toBe(imgAlt)
  })

  it('renders imgProps', () => {
    const imgSrc = '/dnb/android-chrome-192x192.png'
    const imgWidth = '48'
    const imgHeight = '48'
    const imgAlt = 'custom_alt_label'
    const imgProps: AvatarImgProps = {
      width: imgWidth,
      height: imgHeight,
      src: imgSrc,
      alt: imgAlt,
    }

    render(
      <Avatar.Group label="label">
        <Avatar imgProps={imgProps} />
      </Avatar.Group>
    )

    const image = screen.queryByRole('img')

    expect(image.getAttribute('src')).toBe(imgSrc)
    expect(image.getAttribute('alt')).toBe(imgAlt)
    expect(image.getAttribute('width')).toBe(imgWidth)
    expect(image.getAttribute('height')).toBe(imgHeight)
  })

  it('warns when Avatar is used without a Avatar.Group as parent component', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Avatar />)
    expect(global.console.log).toHaveBeenCalled()
  })

  it('will not warn when hasLabel is true', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Avatar hasLabel />)
    expect(global.console.log).not.toHaveBeenCalled()
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
    const imgAlt = 'custom_alt_label'

    render(
      <Avatar.Group label="label" top>
        <Avatar
          top="2rem"
          alt={imgAlt}
          src="/dnb/android-chrome-192x192.png"
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

  it('supports inline styling', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar style={{ color: 'red' }}>A</Avatar>
      </Avatar.Group>
    )

    expect(
      document.querySelector('.dnb-avatar').getAttribute('style')
    ).toBe('color: red;')
  })

  it('should support variant tertiary', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar variant="tertiary">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar--tertiary')
    ).toBeInTheDocument()
  })

  it('should support variant primary', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar variant="primary">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar--primary')
    ).toBeInTheDocument()
  })

  it('should support variant secondary', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar variant="secondary">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar--secondary')
    ).toBeInTheDocument()
  })

  it('should support size small', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar size="small">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar--size-small')
    ).toBeInTheDocument()
  })

  it('should support size medium', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar size="medium">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar--size-medium')
    ).toBeInTheDocument()
  })

  it('should support size large', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar size="large">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar--size-large')
    ).toBeInTheDocument()
  })

  it('should support size x-large', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar size="x-large">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar--size-x-large')
    ).toBeInTheDocument()
  })

  it('should support backgroundColor', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar backgroundColor="fire-red">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar').getAttribute('style')
    ).toBe('--background-color: var(--color-fire-red);')
  })

  it('should support color', () => {
    render(
      <Avatar.Group label="tags">
        <Avatar color="fire-red">A</Avatar>
      </Avatar.Group>
    )
    expect(
      document.querySelector('.dnb-avatar').getAttribute('style')
    ).toBe('--color: var(--color-fire-red);')
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

      expect(screen.queryByText(label)).toBeInTheDocument()
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
      expect(screen.queryByTestId('react-node')).toBeInTheDocument()
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

      expect(screen.queryByText('+2')).toBeInTheDocument()

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

      expect(screen.queryByText('+3')).toBeInTheDocument()

      expect(avatarsDisplayed).toHaveLength(0)
    })

    it('supports inline styling', () => {
      render(
        <Avatar.Group label="tags" style={{ color: 'red' }}>
          <Avatar>A</Avatar>
        </Avatar.Group>
      )

      expect(
        document.querySelector('.dnb-avatar__group').getAttribute('style')
      ).toBe('color: red;')
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
      ).not.toBeInTheDocument()

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
      ).not.toBeInTheDocument()
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
      ).not.toBeInTheDocument()
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
      ).not.toBeInTheDocument()
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
      ).toBeInTheDocument()
      expect(avatarsDisplayed).toHaveLength(3)
    })

    it('should support variant', () => {
      render(
        <Avatar.Group label="tags" variant="secondary">
          <Avatar>A</Avatar>
          <Avatar>A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelectorAll('.dnb-avatar--secondary')
      ).toHaveLength(2)
    })

    it('should weigh variant set in Avatar highest', () => {
      render(
        <Avatar.Group label="tags" variant="tertiary">
          <Avatar variant="secondary">A</Avatar>
          <Avatar variant="secondary">A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelectorAll('.dnb-avatar--secondary')
      ).toHaveLength(2)
    })

    it('should support variant when single Avatar', () => {
      render(
        <Avatar.Group label="tags" variant="secondary">
          <Avatar>A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelector('.dnb-avatar--secondary')
      ).toBeInTheDocument()
    })

    it('should weigh variant set in Avatar highest when single Avatar', () => {
      render(
        <Avatar.Group label="tags" variant="tertiary">
          <Avatar variant="secondary">A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelector('.dnb-avatar--secondary')
      ).toBeInTheDocument()
    })

    it('should support size', () => {
      render(
        <Avatar.Group label="tags" size="large">
          <Avatar>A</Avatar>
          <Avatar>A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelectorAll('.dnb-avatar--size-large')
      ).toHaveLength(2)
    })

    it('should weigh size set in Avatar highest', () => {
      render(
        <Avatar.Group label="tags" size="small">
          <Avatar size="large">A</Avatar>
          <Avatar size="large">A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelectorAll('.dnb-avatar--size-large')
      ).toHaveLength(2)
    })

    it('should support size when single Avatar', () => {
      render(
        <Avatar.Group label="tags" size="large">
          <Avatar>A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelector('.dnb-avatar--size-large')
      ).toBeInTheDocument()
    })

    it('should weigh size set in Avatar highest when single Avatar', () => {
      render(
        <Avatar.Group label="tags" size="small">
          <Avatar size="large">A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelector('.dnb-avatar--size-large')
      ).toBeInTheDocument()
    })

    it('should support backgroundColor', () => {
      render(
        <Avatar.Group label="tags" backgroundColor="fire-red">
          <Avatar>A</Avatar>
          <Avatar>A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelectorAll('.dnb-avatar')[0].getAttribute('style')
      ).toBe('--background-color: var(--color-fire-red); z-index: 2;')
      expect(
        document.querySelectorAll('.dnb-avatar')[1].getAttribute('style')
      ).toBe('--background-color: var(--color-fire-red); z-index: 1;')
    })

    it('should weigh backgroundColor set in Avatar highest', () => {
      render(
        <Avatar.Group label="tags" backgroundColor="emerald-green">
          <Avatar backgroundColor="fire-red">A</Avatar>
          <Avatar backgroundColor="fire-red">A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelectorAll('.dnb-avatar')[0].getAttribute('style')
      ).toBe('--background-color: var(--color-fire-red); z-index: 2;')
      expect(
        document.querySelectorAll('.dnb-avatar')[1].getAttribute('style')
      ).toBe('--background-color: var(--color-fire-red); z-index: 1;')
    })

    it('should support backgroundColor when single Avatar', () => {
      render(
        <Avatar.Group label="tags" backgroundColor="fire-red">
          <Avatar>A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelector('.dnb-avatar').getAttribute('style')
      ).toBe('--background-color: var(--color-fire-red);')
    })

    it('should weigh backgroundColor set in Avatar highest when single Avatar', () => {
      render(
        <Avatar.Group label="tags" backgroundColor="emerald-green">
          <Avatar backgroundColor="fire-red">A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelector('.dnb-avatar').getAttribute('style')
      ).toBe('--background-color: var(--color-fire-red);')
    })

    it('should support color', () => {
      render(
        <Avatar.Group label="tags" color="fire-red">
          <Avatar>A</Avatar>
          <Avatar>A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelectorAll('.dnb-avatar')[0].getAttribute('style')
      ).toBe('--color: var(--color-fire-red); z-index: 2;')
      expect(
        document.querySelectorAll('.dnb-avatar')[1].getAttribute('style')
      ).toBe('--color: var(--color-fire-red); z-index: 1;')
    })

    it('should weigh color set in Avatar highest', () => {
      render(
        <Avatar.Group label="tags" color="emerald-green">
          <Avatar color="fire-red">A</Avatar>
          <Avatar color="fire-red">A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelectorAll('.dnb-avatar')[0].getAttribute('style')
      ).toBe('--color: var(--color-fire-red); z-index: 2;')
      expect(
        document.querySelectorAll('.dnb-avatar')[1].getAttribute('style')
      ).toBe('--color: var(--color-fire-red); z-index: 1;')
    })

    it('should support color when single Avatar', () => {
      render(
        <Avatar.Group label="tags" color="fire-red">
          <Avatar>A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelector('.dnb-avatar').getAttribute('style')
      ).toBe('--color: var(--color-fire-red);')
    })

    it('should weigh color set in Avatar highest when single Avatar', () => {
      render(
        <Avatar.Group label="tags" color="emerald-green">
          <Avatar color="fire-red">A</Avatar>
        </Avatar.Group>
      )
      expect(
        document.querySelector('.dnb-avatar').getAttribute('style')
      ).toBe('--color: var(--color-fire-red);')
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
  it('should match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('should match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-avatar-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
