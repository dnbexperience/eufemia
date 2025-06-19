import React from 'react'
import { render } from '@testing-library/react'
import PortalRoot, { getOrCreatePortalElement } from '../PortalRoot'

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
    global.window = undefined

    const { container } = render(
      <PortalRoot>
        <div>Content</div>
      </PortalRoot>
    )

    expect(container).toBeEmptyDOMElement()
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
    const element = getOrCreatePortalElement('test-portal')
    expect(element).toHaveAttribute('role', 'presentation')
  })

  it('should create a new portal element', () => {
    const element = getOrCreatePortalElement('test-portal')
    expect(element).toBeInTheDocument()
    expect(element).toHaveAttribute('id', 'test-portal')
  })

  it('should return existing portal element', () => {
    const portalId = 'test-portal'
    const existingElement = document.createElement('div')
    existingElement.id = portalId
    document.body.appendChild(existingElement)

    const element = getOrCreatePortalElement(portalId)
    expect(element).toBe(existingElement)
  })

  it('should return null when window is undefined', () => {
    delete global.window

    const element = getOrCreatePortalElement('test-portal')
    expect(element).toBeNull()
  })

  it('should insert portal element at the beginning of body', () => {
    // Create some existing content in body
    const existingContent = document.createElement('div')
    existingContent.id = 'existing-content'
    document.body.appendChild(existingContent)

    // Create portal element
    const element = getOrCreatePortalElement('test-portal')

    // Verify the portal element is now the first child
    expect(document.body.firstChild).toBe(element)
    expect(document.body.lastChild).toBe(existingContent)
    expect(element).toHaveAttribute('id', 'test-portal')
  })
})
