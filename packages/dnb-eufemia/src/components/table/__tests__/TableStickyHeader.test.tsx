import React from 'react'
import { render, screen } from '@testing-library/react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Table from '../Table'
import { BasicTable } from './TableMocks'

const NODE_ENV = process.env.NODE_ENV
const log = globalThis.console.log

let simulateEntry: (args: Array<Record<string, boolean>>) => void

beforeEach(() => {
  window.IntersectionObserver = jest
    .fn()
    .mockImplementation((callback) => {
      simulateEntry = callback
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
      }
    })
})

afterEach(() => {
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

  it('should add/remove shadow class when interacting', () => {
    const getClasses = () =>
      Array.from(screen.queryByRole('table').classList)
    const getTrClasses = () =>
      Array.from(screen.queryByRole('table').querySelector('tr').classList)

    render(
      <Table sticky>
        <BasicTable sticky />
      </Table>
    )

    expect(getClasses()).toEqual(
      expect.arrayContaining(['dnb-table', 'dnb-table--sticky'])
    )

    simulateEntry([{ isIntersecting: false }])

    expect(getClasses()).toEqual(
      expect.arrayContaining(['dnb-table', 'dnb-table--sticky'])
    )
    expect(getTrClasses()).toEqual(
      expect.arrayContaining(['dnb-table__tr', 'show-shadow'])
    )

    simulateEntry([{ isIntersecting: true }])

    expect(getClasses()).toEqual(
      expect.arrayContaining(['dnb-table', 'dnb-table--sticky'])
    )
  })

  it('should use default header height in rootMargin when stickyOffset is not given', () => {
    render(
      <Table sticky>
        <BasicTable sticky />
      </Table>
    )

    expect(
      screen
        .queryByRole('table')
        .querySelector('tr')
        .style.getPropertyValue('--table-top')
    ).toBe('')
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      // Formula: thHeight + offsetTopPx = -(sum)px
      { rootMargin: '-80px 0px 0px 0px' } // we set a rootMargin to show/hide the shadow on a certain position ("show-shadow" class)
    )
  })

  it('should set correct rootMargin and --table-top with given stickyOffset', () => {
    const getTrElem = () => screen.queryByRole('table').querySelector('tr')

    const { rerender } = render(
      <Table sticky stickyOffset="4rem">
        <BasicTable sticky />
      </Table>
    )

    expect(getTrElem().style.getPropertyValue('--table-top')).toEqual(
      '4rem'
    )
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1)
    expect(window.IntersectionObserver).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      // Formula: thHeight + offsetTopPx = -(sum)px
      { rootMargin: '-144px 0px 0px 0px' } // we set a rootMargin to show/hide the shadow on a certain position ("show-shadow" class)
    )

    /** stickyOffset should support pixels as well */
    rerender(
      <Table sticky stickyOffset={64}>
        <BasicTable sticky />
      </Table>
    )

    expect(getTrElem().style.getPropertyValue('--table-top')).toEqual(
      '4rem'
    )
    expect(window.IntersectionObserver).toHaveBeenCalledTimes(2)
    expect(window.IntersectionObserver).toHaveBeenNthCalledWith(
      2,
      expect.any(Function),
      // Formula: thHeight + offsetTopPx = -(sum)px
      { rootMargin: '-144px 0px 0px 0px' } // we set a rootMargin to show/hide the shadow on a certain position ("show-shadow" class)
    )
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
