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
          <H2>Header</H2>
          <P>Text</P>
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

    expect(element.textContent).toBe('HeaderTexttable 1table 2text')

    expect(
      document.querySelector('.dnb-table__container__head--empty')
    ).toBeFalsy()

    expect(
      document.querySelector('.dnb-table__container__foot--empty')
    ).toBeFalsy()
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

  it('should not return table head if empty modifier', () => {
    render(<TableContainer.Head />)

    expect(
      document.querySelector('.dnb-table__container__head--empty')
    ).toBeTruthy()
  })

  it('should not return table foot if empty modifier', () => {
    render(<TableContainer.Foot />)

    expect(
      document.querySelector('.dnb-table__container__foot--empty')
    ).toBeTruthy()
  })

  it('should handle empty/no table head and foot ', () => {
    render(
      <TableContainer>
        <TableContainer.Body>
          <Table>
            <tbody>
              <tr>
                <td>table 1</td>
              </tr>
            </tbody>
          </Table>
        </TableContainer.Body>
      </TableContainer>
    )

    expect(
      document.querySelector('.dnb-table__container__head--empty')
    ).toBeTruthy()

    expect(
      document.querySelector('.dnb-table__container__foot--empty')
    ).toBeTruthy()
  })

  it('should include extra classes in scroll-view', () => {
    render(<MockElement />)

    const element = document.querySelector('.dnb-scroll-view')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__scroll-view'
    )
  })

  it('should support spacing', () => {
    render(<MockElement top="large" />)

    const element = document.querySelector('.dnb-table__container')
    expect(Array.from(element.classList)).toContain(
      'dnb-space__top--large'
    )
  })
})
