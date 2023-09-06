import React from 'react'
import { act, render } from '@testing-library/react'
import Table from '../Table'
import ScrollView, { TableScrollViewAllProps } from '../TableScrollView'
import { BasicTable } from './TableMocks'
import { setResizeObserver } from '../../../fragments/scroll-view/__tests__/__mocks__/ResizeObserver'

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

    expect(Array.from(element.classList)).toEqual([
      'dnb-scroll-view',
      'dnb-space__top--large',
      'dnb-table__scroll-view',
    ])
  })

  it('should have tabindex="0"', () => {
    let renderResizeObserver = null

    const observe = jest.fn()
    const init = jest.fn((callback) => {
      renderResizeObserver = callback
    })
    setResizeObserver({ init, observe })

    const ref = React.createRef<HTMLDivElement>()

    render(
      <ScrollView innerRef={ref}>
        <Table>
          <BasicTable />
        </Table>
      </ScrollView>
    )

    const element = document.querySelector('.dnb-table__scroll-view')

    act(() => {
      jest.spyOn(ref.current, 'scrollWidth', 'get').mockReturnValue(102)
      jest.spyOn(ref.current, 'offsetWidth', 'get').mockReturnValue(100)

      renderResizeObserver()
    })

    expect(element.getAttribute('tabindex')).toBe('0')

    act(() => {
      jest.spyOn(ref.current, 'scrollWidth', 'get').mockReturnValue(101)
      jest.spyOn(ref.current, 'offsetWidth', 'get').mockReturnValue(100)

      renderResizeObserver()
    })

    expect(element).not.toHaveAttribute('tabindex')
  })
})
