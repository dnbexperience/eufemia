import { render } from '@testing-library/react'
import Theme from '../Theme'
import type { ThemeNames } from '../Theme'
import VisibilityByTheme from '../VisibilityByTheme'

describe('VisibilityByTheme', () => {
  it('renders content if not visible or hidden was given', () => {
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

  it('renders content on brand match', () => {
    const Component = (props) => (
      <Theme brand="eiendom" {...props}>
        <VisibilityByTheme visible="eiendom">
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    const { rerender } = render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component brand="sbanken" />)

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

  it('renders content on match from names in an array', () => {
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

  it('renders content on match from brands in an object inside an array', () => {
    const Component = (props) => (
      <Theme brand="eiendom" {...props}>
        <VisibilityByTheme
          visible={[{ brand: 'eiendom' }, { brand: 'sbanken' }]}
        >
          <p>I'm visible</p>
        </VisibilityByTheme>
      </Theme>
    )

    const { rerender } = render(<Component />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component brand="sbanken" />)

    expect(document.body.textContent).toBe("I'm visible")

    rerender(<Component brand="ui" />)

    expect(document.body.textContent).toBe('')
  })

  it('renders content on match by several theme criteria', () => {
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

  describe('without a theme context', () => {
    it('renders content if not visible or hidden was given', () => {
      render(
        <VisibilityByTheme>
          <p>I'm visible</p>
        </VisibilityByTheme>
      )

      expect(document.body.textContent).toBe("I'm visible")
    })

    it('skips render when visible was given as a brand', () => {
      render(
        <VisibilityByTheme visible="sbanken">
          <p>I'm visible</p>
        </VisibilityByTheme>
      )

      expect(document.body.textContent).toBe('')
    })

    it('skips render when visible was given as an object', () => {
      render(
        <VisibilityByTheme visible={[{ brand: 'sbanken' }]}>
          <p>I'm visible</p>
        </VisibilityByTheme>
      )

      expect(document.body.textContent).toBe('')
    })

    it('renders content when hidden was given', () => {
      render(
        <VisibilityByTheme hidden="sbanken">
          <p>I'm visible</p>
        </VisibilityByTheme>
      )

      expect(document.body.textContent).toBe("I'm visible")
    })
  })
})

describe('VisibilityByTheme.Brand', () => {
  it.each([
    ['ui', 'DNB'],
    ['sbanken', 'Sbanken'],
    ['eiendom', 'Eiendom'],
    ['carnegie', 'Carnegie'],
  ] as const)('renders the label of the %s brand', (brand, label) => {
    render(
      <Theme brand={brand}>
        <VisibilityByTheme.Brand />
      </Theme>
    )

    expect(document.body.textContent).toBe(label)
  })

  it('renders nothing when the brand is unknown', () => {
    render(
      <Theme brand={'unknown' as ThemeNames}>
        <VisibilityByTheme.Brand />
      </Theme>
    )

    expect(document.body.textContent).toBe('')
  })

  it('renders nothing without a theme context', () => {
    render(<VisibilityByTheme.Brand />)

    expect(document.body.textContent).toBe('')
  })
})

describe('VisibilityByTheme.Name', () => {
  it.each([
    ['ui', 'DNB'],
    ['sbanken', 'Sbanken'],
    ['eiendom', 'Eiendom'],
    ['carnegie', 'Carnegie'],
  ] as const)(
    'renders the same label as Brand for the %s brand',
    (brand, label) => {
      const { unmount } = render(
        <Theme brand={brand}>
          <VisibilityByTheme.Name />
        </Theme>
      )

      expect(document.body.textContent).toBe(label)

      unmount()

      render(
        <Theme brand={brand}>
          <VisibilityByTheme.Brand />
        </Theme>
      )

      expect(document.body.textContent).toBe(label)
    }
  )

  it('renders nothing without a theme context', () => {
    render(<VisibilityByTheme.Name />)

    expect(document.body.textContent).toBe('')
  })
})
