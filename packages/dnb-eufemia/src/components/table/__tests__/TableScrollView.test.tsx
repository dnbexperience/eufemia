import React from 'react'
import { render } from '@testing-library/react'
import Table from '../Table'
import ScrollView from '../TableScrollView'
import { BasicTable } from './TableMocks'

describe('Table.ScrollView', () => {
  it('should support spacing props', () => {
    render(
      <ScrollView top="large">
        <Table>
          <BasicTable />
        </Table>
      </ScrollView>
    )

    const element = document.querySelector('.dnb-table__scroll-view')

    expect(Array.from(element.classList)).toEqual([
      'dnb-scroll-view',
      'dnb-space__top--large',
      'dnb-table__scroll-view',
    ])
  })

  it('should have tabindex="0"', () => {
    render(
      <ScrollView>
        <Table>
          <BasicTable />
        </Table>
      </ScrollView>
    )

    const element = document.querySelector('.dnb-table__scroll-view')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class', 'tabindex'])
    expect(element.getAttribute('tabindex')).toBe('0')
  })
})
