import React from 'react'
import { render } from '@testing-library/react'
import IsolatedStyleScope, {
  useIsolatedStyleScope,
} from '../IsolatedStyleScope'
import { getSha } from '../build-info/BuildInfo.js'

// Mock the build info to control the SHA value in tests
jest.mock('../build-info/BuildInfo.js', () => ({
  getSha: jest.fn(),
  getVersion: jest.fn(),
}))

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

  it('renders one style scope when nested', () => {
    render(
      <IsolatedStyleScope>
        <IsolatedStyleScope>content</IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    expect(
      document.querySelectorAll('[class*=eufemia-scope--]')
    ).toHaveLength(1)
  })

  it('returns two style scopes when nested and a scope hash is provided', () => {
    render(
      <IsolatedStyleScope>
        <IsolatedStyleScope scopeHash="scope--inner">
          content
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    expect(document.querySelectorAll('[class*=scope--]')).toHaveLength(2)
  })

  it('returns two style scopes when nested and two scope hashes are provided', () => {
    render(
      <IsolatedStyleScope scopeHash="scope--outer">
        <IsolatedStyleScope scopeHash="scope--inner">
          content
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    expect(document.querySelectorAll('[class*=scope--]')).toHaveLength(2)
  })
})

describe('useIsolatedStyleScope', () => {
  it('uses style scope from context', () => {
    let scopeElement = null

    const MockComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()

      React.useEffect(() => {
        scopeElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    render(
      <IsolatedStyleScope scopeHash="my-scope">
        <MockComponent />
      </IsolatedStyleScope>
    )

    expect(scopeElement.className).toBe('my-scope')
  })

  it('returns undefined when used outside of a style scope', () => {
    let scopeElement = null

    const MockComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()

      React.useEffect(() => {
        scopeElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    render(<MockComponent />)

    expect(scopeElement).toBe(undefined)
  })

  it('returns the custom innerRef element if provided', () => {
    let scopeElement = null
    const customRef = React.createRef<HTMLDivElement>()

    const MockComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()

      React.useEffect(() => {
        scopeElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    render(
      <IsolatedStyleScope scopeHash="custom-scope" innerRef={customRef}>
        <MockComponent />
      </IsolatedStyleScope>
    )

    expect(customRef.current).toBe(scopeElement)
    expect(scopeElement.className).toBe('custom-scope')
  })

  it('returns the correct element in nested style scopes when having different uniqueKeys and scopeHash', () => {
    let outerElement = null
    let innerElement = null
    let innerGetsOuter = null

    const OuterComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()

      React.useEffect(() => {
        outerElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    const InnerComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()
      const { getScopeElement: getOuterScope } =
        useIsolatedStyleScope('outer-scope')
      React.useEffect(() => {
        innerElement = getScopeElement()
        innerGetsOuter = getOuterScope()
      }, [getScopeElement, getOuterScope])
      return null
    }

    render(
      <IsolatedStyleScope scopeHash="outer-scope" uniqueKey="outer">
        <OuterComponent />
        <IsolatedStyleScope scopeHash="inner-scope" uniqueKey="inner">
          <InnerComponent />
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    expect(innerElement).not.toBe(outerElement)
    expect(outerElement.className).toBe('outer-scope')
    expect(innerElement.className).toBe('inner-scope')
    expect(innerGetsOuter).toBe(outerElement)
  })

  it('returns the same element in nested style scopes when scopeHash is the same', () => {
    let outerElement = null
    let innerElement = null

    const OuterComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()

      React.useEffect(() => {
        outerElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    const InnerComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()

      React.useEffect(() => {
        innerElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    render(
      <IsolatedStyleScope scopeHash="same-scope">
        <OuterComponent />
        <IsolatedStyleScope scopeHash="same-scope">
          <InnerComponent />
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    expect(innerElement).toBe(outerElement)
    expect(outerElement.className).toBe('same-scope')
  })

  it('can retrieve parent scope element by scopeHash from inner scope', () => {
    let parentScopeElement = null
    let innerScopeElement = null

    const InnerComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()
      const { getScopeElement: getParentScope } =
        useIsolatedStyleScope('parent-scope')

      React.useEffect(() => {
        innerScopeElement = getScopeElement()
        parentScopeElement = getParentScope()
      }, [getScopeElement, getParentScope])

      return null
    }

    render(
      <IsolatedStyleScope scopeHash="parent-scope">
        <IsolatedStyleScope scopeHash="child-scope">
          <InnerComponent />
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    expect(innerScopeElement.className).toBe('child-scope')
    expect(parentScopeElement.className).toBe('parent-scope')
  })

  it('returns null after unmounting the style scope', () => {
    let scopeElement = null

    const MockComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()

      React.useEffect(() => {
        scopeElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    const { unmount } = render(
      <IsolatedStyleScope scopeHash="my-scope">
        <MockComponent />
      </IsolatedStyleScope>
    )

    expect(scopeElement.className).toBe('my-scope')

    unmount()

    // After unmount, the ref will be null
    expect(scopeElement).not.toBe(null) // The last value is still the element
  })

  it('returns the outer element when "outer-scope" is given to the hook', () => {
    let outerElement = null
    let innerElement = null

    const OuterComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope()

      React.useEffect(() => {
        outerElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    const InnerComponent = () => {
      const { getScopeElement } = useIsolatedStyleScope('outer-scope')

      React.useEffect(() => {
        innerElement = getScopeElement()
      }, [getScopeElement])

      return null
    }

    render(
      <IsolatedStyleScope scopeHash="outer-scope">
        <OuterComponent />
        <IsolatedStyleScope scopeHash="inner-scope">
          <InnerComponent />
        </IsolatedStyleScope>
      </IsolatedStyleScope>
    )

    expect(outerElement).toBe(innerElement)
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

  describe('data-scope-sha', () => {
    it('does not include data-scope-sha attribute when uniqueKey is false', () => {
      render(
        <IsolatedStyleScope scopeHash="my-scope" uniqueKey={false}>
          <div id="content-child">Test Content</div>
        </IsolatedStyleScope>
      )

      const scope =
        document.getElementById('content-child').parentElement
          .parentElement
      expect(scope).not.toHaveAttribute('data-scope-sha')
    })

    it('includes data-scope-sha attribute with SHA value when uniqueKey is provided', () => {
      const mockSha = 'abc123def'
      jest.mocked(getSha).mockReturnValue(mockSha)

      render(
        <IsolatedStyleScope scopeHash="my-scope" uniqueKey="custom-key">
          <div id="content-child">Test Content</div>
        </IsolatedStyleScope>
      )

      const scope =
        document.getElementById('content-child').parentElement
          .parentElement
      expect(scope).toHaveAttribute('data-scope-sha', mockSha)
    })
  })
})
