import { render } from '@testing-library/react'
import Table, { useTableHighlight } from '../Table'
import TableTd from '../TableTd'
import TableTh from '../TableTh'
import TableTr from '../TableTr'

describe('useTableHighlight', () => {
  it('should inherit highlight from Th in the same column', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh>A</TableTh>
              <TableTh highlight>B</TableTh>
              <TableTh>C</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
              <TableTd>2</TableTd>
              <TableTd>3</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(Array.from(cells[0].classList)).not.toContain(
      'dnb-table__td--highlight'
    )
    expect(Array.from(cells[1].classList)).toContain(
      'dnb-table__td--highlight'
    )
    expect(Array.from(cells[2].classList)).not.toContain(
      'dnb-table__td--highlight'
    )
  })

  it('should set transparent left border on non-highlighted cell right of highlighted column', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh highlight>A</TableTh>
              <TableTh>B</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
              <TableTd>2</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(cells[1].classList).toContain(
      'dnb-table--highlight-neighbor-left'
    )
  })

  it('should set transparent right border on non-highlighted cell left of highlighted column', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh>A</TableTh>
              <TableTh highlight>B</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
              <TableTd>2</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(cells[0].classList).toContain(
      'dnb-table--highlight-neighbor-right'
    )
  })

  it('should set transparent top border on non-highlighted cell below highlighted cell', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh>A</TableTh>
              <TableTh>B</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd highlight>1</TableTd>
              <TableTd>2</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>3</TableTd>
              <TableTd>4</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(cells[2].classList).toContain(
      'dnb-table--highlight-neighbor-top'
    )
  })

  it('should add highlight-border class between vertically adjacent highlighted cells', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh highlight>A</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
            </TableTr>
            <TableTr>
              <TableTd>2</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    expect(cells[0].classList).toContain('dnb-table__td--highlight')
    expect(cells[0].classList).toContain('dnb-table__td--highlight-border')
    expect(cells[1].classList).toContain('dnb-table__td--highlight')
    expect(cells[1].classList).toContain('dnb-table__td--highlight-border')
  })

  it('should not set transparent borders on non-highlighted cells without highlighted neighbors', () => {
    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh>A</TableTh>
              <TableTh highlight>B</TableTh>
              <TableTh>C</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
              <TableTd>2</TableTd>
              <TableTd>3</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    const cells = document.querySelectorAll('td')
    // Cell 0 (left of highlight): no left neighbor class
    expect(cells[0].classList).not.toContain(
      'dnb-table--highlight-neighbor-left'
    )
    // Cell 2 (right of highlight): no right neighbor class
    expect(cells[2].classList).not.toContain(
      'dnb-table--highlight-neighbor-right'
    )
  })

  it('should warn when a highlighted cell has no aria-label', () => {
    const log = vi.fn()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(log)

    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh highlight>A</TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd>1</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    expect(log).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining('aria-label')
    )

    consoleSpy.mockRestore()
  })

  it('should not warn when highlighted cells have aria-label', () => {
    const log = vi.fn()
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(log)

    const HighlightTable = () => {
      const highlightRef = useTableHighlight()

      return (
        <Table ref={highlightRef}>
          <thead>
            <TableTr>
              <TableTh highlight aria-label="Highlighted column">
                A
              </TableTh>
            </TableTr>
          </thead>
          <tbody>
            <TableTr>
              <TableTd aria-label="Highlighted cell">1</TableTd>
            </TableTr>
          </tbody>
        </Table>
      )
    }

    render(<HighlightTable />)

    expect(log).not.toHaveBeenCalled()

    consoleSpy.mockRestore()
  })
})
