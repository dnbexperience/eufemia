import { useCallback, useEffect, useRef } from 'react'

export type UseTableHighlightOptions = {
  /**
   * Whether column highlighting is enabled.
   * Default: `true`
   */
  enabled?: boolean
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

  for (let r = 0; r < table.rows.length; r++) {
    const row = table.rows[r]
    const prevRow = r > 0 ? table.rows[r - 1] : null

    for (let c = 0; c < row.cells.length; c++) {
      const cell = row.cells[c]
      const classes: string[] = []

      if (
        cell.tagName === 'TD' &&
        highlightedColumns.has(c) &&
        !cell.classList.contains('dnb-table__td--highlight')
      ) {
        cell.classList.add('dnb-table__td--highlight')
        classes.push('dnb-table__td--highlight')
      }

      if (
        cell.classList.contains('dnb-table__td--highlight') ||
        cell.classList.contains('dnb-table__th--highlight')
      ) {
        const prevCell = prevRow?.cells[c]
        if (
          prevCell?.classList.contains('dnb-table__td--highlight') ||
          prevCell?.classList.contains('dnb-table__th--highlight')
        ) {
          cell.classList.add('dnb-table__td--highlight-border')
          classes.push('dnb-table__td--highlight-border')
        }
      }

      if (classes.length > 0) {
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
