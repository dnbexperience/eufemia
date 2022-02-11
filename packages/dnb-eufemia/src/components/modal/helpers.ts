import { warn, processChildren } from '../../shared/component-helper'

export function getListOfModalRoots(): any[] {
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

export function getModalRoot(index?: number): any {
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

export function addToIndex(elem) {
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

export function removeFromIndex(elem) {
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
  if (typeof props.modal_content === 'string') {
    return props.modal_content
  } else if (typeof props.modal_content === 'function') {
    return props.modal_content(props)
  }
  return processChildren(props)
}
