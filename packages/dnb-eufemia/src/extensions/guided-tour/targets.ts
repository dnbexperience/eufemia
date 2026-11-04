import type { GuidedTourStep, GuidedTourTarget } from './types'

export function findTarget(target?: GuidedTourTarget): HTMLElement | null {
  if (!target || typeof document === 'undefined') {
    return null
  }

  let element: Element | null

  if (typeof target === 'string') {
    element = document.querySelector(target)
  } else if (typeof target === 'function') {
    element = target()
  } else if ('current' in target) {
    element = target.current
  } else {
    element = target
  }

  // Popover can only point at HTML elements (not e.g. SVG nodes)
  return element instanceof HTMLElement ? element : null
}

export function isVisible(
  element: HTMLElement | null
): element is HTMLElement {
  if (!element?.isConnected || element.getClientRects().length === 0) {
    return false
  }

  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility({
      visibilityProperty: true,
      contentVisibilityAuto: true,
    })
  }

  return true
}

/**
 * Steps with a hidden target are skipped. Steps with `onBeforeShow` count as
 * shown, because they may reveal their target first.
 */
export function isStepShown(step: GuidedTourStep): boolean {
  return (
    !step.target ||
    Boolean(step.onBeforeShow) ||
    isVisible(findTarget(step.target))
  )
}

export function findShownIndex(
  steps: Array<GuidedTourStep>,
  from: number,
  direction: 1 | -1
): number {
  for (let i = from; i >= 0 && i < steps.length; i += direction) {
    if (isStepShown(steps[i])) {
      return i
    }
  }

  return -1
}

export function getParents(element: HTMLElement | null) {
  const parents: Array<HTMLElement> = []
  let current = element?.parentElement

  while (current && current !== document.body) {
    parents.push(current)
    current = current.parentElement
  }

  return parents
}
