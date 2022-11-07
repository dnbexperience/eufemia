import React from 'react'
import { render } from '@testing-library/react'
import TableTd from '../TableTd'

describe('TableTd', () => {
  it('should contain children content', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd>td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')

    expect(element.textContent).toBe('td content')
  })

  it('should include custom attributes', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd aria-label="custom-label">td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['role', 'class', 'aria-label'])
  })

  it('should have role with cell as value', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd>td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')

    expect(element.getAttribute('role')).toBe('cell')
  })

  it('should include custom classes', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTd className="custom-class">td content</TableTd>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('td')
    expect(Array.from(element.classList)).toEqual([
      'dnb-table__td',
      'custom-class',
    ])
  })
})
