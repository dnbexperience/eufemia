/**
 * Prevents React crashes caused by Google Translate mutating the DOM.
 *
 * Google Translate wraps text nodes in `<font>` elements, moving them
 * out of their original parent. When React later tries to remove or
 * insert before those nodes, it throws because the parent no longer
 * matches. This patch makes `removeChild` and `insertBefore` find
 * and operate on the `<font>` wrapper instead.
 *
 * The monkey patches are deferred until Google Translate is actually
 * activated, but the MutationObserver that tracks `<font>` replacements
 * starts immediately so it never misses GT's initial DOM mutations.
 *
 * Calling this function more than once is safe — subsequent calls are
 * no-ops.
 *
 * Call this function once at the top level of your application:
 *
 * ```tsx
 * import { patchGoogleTranslateCrash } from '@dnb/eufemia/shared'
 *
 * patchGoogleTranslateCrash()
 * ```
 *
 * @see https://github.com/facebook/react/issues/11538
 *
 * This fix is inspired by the code from gaearon:
 * https://github.com/facebook/react/issues/11538#issuecomment-417504600
 */

// Track nodes that were replaced by external DOM mutations (e.g. Google Translate).
// When Google Translate wraps a text node, it removes the original and inserts a
// <font> wrapper. We track this so React can later remove the correct wrapper.
//
// Declared at module scope so the tracking observer (which starts immediately)
// and the monkey patches (which are deferred) share the same map.
let replacedNodes = new WeakMap<Node, Node>()

let isActive = false
let trackingObserver: MutationObserver | null = null
let detectorObserver: MutationObserver | null = null
let originalRemoveChild: typeof Node.prototype.removeChild | null = null
let originalInsertBefore: typeof Node.prototype.insertBefore | null = null

const TRANSLATED_RE = /\btranslated-/

/** @internal Reset for testing only */
export function __resetForTesting() {
  trackingObserver?.disconnect()
  trackingObserver = null
  detectorObserver?.disconnect()
  detectorObserver = null

  if (originalRemoveChild) {
    Node.prototype.removeChild = originalRemoveChild
  }
  if (originalInsertBefore) {
    Node.prototype.insertBefore = originalInsertBefore
  }
  originalRemoveChild = null
  originalInsertBefore = null

  replacedNodes = new WeakMap()
  isActive = false
}

export function patchGoogleTranslateCrash() {
  if (typeof window === 'undefined' || isActive) {
    return // stop here
  }

  isActive = true

  // Start tracking <font> replacements immediately so we never miss
  // GT's initial DOM mutations (GT adds the class and mutates text nodes
  // synchronously in the same task).
  startTracking()

  const isTranslated = () =>
    TRANSLATED_RE.test(document.documentElement.className)

  if (isTranslated()) {
    applyPatches()
    return // stop here
  }

  // Google Translate adds "translated-ltr" or "translated-rtl" to <html>
  // before it starts wrapping text nodes. Watch for that and only then
  // apply the monkey patches.
  detectorObserver = new MutationObserver(() => {
    if (isTranslated()) {
      detectorObserver?.disconnect()
      detectorObserver = null
      applyPatches()
    }
  })

  detectorObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

function startTracking() {
  trackingObserver = new MutationObserver((mutations) => {
    // Collect removed text nodes and added <font> elements per parent,
    // across all mutation records in this callback batch.
    // GT may use separate removeChild + insertBefore calls instead of replaceChild,
    // producing separate records that can't be paired by index within a single record.
    const removedTextByParent = new Map<Node, Node[]>()
    const addedFontByParent = new Map<Node, Node[]>()

    for (const mutation of mutations) {
      if (mutation.type !== 'childList') {
        continue
      }

      const target = mutation.target

      for (let i = 0; i < mutation.removedNodes.length; i++) {
        const node = mutation.removedNodes[i]
        if (node.nodeType === Node.TEXT_NODE) {
          const list = removedTextByParent.get(target)
          if (list) {
            list.push(node)
          } else {
            removedTextByParent.set(target, [node])
          }
        }
      }

      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const node = mutation.addedNodes[i]
        if (node instanceof HTMLElement && node.tagName === 'FONT') {
          const list = addedFontByParent.get(target)
          if (list) {
            list.push(node)
          } else {
            addedFontByParent.set(target, [node])
          }
        }
      }
    }

    removedTextByParent.forEach((removedTexts, parent) => {
      const addedFonts = addedFontByParent.get(parent)
      if (!addedFonts) {
        return // stop here
      }
      const len = Math.min(removedTexts.length, addedFonts.length)
      for (let i = 0; i < len; i++) {
        replacedNodes.set(removedTexts[i], addedFonts[i])
      }
    })
  })

  trackingObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
}

function applyPatches() {
  const nativeRemoveChild = Node.prototype.removeChild
  const nativeInsertBefore = Node.prototype.insertBefore

  originalRemoveChild = nativeRemoveChild
  originalInsertBefore = nativeInsertBefore

  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      const wrapper = findDirectChildAncestor(this, child)
      if (wrapper) {
        return nativeRemoveChild.call(this, wrapper) as T
      }

      const replacement = replacedNodes.get(child)
      if (replacement && replacement.parentNode === this) {
        replacedNodes.delete(child)
        return nativeRemoveChild.call(this, replacement) as T
      }

      return child
    }

    return nativeRemoveChild.call(this, child) as T
  }

  Node.prototype.insertBefore = function <T extends Node>(
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      const wrapper = findDirectChildAncestor(this, referenceNode)
      if (wrapper) {
        return nativeInsertBefore.call(this, newNode, wrapper) as T
      }

      const replacement = replacedNodes.get(referenceNode)
      if (replacement && replacement.parentNode === this) {
        return nativeInsertBefore.call(this, newNode, replacement) as T
      }

      return newNode
    }

    return nativeInsertBefore.call(this, newNode, referenceNode) as T
  }
}

const MAX_DEPTH = 100

function findDirectChildAncestor(parent: Node, node: Node): Node | null {
  let current = node
  let depth = 0

  while (current.parentNode && depth < MAX_DEPTH) {
    if (current.parentNode === parent) {
      return current
    }
    current = current.parentNode
    depth++
  }

  return null
}
