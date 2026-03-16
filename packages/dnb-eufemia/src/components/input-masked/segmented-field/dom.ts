import type { RefObject } from 'react'
import type { SectionSelectionMode } from './types'

export function setSectionDomApi({
  element,
  inputId,
  displayValue,
  caretPositionsRef,
  sectionSelectionModeRef,
  selectSection,
  setSectionCaret,
}: {
  element: HTMLSpanElement
  inputId: string
  displayValue: string
  caretPositionsRef: RefObject<Record<string, number>>
  sectionSelectionModeRef: RefObject<Record<string, SectionSelectionMode>>
  selectSection: (inputId: string) => void
  setSectionCaret: (inputId: string, position: number) => void
}) {
  Object.defineProperties(element, {
    value: {
      configurable: true,
      get() {
        return displayValue
      },
    },
    inputMode: {
      configurable: true,
      get() {
        return element.getAttribute('inputmode') ?? ''
      },
    },
    selectionStart: {
      configurable: true,
      get() {
        return sectionSelectionModeRef.current[inputId] === 'all'
          ? 0
          : caretPositionsRef.current[inputId] ?? displayValue.length
      },
    },
    selectionEnd: {
      configurable: true,
      get() {
        return sectionSelectionModeRef.current[inputId] === 'all'
          ? displayValue.length
          : caretPositionsRef.current[inputId] ?? displayValue.length
      },
    },
    setSelectionRange: {
      configurable: true,
      value(start: number, end: number) {
        element.focus()

        if (start === 0 && end >= displayValue.length) {
          selectSection(inputId)
          return
        }

        setSectionCaret(inputId, end)
      },
    },
    select: {
      configurable: true,
      value() {
        element.focus()
        selectSection(inputId)
      },
    },
  })

  if (sectionSelectionModeRef.current[inputId] !== 'all') {
    caretPositionsRef.current[inputId] = Math.min(
      caretPositionsRef.current[inputId] ?? displayValue.length,
      displayValue.length
    )
  }
}

export function pickSectionDomProps(
  props: Record<string, unknown> | undefined
): Record<string, unknown> {
  if (!props) {
    return {}
  }

  return Object.entries(props).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (
        key === 'autoComplete' ||
        key === 'inputMode' ||
        key === 'lang' ||
        key === 'dir' ||
        key === 'title' ||
        key === 'tabIndex' ||
        key === 'disabled' ||
        key === 'required' ||
        key === 'readOnly' ||
        key.startsWith('aria-') ||
        key.startsWith('data-')
      ) {
        acc[key] = value
      }

      return acc
    },
    {}
  )
}

export function ensureTextNode(element: HTMLElement) {
  const firstChild = element.firstChild

  if (firstChild?.nodeType === Node.TEXT_NODE) {
    return firstChild
  }

  const textNode = document.createTextNode(element.textContent || '')
  element.textContent = ''
  element.appendChild(textNode)
  return textNode
}

export function listAllSections(scope?: HTMLElement) {
  try {
    const root: Document | HTMLElement = scope || document
    return Array.from(
      root.querySelectorAll<HTMLSpanElement>(
        '.dnb-segmented-field__section'
      )
    )
  } catch {
    return []
  }
}
