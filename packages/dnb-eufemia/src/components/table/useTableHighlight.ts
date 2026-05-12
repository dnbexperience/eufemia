import { useCallback, useEffect, useRef } from 'react'

export type UseTableHighlightOptions = {
  /**
   * Whether column highlighting is enabled.
   * Default: `true`
   */
  enabled?: boolean
}

function isHighlighted(cell: Element): boolean {
  return (
    cell.classList.contains('dnb-table__td--highlight') ||
    cell.classList.contains('dnb-table__th--highlight')
  )
}

function applyHighlight(table: HTMLTableElement) {
  const highlightedColumns = new Set<number>()
  const thElements = table.querySelectorAll(
    'thead th.dnb-table__th--highlight'
  )

  for (const th of Array.from(thElements)) {
    highlightedColumns.add((th as HTMLTableCellElement).cellIndex)
  }

  const applied: { cell: HTMLTableCellElement; classes: string[] }[] = []

  // First pass: propagate column highlights from Th to Td
  for (let r = 0; r < table.rows.length; r++) {
    const row = table.rows[r]

    for (let c = 0; c < row.cells.length; c++) {
      const cell = row.cells[c]

      if (
        cell.tagName === 'TD' &&
        highlightedColumns.has(c) &&
        !cell.classList.contains('dnb-table__td--highlight')
      ) {
        cell.classList.add('dnb-table__td--highlight')
        applied.push({ cell, classes: ['dnb-table__td--highlight'] })
      }
    }
  }

  // Second pass: handle borders between highlighted and non-highlighted cells
  for (let r = 0; r < table.rows.length; r++) {
    const row = table.rows[r]
    const prevRow = r > 0 ? table.rows[r - 1] : null

    for (let c = 0; c < row.cells.length; c++) {
      const cell = row.cells[c]
      const cellIsHighlighted = isHighlighted(cell)

      // Highlighted cell next to highlighted cell — use highlight border color
      if (cellIsHighlighted) {
        const prevCell = prevRow?.cells[c]
        if (prevCell && isHighlighted(prevCell)) {
          cell.classList.add('dnb-table__td--highlight-border')
          applied.push({
            cell,
            classes: ['dnb-table__td--highlight-border'],
          })
        }

        continue // stop here — highlighted cells get transparent borders via CSS
      }

      // Non-highlighted cell — mark touching borders as transparent
      const classes: string[] = []

      const leftCell = row.cells[c - 1]
      if (leftCell && isHighlighted(leftCell)) {
        classes.push('dnb-table--highlight-neighbor-left')
      }

      const rightCell = row.cells[c + 1]
      if (rightCell && isHighlighted(rightCell)) {
        classes.push('dnb-table--highlight-neighbor-right')
      }

      const topCell = prevRow?.cells[c]
      if (topCell && isHighlighted(topCell)) {
        classes.push('dnb-table--highlight-neighbor-top')
      }

      if (classes.length > 0) {
        cell.classList.add(...classes)
        applied.push({ cell, classes })
      }
    }
  }

  return () => {
    for (const { cell, classes } of applied) {
      cell.classList.remove(...classes)
    }
  }
}

/**
 * A hook that highlights entire columns when their `Th` has `highlight`,
 * and adds borders between vertically adjacent highlighted cells.
 *
 * @example
 * ```tsx
 * import { useTableHighlight } from '@dnb/eufemia/components/table'
 *
 * function MyTable() {
 *   const highlightRef = useTableHighlight()
 *
 *   return (
 *     <Table ref={highlightRef} outline border>
 *       <thead>
 *         <Tr>
 *           <Th highlight>Column A</Th>
 *           <Th>Column B</Th>
 *         </Tr>
 *       </thead>
 *       <tbody>
 *         <Tr>
 *           <Td>Row 1</Td>
 *           <Td>Row 1</Td>
 *         </Tr>
 *       </tbody>
 *     </Table>
 *   )
 * }
 * ```
 */
export function useTableHighlight({
  enabled = true,
}: UseTableHighlightOptions = {}) {
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

  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) {
      return undefined // stop here
    }

    const table = getTable()
    if (!table) {
      return undefined // stop here
    }

    return applyHighlight(table)
  })

  return ref
}
