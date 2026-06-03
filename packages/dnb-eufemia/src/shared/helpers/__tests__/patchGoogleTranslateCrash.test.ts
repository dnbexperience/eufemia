import {
  patchGoogleTranslateCrash,
  __resetForTesting,
} from '../patchGoogleTranslateCrash'

describe('patchGoogleTranslateCrash', () => {
  beforeEach(() => {
    __resetForTesting()
    document.documentElement.classList.add('translated-ltr')
  })

  afterEach(() => {
    __resetForTesting()
    document.documentElement.classList.remove('translated-ltr')

    // Clean up any nodes appended to document.body during tests
    document.body.innerHTML = ''
  })

  it('should patch removeChild and insertBefore', () => {
    const before = {
      removeChild: Node.prototype.removeChild,
      insertBefore: Node.prototype.insertBefore,
    }

    patchGoogleTranslateCrash()

    expect(Node.prototype.removeChild).not.toBe(before.removeChild)
    expect(Node.prototype.insertBefore).not.toBe(before.insertBefore)
  })

  it('should defer patches until Google Translate is detected', async () => {
    document.documentElement.classList.remove('translated-ltr')

    const before = {
      removeChild: Node.prototype.removeChild,
      insertBefore: Node.prototype.insertBefore,
    }

    patchGoogleTranslateCrash()

    // Patches should NOT be applied yet
    expect(Node.prototype.removeChild).toBe(before.removeChild)
    expect(Node.prototype.insertBefore).toBe(before.insertBefore)

    // Simulate GT activating
    document.documentElement.classList.add('translated-ltr')

    // Wait for the MutationObserver to fire
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(Node.prototype.removeChild).not.toBe(before.removeChild)
    expect(Node.prototype.insertBefore).not.toBe(before.insertBefore)
  })

  it('should remove the Google Translate wrapper when child has been moved', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const textNode = document.createTextNode('Hello')
    parent.appendChild(textNode)

    // Simulate Google Translate wrapping the text node in a <font> element
    const fontElement = document.createElement('font')
    parent.replaceChild(fontElement, textNode)
    fontElement.appendChild(textNode)

    // React tries to remove the original text node from the parent,
    // but it's now a child of <font>, not the parent.
    // The patch should remove the <font> wrapper from the parent.
    expect(() => {
      parent.removeChild(textNode)
    }).not.toThrow()

    expect(parent.childNodes.length).toBe(0)
  })

  it('should still remove children that are actual children', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const child = document.createElement('span')
    parent.appendChild(child)

    parent.removeChild(child)

    expect(parent.childNodes.length).toBe(0)
  })

  it('should insert before the Google Translate wrapper when reference node has been moved', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const referenceNode = document.createTextNode('Reference')
    parent.appendChild(referenceNode)

    // Simulate Google Translate moving the reference node
    const fontElement = document.createElement('font')
    parent.replaceChild(fontElement, referenceNode)
    fontElement.appendChild(referenceNode)

    const newNode = document.createElement('span')

    // React tries to insert before the original reference node.
    // The patch should insert before the <font> wrapper instead.
    expect(() => {
      parent.insertBefore(newNode, referenceNode)
    }).not.toThrow()

    expect(parent.childNodes[0]).toBe(newNode)
    expect(parent.childNodes[1]).toBe(fontElement)
  })

  it('should still insert before when reference node is an actual child', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const referenceNode = document.createElement('span')
    parent.appendChild(referenceNode)

    const newNode = document.createElement('div')
    parent.insertBefore(newNode, referenceNode)

    expect(parent.childNodes[0]).toBe(newNode)
    expect(parent.childNodes[1]).toBe(referenceNode)
  })

  it('should handle insertBefore with null reference node', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const newNode = document.createElement('span')

    parent.insertBefore(newNode, null)

    expect(parent.childNodes[0]).toBe(newNode)
  })

  it('should remove deeply nested Google Translate wrappers', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const textNode = document.createTextNode('Hello')
    parent.appendChild(textNode)

    // Simulate Google Translate nesting: <font><font>textNode</font></font>
    const outerFont = document.createElement('font')
    const innerFont = document.createElement('font')
    parent.replaceChild(outerFont, textNode)
    outerFont.appendChild(innerFont)
    innerFont.appendChild(textNode)

    expect(() => {
      parent.removeChild(textNode)
    }).not.toThrow()

    expect(parent.childNodes.length).toBe(0)
  })

  it('should insert before deeply nested Google Translate wrappers', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const referenceNode = document.createTextNode('Reference')
    parent.appendChild(referenceNode)

    // Simulate nested wrapping
    const outerFont = document.createElement('font')
    const innerFont = document.createElement('font')
    parent.replaceChild(outerFont, referenceNode)
    outerFont.appendChild(innerFont)
    innerFont.appendChild(referenceNode)

    const newNode = document.createElement('span')
    parent.insertBefore(newNode, referenceNode)

    expect(parent.childNodes[0]).toBe(newNode)
    expect(parent.childNodes[1]).toBe(outerFont)
  })

  it('should remove replacement when Google Translate detaches the original node', async () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    document.body.appendChild(parent)

    const textNode = document.createTextNode('Hello')
    parent.appendChild(textNode)

    // Simulate Google Translate replacing the text node entirely.
    // This detaches the original text node and inserts a <font> wrapper.
    const fontWrapper = document.createElement('font')
    fontWrapper.textContent = 'Hola'
    parent.replaceChild(fontWrapper, textNode)

    // Wait for MutationObserver to process the change
    await new Promise((resolve) => setTimeout(resolve, 0))

    // React tries to remove the original (now-detached) text node.
    // The patch should remove the <font> replacement instead.
    expect(() => {
      parent.removeChild(textNode)
    }).not.toThrow()

    expect(parent.childNodes.length).toBe(0)
  })

  it('should insert before replacement when Google Translate detaches the reference node', async () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    document.body.appendChild(parent)

    const referenceNode = document.createTextNode('Reference')
    parent.appendChild(referenceNode)

    // Simulate Google Translate replacing the reference node
    const fontWrapper = document.createElement('font')
    fontWrapper.textContent = 'Referencia'
    parent.replaceChild(fontWrapper, referenceNode)

    // Wait for MutationObserver to process the change
    await new Promise((resolve) => setTimeout(resolve, 0))

    const newNode = document.createElement('span')
    parent.insertBefore(newNode, referenceNode)

    expect(parent.childNodes[0]).toBe(newNode)
    expect(parent.childNodes[1]).toBe(fontWrapper)
  })

  it('should handle separate removeChild + insertBefore instead of replaceChild', async () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    document.body.appendChild(parent)

    const textNode = document.createTextNode('Hello')
    const nextSibling = document.createElement('span')
    parent.appendChild(textNode)
    parent.appendChild(nextSibling)

    // Simulate GT using separate remove + insert (not replaceChild),
    // which produces separate MutationRecords
    const fontWrapper = document.createElement('font')
    fontWrapper.textContent = 'Hola'
    parent.removeChild(textNode)
    parent.insertBefore(fontWrapper, nextSibling)

    // Wait for MutationObserver to process
    await new Promise((resolve) => setTimeout(resolve, 0))

    // React tries to remove the original (detached) text node
    expect(() => {
      parent.removeChild(textNode)
    }).not.toThrow()

    expect(parent.contains(fontWrapper)).toBe(false)
    expect(parent.childNodes.length).toBe(1)
    expect(parent.childNodes[0]).toBe(nextSibling)
  })

  it('should be a no-op when called twice', () => {
    patchGoogleTranslateCrash()

    const patchedRemoveChild = Node.prototype.removeChild
    const patchedInsertBefore = Node.prototype.insertBefore

    patchGoogleTranslateCrash()

    expect(Node.prototype.removeChild).toBe(patchedRemoveChild)
    expect(Node.prototype.insertBefore).toBe(patchedInsertBefore)
  })

  it('should handle removeChild when child is completely detached and not tracked', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const detached = document.createTextNode('detached')

    // Child was never appended to parent — removeChild should not throw
    const result = parent.removeChild(detached)

    expect(result).toBe(detached)
  })

  it('should handle insertBefore when reference is completely detached and not tracked', () => {
    patchGoogleTranslateCrash()

    const parent = document.createElement('div')
    const detached = document.createTextNode('detached')
    const newNode = document.createElement('span')

    const result = parent.insertBefore(newNode, detached)

    expect(result).toBe(newNode)
  })
})
