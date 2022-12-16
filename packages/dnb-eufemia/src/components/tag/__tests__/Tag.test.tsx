import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Tag from '../Tag'
import nbNO from '../../../shared/locales/nb-NO'
import {
  axeComponent,
  loadScss,
  mount,
} from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

const nb = nbNO['nb-NO'].Tag

describe('Tag Group', () => {
  it('renders without children', () => {
    render(<Tag.Group label="tags" />)

    expect(document.querySelector('.dnb-tag__group')).not.toBeNull()
    expect(document.querySelector('.dnb-tag')).toBeNull()
  })

  it('renders the label as string', () => {
    const label = 'tags'
    render(<Tag.Group label={label} />)
    expect(screen.queryByText(label)).toBeTruthy()
  })

  it('renders the label as react node', () => {
    const label = <span data-testid="react-node">ReactNode</span>
    render(<Tag.Group label={label} />)

    expect(screen.queryByTestId('react-node')).not.toBeNull()
  })

  it('renders a tag group with multiple tag elements by children', () => {
    render(
      <Tag.Group label="animals">
        <Tag text="Cat" />
        <Tag text="Horse" />
        <Tag text="Dog" />
        <Tag text="Cow" />
      </Tag.Group>
    )

    expect(document.querySelectorAll('.dnb-tag')).toHaveLength(4)
  })

  it('renders a tag group with className if className is provided', () => {
    const customClassName = 'custom-class'

    render(
      <Tag.Group label="aria" className={customClassName}>
        ClassName
      </Tag.Group>
    )
    expect(document.getElementsByClassName(customClassName)).toHaveLength(
      1
    )
  })

  it('renders a tag with skeleton if skeleton is true', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Tag.Group skeleton label="tags">
        <Tag>skeleton</Tag>
      </Tag.Group>
    )

    expect(
      document.getElementsByClassName(skeletonClassName)
    ).toHaveLength(1)
  })

  it('should support spacing props', () => {
    render(
      <Tag.Group label="tags" top="2rem">
        <Tag>Tag</Tag>
      </Tag.Group>
    )

    const element = document.querySelector('.dnb-tag__group')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-tag__group',
      'dnb-space__top--large',
    ])
  })
})

describe('Tag', () => {
  it('renders without properties', () => {
    render(
      <Tag.Group label="tags">
        <Tag />
      </Tag.Group>
    )

    expect(document.querySelector('.dnb-tag')).not.toBeNull()
  })

  it('renders a tag with content by text prop', () => {
    const text = 'This is a tag'

    render(
      <Tag.Group label="tags">
        <Tag text="This is a tag" />
      </Tag.Group>
    )

    expect(screen.queryByText(text)).toBeTruthy()
  })

  it('renders a tag with content by children prop', () => {
    const text = 'This is a tag'

    render(
      <Tag.Group label="tags">
        <Tag>{text}</Tag>
      </Tag.Group>
    )

    expect(screen.queryByText(text)).toBeTruthy()
  })

  it('renders a tag with content if both text and children prop is defined', () => {
    const text = 'This is a tag'

    render(
      <Tag.Group label="tags">
        <Tag text={text}>{text}</Tag>
      </Tag.Group>
    )

    expect(screen.queryByText(text)).toBeTruthy()
  })

  it('renders a tag with skeleton if skeleton is true', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Tag.Group label="tags">
        <Tag skeleton>skeleton</Tag>
      </Tag.Group>
    )

    expect(
      document.getElementsByClassName(skeletonClassName)
    ).toHaveLength(1)
  })

  it('inherits skeleton prop from provider', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Provider skeleton>
        <Tag.Group label="tags">
          <Tag>skeleton</Tag>
        </Tag.Group>
      </Provider>
    )

    expect(
      document.getElementsByClassName(skeletonClassName)
    ).toHaveLength(1)
  })

  it('does not render a clickable Tag as default', () => {
    const text = 'Tag with text'

    render(
      <Tag.Group label="tags">
        <Tag text={text} />
      </Tag.Group>
    )

    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.queryByText(text)).toBeTruthy()
  })

  it('does support icon', () => {
    render(
      <Tag.Group label="tags">
        <Tag text="Tag with icon" icon="bell" />
      </Tag.Group>
    )

    expect(document.querySelector('.dnb-icon')).toBeTruthy()
  })

  it('should support spacing props', () => {
    render(
      <Tag.Group label="tags">
        <Tag left="2rem">Tag</Tag>
      </Tag.Group>
    )

    const element = document.querySelector('.dnb-tag')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-button',
      'dnb-button--unstyled',
      'dnb-button--has-text',
      'dnb-space__left--large',
      'dnb-tag',
      'dnb-button--size-small',
    ])
  })

  describe('with onClick', () => {
    it('renders a clickable tag with the correct attributes if onClick is defined', () => {
      const clickableClassName = 'dnb-tag--interactive'

      render(
        <Tag.Group label="tags">
          <Tag
            onClick={() => {
              console.log('onClick')
            }}
          >
            Clickable
          </Tag>
        </Tag.Group>
      )

      expect(
        document.getElementsByClassName(clickableClassName)
      ).toHaveLength(1)
      expect(screen.queryByRole('button')).not.toBeNull()
    })

    it('fires onClick event if onClick is defined', () => {
      const onClick = jest.fn()
      render(
        <Tag.Group label="tags">
          <Tag onClick={onClick}>onClick</Tag>
        </Tag.Group>
      )

      fireEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does support icon', () => {
      render(
        <Tag.Group label="tags">
          <Tag text="Tag with icon" icon="bell" onClick={jest.fn()} />
        </Tag.Group>
      )

      expect(document.querySelector('.dnb-icon')).toBeTruthy()
    })
  })

  describe('with onDelete', () => {
    it('renders a removable tag with the correct attributes if onDelete is defined', () => {
      const clickableClassName = 'dnb-tag--interactive'
      const removableClassName = 'dnb-tag--removable'

      render(
        <Tag.Group label="onDelete">
          <Tag
            onDelete={() => {
              console.log('onDelete')
            }}
          >
            Removable
          </Tag>
        </Tag.Group>
      )

      expect(
        document.getElementsByClassName(removableClassName)
      ).toHaveLength(1)
      expect(
        document.getElementsByClassName(clickableClassName)
      ).toHaveLength(1)
      expect(screen.queryByRole('button')).not.toBeNull()
    })

    it('fires onClick event if onDelete is defined', () => {
      const onClick = jest.fn()
      render(
        <Tag.Group label="onDelete">
          <Tag onDelete={onClick}>onDelete</Tag>
        </Tag.Group>
      )

      fireEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('space should not be inherited by children tags', () => {
      const { container, rerender } = render(
        <Tag.Group label="Space" space={{ top: true }}>
          <Tag>Tag</Tag>
        </Tag.Group>
      )

      expect(
        container.querySelectorAll('.dnb-space__top--small').length
      ).toBe(1)

      rerender(
        <Tag.Group label="Space" space={{ top: true }}>
          <Tag top={true}>Tag</Tag>
        </Tag.Group>
      )

      expect(
        container.querySelectorAll('.dnb-space__top--small').length
      ).toBe(2)
    })

    it('renders the close button if onDelete is defined', () => {
      render(
        <Tag.Group label="onDelete">
          <Tag text="Delete" onDelete={jest.fn()} />
        </Tag.Group>
      )

      expect(document.querySelector('.dnb-icon')).toBeTruthy()
    })

    it('does not support icon if onDelete', () => {
      render(
        <Tag.Group label="onDelete">
          <Tag text="Tag with icon" icon="bell" onDelete={jest.fn()} />
        </Tag.Group>
      )

      expect(document.querySelector('.dnb-icon')).toBeTruthy()
      expect(document.querySelectorAll('.dnb-icon').length).toBe(1)
    })

    it('renders the delete icon if onDelete is provided', () => {
      render(
        <Tag.Group label="onDelete">
          <Tag text="Deletable" onDelete={jest.fn()} />
        </Tag.Group>
      )

      expect(screen.getByTitle(nb.removeIconTitle)).not.toBeNull()
    })

    it('fires onClick event if both onClick and onDelete are defined', () => {
      const onClick = jest.fn()
      const onDelete = jest.fn()

      render(
        <Tag.Group label="onDelete">
          <Tag onClick={onClick} onDelete={onDelete}>
            onClick
          </Tag>
        </Tag.Group>
      )

      fireEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(onDelete).toHaveBeenCalledTimes(0)
    })

    it('fires onClick event when releasing Space or Delete (key up)', () => {
      const onClick = jest.fn()

      render(
        <Tag.Group label="onDelete">
          <Tag onDelete={onClick}>Keyboard</Tag>
        </Tag.Group>
      )

      fireEvent.keyUp(screen.getByRole('button'), {
        key: 'Backspace',
        keyCode: 'Backspace',
      })

      fireEvent.keyUp(screen.getByRole('button'), {
        key: 'Delete',
        keyCode: 'Delete',
      })

      expect(onClick).toHaveBeenCalledTimes(2)
    })
  })

  it('warns when Tag is used without a Tag.Group as parent component', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Tag text="Tag" />)
    expect(global.console.log).toBeCalled()
  })

  it('will not warn when hasLabel is true', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Tag text="Tag" hasLabel />)
    expect(global.console.log).not.toBeCalled()
  })

  it('renders a tag with className if className is provided', () => {
    const customClassName = 'custom-class'

    render(
      <Tag.Group label="tags">
        <Tag className={customClassName}>ClassName</Tag>
      </Tag.Group>
    )
    expect(document.getElementsByClassName(customClassName)).toHaveLength(
      1
    )
  })

  it('renders a tag with provider', () => {
    render(
      <Provider locale="en-GB">
        <Tag.Group label="tags">
          <Tag text="With provider" />
        </Tag.Group>
      </Provider>
    )

    expect(document.querySelector('.dnb-button__text')).not.toBeNull()
  })
})

describe('Tag aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Tag.Group label="tags">
        <Tag text="Tag aria" />
      </Tag.Group>
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Tag scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tag.scss'))
    expect(scss).toMatchSnapshot()
  })
})
