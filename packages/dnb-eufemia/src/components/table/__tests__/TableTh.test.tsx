import React from 'react'
import { render } from '@testing-library/react'
import TableTh from '../TableTh'
import TableSortButton from '../TableSortButton'
import TableHelpButton from '../TableHelpButton'

describe('TableTh', () => {
  it('should contain children content', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh>th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')

    expect(element.textContent).toBe('th content')
  })

  it('should include custom attributes', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh align="right">th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['role', 'scope', 'class', 'align'])
  })

  it('should set the noWrap class', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh noWrap>th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')

    expect(Array.from(element.classList)).toContain('dnb-table--no-wrap')
  })

  it('should have role with columnheader as value', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh>th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')

    expect(element.getAttribute('role')).toBe('columnheader')
    expect(element.getAttribute('scope')).toBe('col')
  })

  it('should set correct role when scope is row', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh scope="row">th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')

    expect(element.getAttribute('role')).toBe('rowheader')
    expect(element.getAttribute('scope')).toBe('row')
  })

  it('should set correct sortable class', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh sortable>th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--sortable')
    expect(element.getAttribute('aria-sort')).toBe('ascending')
  })

  it('should set correct active class', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh sortable active>
              th content
            </TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--active')
    expect(element.getAttribute('aria-sort')).toBe('ascending')
  })

  it('should set correct reversed class', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh sortable reversed>
              th content
            </TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--reversed')
    expect(element.getAttribute('aria-sort')).toBe('descending')
  })

  it('should set correct noWrap class', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh noWrap>th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--no-wrap')
  })

  it('should include custom classes', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh className="custom-class">th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toEqual([
      'dnb-table__th',
      'custom-class',
    ])
  })

  it('should have Th.SortButton', () => {
    expect(TableTh.SortButton).toBe(TableSortButton)
  })

  it('should have Th.HelpButton', () => {
    expect(TableTh.HelpButton).toBe(TableHelpButton)
  })
})
