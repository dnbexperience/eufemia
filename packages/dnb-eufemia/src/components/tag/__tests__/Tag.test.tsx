import React from 'react'
import { render, screen } from '@testing-library/react'
import Tag from '../Tag'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { Provider } from '../../../shared'

describe('Tag', () => {
  it('renders without properties', () => {
    render(<Tag />)

    expect(screen.queryByTestId('tag')).not.toBeNull()
  })

  it('renders a tag with content by text prop', () => {
    const text = 'This is a tag'

    render(<Tag text="This is a tag" />)

    expect(screen.queryByTestId('tag-text')).not.toBeNull()
    expect(screen.queryByTestId('tag-text').textContent).toBe(text)
  })

  it('renders a tag with content by children prop', () => {
    const text = 'This is a tag'

    render(<Tag>{text}</Tag>)

    expect(screen.queryByTestId('tag-text')).not.toBeNull()
    expect(screen.queryByTestId('tag-text').textContent).toBe(text)
  })

  it('renders a tag with content if both text and children prop is used', () => {
    const text = 'This is a tag'

    render(<Tag text={text}>{text}</Tag>)

    expect(screen.queryByTestId('tag-text')).not.toBeNull()
    expect(screen.queryByTestId('tag-text').textContent).toBe(text)
  })

  it('renders a tag with skeleton if skeleton is true', () => {
    const skeletonClassName = 'dnb-skeleton'

    render(<Tag skeleton>ClassName</Tag>)
    expect(screen.queryByTestId('tag').className).toMatch(
      skeletonClassName
    )
  })

  it('renders a tag with provider', () => {
    render(
      <Provider locale="en-GB">
        <Tag text="With provider" />
      </Provider>
    )

    expect(screen.queryByTestId('tag-text')).not.toBeNull()
  })
})

describe('Tag aria', () => {
  it('should validate', async () => {
    const Component = render(<Tag text="Tag aria" />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Tag scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tag.scss'))
    expect(scss).toMatchSnapshot()
  })
})
