import type { CSSProperties } from 'react'
import { fireEvent, render } from '@testing-library/react'
import Table, { Td, Th, Tr } from '../Table'
import type { TableAllProps } from '../Table'

const StickyColumnTable = ({
  overflowX = 'auto',
  ...props
}: Partial<TableAllProps> & {
  overflowX?: CSSProperties['overflowX']
}) => (
  <div id="scroll-container" style={{ overflowX }}>
    <Table {...props}>
      <thead>
        <Tr>
          <Th colSpan={2}>Group</Th>
          <Th>Actions</Th>
        </Tr>
        <Tr>
          <Th>Name</Th>
          <Th>Value</Th>
          <Th>Edit</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row</Td>
          <Td>1</Td>
          <Td>Edit</Td>
        </Tr>
      </tbody>
    </Table>
  </div>
)

describe('useStickyColumn', () => {
  let triggerResize: () => void

  const getScrollContainer = () =>
    document.querySelector<HTMLElement>('#scroll-container')

  const simulateScroll = (scrollLeft: number) => {
    const element = getScrollContainer()
    element.scrollLeft = scrollLeft
    fireEvent.scroll(element)
  }

  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          triggerResize = callback
        }
        observe() {
          /* noop */
        }
        unobserve() {
          /* noop */
        }
        disconnect() {
          /* noop */
        }
      }
    )

    // Cells spanning several columns are wider than the sticky column
    vi.spyOn(
      HTMLElement.prototype,
      'offsetWidth',
      'get'
    ).mockImplementation(function (this: HTMLTableCellElement) {
      return this.colSpan > 1 ? 300 : 120
    })
    vi.spyOn(Element.prototype, 'scrollWidth', 'get').mockReturnValue(500)
    vi.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(300)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it.each(['first', 'last'] as const)(
    'should set the class for the %s column',
    (stickyColumn) => {
      render(<StickyColumnTable stickyColumn={stickyColumn} />)

      const tableElement = document.querySelector('table')
      expect(tableElement).toHaveClass(
        `dnb-table--sticky-column-${stickyColumn}`
      )
      expect(tableElement).not.toHaveAttribute('stickyColumn')
    }
  )

  it('should keep focused elements from being scrolled underneath the sticky column', () => {
    const { rerender } = render(<StickyColumnTable stickyColumn="first" />)

    expect(getScrollContainer().style.scrollPaddingLeft).toBe('120px')
    expect(getScrollContainer().style.scrollPaddingRight).toBe('')

    rerender(<StickyColumnTable stickyColumn="last" />)

    expect(getScrollContainer().style.scrollPaddingLeft).toBe('')
    expect(getScrollContainer().style.scrollPaddingRight).toBe('120px')
  })

  it('should set the visible width for the sticky header shadow', () => {
    render(<StickyColumnTable stickyColumn="first" />)

    const tableElement = document.querySelector('table')
    expect(
      tableElement.style.getPropertyValue(
        '--table-sticky-column-viewport-width'
      )
    ).toBe('300px')

    vi.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(250)
    triggerResize()

    expect(
      tableElement.style.getPropertyValue(
        '--table-sticky-column-viewport-width'
      )
    ).toBe('250px')
  })

  it('should update the scroll padding when the column width changes', () => {
    render(<StickyColumnTable stickyColumn="first" />)

    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(
      160
    )
    triggerResize()

    expect(getScrollContainer().style.scrollPaddingLeft).toBe('160px')
  })

  it('should set data-sticky-column-overlap while columns are scrolled underneath the first column', () => {
    render(<StickyColumnTable stickyColumn="first" />)

    const tableElement = document.querySelector('table')
    expect(tableElement).not.toHaveAttribute('data-sticky-column-overlap')

    simulateScroll(100)
    expect(tableElement).toHaveAttribute('data-sticky-column-overlap')

    simulateScroll(0)
    expect(tableElement).not.toHaveAttribute('data-sticky-column-overlap')
  })

  it('should set data-sticky-column-overlap while columns are scrolled underneath the last column', () => {
    render(<StickyColumnTable stickyColumn="last" />)

    const tableElement = document.querySelector('table')
    expect(tableElement).toHaveAttribute('data-sticky-column-overlap')

    simulateScroll(200)
    expect(tableElement).not.toHaveAttribute('data-sticky-column-overlap')

    simulateScroll(150)
    expect(tableElement).toHaveAttribute('data-sticky-column-overlap')
  })

  it('should reset the scroll container when stickyColumn is removed', () => {
    const { rerender } = render(<StickyColumnTable stickyColumn="first" />)

    simulateScroll(100)
    rerender(<StickyColumnTable />)

    const tableElement = document.querySelector('table')
    expect(tableElement).not.toHaveAttribute('data-sticky-column-overlap')
    expect(tableElement).not.toHaveClass('dnb-table--sticky-column-first')
    expect(
      tableElement.style.getPropertyValue(
        '--table-sticky-column-viewport-width'
      )
    ).toBe('')
    expect(getScrollContainer().style.scrollPaddingLeft).toBe('')

    simulateScroll(50)
    expect(tableElement).not.toHaveAttribute('data-sticky-column-overlap')
  })

  it('should not change an ancestor that cannot be scrolled', () => {
    render(<StickyColumnTable stickyColumn="first" overflowX="hidden" />)

    simulateScroll(100)

    expect(getScrollContainer().style.scrollPaddingLeft).toBe('')
    expect(document.querySelector('table')).not.toHaveAttribute(
      'data-sticky-column-overlap'
    )
  })
})
