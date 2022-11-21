import React from 'react'
import { render } from '@testing-library/react'
import Table from '../Table'
import TableContainer, { TableContainerAllProps } from '../TableContainer'
import { H2, P } from '../../../elements'

describe('TableContainer', () => {
  function MockElement(props: Partial<TableContainerAllProps>) {
    return (
      <TableContainer {...props}>
        <TableContainer.Head>
          <H2>text</H2>
        </TableContainer.Head>
        <TableContainer.Body>
          <Table>
            <tbody>
              <tr>
                <td>table 1</td>
              </tr>
            </tbody>
          </Table>
          <Table>
            <tbody>
              <tr>
                <td>table 2</td>
              </tr>
            </tbody>
          </Table>
        </TableContainer.Body>
        <TableContainer.Foot>
          <P>text</P>
        </TableContainer.Foot>
      </TableContainer>
    )
  }

  it('should contain children content', () => {
    render(<MockElement />)

    const element = document.querySelector('.dnb-table__container')

    expect(element.textContent).toBe('texttable 1table 2text')
  })

  it('should include custom attributes', () => {
    render(<MockElement aria-label="custom-label" />)

    const element = document.querySelector('.dnb-table__container')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'aria-label'])
  })

  it('should be section element', () => {
    render(<MockElement aria-label="custom-label" />)

    const element = document.querySelector('.dnb-table__container')

    expect(element.nodeName).toBe('SECTION')
  })

  it('should include custom classes', () => {
    render(<MockElement className="custom-class" />)

    const element = document.querySelector('.dnb-table__container')
    expect(Array.from(element.classList)).toContain('custom-class')
  })

  it('should support spacing', () => {
    render(<MockElement top="large" />)

    const element = document.querySelector('.dnb-table__container')
    expect(Array.from(element.classList)).toContain(
      'dnb-space__top--large'
    )
  })
})
