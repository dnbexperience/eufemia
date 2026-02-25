/**
 * Inline replacement for the unmaintained `use-editable` package (v2.3.3).
 *
 * This hook makes a DOM element contentEditable and manages:
 * - Text change detection via MutationObserver (reverts DOM mutations, lets React re-render)
 * - Cursor/selection position preservation across React re-renders
 * - Tab key indentation (configurable number of spaces)
 * - Enter key with automatic indentation preservation
 * - Backspace handling for indent blocks
 * - Paste as plain text
 * - Undo/redo history (Cmd/Ctrl+Z / Cmd/Ctrl+Shift+Z)
 *
 * Based on the original use-editable by Formidable Labs (MIT license).
 * Simplified to only expose the API surface used by react-live.
 */

import { useState, useLayoutEffect, type RefObject } from 'react'

interface Position {
  position: number
  extent: number
  content: string
  line: number
}

type History = [Position, string]

interface State {
  observer: MutationObserver | null
  disconnected: boolean
  onChange: (text: string, position: Position) => void
  queue: MutationRecord[]
  history: History[]
  historyAt: number
  position: Position | null
}

interface Options {
  disabled?: boolean
  indentation?: number
}

const observerSettings: MutationObserverInit = {
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true,
}

const getCurrentRange = (): Range => window.getSelection()!.getRangeAt(0)!

const setCurrentRange = (range: Range): void => {
  const selection = window.getSelection()!
  selection.removeAllRanges()
  selection.addRange(range)
}

const isUndoRedoKey = (event: KeyboardEvent): boolean =>
  (event.metaKey || event.ctrlKey) && !event.altKey && event.code === 'KeyZ'

/** Walk the DOM tree of an element and extract its text content. */
const toString = (element: HTMLElement): string => {
  const queue: Node[] = [element.firstChild!]
  let content = ''
  let node: Node

  while ((node = queue.pop()!)) {
    if (node.nodeType === Node.TEXT_NODE) {
      content += node.textContent
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.nodeName === 'BR'
    ) {
      content += '\n'
    }

    if (node.nextSibling) {
      queue.push(node.nextSibling)
    }

    if (node.firstChild) {
      queue.push(node.firstChild)
    }
  }

  // contenteditable quirk: a pre/pre-wrap element must always end with a newline
  if (content[content.length - 1] !== '\n') {
    content += '\n'
  }

  return content
}

const setRangeStart = (range: Range, node: Node, offset: number): void => {
  if (offset < node.textContent!.length) {
    range.setStart(node, offset)
  } else {
    range.setStartAfter(node)
  }
}

const setRangeEnd = (range: Range, node: Node, offset: number): void => {
  if (offset < node.textContent!.length) {
    range.setEnd(node, offset)
  } else {
    range.setEndAfter(node)
  }
}

/** Get the current cursor position relative to the element's text content. */
const getPosition = (element: HTMLElement): Position => {
  const range = getCurrentRange()
  const extent = !range.collapsed ? range.toString().length : 0
  const untilRange = document.createRange()
  untilRange.setStart(element, 0)
  untilRange.setEnd(range.startContainer, range.startOffset)
  let content = untilRange.toString()
  const position = content.length
  const lines = content.split('\n')
  const line = lines.length - 1
  content = lines[line]
  return { position, extent, content, line }
}

/** Create a DOM Range at the given text positions within the element. */
const makeRange = (
  element: HTMLElement,
  start: number,
  end?: number
): Range => {
  if (start <= 0) {
    start = 0
  }

  if (!end || end < 0) {
    end = start
  }

  const range = document.createRange()
  const queue: Node[] = [element.firstChild!]
  let current = 0
  let node: Node
  let position = start

  while ((node = queue[queue.length - 1])) {
    if (node.nodeType === Node.TEXT_NODE) {
      const length = node.textContent!.length

      if (current + length >= position) {
        const offset = position - current

        if (position === start) {
          setRangeStart(range, node, offset)

          if (end !== start) {
            position = end
            continue
          } else {
            break
          }
        } else {
          setRangeEnd(range, node, offset)
          break
        }
      }

      current += node.textContent!.length
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.nodeName === 'BR'
    ) {
      if (current + 1 >= position) {
        if (position === start) {
          setRangeStart(range, node, 0)

          if (end !== start) {
            position = end
            continue
          } else {
            break
          }
        } else {
          setRangeEnd(range, node, 0)
          break
        }
      }

      current++
    }

    queue.pop()

    if (node.nextSibling) {
      queue.push(node.nextSibling)
    }

    if (node.firstChild) {
      queue.push(node.firstChild)
    }
  }

  return range
}

export const useEditable = (
  elementRef: RefObject<HTMLElement | undefined | null>,
  onChange: (text: string, position: Position) => void,
  opts?: Options
): void => {
  if (!opts) {
    opts = {}
  }

  const unblock = useState([])[1]

  const state: State = useState(() => {
    const s: State = {
      observer: null,
      disconnected: false,
      onChange,
      queue: [],
      history: [],
      historyAt: -1,
      position: null,
    }

    if (typeof MutationObserver !== 'undefined') {
      s.observer = new MutationObserver((batch) => {
        s.queue.push(...batch)
      })
    }

    return s
  })[0]

  const editInsert = (
    element: HTMLElement,
    append: string,
    deleteOffset?: number
  ): void => {
    let range = getCurrentRange()
    range.deleteContents()
    range.collapse()
    const position = getPosition(element)
    const offset = deleteOffset || 0
    const start = position.position + (offset < 0 ? offset : 0)
    const end = position.position + (offset > 0 ? offset : 0)
    range = makeRange(element, start, end)
    range.deleteContents()

    if (append) {
      range.insertNode(document.createTextNode(append))
    }

    setCurrentRange(makeRange(element, start + append.length))
  }

  const editUpdate = (element: HTMLElement, content: string): void => {
    const position = getPosition(element)
    const prevContent = toString(element)
    position.position += content.length - prevContent.length
    state.position = position
    state.onChange(content, position)
  }

  // SSR guard
  if (typeof navigator !== 'object') {
    return // stop here
  }

  useLayoutEffect(() => {
    state.onChange = onChange

    if (!elementRef.current || opts!.disabled) {
      return // stop here
    }

    state.disconnected = false
    state.observer!.observe(elementRef.current, observerSettings)

    if (state.position) {
      const { position, extent } = state.position
      setCurrentRange(
        makeRange(elementRef.current, position, position + extent)
      )
    }

    return () => {
      state.observer!.disconnect()
    }
  })

  useLayoutEffect(() => {
    if (!elementRef.current || opts!.disabled) {
      state.history.length = 0
      state.historyAt = -1
      return // stop here
    }

    const element = elementRef.current

    if (state.position) {
      element.focus()
      const { position, extent } = state.position
      setCurrentRange(makeRange(element, position, position + extent))
    }

    const prevWhiteSpace = element.style.whiteSpace
    const prevContentEditable = element.contentEditable
    let hasPlaintextSupport = true

    try {
      element.contentEditable = 'plaintext-only'
    } catch (_error) {
      element.contentEditable = 'true'
      hasPlaintextSupport = false
    }

    if (prevWhiteSpace !== 'pre') {
      element.style.whiteSpace = 'pre-wrap'
    }

    if (opts!.indentation) {
      element.style.tabSize = (element.style as Record<string, string>)
        .MozTabSize = '' + opts!.indentation
    }

    const indentPattern = ' '.repeat(opts!.indentation || 0)
    const indentRe = new RegExp('^(?:' + indentPattern + ')')
    const blanklineRe = new RegExp(
      '^(?:' + indentPattern + ')*(' + indentPattern + ')$'
    )

    let trackStateTimestamp = 0

    const trackState = (ignoreTimestamp?: boolean): void => {
      if (!elementRef.current || !state.position) {
        return // stop here
      }

      const content = toString(element)
      const position = getPosition(element)
      const timestamp = new Date().valueOf()
      const lastEntry = state.history[state.historyAt]

      if (
        (!ignoreTimestamp && timestamp - trackStateTimestamp < 500) ||
        (lastEntry && lastEntry[1] === content)
      ) {
        trackStateTimestamp = timestamp
        return // stop here
      }

      const at = ++state.historyAt
      state.history[at] = [position, content]
      state.history.splice(at + 1)

      if (at > 500) {
        state.historyAt--
        state.history.shift()
      }
    }

    const disconnect = (): void => {
      state.observer!.disconnect()
      state.disconnected = true
    }

    const flushChanges = (): void => {
      state.queue.push(...state.observer!.takeRecords())
      const position = getPosition(element)

      if (state.queue.length) {
        disconnect()
        const content = toString(element)
        state.position = position
        let mutation: MutationRecord | undefined
        let i = 0

        while ((mutation = state.queue.pop())) {
          if (mutation.oldValue !== null) {
            mutation.target.textContent = mutation.oldValue
          }

          for (i = mutation.removedNodes.length - 1; i >= 0; i--) {
            mutation.target.insertBefore(
              mutation.removedNodes[i],
              mutation.nextSibling
            )
          }

          for (i = mutation.addedNodes.length - 1; i >= 0; i--) {
            if (mutation.addedNodes[i].parentNode) {
              mutation.target.removeChild(mutation.addedNodes[i])
            }
          }
        }

        state.onChange(content, position)
      }
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.defaultPrevented || event.target !== element) {
        return // stop here
      }

      if (state.disconnected) {
        event.preventDefault()
        return unblock([])
      }

      if (isUndoRedoKey(event)) {
        event.preventDefault()
        let history: History | undefined

        if (!event.shiftKey) {
          const at = --state.historyAt
          history = state.history[at]

          if (!history) {
            state.historyAt = 0
          }
        } else {
          const at = ++state.historyAt
          history = state.history[at]

          if (!history) {
            state.historyAt = state.history.length - 1
          }
        }

        if (history) {
          disconnect()
          state.position = history[0]
          state.onChange(history[1], history[0])
        }

        return // stop here
      } else {
        trackState()
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        const position = getPosition(element)
        const match = /\S/g.exec(position.content)
        const index = match ? match.index : position.content.length
        const text = '\n' + position.content.slice(0, index)
        editInsert(element, text)
      } else if (
        (!hasPlaintextSupport || opts!.indentation) &&
        event.key === 'Backspace'
      ) {
        event.preventDefault()
        const range = getCurrentRange()

        if (!range.collapsed) {
          editInsert(element, '', 0)
        } else {
          const position = getPosition(element)
          const match = blanklineRe.exec(position.content)
          editInsert(element, '', match ? -match[1].length : -1)
        }
      } else if (opts!.indentation && event.key === 'Tab') {
        event.preventDefault()
        const position = getPosition(element)
        const start = position.position - position.content.length
        const content = toString(element)
        const newContent = event.shiftKey
          ? content.slice(0, start) +
            position.content.replace(indentRe, '') +
            content.slice(start + position.content.length)
          : content.slice(0, start) +
            (opts!.indentation
              ? ' '.repeat(opts!.indentation)
              : '\t') +
            content.slice(start)
        editUpdate(element, newContent)
      }

      if (event.repeat) {
        flushChanges()
      }
    }

    const onKeyUp = (event: KeyboardEvent): void => {
      if (event.defaultPrevented || event.isComposing) {
        return // stop here
      }

      if (!isUndoRedoKey(event)) {
        trackState()
      }

      flushChanges()
      element.focus()
    }

    const onSelect = (event: Event): void => {
      state.position =
        window.getSelection()!.rangeCount && event.target === element
          ? getPosition(element)
          : null
    }

    const onPaste = (event: ClipboardEvent): void => {
      event.preventDefault()
      trackState(true)
      editInsert(element, event.clipboardData!.getData('text/plain'))
      trackState(true)
      flushChanges()
    }

    document.addEventListener('selectstart', onSelect)
    window.addEventListener('keydown', onKeyDown)
    element.addEventListener('paste', onPaste)
    element.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('selectstart', onSelect)
      window.removeEventListener('keydown', onKeyDown)
      element.removeEventListener('paste', onPaste)
      element.removeEventListener('keyup', onKeyUp)
      element.style.whiteSpace = prevWhiteSpace
      element.contentEditable = prevContentEditable
    }
  }, [elementRef.current, opts!.disabled, opts!.indentation])
}
