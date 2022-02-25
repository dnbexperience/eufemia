import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Tag from '../Tag'
import {
  axeComponent,
  loadScss,
  mount,
} from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('Tag Group', () => {
  it('renders without children', () => {
    render(<Tag.Group label="tags" />)

    expect(screen.queryByTestId('tag-group')).not.toBeNull()
    expect(screen.queryByTestId('tag')).toBeNull()
  })

  it('renders the label as string', () => {
    const label = 'tags'
    render(<Tag.Group label={label} />)
    expect(screen.queryByTestId('tag-group-label')).not.toBeNull()
    expect(screen.queryByTestId('tag-group-label').textContent).toBe(label)
  })

  it('renders the label as react node', () => {
    const label = <span data-testid="react-node">ReactNode</span>
    render(<Tag.Group label={label} />)

    expect(screen.queryByTestId('tag-group-label')).not.toBeNull()

    expect(
      within(screen.queryByTestId('tag-group-label')).queryByTestId(
        'react-node'
      )
    ).not.toBeNull()
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

    expect(screen.queryAllByTestId('tag')).toHaveLength(4)
  })

  it('renders a tag group with className if className is provided', () => {
    const customClassName = 'custom-class'

    render(
      <Tag.Group label="aria" className={customClassName}>
        ClassName
      </Tag.Group>
    )
    expect(screen.queryByTestId('tag-group').className).toMatch(
      customClassName
    )
  })
})

describe('Tag', () => {
  it('renders without properties', () => {
    render(
      <Tag.Group label="tags">
        <Tag />
      </Tag.Group>
    )

    expect(screen.queryByTestId('tag')).not.toBeNull()
  })

  it('renders a tag with content by text prop', () => {
    const text = 'This is a tag'

    render(
      <Tag.Group label="tags">
        <Tag text="This is a tag" />
      </Tag.Group>
    )

    expect(
      screen.queryByTestId('tag').querySelector('.dnb-button__text')
    ).not.toBeNull()
    expect(
      screen.queryByTestId('tag').querySelector('.dnb-button__text')
        .textContent
    ).toBe(text)
  })

  it('renders a tag with content by children prop', () => {
    const text = 'This is a tag'

    render(
      <Tag.Group label="tags">
        <Tag>{text}</Tag>
      </Tag.Group>
    )

    expect(
      screen.queryByTestId('tag').querySelector('.dnb-button__text')
    ).not.toBeNull()
    expect(
      screen.queryByTestId('tag').querySelector('.dnb-button__text')
        .textContent
    ).toBe(text)
  })

  it('renders a tag with content if both text and children prop is defined', () => {
    const text = 'This is a tag'

    render(
      <Tag.Group label="tags">
        <Tag text={text}>{text}</Tag>
      </Tag.Group>
    )

    expect(
      screen.queryByTestId('tag').querySelector('.dnb-button__text')
    ).not.toBeNull()
    expect(
      screen.queryByTestId('tag').querySelector('.dnb-button__text')
        .textContent
    ).toBe(text)
  })

  it('renders a tag with skeleton if skeleton is true', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(
      <Tag.Group label="tags">
        <Tag skeleton>ClassName</Tag>
      </Tag.Group>
    )
    expect(screen.queryByTestId('tag').className).toMatch(
      skeletonClassName
    )
  })

  it('does not render a clickable Tag as default', () => {
    render(
      <Tag.Group label="tags">
        <Tag text="Tag with text" />
      </Tag.Group>
    )

    expect(screen.queryByRole('button')).toBeNull()
    expect(screen.queryByTestId('tag').textContent).toBe('‌Tag with text')
  })

  it('does support icon', () => {
    render(
      <Tag.Group label="tags">
        <Tag text="Tag with icon" icon="bell" />
      </Tag.Group>
    )

    expect(
      screen.queryByTestId('tag').querySelector('.dnb-icon')
    ).toBeTruthy()
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
      expect(screen.queryByTestId('tag').className).toMatch(
        clickableClassName
      )
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

      expect(
        screen.queryByTestId('tag').querySelector('.dnb-icon')
      ).toBeTruthy()
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
      expect(screen.queryByTestId('tag').className).toMatch(
        removableClassName
      )
      expect(screen.queryByTestId('tag').className).toMatch(
        clickableClassName
      )
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

    it('renders the close button if onDelete is defined', () => {
      render(
        <Tag.Group label="onDelete">
          <Tag text="Delete" onDelete={jest.fn()} />
        </Tag.Group>
      )

      expect(
        screen.queryByTestId('tag').querySelector('.dnb-icon')
      ).toBeTruthy()
    })

    it('does not support icon if onDelete', () => {
      render(
        <Tag.Group label="onDelete">
          <Tag text="Tag with icon" icon="bell" onDelete={jest.fn()} />
        </Tag.Group>
      )

      expect(
        screen.queryByTestId('tag').querySelector('.dnb-icon')
      ).toBeTruthy()
      expect(
        screen.queryByTestId('tag').querySelectorAll('.dnb-icon').length
      ).toBe(1)
    })

    it('renders the delete icon if onDelete is provided', () => {
      render(
        <Tag.Group label="onDelete">
          <Tag text="Deletable" onDelete={jest.fn()} />
        </Tag.Group>
      )

      expect(screen.queryByTestId('tag-delete-icon')).not.toBeNull()
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
    expect(screen.queryByTestId('tag').className).toMatch(customClassName)
  })

  it('renders a tag with provider', () => {
    render(
      <Provider locale="en-GB">
        <Tag.Group label="tags">
          <Tag text="With provider" />
        </Tag.Group>
      </Provider>
    )

    expect(
      screen.queryByTestId('tag').querySelector('.dnb-button__text')
    ).not.toBeNull()
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
