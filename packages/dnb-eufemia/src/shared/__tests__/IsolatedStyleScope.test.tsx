import React from 'react'
import { render } from '@testing-library/react'
import IsolatedStyleScope, {
  getStyleScopeRootElement,
  useStyleScopeRootElement,
} from '../IsolatedStyleScope'

describe('StyleScope', () => {
  it('renders children without style scope when none provided', () => {
    render(
      <IsolatedStyleScope>
        <div id="test-child">Test Content</div>
      </IsolatedStyleScope>
    )

    expect(document.getElementById('test-child')).toBeInTheDocument()
  })

  it('applies custom style scope class', () => {
    render(
      <IsolatedStyleScope scopeHash="custom-scope">
        <div id="test-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const wrapper =
      document.getElementById('test-child').parentElement.parentElement
    expect(wrapper).toHaveClass('custom-scope')
    expect(wrapper).toHaveAttribute('data-style-scope', 'custom-scope')
  })

  it('uses auto-generated style scope when set to "auto"', () => {
    render(
      <IsolatedStyleScope scopeHash="auto">
        <div id="test-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const wrapper =
      document.getElementById('test-child').parentElement.parentElement
    expect(wrapper).toHaveAttribute('data-style-scope', 'auto')

    // The actual class will be a hash, so we just check that it exists
    expect(wrapper.className).toBeTruthy()
  })

  it('disables core style wrapper when specified', () => {
    render(
      <IsolatedStyleScope scopeHash="test-scope" disableCoreStyleWrapper>
        <div id="test-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const wrapper = document.getElementById('test-child').parentElement
    expect(wrapper).not.toHaveClass('dnb-core-style')

    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<div><div data-style-scope="test-scope" class="test-scope"><div id="test-child">Test Content</div></div></div>"`
    )
  })

  it('merges custom className with style scope', () => {
    render(
      <IsolatedStyleScope scopeHash="test-scope" className="custom-class">
        <div id="test-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const wrapper =
      document.getElementById('test-child').parentElement.parentElement
    expect(wrapper).toHaveClass('test-scope', 'custom-class')
  })
})

describe('getStyleScopeRootElement', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('returns fallback element when no style scope provided', () => {
    expect(getStyleScopeRootElement()).toBe(document.body)
  })

  it('returns undefined when window is not defined', () => {
    const originalWindow = global.window
    const windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(() => undefined)

    expect(getStyleScopeRootElement('test-scope')).toBeUndefined()

    windowSpy.mockRestore()
    global.window = originalWindow
  })

  it('finds element with matching style scope class', () => {
    const div = document.createElement('div')
    div.className = 'test-scope'
    document.body.appendChild(div)

    expect(getStyleScopeRootElement('test-scope')).toBe(div)
  })
})

describe('useStyleScopeRootElement', () => {
  it('uses style scope from context', () => {
    let scopeElement = null

    const TestComponent = () => {
      const { getElement } = useStyleScopeRootElement()
      React.useEffect(() => {
        scopeElement = getElement()
      }, [getElement])

      return null
    }

    render(
      <IsolatedStyleScope scopeHash="my-scope">
        <TestComponent />
      </IsolatedStyleScope>
    )

    expect(scopeElement.className).toBe('my-scope')
  })
})
