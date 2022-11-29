import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Table from '../Table'
import { BasicTable } from './TableMocks'

const NODE_ENV = process.env.NODE_ENV
const log = globalThis.console.log

let simulateIntersecting: (isIntersecting: boolean) => void

beforeEach(() => {
  window.IntersectionObserver = jest
    .fn()
    .mockImplementation((callback) => {
      simulateIntersecting = (isIntersecting) => {
        callback([{ isIntersecting: !isIntersecting }])
      }
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
      }
    })
})

afterEach(() => {
  jest.useRealTimers()

  process.env.NODE_ENV = NODE_ENV
  globalThis.console.log = log

  delete window.IntersectionObserver
})

describe('useStickyHeader', () => {
  it('should warn when IntersectionObserver not exists', () => {
    delete window.IntersectionObserver
    process.env.NODE_ENV = 'development'
    globalThis.console.log = jest.fn()

    render(
      <Table sticky>
        <BasicTable sticky />
      </Table>
    )

    expect(globalThis.console.log).toBeCalledTimes(1)
  })

  it('should contain valid HTML classes when sticky', () => {
    render(
      <Table sticky>
        <BasicTable sticky />
      </Table>
    )

    const stickyHelperElem = screen
      .queryByRole('table')
      .querySelector('tr.dnb-table__sticky-helper')

    expect(stickyHelperElem).toBeTruthy()

    expect(Array.from(stickyHelperElem.classList)).toEqual([
      'dnb-table__sticky-helper',
    ])
    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--generic',
      'dnb-table__size--large',
      'dnb-table--sticky',
    ])
  })

  it('should contain valid HTML classes when sticky is set to body-scroll', () => {
    render(
      <Table sticky="body-scroll">
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--generic',
      'dnb-table__size--large',
      'dnb-table--sticky-body-scroll',
    ])
  })

  it('should add "sticky" class', () => {
    jest.useFakeTimers()

    render(
      <Table sticky>
        <BasicTable sticky />
      </Table>
    )

    jest.runAllTimers() // run applyObservers

    expect(Array.from(document.querySelector('tr').classList)).toEqual(
      expect.arrayContaining([
        'dnb-table__tr',
        'dnb-table__tr--odd',
        'sticky',
      ])
    )
  })

  it('should add/remove shadow class when interacting', () => {
    jest.useFakeTimers()

    const getClasses = () =>
      Array.from(screen.queryByRole('table').classList)
    const getTrClasses = () =>
      Array.from(screen.queryByRole('table').querySelector('tr').classList)

    render(
      <Table sticky>
        <BasicTable sticky />
      </Table>
    )

    jest.runAllTimers() // run applyObservers

    expect(getClasses()).toEqual(
      expect.arrayContaining(['dnb-table', 'dnb-table--sticky'])
    )

    simulateIntersecting(true)

    expect(getClasses()).toEqual(
      expect.arrayContaining(['dnb-table', 'dnb-table--sticky'])
    )
    expect(getTrClasses()).toEqual(
      expect.arrayContaining(['dnb-table__tr', 'show-shadow'])
    )

    simulateIntersecting(false)

    expect(getClasses()).toEqual(
      expect.arrayContaining(['dnb-table', 'dnb-table--sticky'])
    )
  })

  it('should set correct rootMargin and --table-top with given stickyOffset', () => {
    jest.useFakeTimers()

    const { rerender } = render(
      <Table sticky stickyOffset="4rem">
        <BasicTable sticky />
      </Table>
    )

    const thElement = document.querySelector('th')
    const trElem = document.querySelector('tr')
    jest.spyOn(thElement, 'offsetHeight', 'get').mockReturnValue(72)

    jest.runAllTimers() // run applyObservers

    expect(trElem.style.getPropertyValue('--table-top')).toEqual('4rem')
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(window.IntersectionObserver).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      // Formula: thHeight + offsetTopPx = -(sum)px
      { threshold: 1, rootMargin: '-136px 0px 0px 0px' } // we set a rootMargin to show/hide the shadow on a certain position ("show-shadow" class)
    )

    /** stickyOffset should support pixels as well */
    rerender(
      <Table sticky stickyOffset={64}>
        <BasicTable sticky />
      </Table>
    )

    jest.runAllTimers() // run applyObservers

    expect(trElem.style.getPropertyValue('--table-top')).toEqual('4rem')
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(2)
    expect(window.IntersectionObserver).toHaveBeenNthCalledWith(
      2,
      expect.any(Function),
      // Formula: thHeight + offsetTopPx = -(sum)px
      { threshold: 1, rootMargin: '-136px 0px 0px 0px' } // we set a rootMargin to show/hide the shadow on a certain position ("show-shadow" class)
    )
  })

  it('should set translate3d when sticky is body-scroll', () => {
    jest.useFakeTimers()

    const { rerender } = render(
      <Table sticky="body-scroll" stickyOffset="4rem">
        <BasicTable sticky />
      </Table>
    )

    const tableElement = document.querySelector('table')
    jest.spyOn(tableElement, 'offsetHeight', 'get').mockReturnValue(480)
    jest.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(160)

    const thElement = document.querySelector('th')
    jest.spyOn(thElement, 'offsetHeight', 'get').mockReturnValue(72)

    const trElem = document.querySelector('tr')

    jest.runAllTimers() // run applyObservers

    expect(trElem.style.getPropertyValue('--table-top')).toEqual('4rem')
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(window.IntersectionObserver).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      // Formula: thHeight + offsetTopPx = -(sum)px
      { threshold: 1, rootMargin: '-136px 0px 0px 0px' } // we set a rootMargin to show/hide the shadow on a certain position ("show-shadow" class)
    )

    const simulateScroll = (y: number) => {
      window.pageYOffset = y
      fireEvent.scroll(document)
    }

    expect(trElem.style.transform).toEqual('')

    simulateIntersecting(true)
    simulateScroll(0)
    // Should reset to basis (0-(160-64)=-96)
    expect(trElem.style.transform).toEqual('translate3d(0,-96px,0)')

    simulateScroll(320)
    // Should set correct value (320-(160-64)=224)
    expect(trElem.style.transform).toEqual('translate3d(0,224px,0)')

    simulateIntersecting(false)
    // Should reset to zero
    expect(trElem.style.transform).toEqual('translate3d(0,0,0)')

    simulateIntersecting(true)
    simulateScroll(0)
    // Should reset to basis (0-(160-64)=-96)
    expect(trElem.style.transform).toEqual('translate3d(0,-96px,0)')

    simulateScroll(3000)
    // Should keep the previous value (0-(160-64)=-96)
    expect(trElem.style.transform).toEqual('translate3d(0,-96px,0)')

    // change the table offset
    jest.spyOn(tableElement, 'offsetTop', 'get').mockReturnValue(80)
    fireEvent.resize(window)

    simulateScroll(320)
    // Should set correct value (320-(80-64)=304)
    expect(trElem.style.transform).toEqual('translate3d(0,304px,0)')

    // Simulate iFrame
    jest.spyOn(window, 'self', 'get').mockReturnValue(null)

    rerender(
      <Table sticky="body-scroll" stickyOffset={64}>
        <BasicTable sticky />
      </Table>
    )

    jest.runAllTimers() // run applyObservers

    simulateIntersecting(true)
    simulateScroll(320)
    // Should set correct value (320-(80-0)=240)
    expect(trElem.style.transform).toEqual('translate3d(0,240px,0)')
  })
})

describe('Table aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Table sticky>
        <BasicTable />
      </Table>
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
