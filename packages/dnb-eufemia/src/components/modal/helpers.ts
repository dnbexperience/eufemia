import type React from 'react'
import { warn } from '../../shared/component-helper'

export type ModalStackEntry = {
  _id: string
  _scrollRef: React.RefObject<HTMLElement | null>
  _contentRef: React.RefObject<HTMLElement | null>
  _iiLocal?: {
    activate: (target?: HTMLElement | null) => void
    revert: () => void
  }
}

export function getListOfModalRoots(): ModalStackEntry[] {
  if (typeof window !== 'undefined') {
    try {
      const stack = window.__modalStack || []
      return stack
    } catch (e) {
      warn(e)
    }
  }

  return []
}

export function getModalRoot(index?: number): ModalStackEntry | null {
  if (typeof window !== 'undefined') {
    try {
      const stack = window.__modalStack || []
      if (index !== null) {
        if (index === -1 && stack.length) {
          return stack[stack.length - 1]
        } else if (index > -1) {
          return stack[index]
        }
      }

      return null
    } catch (e) {
      warn(e)
    }
  }

  return null
}

export function addToIndex(elem: ModalStackEntry) {
  if (typeof window !== 'undefined') {
    try {
      if (!Array.isArray(window.__modalStack)) {
        window.__modalStack = []
      }
      window.__modalStack.push(elem)
    } catch (e) {
      warn(e)
    }
  }
}

export function removeFromIndex(elem: ModalStackEntry) {
  if (typeof window !== 'undefined') {
    try {
      if (!Array.isArray(window.__modalStack)) {
        window.__modalStack = []
      }
      window.__modalStack = window.__modalStack.filter(
        (cur) => cur !== elem
      )
    } catch (e) {
      warn(e)
    }
  }
}

export function getContent(props) {
  if (typeof props.modalContent === 'string') {
    return props.modalContent
  } else if (typeof props.modalContent === 'function') {
    return props.modalContent(props)
  }
  return props.children
}
