import React from 'react'
import { render } from '@testing-library/react'
import Theme from '../Theme'
import VisibilityByTheme from '../VisibilityByTheme'

describe('VisibilityByTheme', () => {
  it('should render content if not visible or hidden was given', () => {
    const Component = (props) => (
      <Theme name="eiendom" {...props}>
        <VisibilityByTheme>
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")
  })

  it('should render content on name match', () => {
    const Component = (props) => (
      <Theme name="eiendom" {...props}>
        <VisibilityByTheme visible="eiendom">
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    const { rerender } = render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="sbanken" />)

    expect(document.body.textContent).toBe('')
  })

  it('skips render when hidden matches', () => {
    const Component = (props) => (
      <Theme name="eiendom" {...props}>
        <VisibilityByTheme hidden="sbanken">
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    const { rerender } = render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="sbanken" />)

    expect(document.body.textContent).toBe('')

    rerender(<Component name="ui" />)

    expect(document.body.textContent).toBe("I'm visible")
  })

  it('prefers visible over hidden', () => {
    const Component = (props) => (
      <Theme name="eiendom" {...props}>
        <VisibilityByTheme visible="eiendom" hidden="sbanken">
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    const { rerender } = render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="sbanken" />)

    expect(document.body.textContent).toBe('')

    rerender(<Component name="eiendom" />)

    expect(document.body.textContent).toBe("I'm visible")
  })

  it('should render content on match from names in an array', () => {
    const Component = (props) => (
      <Theme name="eiendom" {...props}>
        <VisibilityByTheme visible={['eiendom', 'sbanken']}>
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    const { rerender } = render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="sbanken" />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="ui" />)

    expect(document.body.textContent).toBe('')
  })

  it('should render content on match from names in an object inside an array', () => {
    const Component = (props) => (
      <Theme name="eiendom" {...props}>
        <VisibilityByTheme
          visible={[{ name: 'eiendom' }, { name: 'sbanken' }]}
        >
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    const { rerender } = render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="sbanken" />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="ui" />)

    expect(document.body.textContent).toBe('')
  })

  it('should render content on match by several theme criteria', () => {
    const Component = (props) => (
      <Theme name="eiendom" variant="red" {...props}>
        <VisibilityByTheme
          visible={[
            { name: 'eiendom', variant: 'red' },
            { name: 'sbanken', variant: 'blue' },
          ]}
        >
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    const { rerender } = render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="sbanken" />)

    expect(document.body.textContent).toBe('')

    rerender(<Component name="sbanken" variant="blue" />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component name="sbanken" variant="red" />)

    expect(document.body.textContent).toBe('')
  })
})
