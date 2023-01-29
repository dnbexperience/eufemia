import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Table from '../Table'
import { BasicTable } from './TableMocks'

describe('useStickyHeader', () => {
  const setSizes = () => {
    const tableElement = document.querySelector('table')
    jest.spyOn(tableElement, 'offsetHeight', 'get').mockReturnValue(480)
    jest.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(160)

    const thElement = document.querySelector('th')
    jest.spyOn(thElement, 'offsetHeight', 'get').mockReturnValue(72)

    jest.runAllTimers() // run applyObservers
  }

  const simulateScroll = (
    y: number,
    scrollElement: HTMLElement = null
  ) => {
    if (scrollElement) {
      jest.spyOn(scrollElement, 'scrollTop', 'get').mockReturnValue(y)
    } else {
      window.pageYOffset = y
    }

    fireEvent.scroll(scrollElement || document)
  }

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should contain valid HTML classes when sticky', () => {
    render(
      <Table sticky>
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--generic',
      'dnb-table__size--large',
      'dnb-table--sticky',
    ])
  })

  it('should contain valid HTML classes when sticky is true', () => {
    render(
      <Table sticky>
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--generic',
      'dnb-table__size--large',
      'dnb-table--sticky',
    ])
  })

  it('should add "css-position" class', () => {
    render(
      <Table sticky="css-position">
        <BasicTable />
      </Table>
    )

    setSizes()

    expect(Array.from(document.querySelector('tr').classList)).toEqual(
      expect.arrayContaining([
        'dnb-table__tr',
        'dnb-table__tr--odd',
        'sticky',
        'css-position',
      ])
    )
  })

  it('should add/remove is-sticky class when interacting', () => {
    const getTrClasses = () =>
      Array.from(screen.queryByRole('table').querySelector('tr').classList)

    render(
      <Table sticky>
        <BasicTable />
      </Table>
    )

    setSizes()

    expect(Array.from(screen.queryByRole('table').classList)).toContain(
      'dnb-table--sticky'
    )

    simulateScroll(200)

    expect(getTrClasses()).toContain('is-sticky')

    simulateScroll(0)

    expect(getTrClasses()).not.toContain('is-sticky')
  })

  it('should set --table-top with given stickyOffset when sticky="css-position"', () => {
    const { rerender } = render(
      <Table sticky="css-position" stickyOffset="4rem">
        <BasicTable />
      </Table>
    )

    const thElement = document.querySelector('th')
    const trElem = document.querySelector('tr')

    jest.spyOn(thElement, 'offsetHeight', 'get').mockReturnValue(72)

    setSizes()

    expect(trElem.style.getPropertyValue('--table-top')).toEqual('4rem')

    // stickyOffset should support pixels as well
    rerender(
      <Table sticky stickyOffset={64}>
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

    // Should keep the previous value (300-(160-64)=204)
    simulateScroll(3000)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '204px'
    )

    // change the table offset
    jest.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(80)
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

  it('should check if .dnb-scroll-view has a vertical scrollbar and set shadown only, when css-position is used', () => {
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
    jest.spyOn(scrollElem, 'scrollHeight', 'get').mockReturnValue(120)
    jest.spyOn(scrollElem, 'offsetHeight', 'get').mockReturnValue(80)

    setSizes()

    simulateScroll(0, scrollElem)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    expect(trElem.style.getPropertyValue('--table-top')).toEqual('1rem')
    expect(Array.from(trElem.classList)).not.toContain('is-sticky')

    simulateScroll(32, scrollElem)

    expect(trElem.style.getPropertyValue('--table-offset')).toEqual('')
    expect(Array.from(trElem.classList)).toContain('is-sticky')

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

    jest.spyOn(barElem, 'offsetHeight', 'get').mockReturnValue(40)

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

    // Should keep the previous value (300-(160-40)=180)
    simulateScroll(3000, scrollElem)
    expect(trElem.style.getPropertyValue('--table-offset')).toEqual(
      '180px'
    )

    // change the table offset
    jest.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(80)
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
