import { act } from 'react'
import type { RefObject } from 'react'
import { fireEvent, render } from '@testing-library/react'
import Table from '../Table'
import Provider from '../../../shared/Provider'
import type { TableScrollViewAllProps } from '../TableScrollView'
import ScrollView from '../TableScrollView'
import { BasicTable } from './TableMocks'
import { setResizeObserver } from '../../scroll-view/__tests__/shared-mocks/ResizeObserver'
import '../../../core/vitest/mockMatchMediaSetup'

describe('Table.ScrollView', () => {
  it('renders with props as an object', () => {
    const props: TableScrollViewAllProps = {
      children: (
        <Table>
          <BasicTable />
        </Table>
      ),
    }

    render(<ScrollView {...props} />)
    expect(
      document.querySelector('.dnb-table__scroll-view')
    ).toBeInTheDocument()
  })

  it('should support spacing props', () => {
    render(
      <ScrollView top="large">
        <Table>
          <BasicTable />
        </Table>
      </ScrollView>
    )

    const element = document.querySelector('.dnb-table__scroll-container')

    expect(element).toHaveClass(
      'dnb-table__scroll-container dnb-space__top--large',
      { exact: true }
    )
  })

  it('should have tabindex="0"', () => {
    const renderResizeObservers = []

    const observe = vi.fn()
    const init = vi.fn((callback) => {
      renderResizeObservers.push(callback)
    })
    setResizeObserver({ init, observe })

    const ref: RefObject<HTMLDivElement | null> = { current: null }

    render(
      <ScrollView ref={ref}>
        <Table>
          <BasicTable />
        </Table>
      </ScrollView>
    )

    const element = document.querySelector('.dnb-table__scroll-view')

    act(() => {
      vi.spyOn(ref.current, 'scrollWidth', 'get').mockReturnValue(102)
      vi.spyOn(ref.current, 'offsetWidth', 'get').mockReturnValue(100)

      renderResizeObservers.forEach((callback) => callback())
    })

    expect(element.getAttribute('tabindex')).toBe('0')

    act(() => {
      vi.spyOn(ref.current, 'scrollWidth', 'get').mockReturnValue(101)
      vi.spyOn(ref.current, 'offsetWidth', 'get').mockReturnValue(100)

      renderResizeObservers.forEach((callback) => callback())
    })

    expect(element).not.toHaveAttribute('tabindex')
  })

  function renderColumns(direction: 'ltr' | 'rtl' = 'ltr') {
    const callbacks = []
    setResizeObserver({ init: (callback) => callbacks.push(callback) })
    render(
      <Provider locale="en-GB">
        <ScrollView style={{ overflowX: 'auto', direction }}>
          <Table>
            <thead>
              <tr>
                {['First', 'Second', 'Third', 'Fourth'].map((label) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
          </Table>
        </ScrollView>
      </Provider>
    )
    const element = document.querySelector<HTMLDivElement>(
      '.dnb-table__scroll-view'
    )
    vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(200)
    vi.spyOn(element, 'offsetWidth', 'get').mockReturnValue(200)
    const scrollWidth = vi
      .spyOn(element, 'scrollWidth', 'get')
      .mockReturnValue(400)
    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      right: 200,
    } as DOMRect)
    element.querySelectorAll('th').forEach((cell, index) => {
      vi.spyOn(cell, 'getBoundingClientRect').mockImplementation(() => {
        const left =
          direction === 'rtl'
            ? 100 - index * 100 - element.scrollLeft
            : index * 100 - element.scrollLeft
        return { left, right: left + 100, width: 100 } as DOMRect
      })
    })
    element.scrollTo = vi.fn()
    act(() => callbacks.forEach((callback) => callback()))
    const indicators = document.querySelectorAll<HTMLButtonElement>(
      '.dnb-scroll-indicator__item'
    )
    return {
      element,
      indicators,
      scrollWidth,
      resize: () => act(() => callbacks.forEach((callback) => callback())),
    }
  }

  it('shows whole-column indicators without range text and avoids flickering at an edge', () => {
    const { element, indicators } = renderColumns()
    expect(indicators).toHaveLength(4)
    expect(indicators[0]).toHaveAccessibleName('Show column 1')
    expect(indicators[0]).toHaveAttribute('data-active', 'true')
    expect(indicators[2]).toHaveAttribute('data-active', 'false')
    expect(
      document.querySelector('.dnb-table__scroll-container')
    ).not.toHaveTextContent(/Columns.*of/)

    fireEvent.scroll(element, { target: { scrollLeft: 46 } })
    expect(indicators[0]).toHaveAttribute('data-active', 'true')
    expect(indicators[2]).toHaveAttribute('data-active', 'false')
    fireEvent.scroll(element, { target: { scrollLeft: 56 } })
    expect(indicators[0]).toHaveAttribute('data-active', 'false')
    expect(indicators[2]).toHaveAttribute('data-active', 'true')
    fireEvent.scroll(element, { target: { scrollLeft: 50 } })
    expect(indicators[0]).toHaveAttribute('data-active', 'false')
    expect(indicators[2]).toHaveAttribute('data-active', 'true')
  })

  it.each(['ltr', 'rtl'] as const)(
    'scrolls to a column in %s and clamps to the remaining content',
    (direction) => {
      const { element, indicators } = renderColumns(direction)
      const sign = direction === 'rtl' ? -1 : 1
      fireEvent.click(indicators[1])
      expect(element.scrollTo).toHaveBeenLastCalledWith(
        expect.objectContaining({ left: sign * 100 })
      )
      fireEvent.click(indicators[3])
      expect(element.scrollTo).toHaveBeenLastCalledWith(
        expect.objectContaining({ left: sign * 200 })
      )
      element.scrollLeft = sign * 200
      fireEvent.click(indicators[0])
      expect(element.scrollTo).toHaveBeenLastCalledWith(
        expect.objectContaining({ left: 0 })
      )
    }
  )

  it('hides the indicators when every column is active and restores them on resize', () => {
    const { element, indicators, resize } = renderColumns()
    indicators[0].focus()
    const width = vi
      .spyOn(element, 'clientWidth', 'get')
      .mockReturnValue(360)
    resize()

    expect(
      document.querySelector('.dnb-table__scroll-indicator')
    ).toHaveAttribute('data-hidden', 'true')
    expect(element).toHaveFocus()

    width.mockReturnValue(200)
    resize()
    expect(
      document.querySelectorAll('.dnb-scroll-indicator__item')
    ).toHaveLength(4)
    expect(
      document.querySelector('.dnb-table__scroll-indicator')
    ).toHaveAttribute('data-hidden', 'false')
  })

  it('keeps the indicators visible when scrolling brings every column into view', () => {
    const { element, indicators, resize } = renderColumns()
    vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(340)
    resize()
    indicators[3].focus()

    for (const scrollLeft of [30, 60, 0]) {
      fireEvent.scroll(element, { target: { scrollLeft } })
      expect(
        document.querySelector('.dnb-table__scroll-indicator')
      ).toHaveAttribute('data-hidden', 'false')
      expect(indicators[3]).toHaveFocus()
    }
  })

  it('removes indicators when content fits and keeps focus in the table', () => {
    const { element, indicators, scrollWidth, resize } = renderColumns()
    indicators[0].focus()
    scrollWidth.mockReturnValue(200)
    resize()
    expect(
      document.querySelector('.dnb-table__scroll-indicator')
    ).not.toBeInTheDocument()
    expect(element.querySelector('table')).toHaveFocus()
    expect(element).not.toHaveAttribute('tabindex')
  })

  it('keeps observers when a parent rerenders the same table', () => {
    const init = vi.fn()
    const observe = vi.fn()
    setResizeObserver({ init, observe })
    const content = (text: string) => (
      <ScrollView>
        <Table>
          <tbody>
            <tr>
              <td>{text}</td>
            </tr>
          </tbody>
        </Table>
      </ScrollView>
    )
    const { rerender } = render(content('First'))
    const initialCount = init.mock.calls.length
    rerender(content('Second'))
    expect(init).toHaveBeenCalledTimes(initialCount)
    expect(observe).toHaveBeenCalledWith(document.querySelector('table'))
  })

  it('should have constant of _supportsSpacingProps', () => {
    expect(ScrollView['_supportsSpacingProps']).toBe(true)
  })
})
