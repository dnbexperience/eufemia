import { fireEvent, render, screen } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Table, { Td, Th, Tr } from '../Table'
import { BasicTable } from './TableMocks'

describe('useStickyHeader', () => {
  const setSizes = () => {
    const tableElement = document.querySelector('table')
    vi.spyOn(tableElement, 'offsetHeight', 'get').mockReturnValue(480)
    vi.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(160)

    const thElement = document.querySelector('th')
    vi.spyOn(thElement, 'offsetHeight', 'get').mockReturnValue(72)

    vi.runAllTimers() // run applyObservers
  }

  const simulateScroll = (
    y: number,
    scrollElement: HTMLElement = null
  ) => {
    if (scrollElement) {
      vi.spyOn(scrollElement, 'scrollTop', 'get').mockReturnValue(y)
    } else {
      window.scrollY = y
    }

    fireEvent.scroll(scrollElement || document)
  }

  const mockScrollTimelineSupport = (timeline = true, range = true) => {
    vi.stubGlobal('CSS', {
      ...CSS,
      supports: (condition: string) =>
        (timeline &&
          condition === 'animation-timeline: scroll(root block)') ||
        (range && condition === 'animation-range: 0 1px'),
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
    mockScrollTimelineSupport(false, false)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('should contain valid HTML classes when sticky', () => {
    render(
      <Table sticky>
        <BasicTable />
      </Table>
    )

    expect(screen.queryByRole('table')).toHaveClass(
      'dnb-table dnb-table__variant--generic dnb-table__size--large dnb-table--sticky',
      { exact: true }
    )
  })

  it('should set the css-position mode', () => {
    render(
      <Table sticky="css-position">
        <BasicTable />
      </Table>
    )

    setSizes()

    expect(document.querySelector('tr')).toHaveAttribute(
      'data-sticky',
      'css-position'
    )
  })

  it('should set/remove data-is-sticky when interacting', () => {
    render(
      <Table sticky>
        <BasicTable />
      </Table>
    )

    setSizes()

    const trElem = document.querySelector('tr')

    expect(Array.from(screen.queryByRole('table').classList)).toContain(
      'dnb-table--sticky'
    )
    expect(trElem).toHaveAttribute('data-sticky', 'true')

    simulateScroll(200)

    expect(trElem).toHaveAttribute('data-is-sticky')

    simulateScroll(0)

    expect(trElem).not.toHaveAttribute('data-is-sticky')
  })

  it('should set --table-top with given stickyOffset when sticky="css-position"', () => {
    const { rerender } = render(
      <Table sticky="css-position" stickyOffset="4rem">
        <BasicTable />
      </Table>
    )

    const thElement = document.querySelector('th')
    const trElem = document.querySelector('tr')

    vi.spyOn(thElement, 'offsetHeight', 'get').mockReturnValue(72)

    setSizes()

    expect(trElem.style.getPropertyValue('--table-top')).toEqual('4rem')

    // stickyOffset should support pixels as well
    rerender(
      <Table sticky="css-position" stickyOffset={64}>
        <BasicTable />
      </Table>
    )

    setSizes()

    expect(trElem.style.getPropertyValue('--table-top')).toEqual('4rem')
  })

  it('should set --table-offset on scroll', () => {
    const { rerender } = render(
      <Table sticky stickyOffset="4rem">
        <BasicTable />
      </Table>
    )

    const tableElement = document.querySelector('table')
    const trElem = document.querySelector('tr')

    setSizes()

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    expect(trElem).toHaveAttribute('data-page-scroll')
    expect(trElem.style.getPropertyValue('--table-scroll-start')).toEqual(
      '96px'
    )
    expect(trElem.style.getPropertyValue('--table-scroll-end')).toEqual(
      '504px'
    )
    expect(
      trElem.style.getPropertyValue('--table-scroll-distance')
    ).toEqual('408px')

    simulateScroll(0)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')

    // Should set correct value (320-(160-64)=224)
    simulateScroll(320)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '224px'
    )

    simulateScroll(0)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')

    // Should set correct value (300-(160-64)=204)
    simulateScroll(300)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '204px'
    )

    // Should stop at the last row (480-72=408)
    simulateScroll(3000)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '408px'
    )

    // change the table offset
    vi.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(80)
    fireEvent.resize(window)

    // Should set correct value (320-(80-64)=304)
    simulateScroll(320)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '304px'
    )

    rerender(
      <Table sticky>
        <BasicTable />
      </Table>
    )

    setSizes()

    // Should set correct value (320-160=160)
    simulateScroll(320)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '160px'
    )
  })

  it.each([
    [true, true, ''],
    [true, false, '224px'],
    [false, true, '224px'],
  ])(
    'should skip offset writes only with timeline=%s and range=%s support',
    (timeline, range, expectedOffset) => {
      mockScrollTimelineSupport(timeline, range)
      render(
        <Table sticky stickyOffset="4rem">
          <BasicTable />
        </Table>
      )

      const trElem = document.querySelector('tr')
      setSizes()

      const setProperty = vi.spyOn(trElem.style, 'setProperty')
      simulateScroll(320)
      expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
        expectedOffset
      )
      expect(
        setProperty.mock.calls.filter(
          ([name]) => name === '--table-offset'
        )
      ).toHaveLength(expectedOffset ? 1 : 0)
      expect(trElem).toHaveAttribute('data-is-sticky')

      simulateScroll(0)
      expect(trElem).not.toHaveAttribute('data-is-sticky')
      expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    }
  )

  it.each([false, true])(
    'should recalculate table offset on scroll when layout changes dynamically with timeline support=%s',
    (supportsTimeline) => {
      mockScrollTimelineSupport(supportsTimeline)
      render(
        <Table sticky stickyOffset="4rem">
          <BasicTable />
        </Table>
      )

      const tableElement = document.querySelector('table')
      const trElem = document.querySelector('tr')

      setSizes()

      // Initial scroll: offset = 320 - (160 - 64) = 224
      simulateScroll(320)
      expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
        supportsTimeline ? '' : '224px'
      )

      // Simulate a banner appearing above the table, pushing it down by 80px
      // (no resize event fired, only the table's offsetTop changes)
      vi.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(240)

      // On the next scroll, the new offset should be picked up automatically
      // offset = 320 - (240 - 64) = 144
      simulateScroll(320)
      expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
        supportsTimeline ? '' : '144px'
      )
      expect(
        trElem.style.getPropertyValue('--table-scroll-start')
      ).toEqual('176px')

      vi.spyOn(tableElement, 'offsetHeight', 'get').mockReturnValue(640)
      simulateScroll(320)
      expect(trElem.style.getPropertyValue('--table-scroll-end')).toEqual(
        '744px'
      )
      expect(
        trElem.style.getPropertyValue('--table-scroll-distance')
      ).toEqual('568px')
    }
  )

  it('should update the scroll range when the rows change without scrolling', () => {
    mockScrollTimelineSupport()
    let triggerResize: () => void
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          triggerResize = callback
        }
        observe() {
          /* noop */
        }
        disconnect() {
          /* noop */
        }
      }
    )

    render(
      <Table sticky stickyOffset="4rem">
        <BasicTable />
      </Table>
    )

    const tableElement = document.querySelector('table')
    const trElem = document.querySelector('tr')

    setSizes()
    simulateScroll(320)

    expect(trElem.style.getPropertyValue('--table-scroll-end')).toEqual(
      '504px'
    )
    expect(trElem).toHaveAttribute('data-is-sticky')

    // The rows are removed, so only the header row is left
    vi.spyOn(tableElement, 'offsetHeight', 'get').mockReturnValue(72)
    triggerResize()

    expect(trElem.style.getPropertyValue('--table-scroll-end')).toEqual(
      '96px'
    )
    expect(trElem).not.toHaveAttribute('data-is-sticky')

    vi.spyOn(tableElement, 'offsetHeight', 'get').mockReturnValue(480)
    triggerResize()

    expect(trElem.style.getPropertyValue('--table-scroll-end')).toEqual(
      '504px'
    )
    expect(trElem).toHaveAttribute('data-is-sticky')
  })

  it('should keep the sticky state when the header row re-renders after the rows are reloaded', () => {
    mockScrollTimelineSupport()
    const ReloadTable = ({ rows }: { rows: Array<string> }) => (
      <Table sticky>
        <thead>
          <Tr>
            <Th>Name</Th>
          </Tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Tr key={row}>
              <Td>{row}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    )
    const rows = ['Row 1', 'Row 2']

    const { rerender } = render(<ReloadTable rows={rows} />)

    const trElem = document.querySelector('tr')
    const expectStickyState = () => {
      expect(trElem).toHaveAttribute('data-sticky', 'true')
      expect(trElem).toHaveAttribute('data-page-scroll')
      expect(trElem).toHaveAttribute('data-is-sticky')
    }

    setSizes()
    simulateScroll(320)

    expectStickyState()

    // The header row becomes the last row, so React replaces its classes
    rerender(<ReloadTable rows={[]} />)

    expect(trElem).toHaveClass('dnb-table__tr--last')
    expectStickyState()

    rerender(<ReloadTable rows={rows} />)

    expect(trElem).not.toHaveClass('dnb-table__tr--last')
    expectStickyState()
  })

  it('should check if .dnb-scroll-view has a vertical scrollbar and set shadow only, when css-position is used', () => {
    const { rerender } = render(
      <Table.ScrollView style={{ maxHeight: '4rem' }}>
        <Table sticky="css-position" stickyOffset="1rem">
          <BasicTable />
        </Table>
      </Table.ScrollView>
    )

    const trElem = document.querySelector('tr')
    const scrollElem: HTMLElement =
      document.querySelector('.dnb-scroll-view')

    // Make ScrollView have a scrollbar
    vi.spyOn(scrollElem, 'scrollHeight', 'get').mockReturnValue(120)
    vi.spyOn(scrollElem, 'offsetHeight', 'get').mockReturnValue(80)

    setSizes()

    simulateScroll(0, scrollElem)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    expect(trElem.style.getPropertyValue('--table-top')).toEqual('1rem')
    expect(trElem).not.toHaveAttribute('data-is-sticky')

    simulateScroll(32, scrollElem)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    expect(trElem).toHaveAttribute('data-is-sticky')

    rerender(
      <Table.ScrollView style={{ maxHeight: '4rem' }}>
        <Table sticky="css-position">
          <BasicTable />
        </Table>
      </Table.ScrollView>
    )

    simulateScroll(46, scrollElem)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    expect(trElem.style.getPropertyValue('--table-top')).toEqual('1rem')
  })

  it('should use Modal/Drawer .dnb-scroll-view', () => {
    mockScrollTimelineSupport()
    const { rerender } = render(
      <div className="dnb-modal__content">
        <div className="dnb-modal__header__bar">bar</div>
        <div className="dnb-scroll-view">
          <Table sticky>
            <BasicTable />
          </Table>
        </div>
      </div>
    )

    const tableElement = document.querySelector('table')
    const trElem = document.querySelector('tr')
    const barElem: HTMLElement = document.querySelector(
      '.dnb-modal__header__bar'
    )
    const scrollElem: HTMLElement =
      document.querySelector('.dnb-scroll-view')

    vi.spyOn(barElem, 'offsetHeight', 'get').mockReturnValue(40)

    setSizes()

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')

    simulateScroll(0, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')

    // Should set correct value (320-(160-40)=200)
    simulateScroll(320, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '200px'
    )

    simulateScroll(0, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')

    // Should set correct value (300-(160-40)=180)
    simulateScroll(300, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '180px'
    )

    // Should stop at the last row (480-72=408)
    simulateScroll(3000, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '408px'
    )

    // change the table offset
    vi.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(80)
    fireEvent.resize(window)

    // Should set correct value (320-(80-40)=280)
    simulateScroll(320, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '280px'
    )

    rerender(
      <div className="dnb-modal__content">
        <div className="dnb-modal__header__bar">bar</div>
        <div className="dnb-scroll-view">
          <Table sticky stickyOffset="4rem">
            <BasicTable />
          </Table>
        </div>
      </div>
    )

    setSizes()

    // Should set correct value (320-(160-64)=224)
    simulateScroll(320, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '224px'
    )

    rerender(
      <div className="dnb-modal__content">
        <div className="dnb-modal__header__bar">bar</div>
        <div className="dnb-scroll-view">
          <Table sticky>
            <BasicTable />
          </Table>
        </div>
      </div>
    )

    setSizes()

    // Should set correct value (320-(160-40)=200)
    simulateScroll(320, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '200px'
    )
  })

  it('should follow the scroll view when a scrollbar appears on resize', () => {
    mockScrollTimelineSupport()
    render(
      <Table.ScrollView>
        <Table sticky>
          <BasicTable />
        </Table>
      </Table.ScrollView>
    )

    const trElem: HTMLElement = document.querySelector('tr')
    const scrollElem: HTMLElement =
      document.querySelector('.dnb-scroll-view')

    vi.spyOn(scrollElem, 'scrollHeight', 'get').mockReturnValue(100)
    vi.spyOn(scrollElem, 'offsetHeight', 'get').mockReturnValue(100)

    setSizes()

    // the scroll view overflows first after a resize
    expect(trElem).toHaveAttribute('data-page-scroll')
    vi.spyOn(scrollElem, 'scrollHeight', 'get').mockReturnValue(1000)
    fireEvent.resize(window)
    expect(trElem).not.toHaveAttribute('data-page-scroll')
    expect(trElem).not.toHaveAttribute('style', /--table-scroll-/)

    simulateScroll(320, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '320px'
    )
  })

  it('should keep the header inside the table when the rows shrink while scrolled', () => {
    let triggerResize: () => void
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          triggerResize = callback
        }
        observe() {
          /* noop */
        }
        disconnect() {
          /* noop */
        }
      }
    )

    render(
      <Table.ScrollView>
        <Table sticky>
          <BasicTable />
        </Table>
      </Table.ScrollView>
    )

    const tableElement = document.querySelector('table')
    const trElem: HTMLElement = document.querySelector('tr')
    const scrollElem: HTMLElement =
      document.querySelector('.dnb-scroll-view')

    vi.spyOn(scrollElem, 'scrollHeight', 'get').mockReturnValue(1000)
    vi.spyOn(scrollElem, 'offsetHeight', 'get').mockReturnValue(100)

    setSizes()
    simulateScroll(320, scrollElem)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '320px'
    )

    // The rows shrink before the scroll position is updated
    vi.spyOn(tableElement, 'offsetHeight', 'get').mockReturnValue(200)
    triggerResize()

    // 200 - 72 (the header height) = 128
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '128px'
    )
    expect(trElem).not.toHaveAttribute('data-is-sticky')

    // Jumping straight to the top from below the table
    simulateScroll(0, scrollElem)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
  })

  it.each([false, true])(
    'should use document scrolling when the scrollbar disappears with timeline support=%s',
    (supportsTimeline) => {
      mockScrollTimelineSupport(supportsTimeline)
      render(
        <Table.ScrollView>
          <Table sticky>
            <BasicTable />
          </Table>
        </Table.ScrollView>
      )

      const trElem: HTMLElement = document.querySelector('tr')
      const scrollElem: HTMLElement =
        document.querySelector('.dnb-scroll-view')

      vi.spyOn(scrollElem, 'scrollHeight', 'get').mockReturnValue(1000)
      vi.spyOn(scrollElem, 'offsetHeight', 'get').mockReturnValue(100)

      setSizes()

      simulateScroll(320, scrollElem)
      expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
        '320px'
      )

      // the scroll view stops overflowing, so the page scrolls instead
      simulateScroll(320)
      vi.spyOn(scrollElem, 'scrollHeight', 'get').mockReturnValue(100)
      fireEvent.resize(window)
      expect(trElem).toHaveAttribute('data-page-scroll')
      expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
        supportsTimeline ? '' : '160px'
      )

      simulateScroll(320)
      expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
        supportsTimeline ? '' : '160px'
      )
    }
  )

  it('should stop listening on the scroll view when unmounted', () => {
    const { unmount } = render(
      <div className="dnb-modal__content">
        <div className="dnb-modal__header__bar">bar</div>
        <div className="dnb-scroll-view">
          <Table sticky>
            <BasicTable />
          </Table>
        </div>
      </div>
    )

    const trElem: HTMLElement = document.querySelector('tr')
    const barElem: HTMLElement = document.querySelector(
      '.dnb-modal__header__bar'
    )
    const scrollElem: HTMLElement =
      document.querySelector('.dnb-scroll-view')

    vi.spyOn(barElem, 'offsetHeight', 'get').mockReturnValue(40)

    setSizes()

    simulateScroll(320, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '200px'
    )

    unmount()
    trElem.style.removeProperty('--table-offset')

    simulateScroll(320, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
  })

  it('should reset the header row when sticky is disabled', () => {
    const { rerender } = render(
      <Table sticky>
        <BasicTable />
      </Table>
    )

    const trElem: HTMLElement = document.querySelector('tr')

    setSizes()

    simulateScroll(320)

    expect(trElem).toHaveAttribute('data-sticky', 'true')
    expect(trElem).toHaveAttribute('data-is-sticky')
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '160px'
    )

    rerender(
      <Table>
        <BasicTable />
      </Table>
    )

    expect(trElem).not.toHaveAttribute('data-sticky')
    expect(trElem).not.toHaveAttribute('data-is-sticky')
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    expect(trElem).not.toHaveAttribute('data-page-scroll')
    expect(trElem).not.toHaveAttribute('style', /--table-scroll-/)

    // the header should no longer follow the scroll
    simulateScroll(480)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
  })

  it('should remove the css-position state when switching to the transform mode', () => {
    const { rerender } = render(
      <Table sticky="css-position" stickyOffset="4rem">
        <BasicTable />
      </Table>
    )

    const trElem: HTMLElement = document.querySelector('tr')

    setSizes()

    expect(trElem).toHaveAttribute('data-sticky', 'css-position')
    expect(trElem.style.getPropertyValue('--table-top')).toEqual('4rem')

    rerender(
      <Table sticky stickyOffset="4rem">
        <BasicTable />
      </Table>
    )

    setSizes()

    expect(trElem).toHaveAttribute('data-sticky', 'true')
    expect(trElem.style.getPropertyValue('--table-top')).toEqual('')
  })

  it('should remove the transform state when switching to the css-position mode', () => {
    const { rerender } = render(
      <Table sticky stickyOffset="4rem">
        <BasicTable />
      </Table>
    )

    const trElem: HTMLElement = document.querySelector('tr')

    setSizes()

    simulateScroll(320)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '224px'
    )

    rerender(
      <Table sticky="css-position" stickyOffset="4rem">
        <BasicTable />
      </Table>
    )

    setSizes()

    // the transform would otherwise stack on top of the "top" offset
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    expect(trElem.style.getPropertyValue('--table-top')).toEqual('4rem')
    expect(trElem).not.toHaveAttribute('data-page-scroll')
    expect(trElem).not.toHaveAttribute('style', /--table-scroll-/)

    simulateScroll(480)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
  })
})

describe('Table aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Table sticky="css-position">
        <BasicTable />
      </Table>
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
