import React from 'react'
import { render, screen } from '@testing-library/react'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { BasicTable } from './TableMocks'
import Table from '../Table'

declare global {
  interface Window {
    IntersectionObserver: jest.Mock
  }
}

const NODE_ENV = process.env.NODE_ENV
const log = globalThis.console.log

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation(() => {
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

describe('Table', () => {
  it('should contain basis HTML classes by default', () => {
    render(
      <Table>
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--basis',
      'dnb-table__size--large',
    ])
  })

  it('should set variant', () => {
    render(
      <Table variant="not-defined-yet">
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--not-defined-yet',
      'dnb-table__size--large',
    ])
  })

  it('should set size', () => {
    render(
      <Table size="medium">
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--basis',
      'dnb-table__size--medium',
    ])
  })

  it('should include custom className and HTML attributes', () => {
    render(
      <Table className="dnb-table--fixed" aria-label="custom-label">
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--basis',
      'dnb-table__size--large',
      'dnb-table--fixed',
    ])

    expect(screen.queryByRole('table').getAttribute('aria-label')).toEqual(
      'custom-label'
    )
  })

  it('should support spacing props', () => {
    render(
      <Table top="2rem">
        <BasicTable />
      </Table>
    )

    const element = screen.queryByRole('table')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--basis',
      'dnb-table__size--large',
      'dnb-space__top--large',
    ])
  })

  it('should support skeleton props', () => {
    render(
      <Table skeleton>
        <BasicTable />
      </Table>
    )

    const element = screen.queryByRole('table')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--basis',
      'dnb-table__size--large',
      'dnb-skeleton',
      'dnb-skeleton--font',
    ])
  })
})

describe('Table aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Table>
        <BasicTable />
      </Table>
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})

describe('Table scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-table.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-table-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
