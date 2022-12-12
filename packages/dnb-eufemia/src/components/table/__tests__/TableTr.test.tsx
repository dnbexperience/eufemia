import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Table from '../Table'
import TableTr from '../TableTr'

describe('TableTr', () => {
  it('should work without internal context', () => {
    render(
      <table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </table>
    )

    const element = document.querySelector('tr')

    expect(element.textContent).toBe('content')
  })

  it('should contain children content', () => {
    render(
      <Table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')

    expect(element.textContent).toBe('content')
  })

  it('should set the noWrap class', () => {
    render(
      <table>
        <tbody>
          <TableTr noWrap>
            <td>content</td>
          </TableTr>
        </tbody>
      </table>
    )

    const element = document.querySelector('tr')

    expect(Array.from(element.classList)).toContain('dnb-table--no-wrap')
  })

  it('should include custom attributes', () => {
    render(
      <Table>
        <tbody>
          <TableTr aria-label="custom-label">
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['role', 'class', 'aria-label'])
  })

  it('should have role with row as value', () => {
    render(
      <Table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')

    expect(element.getAttribute('role')).toBe('row')
  })

  it('should include custom classes', () => {
    render(
      <Table>
        <tbody>
          <TableTr className="custom-class">
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
    expect(Array.from(element.classList)).toContain('custom-class')
  })

  it('should have "--odd" modifier by default', () => {
    render(
      <Table>
        <tbody>
          <TableTr className="custom-class">
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
    expect(Array.from(element.classList)).toContain('dnb-table__tr')
    expect(Array.from(element.classList)).toContain('dnb-table__tr--odd')
  })

  it('should have "--even" modifier by default', () => {
    render(
      <Table>
        <tbody>
          <TableTr variant="even">
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const element = document.querySelector('tr')
    expect(Array.from(element.classList)).toContain('dnb-table__tr--even')
  })

  it('should set odd/even', () => {
    render(
      <Table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const elements = document.querySelectorAll('tbody tr')
    expect(Array.from(elements[0].classList)).toContain(
      'dnb-table__tr--odd'
    )
    expect(Array.from(elements[1].classList)).toContain(
      'dnb-table__tr--even'
    )
    expect(Array.from(elements[2].classList)).toContain(
      'dnb-table__tr--odd'
    )
    expect(Array.from(elements[3].classList)).toContain(
      'dnb-table__tr--even'
    )
  })

  it('should continue when variant was defined', () => {
    render(
      <Table>
        <tbody>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr variant="odd">
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
          <TableTr>
            <td>content</td>
          </TableTr>
        </tbody>
      </Table>
    )

    const elements = document.querySelectorAll('tbody tr')
    expect(Array.from(elements[0].classList)).toContain(
      'dnb-table__tr--odd'
    )
    expect(Array.from(elements[1].classList)).toContain(
      'dnb-table__tr--odd'
    )
    expect(Array.from(elements[2].classList)).toContain(
      'dnb-table__tr--even'
    )
    expect(Array.from(elements[3].classList)).toContain(
      'dnb-table__tr--odd'
    )
  })

  describe('re-render', () => {
    const MockComponent = () => {
      const [list, setlist] = React.useState([
        'content cab',
        'content abc',
        'content bac',
      ])

      return (
        <Table>
          <thead>
            <TableTr>
              <th>
                <button onClick={handleReorder}>re-order</button>
              </th>
            </TableTr>
          </thead>
          <tbody>
            {list.map((value) => (
              <TableTr key={value}>
                <td>{value}</td>
              </TableTr>
            ))}
          </tbody>
        </Table>
      )

      function sortByName(a, b) {
        return a.localeCompare(b)
      }

      function handleReorder() {
        setlist([...list].sort(sortByName))
      }
    }

    it('should re-render tr when tr gets removed', () => {
      const { rerender } = render(
        <Table>
          <tbody>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr variant="odd">
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
          </tbody>
        </Table>
      )

      let elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(4)
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(Array.from(elements[3].classList)).toContain(
        'dnb-table__tr--odd'
      )

      rerender(
        <Table>
          <tbody>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
          </tbody>
        </Table>
      )

      elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--odd'
      )

      rerender(
        <Table>
          <tbody>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
            <TableTr variant="even">
              <td>content</td>
            </TableTr>
            <TableTr>
              <td>content</td>
            </TableTr>
          </tbody>
        </Table>
      )

      elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(4)
      // console.log('document.body', document.body.innerHTML)
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(Array.from(elements[3].classList)).toContain(
        'dnb-table__tr--odd'
      )
    })

    it('should re-render table when children changes', () => {
      render(<MockComponent />)

      let elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(elements[0].textContent).toBe('content cab')
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(elements[1].textContent).toBe('content abc')
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(elements[2].textContent).toBe('content bac')
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )

      fireEvent.click(screen.queryByText('re-order'))

      elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(elements[0].textContent).toBe('content abc')
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(elements[1].textContent).toBe('content bac')
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(elements[2].textContent).toBe('content cab')
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )
    })

    it('should set correct odd/even in StrictMode', () => {
      render(
        <React.StrictMode>
          <MockComponent />
        </React.StrictMode>
      )

      let elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(elements[0].textContent).toBe('content cab')
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(elements[1].textContent).toBe('content abc')
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(elements[2].textContent).toBe('content bac')
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )

      fireEvent.click(screen.queryByText('re-order'))

      elements = document.querySelectorAll('tbody tr')
      expect(elements).toHaveLength(3)
      expect(elements[0].textContent).toBe('content abc')
      expect(Array.from(elements[0].classList)).toContain(
        'dnb-table__tr--even'
      )
      expect(elements[1].textContent).toBe('content bac')
      expect(Array.from(elements[1].classList)).toContain(
        'dnb-table__tr--odd'
      )
      expect(elements[2].textContent).toBe('content cab')
      expect(Array.from(elements[2].classList)).toContain(
        'dnb-table__tr--even'
      )
    })
  })
})
