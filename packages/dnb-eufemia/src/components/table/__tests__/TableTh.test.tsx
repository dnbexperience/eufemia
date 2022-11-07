import React from 'react'
import { render } from '@testing-library/react'
import TableTh from '../TableTh'

describe('TableTh', () => {
  it('should contain children content', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh>th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')

    expect(element.textContent).toBe('th content')
  })

  it('should include custom attributes', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh scope="col">th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['role', 'class', 'scope'])
  })

  it('should have role with columnheader as value', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh>th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')

    expect(element.getAttribute('role')).toBe('columnheader')
  })

  it('should set correct sortable class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh sortable>th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--sortable')
  })

  it('should set correct active class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh active>th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--active')
  })

  it('should set correct reversed class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh reversed>th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--reversed')
  })

  it('should set correct noWrap class', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh noWrap>th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--no-wrap')
  })

  it('should include custom classes', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh className="custom-class">th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toEqual([
      'dnb-table__th',
      'custom-class',
    ])
  })
})
