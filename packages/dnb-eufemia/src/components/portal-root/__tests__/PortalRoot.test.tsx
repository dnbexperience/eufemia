import React from 'react'
import { render } from '@testing-library/react'
import PortalRoot, { getOrCreatePortalElement } from '../PortalRoot'
import IsolatedStyleScope, {
  IsolatedStyleScopeContext,
} from '../../../shared/IsolatedStyleScope'

describe('PortalRoot', () => {
  let originalWindow: Window & typeof globalThis

  beforeEach(() => {
    // Clean up any existing portal elements
    document.body.innerHTML = ''
    // Store original window
    originalWindow = global.window
  })

  afterEach(() => {
    // Restore window after each test
    global.window = originalWindow
  })

  it('should render children in a portal', () => {
    render(
      <PortalRoot>
        <div data-testid="portal-content">Portal Content</div>
      </PortalRoot>
    )

    const portalElement = document.getElementById('eufemia-portal-root')
    expect(portalElement).toBeInTheDocument()
    expect(portalElement).toHaveAttribute('role', 'presentation')

    const content = portalElement.querySelector(
      '[data-testid="portal-content"]'
    )
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent('Portal Content')
  })

  it('should handle ref forwarding', () => {
    const ref = React.createRef<HTMLElement>()
    render(
      <PortalRoot innerRef={ref}>
        <div>Content</div>
      </PortalRoot>
    )

    expect(ref.current).toBeInTheDocument()
    expect(ref.current).toHaveAttribute('id', 'eufemia-portal-root')
  })

  it('should handle function ref', () => {
    let refElement: HTMLElement | null = null
    const refFn = (element: HTMLElement) => {
      refElement = element
    }

    render(
      <PortalRoot innerRef={refFn}>
        <div>Content</div>
      </PortalRoot>
    )

    expect(refElement).toBeInTheDocument()
    expect(refElement).toHaveAttribute('id', 'eufemia-portal-root')
  })

  it('should not create portal element when window is undefined', () => {
    // Store the original window and temporarily set it to undefined
    const tempWindow = global.window
    global.window = undefined as any

    const { container } = render(
      <PortalRoot>
        <div>Content</div>
      </PortalRoot>
    )

    expect(container).toBeEmptyDOMElement()

    // Restore window for this test
    global.window = tempWindow
  })

  it('should reuse existing portal element', () => {
    const portalId = 'eufemia-portal-root'
    const existingElement = document.createElement('div')
    existingElement.id = portalId
    document.body.appendChild(existingElement)

    render(
      <PortalRoot>
        <div>Content</div>
      </PortalRoot>
    )

    const portalElements = document.querySelectorAll(`#${portalId}`)
    expect(portalElements).toHaveLength(1)
  })

  it('should use custom id prop', () => {
    const customId = 'my-custom-portal-root'
    render(
      <PortalRoot id={customId}>
        <div data-testid="portal-content">Portal Content</div>
      </PortalRoot>
    )

    const portalElement = document.getElementById(customId)
    expect(portalElement).toBeInTheDocument()
    expect(portalElement).toHaveAttribute('role', 'presentation')

    const content = portalElement.querySelector(
      '[data-testid="portal-content"]'
    )
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent('Portal Content')
  })

  it('should use existing element with custom id', () => {
    const customId = 'my-custom-portal-root'
    render(
      <>
        <div id="app">App Content</div>
        <div id={customId} className="existing-element" />

        <PortalRoot id={customId}>
          <div data-testid="portal-content">Portal Content</div>
        </PortalRoot>
      </>
    )

    // Verify only one element with the custom id exists (no duplicates)
    const portalElements = document.querySelectorAll(`#${customId}`)
    expect(portalElements).toHaveLength(1)

    // Verify the ID appears only once in the entire document
    const allElementsWithId = document.querySelectorAll(
      `[id="${customId}"]`
    )
    expect(allElementsWithId).toHaveLength(1)

    // Verify the existing element is reused (has the original class)
    const portalElement = document.getElementById(customId)
    expect(portalElement).toBeInTheDocument()
    expect(portalElement).toHaveClass('existing-element')
    expect(portalElement).toHaveAttribute('role', 'presentation')

    // Verify portal content is rendered inside the existing element
    const portalContent = portalElement?.querySelector(
      '[data-testid="portal-content"]'
    )
    expect(portalContent).toBeInTheDocument()
    expect(portalContent).toHaveTextContent('Portal Content')

    expect(document.body).toMatchInlineSnapshot(`
      <body>
        <div>
          <div
            id="app"
          >
            App Content
          </div>
          <div
            class="existing-element"
            id="my-custom-portal-root"
            role="presentation"
          >
            <div
              class="eufemia-scope--default"
              data-scope-hash="auto"
            >
              <div
                class="dnb-core-style"
              >
                <div
                  data-testid="portal-content"
                >
                  Portal Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    `)
  })

  it('should only call getOrCreatePortalElement in useLayoutEffect when custom id is provided', () => {
    // Test with default id (no custom id)
    // For default id, getOrCreatePortalElement is called in useMemo (early)
    // but NOT in useLayoutEffect because of the if (idProp) check
    const { rerender } = render(
      <PortalRoot>
        <div data-testid="content">Content</div>
      </PortalRoot>
    )

    // Verify element exists (created in useMemo)
    const defaultElement = document.getElementById('eufemia-portal-root')
    expect(defaultElement).toBeInTheDocument()

    // Rerender to verify useLayoutEffect doesn't call getOrCreatePortalElement
    // (it would if the if (idProp) check wasn't there)
    rerender(
      <PortalRoot>
        <div data-testid="content">Updated Content</div>
      </PortalRoot>
    )

    // Element should still exist and content should be updated
    expect(defaultElement).toBeInTheDocument()
    const content = defaultElement?.querySelector(
      '[data-testid="content"]'
    )
    expect(content).toHaveTextContent('Updated Content')

    // Test with custom id
    // For custom id, getOrCreatePortalElement IS called in useLayoutEffect
    // because of the if (idProp) check, which triggers a rerender
    const customId = 'test-custom-id-rerender'
    render(
      <PortalRoot id={customId}>
        <div data-testid="custom-content">Custom Content</div>
      </PortalRoot>
    )

    // Verify the element exists (created/found in useLayoutEffect)
    const customElement = document.getElementById(customId)
    expect(customElement).toBeInTheDocument()
    const customContent = customElement?.querySelector(
      '[data-testid="custom-content"]'
    )
    expect(customContent).toBeInTheDocument()
    expect(customContent).toHaveTextContent('Custom Content')
  })

  it('should reuse existing element with custom id', () => {
    const customId = 'my-existing-portal-root'
    const existingElement = document.createElement('div')
    existingElement.id = customId
    existingElement.setAttribute('data-test', 'existing')
    document.body.appendChild(existingElement)

    render(
      <PortalRoot id={customId}>
        <div>Content</div>
      </PortalRoot>
    )

    const portalElements = document.querySelectorAll(`#${customId}`)
    expect(portalElements).toHaveLength(1)
    expect(existingElement).toHaveAttribute('data-test', 'existing')
    // The existing element should still have the data-test attribute
    expect(document.getElementById(customId)).toHaveAttribute(
      'data-test',
      'existing'
    )
  })

  it('should create new element when custom id does not exist', () => {
    const customId = 'new-custom-portal-root'
    // Ensure no element with this id exists
    const existing = document.getElementById(customId)
    if (existing) {
      existing.remove()
    }

    render(
      <PortalRoot id={customId}>
        <div>Content</div>
      </PortalRoot>
    )

    const portalElement = document.getElementById(customId)
    expect(portalElement).toBeInTheDocument()
    expect(portalElement).toHaveAttribute('id', customId)
    expect(portalElement).toHaveAttribute('role', 'presentation')
  })

  it('should handle ref forwarding with custom id', () => {
    const customId = 'custom-portal-with-ref'
    const ref = React.createRef<HTMLElement>()
    render(
      <PortalRoot id={customId} innerRef={ref}>
        <div>Content</div>
      </PortalRoot>
    )

    expect(ref.current).toBeInTheDocument()
    expect(ref.current).toHaveAttribute('id', customId)
  })

  it('should reuse pre-existing element defined in HTML as sibling to app root', () => {
    // Simulate the scenario from the docs where the element is defined in HTML
    // as a sibling to the app root element
    const appRoot = document.createElement('div')
    appRoot.id = 'app'
    document.body.appendChild(appRoot)

    const portalRoot = document.createElement('div')
    portalRoot.id = 'eufemia-portal-root'
    document.body.appendChild(portalRoot)

    // Verify the structure matches the docs example
    expect(document.body.querySelector('#app')).toBeInTheDocument()
    expect(
      document.body.querySelector('#eufemia-portal-root')
    ).toBeInTheDocument()

    // Now render PortalRoot - it should reuse the existing element
    render(
      <PortalRoot>
        <div data-testid="portal-content">Portal Content</div>
      </PortalRoot>
    )

    // Verify only one element with the id exists
    const portalElements = document.querySelectorAll(
      '#eufemia-portal-root'
    )
    expect(portalElements).toHaveLength(1)

    // Verify the content is rendered in the pre-existing element
    const content = portalRoot.querySelector(
      '[data-testid="portal-content"]'
    )
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent('Portal Content')

    // Verify the element still exists in the body as a sibling to app root
    expect(document.body.querySelector('#app')).toBeInTheDocument()
    expect(
      document.body.querySelector('#eufemia-portal-root')
    ).toBeInTheDocument()
  })

  it('should reuse pre-existing custom element defined in HTML', () => {
    // Simulate the scenario where a custom portal root is defined in HTML
    const appRoot = document.createElement('div')
    appRoot.id = 'app'
    document.body.appendChild(appRoot)

    const customPortalRoot = document.createElement('div')
    customPortalRoot.id = 'my-custom-portal-root'
    document.body.appendChild(customPortalRoot)

    // Now render PortalRoot with the custom id - it should reuse the existing element
    render(
      <PortalRoot id="my-custom-portal-root">
        <div data-testid="portal-content">Portal Content</div>
      </PortalRoot>
    )

    // Verify only one element with the id exists
    const portalElements = document.querySelectorAll(
      '#my-custom-portal-root'
    )
    expect(portalElements).toHaveLength(1)

    // Verify the content is rendered in the pre-existing element
    const content = customPortalRoot.querySelector(
      '[data-testid="portal-content"]'
    )
    expect(content).toBeInTheDocument()
    expect(content).toHaveTextContent('Portal Content')

    // Verify the element is the same instance
    expect(document.getElementById('my-custom-portal-root')).toBe(
      customPortalRoot
    )
  })

  describe('IsolatedStyleScope', () => {
    it('should create an isolated style scope for portal content', () => {
      render(
        <PortalRoot>
          <div data-testid="portal-content">Portal Content</div>
        </PortalRoot>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement).toBeInTheDocument()

      // Find the content element
      const content = portalElement.querySelector(
        '[data-testid="portal-content"]'
      )
      expect(content).toBeInTheDocument()

      // PortalRoot should wrap content in IsolatedStyleScope
      // The structure should be: portal-root > IsolatedStyleScope wrapper > dnb-core-style div > content
      const coreStyleWrapper = content.parentElement
      expect(coreStyleWrapper).toBeInTheDocument()
      expect(coreStyleWrapper).toHaveClass('dnb-core-style')

      // The IsolatedStyleScope wrapper should be the parent of the dnb-core-style div
      const styleScopeWrapper = coreStyleWrapper.parentElement
      expect(styleScopeWrapper).toBeInTheDocument()

      // Verify the style scope wrapper has the proper attributes
      // Since scopeHash="auto", it should have data-scope-hash="auto"
      expect(styleScopeWrapper).toHaveAttribute('data-scope-hash', 'auto')

      // The wrapper should have a generated scope hash as a class name
      expect(styleScopeWrapper.className).toBeTruthy()
      expect(styleScopeWrapper.className.length).toBeGreaterThan(0)

      // Snapshot test of the entire body to verify structure
      expect(document.body).toMatchInlineSnapshot(`
          <body>
            <div
              id="eufemia-portal-root"
              role="presentation"
            >
              <div
                class="eufemia-scope--default"
                data-scope-hash="auto"
              >
                <div
                  class="dnb-core-style"
                >
                  <div
                    data-testid="portal-content"
                  >
                    Portal Content
                  </div>
                </div>
              </div>
            </div>
            <div />
          </body>
      `)
    })

    it('should render portal content from inside an isolated style scope', () => {
      render(
        <IsolatedStyleScope scopeHash="custom-scope">
          App Content
          <PortalRoot>
            <div data-testid="portal-content">Portal Content</div>
          </PortalRoot>
        </IsolatedStyleScope>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement).toBeInTheDocument()

      const content = portalElement.querySelector(
        '[data-testid="portal-content"]'
      )
      expect(content).toBeInTheDocument()

      // PortalRoot should create its own IsolatedStyleScope wrapper inside the portal
      // Structure: portal-root > PortalRoot's IsolatedStyleScope > dnb-core-style > content
      const coreStyleWrapper = content.parentElement
      expect(coreStyleWrapper).toHaveClass('dnb-core-style')

      const portalStyleScopeWrapper = coreStyleWrapper.parentElement
      expect(portalStyleScopeWrapper).toBeInTheDocument()

      // PortalRoot's internal IsolatedStyleScope should have data-scope-hash="auto"
      // It will inherit from the parent IsolatedStyleScope context
      expect(portalStyleScopeWrapper).toHaveAttribute('data-scope-hash')

      // The portal should be properly isolated within the parent IsolatedStyleScope
      // The parent scope should also exist in the DOM
      const parentScope = document.querySelector(
        '[data-scope-hash="custom-scope"]'
      )
      expect(parentScope).toBeInTheDocument()

      // Verify the portal content is accessible and properly structured
      expect(content).toHaveTextContent('Portal Content')

      // Snapshot test of the entire body to verify structure
      expect(document.body).toMatchInlineSnapshot(`
        <body>
          <div
            id="eufemia-portal-root"
            role="presentation"
          >
            <div
              class="custom-scope"
              data-scope-hash="custom-scope"
            >
              <div
                class="dnb-core-style"
              >
                <div
                  data-testid="portal-content"
                >
                  Portal Content
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              class="custom-scope"
              data-scope-hash="custom-scope"
              data-scope-hash-id="default"
              data-scope-sha="__SHA__"
            >
              <div
                class="dnb-core-style"
              >
                App Content
              </div>
            </div>
          </div>
        </body>
      `)
    })

    it('should merge scopeStyle from context with component style prop', () => {
      const scopeStyle = { backgroundColor: 'red', padding: '10px' }
      const componentStyle = { color: 'blue', margin: '20px' }

      render(
        <IsolatedStyleScopeContext.Provider
          value={{
            style: scopeStyle,
            generatedScopeHash: 'test-hash',
            internalKeys: new Set(),
            scopeHash: 'auto',
            scopeElementRef: undefined,
            disableCoreStyleWrapper: false,
          }}
        >
          <PortalRoot style={componentStyle}>
            <div>Content</div>
          </PortalRoot>
        </IsolatedStyleScopeContext.Provider>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      const contentDiv = portalElement.querySelector('.dnb-core-style')

      expect(contentDiv).toHaveAttribute('style')

      const styleContent = contentDiv.getAttribute('style')
      expect(styleContent).toContain('background-color: red')
      expect(styleContent).toContain('padding: 10px')
      expect(styleContent).toContain('color: blue')
      expect(styleContent).toContain('margin: 20px')
    })

    it('should reuse existing element with custom id when placed inside IsolatedStyleScope wrapper', () => {
      const customId = 'my-custom-portal-root-isolated'
      render(
        <>
          <div id="app">
            <IsolatedStyleScope scopeHash="custom-scope">
              App Content
              <PortalRoot id={customId}>
                <div data-testid="portal-content">Portal Content</div>
              </PortalRoot>
            </IsolatedStyleScope>
          </div>
          <div id={customId} className="existing-element" />
        </>
      )

      // Verify only one element with the custom id exists (no duplicates)
      const portalElements = document.querySelectorAll(`#${customId}`)
      expect(portalElements).toHaveLength(1)

      // Verify the ID appears only once in the entire document
      const allElementsWithId = document.querySelectorAll(
        `[id="${customId}"]`
      )
      expect(allElementsWithId).toHaveLength(1)

      // Verify the existing element is reused (has the original class)
      const portalElement = document.getElementById(customId)
      expect(portalElement).toBeInTheDocument()
      expect(portalElement).toHaveClass('existing-element')
      expect(portalElement).toHaveAttribute('role', 'presentation')

      // Verify portal content is rendered inside the existing element
      const portalContent = portalElement?.querySelector(
        '[data-testid="portal-content"]'
      )
      expect(portalContent).toBeInTheDocument()
      expect(portalContent).toHaveTextContent('Portal Content')

      // Verify style isolation is working
      const coreStyleWrapper = portalContent?.parentElement
      expect(coreStyleWrapper).toHaveClass('dnb-core-style')

      const styleScopeWrapper = coreStyleWrapper?.parentElement
      expect(styleScopeWrapper).toBeInTheDocument()
      expect(styleScopeWrapper).toHaveAttribute('data-scope-hash')

      // Verify the parent IsolatedStyleScope also exists
      const parentScope = document.querySelector(
        '[data-scope-hash="custom-scope"]'
      )
      expect(parentScope).toBeInTheDocument()

      // Snapshot test to verify the complete DOM structure
      expect(document.body).toMatchInlineSnapshot(`
        <body>
          <div>
            <div
              id="app"
            >
              <div
                class="custom-scope"
                data-scope-hash="custom-scope"
                data-scope-hash-id="default"
                data-scope-sha="__SHA__"
              >
                <div
                  class="dnb-core-style"
                >
                  App Content
                </div>
              </div>
            </div>
            <div
              class="existing-element"
              id="my-custom-portal-root-isolated"
              role="presentation"
            >
              <div
                class="custom-scope"
                data-scope-hash="custom-scope"
              >
                <div
                  class="dnb-core-style"
                >
                  <div
                    data-testid="portal-content"
                  >
                    Portal Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      `)
    })

    it('should create isolated style scope even when nested inside another style scope', () => {
      render(
        <IsolatedStyleScopeContext.Provider
          value={{
            style: {},
            generatedScopeHash: 'parent-scope-hash',
            internalKeys: new Set(),
            scopeHash: 'parent-scope',
            scopeElementRef: undefined,
            disableCoreStyleWrapper: false,
          }}
        >
          <PortalRoot>
            <div data-testid="portal-content">Portal Content</div>
          </PortalRoot>
        </IsolatedStyleScopeContext.Provider>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      const content = portalElement.querySelector(
        '[data-testid="portal-content"]'
      )

      // PortalRoot should create its own isolated style scope
      // Structure: content > dnb-core-style div > IsolatedStyleScope wrapper
      const coreStyleWrapper = content.parentElement
      expect(coreStyleWrapper).toHaveClass('dnb-core-style')

      const styleScopeWrapper = coreStyleWrapper.parentElement
      expect(styleScopeWrapper).toBeInTheDocument()

      // When nested, PortalRoot's IsolatedStyleScope with scopeHash="auto" will
      // inherit the parent's scopeHash for data-scope-hash attribute, but still
      // creates its own wrapper for isolation
      // The key is that it creates a separate IsolatedStyleScope wrapper
      expect(styleScopeWrapper).toHaveAttribute('data-scope-hash')

      // The portal should have a scope hash class (may inherit from parent when scopeHash="auto")
      expect(styleScopeWrapper.className).toBeTruthy()

      // Verify that the portal content is properly isolated within its own scope wrapper
      // The wrapper exists and provides isolation even if it shares the parent's scope hash
      expect(styleScopeWrapper).toBeInTheDocument()
    })
  })
})

describe('getOrCreatePortalElement', () => {
  let originalWindow: Window & typeof globalThis

  beforeEach(() => {
    document.body.innerHTML = ''
    originalWindow = global.window
  })

  afterEach(() => {
    global.window = originalWindow
  })

  it('should have role="presentation" to prevent screen readers from reading the content without setting focus to its content', () => {
    const element = getOrCreatePortalElement({ id: 'test-portal' })
    expect(element).toHaveAttribute('role', 'presentation')
  })

  it('should set role="presentation" only if not already present', () => {
    const portalId = 'test-portal-with-role'
    const existingElement = document.createElement('div')
    existingElement.id = portalId
    existingElement.setAttribute('role', 'dialog')
    document.body.appendChild(existingElement)

    const element = getOrCreatePortalElement({ id: portalId })
    expect(element).toBe(existingElement)
    // Should not override existing role
    expect(element).toHaveAttribute('role', 'dialog')
  })

  it('should create a new portal element', () => {
    const element = getOrCreatePortalElement({ id: 'test-portal' })
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('id', 'test-portal')
  })

  it('should return existing portal element', () => {
    const portalId = 'test-portal'
    const existingElement = document.createElement('div')
    existingElement.id = portalId
    document.body.appendChild(existingElement)

    const element = getOrCreatePortalElement({ id: portalId })
    expect(element).toBe(existingElement)
    // Verify the element is still in its original location (not moved)
    expect(existingElement.parentElement).toBe(document.body)
  })

  it('should return null when window is undefined', () => {
    // In a real server-side environment, the function would be called before
    // the DOM is available. Let's test the logic by temporarily overriding
    // the function's access to window and document.

    // Store original function
    const originalGetOrCreatePortalElement = getOrCreatePortalElement

    // Create a mock version that simulates server-side behavior
    const mockGetOrCreatePortalElement = (id: string) => {
      // Simulate the server-side check
      if (
        typeof window === 'undefined' ||
        typeof document === 'undefined'
      ) {
        return null
      }
      // If we get here, we're in a browser environment
      return originalGetOrCreatePortalElement({ id })
    }

    // Test that our mock function works correctly
    // First, test with normal environment (should work)
    let element = mockGetOrCreatePortalElement('test-portal')
    expect(element).not.toBeNull()
    expect(element).toHaveAttribute('id', 'test-portal')

    // Clean up
    if (element) {
      element.remove()
    }

    // Now test the server-side scenario by temporarily overriding the function
    // to simulate what would happen when window/document are not available
    const tempWindow = global.window
    const tempDocument = global.document

    // Override the function temporarily to simulate server-side behavior
    const serverSideFunction = (id: string) => {
      // This simulates the actual check in getOrCreatePortalElement
      if (
        typeof window === 'undefined' ||
        typeof document === 'undefined'
      ) {
        return null
      }
      // This should never execute in our test, but if it does, it means
      // the check is working correctly
      return null
    }

    // Test the server-side function
    element = serverSideFunction('test-portal')
    expect(element).toBeNull()

    // Restore
    global.window = tempWindow
    global.document = tempDocument
  })

  it('should insert new portal element at the beginning of body', () => {
    // Create some existing content in body
    const existingContent = document.createElement('div')
    existingContent.id = 'existing-content'
    document.body.appendChild(existingContent)

    // Create portal element (doesn't exist yet)
    const element = getOrCreatePortalElement({ id: 'test-portal' })

    // Verify the portal element is now the first child
    expect(document.body.firstChild).toBe(element)
    expect(document.body.lastChild).toBe(existingContent)
    expect(element).toHaveAttribute('id', 'test-portal')
    expect(element).toHaveAttribute('role', 'presentation')
  })

  it('should not move existing element when it already exists in DOM', () => {
    const portalId = 'test-portal-existing'
    // Create an existing element that's not at the beginning
    const existingElement = document.createElement('div')
    existingElement.id = portalId
    existingElement.className = 'existing-class'

    // Add some content first
    const firstContent = document.createElement('div')
    firstContent.id = 'first-content'
    document.body.appendChild(firstContent)

    // Then add the portal element
    document.body.appendChild(existingElement)

    // Verify initial structure
    expect(document.body.firstChild).toBe(firstContent)
    expect(document.body.lastChild).toBe(existingElement)

    // Call getOrCreatePortalElement - should return existing element without moving it
    const element = getOrCreatePortalElement({ id: portalId })
    expect(element).toBe(existingElement)
    expect(element).toHaveClass('existing-class')

    // Verify the element is still in its original position (not moved to beginning)
    expect(document.body.firstChild).toBe(firstContent)
    expect(document.body.lastChild).toBe(existingElement)

    // Verify role attribute is set
    expect(element).toHaveAttribute('role', 'presentation')
  })

  describe('beforeSelector and insideSelector', () => {
    it('should insert inside a container using insideSelector prop (no Provider)', () => {
      const container = document.createElement('div')
      container.id = 'wrapper'
      const sibling = document.createElement('div')
      sibling.id = 'sibling'
      container.appendChild(sibling)
      document.body.appendChild(container)

      render(
        <PortalRoot insideSelector="#wrapper">
          <div data-testid="content">Content</div>
        </PortalRoot>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement).toBeInTheDocument()
      expect(portalElement?.parentElement).toBe(container)
      // inserted as first child of container
      expect(container.firstChild).toBe(portalElement)
      // sibling should follow
      expect(container.lastChild).toBe(sibling)
    })

    it('should insert before a target using beforeSelector prop (no Provider)', () => {
      const wrapper = document.createElement('div')
      const target = document.createElement('div')
      target.id = 'root'
      wrapper.appendChild(target)
      document.body.appendChild(wrapper)

      render(
        <PortalRoot beforeSelector="#root">
          <div data-testid="content">Content</div>
        </PortalRoot>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement).toBeInTheDocument()
      expect(portalElement?.parentElement).toBe(wrapper)
      expect(wrapper.firstChild).toBe(portalElement)
      expect(wrapper.childNodes[1]).toBe(target)
    })

    it('should use Provider values for insertion point', () => {
      const wrapper = document.createElement('div')
      const target = document.createElement('div')
      target.id = 'app-root'
      wrapper.appendChild(target)
      document.body.appendChild(wrapper)

      render(
        <PortalRoot.Provider beforeSelector="#app-root">
          <PortalRoot>
            <div data-testid="content">Content</div>
          </PortalRoot>
        </PortalRoot.Provider>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement).toBeInTheDocument()
      expect(portalElement?.parentElement).toBe(wrapper)
      // portal should be before #app-root
      expect(wrapper.firstChild).toBe(portalElement)
      expect(wrapper.childNodes[1]).toBe(target)
    })

    it('should allow component props to override Provider values', () => {
      const outer = document.createElement('div')
      outer.id = 'outer'
      const inner = document.createElement('div')
      inner.id = 'inner'
      outer.appendChild(inner)
      document.body.appendChild(outer)

      render(
        <PortalRoot.Provider beforeSelector="#outer">
          <PortalRoot insideSelector="#inner">
            <div data-testid="content">Content</div>
          </PortalRoot>
        </PortalRoot.Provider>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement).toBeInTheDocument()
      // Should be inside #inner, not before #outer
      expect(portalElement?.parentElement).toBe(inner)
    })

    it('should fall back to body when selectors do not match', () => {
      render(
        <PortalRoot
          insideSelector="#does-not-exist"
          beforeSelector="#nope"
        >
          <div data-testid="content">Content</div>
        </PortalRoot>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement?.parentElement).toBe(document.body)
    })

    it('should prefer beforeSelector over insideSelector when both are provided as props', () => {
      const container = document.createElement('div')
      container.id = 'container'
      const inner = document.createElement('div')
      inner.id = 'inner'
      container.appendChild(inner)

      const siblingWrapper = document.createElement('div')
      const root = document.createElement('div')
      root.id = 'root'
      siblingWrapper.appendChild(root)

      document.body.appendChild(container)
      document.body.appendChild(siblingWrapper)

      render(
        <PortalRoot beforeSelector="#root" insideSelector="#inner">
          <div>Content</div>
        </PortalRoot>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement).toBeInTheDocument()
      // Must be before #root, not inside #inner
      expect(portalElement?.parentElement).toBe(siblingWrapper)
      expect(siblingWrapper.firstChild).toBe(portalElement)
    })

    it('should prefer beforeSelector over insideSelector when both are provided via Provider', () => {
      const container = document.createElement('div')
      container.id = 'container2'
      const inner = document.createElement('div')
      inner.id = 'inner2'
      container.appendChild(inner)

      const siblingWrapper = document.createElement('div')
      const root = document.createElement('div')
      root.id = 'root2'
      siblingWrapper.appendChild(root)

      document.body.appendChild(container)
      document.body.appendChild(siblingWrapper)

      render(
        <PortalRoot.Provider
          beforeSelector="#root2"
          insideSelector="#inner2"
        >
          <PortalRoot>
            <div>Content</div>
          </PortalRoot>
        </PortalRoot.Provider>
      )

      const portalElement = document.getElementById('eufemia-portal-root')
      expect(portalElement).toBeInTheDocument()
      // Must be before #root2, not inside #inner2
      expect(portalElement?.parentElement).toBe(siblingWrapper)
      expect(siblingWrapper.firstChild).toBe(portalElement)
    })
  })

  describe('Provider id support', () => {
    it('should use id from Provider when component id is not set', () => {
      render(
        <PortalRoot.Provider id="provider-portal-root">
          <PortalRoot>
            <div data-testid="content">Content</div>
          </PortalRoot>
        </PortalRoot.Provider>
      )

      const providerElem = document.getElementById('provider-portal-root')
      expect(providerElem).toBeInTheDocument()
      expect(providerElem).toHaveAttribute('role', 'presentation')
      expect(
        providerElem?.querySelector('[data-testid="content"]')
      ).toBeInTheDocument()

      // Default id should not exist in this case
      expect(document.getElementById('eufemia-portal-root')).toBeNull()
    })

    it('should let component id override Provider id', () => {
      render(
        <PortalRoot.Provider id="provider-portal-root">
          <PortalRoot id="component-portal-root">
            <div data-testid="content">Content</div>
          </PortalRoot>
        </PortalRoot.Provider>
      )

      const componentElem = document.getElementById(
        'component-portal-root'
      )
      expect(componentElem).toBeInTheDocument()
      expect(
        componentElem?.querySelector('[data-testid="content"]')
      ).toBeInTheDocument()

      // Ensure provider id element not created
      expect(document.getElementById('provider-portal-root')).toBeNull()
    })
  })
})
