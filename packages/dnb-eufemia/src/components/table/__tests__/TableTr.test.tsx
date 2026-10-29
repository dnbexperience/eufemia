import { Profiler, StrictMode, useContext, useRef, useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Table from '../Table'
import { TableContext } from '../TableContext'
import type { TableTrProps } from '../TableTr'
import TableTr from '../TableTr'

describe('TableTr', () => {
  it('renders with props as an object', () => {
    const props: TableTrProps = { children: <td>content</td> }

    render(
      <table>
        <tbody>
          <TableTr {...props} />
        </tbody>
      </table>
    )
    expect(document.querySelector('tr')).toBeInTheDocument()
  })

  it('should work without internal context', () => {
    render(
      <table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </table>
    )

    const element = document.querySelector('tr')

    expect(element.textContent).toBe('content')
  })

  it('should contain children content', () => {
    render(
      <Table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')

    expect(element.textContent).toBe('content')
  })

  it('should set the noWrap class', () => {
    render(
      <table>
        <tbody>
          <TableTr noWrap>
            <td>content</td>
          </TableTr>
        </tbody>
      </table>
    )

    const element = document.querySelector('tr')

    expect(Array.from(element.classList)).toContain('dnb-table--no-wrap')
  })

  it('should set the verticalAlign class', () => {
    render(
      <table>
        <tbody>
          <TableTr verticalAlign="middle">
            <td>content</td>
          </TableTr>
        </tbody>
      </table>
    )

    const element = document.querySelector('tr')

    expect(Array.from(element.classList)).toContain(
      'dnb-table__tr--vertical-align-middle'
    )
  })

  it('should include custom attributes', () => {
    render(
      <Table>
        <tbody>
          <TableTr aria-label="custom-label">
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['role', 'class', 'aria-label'])
  })

  it('should have role with row as value', () => {
    render(
      <Table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')

    expect(element.getAttribute('role')).toBe('row')
  })

  it('should include custom classes', () => {
    render(
      <Table>
        <tbody>
          <TableTr className="custom-class">
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
    expect(Array.from(element.classList)).toContain('custom-class')
  })

  it('should have "--odd" modifier by default', () => {
    render(
      <Table>
        <tbody>
          <TableTr className="custom-class">
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
    expect(Array.from(element.classList)).toContain('dnb-table__tr')
    expect(Array.from(element.classList)).toContain('dnb-table__tr--odd')
  })

  it('should have "--even" modifier by default', () => {
    render(
      <Table>
        <tbody>
          <TableTr variant="even">
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
    expect(Array.from(element.classList)).toContain('dnb-table__tr--even')
  })

  it('should set odd/even', () => {
    render(
      <Table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const elements = document.querySelectorAll('tbody tr')
    expect(Array.from(elements[0].classList)).toContain(
      'dnb-table__tr--odd'
    )
    expect(Array.from(elements[1].classList)).toContain(
      'dnb-table__tr--even'
    )
    expect(Array.from(elements[2].classList)).toContain(
      'dnb-table__tr--odd'
    )
    expect(Array.from(elements[3].classList)).toContain(
      'dnb-table__tr--even'
    )
  })

  it('should continue when variant was defined', () => {
    render(
      <Table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr variant="odd">
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const elements = document.querySelectorAll('tbody tr')
    expect(Array.from(elements[0].classList)).toContain(
      'dnb-table__tr--odd'
    )
    expect(Array.from(elements[1].classList)).toContain(
      'dnb-table__tr--odd'
    )
    expect(Array.from(elements[2].classList)).toContain(
      'dnb-table__tr--even'
    )
    expect(Array.from(elements[3].classList)).toContain(
      'dnb-table__tr--odd'
    )
  })

  describe('re-render', () => {
    const MockComponent = () => {
      const [list, setlist] = useState([
        'content cab',
        'content abc',
        'content bac',
      ])

      return (
        <Table>
          <thead>
            <TableTr>
              <th>
                <button onClick={handleReorder}>re-order</button>
              </th>
            </TableTr>
          </thead>
          <tbody>
            {list.map((value) => (
              <TableTr key={value}>
                <td>{value}</td>
              </TableTr>
            ))}
          </tbody>
        </Table>
      )

      function sortByName(a, b) {
        return a.localeCompare(b)
      }

      function handleReorder() {
        setlist([...list].sort(sortByName))
      }
    }

    it('should re-render tr when tr gets removed', () => {
      const { rerender } = render(
        <Table>
          <tbody>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr variant="odd">
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
          </tbody>
        </Table>
      )

      let elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(4)
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(Array.from(elements[3].classList)).toContain(
        'dnb-table__tr--odd'
      )

      rerender(
        <Table>
          <tbody>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
          </tbody>
        </Table>
      )

      elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--odd'
      )

      rerender(
        <Table>
          <tbody>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr variant="even">
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
          </tbody>
        </Table>
      )

      elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(4)
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(Array.from(elements[3].classList)).toContain(
        'dnb-table__tr--odd'
      )
    })

    it('should re-render table when children changes', () => {
      render(<MockComponent />)

      let elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(elements[0].textContent).toBe('content cab')
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(elements[1].textContent).toBe('content abc')
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(elements[2].textContent).toBe('content bac')
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )

      fireEvent.click(screen.queryByText('re-order'))

      elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(elements[0].textContent).toBe('content abc')
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(elements[1].textContent).toBe('content bac')
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(elements[2].textContent).toBe('content cab')
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )
    })

    it('should set correct odd/even in StrictMode', () => {
      render(
        <StrictMode>
          <MockComponent />
        </StrictMode>
      )

      let elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(elements[0].textContent).toBe('content cab')
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(elements[1].textContent).toBe('content abc')
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(elements[2].textContent).toBe('content bac')
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )

      fireEvent.click(screen.queryByText('re-order'))

      elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(elements[0].textContent).toBe('content abc')
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(elements[1].textContent).toBe('content bac')
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(elements[2].textContent).toBe('content cab')
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )
    })
  })

  describe('recount', () => {
    const MockTable = ({
      values,
      mode,
    }: {
      values: Array<string>
      mode?: 'accordion'
    }) => {
      const [, setRenderCount] = useState(0)

      return (
        <>
          <button
            id="rerender"
            onClick={() => setRenderCount((count) => count + 1)}
          >
            re-render
          </button>
          <Table mode={mode}>
            <tbody>
              {values.map((value) => (
                <TableTr key={value}>
                  <td>{value}</td>
                  {mode === 'accordion' && (
                    <TableTr.AccordionContent>
                      <td>{value} content</td>
                    </TableTr.AccordionContent>
                  )}
                </TableTr>
              ))}
            </tbody>
          </Table>
        </>
      )
    }

    const getRows = () =>
      Array.from(
        document.querySelectorAll(
          'tbody tr:not(.dnb-table__tr__accordion-content)'
        )
      )

    const getVariants = () =>
      getRows().map((row) =>
        row.classList.contains('dnb-table__tr--odd') ? 'odd' : 'even'
      )

    const getLast = () =>
      getRows().map((row) => row.classList.contains('dnb-table__tr--last'))

    const observeRowClassChanges = () => {
      const observer = new MutationObserver(() => null)
      observer.observe(document.querySelector('tbody'), {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true,
      })

      return () => {
        const rows = getRows()
        const records = observer.takeRecords()
        observer.disconnect()

        return records.filter(({ target }) =>
          rows.includes(target as Element)
        )
      }
    }

    it('should render only once when the parent re-renders with the same rows', () => {
      const onRender = vi.fn()

      render(
        <Profiler id="table" onRender={onRender}>
          <MockTable values={['a', 'b', 'c']} />
        </Profiler>
      )

      onRender.mockClear()
      fireEvent.click(document.querySelector('#rerender'))

      expect(onRender).toHaveBeenCalledTimes(1)
    })

    it('should keep the row classes when the parent re-renders with the same rows', () => {
      render(<MockTable values={['a', 'b', 'c']} />)

      const getClassChanges = observeRowClassChanges()
      fireEvent.click(document.querySelector('#rerender'))

      expect(getClassChanges()).toHaveLength(0)
      expect(getVariants()).toEqual(['odd', 'even', 'odd'])
      expect(getLast()).toEqual([false, false, true])
    })

    it('should keep the row classes in accordion mode when the parent re-renders with the same rows', () => {
      render(<MockTable mode="accordion" values={['a', 'b', 'c']} />)

      const getClassChanges = observeRowClassChanges()
      fireEvent.click(document.querySelector('#rerender'))

      expect(getClassChanges()).toHaveLength(0)
      expect(getVariants()).toEqual(['odd', 'even', 'odd'])
      expect(getLast()).toEqual([false, false, true])
    })

    it('should keep the row classes in StrictMode when the parent re-renders with the same rows', () => {
      render(
        <StrictMode>
          <MockTable values={['a', 'b', 'c']} />
        </StrictMode>
      )

      const getClassChanges = observeRowClassChanges()
      fireEvent.click(document.querySelector('#rerender'))

      expect(getClassChanges()).toHaveLength(0)
      expect(getVariants()).toEqual(['odd', 'even', 'odd'])
      expect(getLast()).toEqual([false, false, true])
    })

    it('should recount when a row is added between other rows', () => {
      const { rerender } = render(<MockTable values={['a', 'c']} />)

      expect(getVariants()).toEqual(['odd', 'even'])

      rerender(<MockTable values={['a', 'b', 'c']} />)

      expect(getVariants()).toEqual(['odd', 'even', 'odd'])
      expect(getLast()).toEqual([false, false, true])
    })

    it('should move the last row class when the last row is removed', () => {
      const { rerender } = render(<MockTable values={['a', 'b', 'c']} />)

      rerender(<MockTable values={['a', 'b']} />)

      expect(getVariants()).toEqual(['odd', 'even'])
      expect(getLast()).toEqual([false, true])
    })

    it('should keep the last row class while the rows are recounted', () => {
      const { rerender } = render(<MockTable values={['a', 'b', 'c']} />)

      const lastRow = getRows()[2]
      const observer = new MutationObserver(() => null)
      observer.observe(lastRow, {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true,
      })

      rerender(<MockTable values={['b', 'c']} />)

      const classNames = [
        ...observer.takeRecords().map(({ oldValue }) => oldValue),
        lastRow.className,
      ]
      observer.disconnect()

      expect(
        classNames.filter(
          (className) => !className.includes('dnb-table__tr--last')
        )
      ).toEqual([])
      expect(getVariants()).toEqual(['odd', 'even'])
    })

    it('should recount accordion rows when a row is removed', () => {
      const { rerender } = render(
        <MockTable mode="accordion" values={['a', 'b', 'c']} />
      )

      rerender(<MockTable mode="accordion" values={['b', 'c']} />)

      expect(getVariants()).toEqual(['odd', 'even'])
      expect(getLast()).toEqual([false, true])
    })

    it('should recount in StrictMode when a row is removed', () => {
      const { rerender } = render(
        <StrictMode>
          <MockTable values={['a', 'b', 'c']} />
        </StrictMode>
      )

      rerender(
        <StrictMode>
          <MockTable values={['b', 'c']} />
        </StrictMode>
      )

      expect(getVariants()).toEqual(['odd', 'even'])
      expect(getLast()).toEqual([false, true])
    })

    it('should recount rows that a custom component renders', () => {
      const Rows = ({ values }: { values: Array<string> }) => (
        <>
          {values.map((value) => (
            <TableTr key={value}>
              <td>{value}</td>
            </TableTr>
          ))}
        </>
      )

      const { rerender } = render(
        <Table>
          <tbody>
            <Rows values={['a', 'c']} />
          </tbody>
        </Table>
      )

      rerender(
        <Table>
          <tbody>
            <Rows values={['a', 'b', 'c']} />
          </tbody>
        </Table>
      )

      expect(getVariants()).toEqual(['odd', 'even', 'odd'])
      expect(getLast()).toEqual([false, false, true])
    })

    it('should recount when a row moves into a nested array', () => {
      const { rerender } = render(
        <Table>
          <tbody>
            {[
              [
                <TableTr key="a">
                  <td>a</td>
                </TableTr>,
              ],
              <TableTr key="b">
                <td>b</td>
              </TableTr>,
            ]}
          </tbody>
        </Table>
      )

      rerender(
        <Table>
          <tbody>
            {[
              [
                <TableTr key="a">
                  <td>a</td>
                </TableTr>,
              ],
              [
                <TableTr key="b">
                  <td>b</td>
                </TableTr>,
              ],
            ]}
          </tbody>
        </Table>
      )

      expect(getVariants()).toEqual(['odd', 'even'])
      expect(getLast()).toEqual([false, true])
    })
  })

  describe('isLast', () => {
    it('should only set --last on the last Tr', () => {
      render(
        <Table>
          <tbody>
            <TableTr>
              <td>row 1</td>
            </TableTr>
            <TableTr>
              <td>row 2</td>
            </TableTr>
            <TableTr>
              <td>row 3</td>
            </TableTr>
          </tbody>
        </Table>
      )

      const rows = document.querySelectorAll('tbody tr')
      expect(rows[0].classList.contains('dnb-table__tr--last')).toBe(false)
      expect(rows[1].classList.contains('dnb-table__tr--last')).toBe(false)
      expect(rows[2].classList.contains('dnb-table__tr--last')).toBe(true)
    })
  })

  describe('re-render loop', () => {
    it(
      'should not cause "Maximum update depth exceeded" when the Table content re-renders and remounts rows on its own',
      { timeout: 5000 },
      () => {
        const errorSpy = vi
          .spyOn(console, 'error')
          .mockImplementation(() => undefined)

        // Reproduces the infinity-scroll scenario: the content consumes the
        // TableContext, so it re-renders whenever the internal totalCount state
        // changes, and it remounts its Tr on every render (fresh key). This
        // mirrors an observer-driven Pagination that mounts/unmounts marker
        // rows and mutates the shared row count on each render.
        const InfinityContent = () => {
          useContext(TableContext)
          const renderCountRef = useRef(0)
          renderCountRef.current++

          return (
            <tbody>
              <TableTr key={renderCountRef.current}>
                <td>content</td>
              </TableTr>
            </tbody>
          )
        }

        render(
          <Table>
            <InfinityContent />
          </Table>
        )

        const maxDepthErrors = errorSpy.mock.calls.filter((call) =>
          String(call[0]).includes('Maximum update depth exceeded')
        )

        expect(maxDepthErrors).toHaveLength(0)
        expect(document.querySelector('tbody tr')).toBeInTheDocument()

        errorSpy.mockRestore()
      }
    )
  })
})
