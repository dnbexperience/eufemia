import { useCallback, useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export type UseTableKeyboardNavigationOptions = {
  /**
   * Whether keyboard navigation is enabled.
   * Default: `true`
   */
  enabled?: boolean
}

function getCells(table: HTMLTableElement) {
  const rows = Array.from(table.querySelectorAll('tr')).filter(
    (row) => row.closest('table') === table
  )
  return rows.map((row) =>
    Array.from(
      row.querySelectorAll<HTMLTableCellElement>('td, th')
    ).filter((cell) => cell.closest('tr') === row)
  )
}

function findCellPosition(
  grid: HTMLTableCellElement[][],
  target: HTMLElement
): { row: number; col: number } | null {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === target || grid[row][col].contains(target)) {
        return { row, col }
      }
    }
  }
  return null
}

function focusCell(cell: HTMLTableCellElement) {
  const focusable = cell.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)

  if (focusable) {
    focusable.focus()
  } else {
    if (!cell.hasAttribute('tabindex')) {
      cell.setAttribute('tabindex', '-1')
    }
    cell.classList.add('dnb-no-focus', 'dnb-table__cell--focus')
    cell.focus()
  }
}

function setupTabindex(table: HTMLTableElement) {
  const cells = table.querySelectorAll<HTMLTableCellElement>('td, th')
  cells.forEach((cell) => {
    const hasFocusable = cell.querySelector(FOCUSABLE_SELECTOR)
    if (!hasFocusable && !cell.hasAttribute('tabindex')) {
      cell.setAttribute('tabindex', '-1')
    }
  })
}

function setupFocusCleanup(table: HTMLTableElement) {
  const handler = (event: FocusEvent) => {
    const target = event.target as HTMLElement
    if (target.classList.contains('dnb-table__cell--focus')) {
      target.classList.remove('dnb-no-focus', 'dnb-table__cell--focus')
    }
  }

  table.addEventListener('focusout', handler)

  return () => {
    table.removeEventListener('focusout', handler)
  }
}

const HORIZONTAL_NAV_SELECTOR = 'input[type="range"], [role="slider"]'

const VERTICAL_NAV_SELECTOR =
  'input[type="number"], [role="spinbutton"], select, [role="listbox"]'

function isTextInput(
  element: HTMLElement
): element is HTMLInputElement | HTMLTextAreaElement {
  if (element instanceof HTMLTextAreaElement) {
    return true
  }

  if (element instanceof HTMLInputElement) {
    const textTypes = [
      'text',
      'search',
      'url',
      'tel',
      'email',
      'password',
      'number',
    ]
    return textTypes.includes(element.type)
  }

  return false
}

function shouldSkipHorizontalNav(target: HTMLElement): boolean {
  return target.closest(HORIZONTAL_NAV_SELECTOR) !== null
}

function shouldSkipVerticalNav(target: HTMLElement): boolean {
  return target.closest(VERTICAL_NAV_SELECTOR) !== null
}

function isAtInputBoundary(
  target: HTMLInputElement | HTMLTextAreaElement,
  direction: 'left' | 'right'
): boolean {
  const { selectionStart, selectionEnd, value } = target

  // If there's a selection range, let the input handle it
  if (selectionStart !== selectionEnd) {
    return false
  }

  if (direction === 'left') {
    return selectionStart === 0
  }

  return selectionEnd === value.length
}

function isTextareaAtVerticalBoundary(
  textarea: HTMLTextAreaElement,
  direction: 'up' | 'down'
): boolean {
  const { selectionStart, selectionEnd, value } = textarea

  // If there's a selection range, let the textarea handle it
  if (selectionStart !== selectionEnd) {
    return false
  }

  if (direction === 'up') {
    // At top boundary if no newline before cursor
    const textBeforeCursor = value.substring(0, selectionStart)
    return !textBeforeCursor.includes('\n')
  }

  // At bottom boundary if no newline after cursor
  const textAfterCursor = value.substring(selectionStart)
  return !textAfterCursor.includes('\n')
}

function handleKeyDown(event: KeyboardEvent, table: HTMLTableElement) {
  const { key } = event

  if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
    return // stop here
  }

  const target = event.target as HTMLElement
  const isHorizontal = key === 'ArrowLeft' || key === 'ArrowRight'

  // Elements like sliders use left/right internally — only allow up/down
  if (isHorizontal && shouldSkipHorizontalNav(target)) {
    return // stop here
  }

  // Elements like spinbuttons/number inputs use up/down internally
  if (!isHorizontal && shouldSkipVerticalNav(target)) {
    return // stop here
  }

  // Textareas: only navigate vertically when cursor is at the top/bottom line
  if (!isHorizontal && target instanceof HTMLTextAreaElement) {
    const direction = key === 'ArrowUp' ? 'up' : 'down'
    if (!isTextareaAtVerticalBoundary(target, direction)) {
      return // stop here
    }
  }

  // Text inputs/textareas: only navigate when cursor is at the boundary
  if (isHorizontal && isTextInput(target)) {
    const direction = key === 'ArrowLeft' ? 'left' : 'right'
    if (!isAtInputBoundary(target, direction)) {
      return // stop here
    }
  }

  const grid = getCells(table)
  const position = findCellPosition(grid, target)

  if (!position) {
    return // stop here
  }

  let { row, col } = position

  switch (key) {
    case 'ArrowUp':
      row = Math.max(0, row - 1)
      break
    case 'ArrowDown':
      row = Math.min(grid.length - 1, row + 1)
      break
    case 'ArrowLeft':
      col = Math.max(0, col - 1)
      break
    case 'ArrowRight':
      col = Math.min((grid[row]?.length ?? 1) - 1, col + 1)
      break
  }

  const currentCell = grid[position.row]?.[position.col]
  const nextCell = grid[row]?.[col]
  if (nextCell && nextCell !== currentCell) {
    event.preventDefault()
    focusCell(nextCell)
  }
}

/**
 * A plugin hook that adds arrow-key navigation to a Table component.
 *
 * Wrap the Table in the returned ref to enable keyboard navigation
 * between cells. If a cell contains a focusable element (input, button,
 * anchor, etc.), that element receives focus. Otherwise, the cell itself
 * is focused.
 *
 * @example
 * ```tsx
 * import { useTableKeyboardNavigation } from '@dnb/eufemia/components/table'
 *
 * function MyTable() {
 *   const navRef = useTableKeyboardNavigation()
 *
 *   return (
 *      <Table ref={navRef}>
 *        <tbody>
 *          <tr>
 *            <Table.Td><input /></Table.Td>
 *            <Table.Td><input /></Table.Td>
 *          </tr>
 *        </tbody>
 *      </Table>
 *   )
 * }
 * ```
 */
export function useTableKeyboardNavigation({
  enabled = true,
}: UseTableKeyboardNavigationOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  const getTable = useCallback((): HTMLTableElement | null => {
    const el = ref.current
    if (!el) {
      return null // stop here
    }

    if (el.tagName === 'TABLE') {
      return el as HTMLTableElement
    }

    return el.querySelector<HTMLTableElement>('table')
  }, [])

  const handler = useCallback(
    (event: KeyboardEvent) => {
      const table = getTable()

      if (table) {
        handleKeyDown(event, table)
      }
    },
    [getTable]
  )

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) {
      return undefined // stop here
    }

    const table = getTable()
    if (!table) {
      return undefined // stop here
    }

    setupTabindex(table)
    const cleanupFocus = setupFocusCleanup(table)

    el.addEventListener('keydown', handler)

    return () => {
      el.removeEventListener('keydown', handler)
      cleanupFocus()
    }
  }, [enabled, handler, getTable])

  return ref
}
