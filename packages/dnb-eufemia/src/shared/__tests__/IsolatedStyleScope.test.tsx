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
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    expect(document.getElementById('content-child')).toBeInTheDocument()
  })

  it('applies custom style scope class', () => {
    render(
      <IsolatedStyleScope scopeHash="custom-scope">
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const scope =
      document.getElementById('content-child').parentElement.parentElement
    expect(scope).toHaveClass('custom-scope')
    expect(scope).toHaveAttribute('data-scope-hash', 'custom-scope')
  })

  it('uses auto-generated style scope when set to "auto"', () => {
    render(
      <IsolatedStyleScope scopeHash="auto">
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const scope =
      document.getElementById('content-child').parentElement.parentElement
    expect(scope).toHaveAttribute('data-scope-hash', 'auto')

    // The actual class will be a hash, so we just check that it exists
    expect(scope.className).toBeTruthy()
  })

  it('should include wrapper with "dnb-core-style" class', () => {
    render(
      <IsolatedStyleScope scopeHash="my-scope">
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const wrapper = document.getElementById('content-child').parentElement
    expect(wrapper).toHaveClass('dnb-core-style')

    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<div><div data-scope-hash="my-scope" data-scope-hash-id="default" class="my-scope"><div class="dnb-core-style"><div id="content-child">Test Content</div></div></div></div>"`
    )
  })

  it('disables core style wrapper when specified', () => {
    render(
      <IsolatedStyleScope scopeHash="my-scope" disableCoreStyleWrapper>
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const wrapper = document.getElementById('content-child').parentElement
    expect(wrapper).not.toHaveClass('dnb-core-style')

    expect(document.body.innerHTML).toMatchInlineSnapshot(
      `"<div><div data-scope-hash="my-scope" data-scope-hash-id="default" class="my-scope"><div id="content-child">Test Content</div></div></div>"`
    )
  })

  it('should support style property with CSS variables', () => {
    render(
      <IsolatedStyleScope
        style={{
          '--color-sea-green': 'tomato',
        }}
      >
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const scope =
      document.getElementById('content-child').parentElement.parentElement
    expect(scope).toHaveStyle('--color-sea-green: tomato;')
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

    expect(getStyleScopeRootElement('my-scope')).toBeUndefined()

    windowSpy.mockRestore()
    global.window = originalWindow
  })

  it('finds element with matching style scope class', () => {
    const div = document.createElement('div')
    div.className = 'my-scope'
    document.body.appendChild(div)

    expect(getStyleScopeRootElement('my-scope')).toBe(div)
  })

  it('finds element with default style scope class when scopeHash is "auto"', () => {
    const div = document.createElement('div')
    div.className = 'eufemia-scope--default'
    document.body.appendChild(div)

    expect(getStyleScopeRootElement('auto')).toBe(div)
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

describe('uniqueKey functionality', () => {
  it('uses default uniqueKey when not specified', () => {
    render(
      <IsolatedStyleScope scopeHash="my-scope">
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const scope =
      document.getElementById('content-child').parentElement.parentElement
    expect(scope).toHaveAttribute('data-scope-hash-id', 'default')
  })

  it('applies custom uniqueKey when specified', () => {
    render(
      <IsolatedStyleScope scopeHash="my-scope" uniqueKey="custom-key">
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const scope =
      document.getElementById('content-child').parentElement.parentElement
    expect(scope).toHaveAttribute('data-scope-hash-id', 'custom-key')
  })

  it('creates separate style scopes for different uniqueKeys', () => {
    render(
      <IsolatedStyleScope scopeHash="my-scope" uniqueKey="key1">
        <div id="outer-content">Outer Content</div>
        <IsolatedStyleScope scopeHash="auto" uniqueKey="key2">
          <div id="inner-content">Inner Content</div>
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    const outerContent = document.getElementById('outer-content')
    const innerContent = document.getElementById('inner-content')

    // Two separate style scope wrappers should exist
    const styleScopes = document.querySelectorAll('[data-scope-hash]')
    expect(styleScopes).toHaveLength(2)

    // Each should be in its own style scope
    expect(outerContent.parentElement.parentElement).toHaveAttribute(
      'data-scope-hash-id',
      'key1'
    )
    expect(innerContent.parentElement.parentElement).toHaveAttribute(
      'data-scope-hash-id',
      'key2'
    )

    // Each should have a different scopeHash
    expect(outerContent.parentElement.parentElement).toHaveAttribute(
      'data-scope-hash',
      'my-scope'
    )
    expect(innerContent.parentElement.parentElement).toHaveAttribute(
      'data-scope-hash',
      'my-scope'
    )

    // Both should share the same scopeHash
    expect(outerContent.parentElement.parentElement).toHaveClass(
      'my-scope'
    )
    expect(innerContent.parentElement.parentElement).toHaveClass(
      'my-scope'
    )
  })

  it('prevents duplicate style scopes when nested and the uniqueKey is the same', () => {
    render(
      <IsolatedStyleScope scopeHash="my-scope" uniqueKey="test-key">
        <div id="outer-content">Outer Content</div>
        {/* Keep the scopeHash="auto" because we want to test whats inside the first if check */}
        <IsolatedStyleScope scopeHash="auto" uniqueKey="test-key">
          <div id="inner-content">Inner Content</div>
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    const outerContent = document.getElementById('outer-content')
    const innerContent = document.getElementById('inner-content')

    const styleScopes = document.querySelectorAll('[data-scope-hash]')
    expect(styleScopes).toHaveLength(1)

    expect(innerContent.previousElementSibling).toBe(outerContent)
    expect(innerContent.parentElement.parentElement).toHaveClass(
      'my-scope'
    )

    expect(outerContent.parentElement.parentElement).toHaveClass(
      'my-scope'
    )
    expect(outerContent.parentElement.parentElement).toHaveAttribute(
      'data-scope-hash-id',
      'test-key'
    )
    expect(outerContent.parentElement.parentElement).toHaveAttribute(
      'data-scope-hash',
      'my-scope'
    )
  })

  it('creates style scope when uniqueKey is disabled', () => {
    render(
      <IsolatedStyleScope scopeHash="my-scope" uniqueKey={false}>
        <div id="content-child">Test Content</div>
      </IsolatedStyleScope>
    )

    const scope =
      document.getElementById('content-child').parentElement.parentElement
    expect(scope).toHaveClass('my-scope')
    expect(scope).toHaveAttribute('data-scope-hash', 'my-scope')
    expect(scope).not.toHaveAttribute('data-scope-hash-id')
  })

  it('allows nested style scopes when uniqueKey is disabled', () => {
    render(
      <IsolatedStyleScope scopeHash="my-scope" uniqueKey={false}>
        <div id="outer-content">Outer Content</div>
        <IsolatedStyleScope scopeHash="auto" uniqueKey={false}>
          <div id="inner-content">Inner Content</div>
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    const outerContent = document.getElementById('outer-content')
    const innerContent = document.getElementById('inner-content')

    const styleScopes = document.querySelectorAll('[data-scope-hash]')
    expect(styleScopes).toHaveLength(2)

    // Each should have its own style scope
    expect(outerContent.parentElement.parentElement).toHaveClass(
      'my-scope'
    )
    expect(outerContent.parentElement.parentElement).not.toHaveAttribute(
      'data-scope-hash-id'
    )
    expect(outerContent.parentElement.parentElement).toHaveAttribute(
      'data-scope-hash',
      'my-scope'
    )

    expect(innerContent.parentElement.parentElement).toHaveClass(
      'my-scope'
    )
    expect(innerContent.parentElement.parentElement).not.toHaveAttribute(
      'data-scope-hash-id'
    )
    expect(innerContent.parentElement.parentElement).toHaveAttribute(
      'data-scope-hash',
      'my-scope'
    )
  })
})
