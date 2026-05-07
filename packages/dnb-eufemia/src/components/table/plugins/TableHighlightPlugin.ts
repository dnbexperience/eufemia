import type { TablePlugin } from '../Table'

/**
 * Table plugin that highlights entire columns when their Th has
 * `highlight`, and adds borders between vertically adjacent
 * highlighted cells.
 *
 * Usage:
 * ```tsx
 * import { highlightPlugin } from '@dnb/eufemia/components/Table'
 *
 * <Table plugins={[highlightPlugin]}>…</Table>
 * ```
 */
export const highlightPlugin: TablePlugin = (tableElement) => {
  // Determine highlighted columns from th elements
  const highlightedColumns = new Set<number>()
  const thElements = tableElement.querySelectorAll(
    'thead th.dnb-table__th--highlight'
  )
  for (const th of Array.from(thElements)) {
    highlightedColumns.add((th as HTMLTableCellElement).cellIndex)
  }

  const applied: { cell: HTMLTableCellElement; classes: string[] }[] = []

  for (let r = 0; r < tableElement.rows.length; r++) {
    const row = tableElement.rows[r]
    const prevRow = r > 0 ? tableElement.rows[r - 1] : null

    for (let c = 0; c < row.cells.length; c++) {
      const cell = row.cells[c]
      const classes: string[] = []

      // Add column highlight to td cells in highlighted columns
      if (
        cell.tagName === 'TD' &&
        highlightedColumns.has(c) &&
        !cell.classList.contains('dnb-table__td--highlight')
      ) {
        cell.classList.add('dnb-table__td--highlight')
        classes.push('dnb-table__td--highlight')
      }

      // Add border between vertically adjacent highlighted cells
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
