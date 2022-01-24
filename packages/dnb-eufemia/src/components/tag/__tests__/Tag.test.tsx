import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
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

  it('renders the label', () => {
    const label = 'tags'
    render(<Tag.Group label={label} />)
    expect(screen.queryByTestId('tag-group-label')).not.toBeNull()
    expect(screen.queryByTestId('tag-group-label').textContent).toBe(label)
  })

  it('renders a tag group with multiple tag items by data prop', () => {
    render(
      <Tag.Group
        label="tags"
        data={[
          {
            text: 'Cat',
          },
          {
            text: 'Horse',
          },
          {
            text: 'Dog',
          },
        ]}
      />
    )

    expect(screen.queryAllByTestId('tag')).toHaveLength(3)
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
      const clickableClassName = 'dnb-tag--clickable'

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
      expect(screen.queryByRole('button').tabIndex).toBe(0)
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

  it('warns when Tag is used without a Tag.Group as parent component', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Tag text="Tag" />)
    expect(global.console.log).toBeCalled()
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
