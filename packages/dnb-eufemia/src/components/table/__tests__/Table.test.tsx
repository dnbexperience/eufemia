import React from 'react'
import { render, screen } from '@testing-library/react'
import { loadScss, axeComponent } from '../../../core/jest/jestSetup'
import { BasicTable } from './TableMocks'
import Table, { TableAllProps } from '../Table'

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
  it('renders with props as an object', () => {
    const props: TableAllProps = { children: null }
    render(<Table {...props} />)

    expect(document.querySelector('.dnb-table')).toBeTruthy()
  })

  it('should contain basis HTML classes by default', () => {
    render(
      <Table>
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--generic',
      'dnb-table__size--large',
    ])
  })

  it('should set variant', () => {
    render(
      <Table variant="generic">
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual([
      'dnb-table',
      'dnb-table__variant--generic',
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
      'dnb-table__variant--generic',
      'dnb-table__size--medium',
    ])
  })

  it('should include custom className', () => {
    render(
      <Table className="custom-class" aria-label="custom-label">
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual(
      expect.arrayContaining([
        'dnb-table',
        'dnb-table__variant--generic',
        'dnb-table__size--large',
        'custom-class',
      ])
    )
  })

  it('should include custom HTML attributes', () => {
    render(
      <Table aria-label="custom-label">
        <BasicTable />
      </Table>
    )

    expect(screen.queryByRole('table').getAttribute('aria-label')).toEqual(
      'custom-label'
    )
  })

  it('should set the fixed class', () => {
    render(
      <Table fixed>
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toEqual(
      expect.arrayContaining([
        'dnb-table',
        'dnb-table__variant--generic',
        'dnb-table__size--large',
        'dnb-table--fixed',
      ])
    )
  })

  it('should set the border class', () => {
    render(
      <Table border>
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toContain(
      'dnb-table--border'
    )
  })

  it('should set the outline class', () => {
    render(
      <Table outline>
        <BasicTable />
      </Table>
    )

    expect(Array.from(screen.queryByRole('table').classList)).toContain(
      'dnb-table--outline'
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
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-table',
        'dnb-table__variant--generic',
        'dnb-table__size--large',
        'dnb-space__top--large',
      ])
    )
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
    expect(Array.from(element.classList)).toEqual(
      expect.arrayContaining([
        'dnb-table',
        'dnb-table__variant--generic',
        'dnb-table__size--large',
        'dnb-skeleton',
        'dnb-skeleton--font',
      ])
    )
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
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-table-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
