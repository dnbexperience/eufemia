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

    const element = document.querySelector('.dnb-table__scroll-view')

    expect(element).toHaveClass(
      'dnb-scroll-view dnb-table__scroll-view dnb-space__top--large',
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

  it('uses a standard button that fades as scrolling starts and updates on resize', () => {
    const callbacks = []
    const observe = vi.fn()
    setResizeObserver({
      init: (callback) => callbacks.push(callback),
      observe,
    })

    render(
      <Provider locale="en-GB">
        <ScrollView style={{ overflowX: 'auto' }}>
          <Table>
            <BasicTable />
          </Table>
        </ScrollView>
      </Provider>
    )

    const element = document.querySelector<HTMLDivElement>(
      '.dnb-table__scroll-view'
    )
    const button = element.querySelector<HTMLButtonElement>(
      '.dnb-table__scroll-indicator'
    )
    vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(200)
    const scrollWidth = vi
      .spyOn(element, 'scrollWidth', 'get')
      .mockReturnValue(400)

    act(() => callbacks.forEach((callback) => callback()))

    expect(observe).toHaveBeenCalledWith(element.querySelector('table'))
    expect(button.tagName).toBe('BUTTON')
    expect(button).toHaveClass(
      'dnb-button',
      'dnb-button--secondary',
      'dnb-button--size-small',
      'dnb-button--icon-only'
    )
    expect(button).toHaveAccessibleName('See more columns')
    expect(button).not.toHaveAttribute('title')
    expect(element).toHaveAttribute('data-scroll-indicator')
    expect(element).not.toHaveAttribute('data-scroll-indicator-rtl')
    expect(
      element.style.getPropertyValue('--table-scroll-indicator-opacity')
    ).toBe('1')

    fireEvent.scroll(element, { target: { scrollLeft: 10 } })
    expect(
      element.style.getPropertyValue('--table-scroll-indicator-opacity')
    ).toBe('0.5625')

    fireEvent.scroll(element, { target: { scrollLeft: 20 } })
    expect(element).toHaveAttribute('data-scroll-indicator')
    expect(
      element.style.getPropertyValue('--table-scroll-indicator-opacity')
    ).toBe('0.25')

    fireEvent.scroll(element, { target: { scrollLeft: 30 } })
    expect(
      element.style.getPropertyValue('--table-scroll-indicator-opacity')
    ).toBe('0.0625')

    element.tabIndex = 0
    button.focus()
    fireEvent.scroll(element, { target: { scrollLeft: 40 } })
    expect(element).not.toHaveAttribute('data-scroll-indicator')
    expect(element).toHaveFocus()

    fireEvent.scroll(element, { target: { scrollLeft: 0 } })
    expect(element).toHaveAttribute('data-scroll-indicator')

    scrollWidth.mockReturnValue(200)
    act(() => callbacks.forEach((callback) => callback()))
    expect(element).not.toHaveAttribute('data-scroll-indicator')
  })

  it('fades in the scroll direction and scrolls toward more columns in right-to-left layouts', () => {
    render(
      <ScrollView
        dir="rtl"
        style={{ direction: 'rtl', overflowX: 'auto' }}
      >
        <Table>
          <BasicTable />
        </Table>
      </ScrollView>
    )

    const element = document.querySelector<HTMLDivElement>(
      '.dnb-table__scroll-view'
    )
    vi.spyOn(element, 'clientWidth', 'get').mockReturnValue(200)
    vi.spyOn(element, 'scrollWidth', 'get').mockReturnValue(400)
    element.scrollBy = vi.fn()
    element.tabIndex = 0

    fireEvent.scroll(element)
    expect(element).toHaveAttribute('data-scroll-indicator')
    expect(element).toHaveAttribute('data-scroll-indicator-rtl')

    fireEvent.scroll(element, { target: { scrollLeft: -20 } })
    expect(
      element.style.getPropertyValue('--table-scroll-indicator-opacity')
    ).toBe('0.25')

    const button = element.querySelector<HTMLButtonElement>(
      '.dnb-table__scroll-indicator'
    )
    button.focus()
    fireEvent.click(button)
    expect(element.scrollBy).toHaveBeenCalledWith(
      expect.objectContaining({ left: -160 })
    )
    expect(element).toHaveFocus()

    fireEvent.scroll(element, { target: { scrollLeft: -40 } })
    expect(element).not.toHaveAttribute('data-scroll-indicator')
  })

  it('should have constant of _supportsSpacingProps', () => {
    expect(ScrollView['_supportsSpacingProps']).toBe(true)
  })
})
