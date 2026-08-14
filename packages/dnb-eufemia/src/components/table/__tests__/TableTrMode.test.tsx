import { render, fireEvent } from '@testing-library/react'
import {
  axeComponent,
  spyOnEufemiaWarn,
} from '../../../core/test-utils/testSetup'
import Table from '../Table'
import Tr from '../TableTr'
import Td from '../TableTd'
import Th from '../TableTh'
import nbNO from '../../../shared/locales/nb-NO'

const nb = nbNO['nb-NO'].Table

const controlColumnIndex = (row: Element) =>
  Array.from(row.children).findIndex((cell) =>
    cell.className.includes('button-icon')
  )

describe('Table with per-row Tr mode', () => {
  it('makes a navigation row clickable inside an accordion table', () => {
    const onClick = vi.fn()

    render(
      <Table mode="accordion">
        <tbody>
          <Tr>
            <Td>Company</Td>
            <Td.AccordionContent>Facilities</Td.AccordionContent>
          </Tr>
          <Tr mode="navigation" onClick={onClick}>
            <Td>Facility</Td>
          </Tr>
        </tbody>
      </Table>
    )

    // Row order: accordion head, accordion content, navigation row
    const rows = document.querySelectorAll('tbody > tr')
    const navRow = rows[2]

    expect(Array.from(navRow.classList)).toContain(
      'dnb-table__tr--clickable'
    )

    // Renders the navigation chevron button (not the accordion toggle)
    const srButton = navRow.querySelector('.dnb-table__button button')
    expect(srButton.getAttribute('aria-label')).toBe(nb.navigationButtonSR)

    // The navigation row does not spawn an accordion-content row
    expect(navRow.nextElementSibling).toBeNull()
    expect(
      document.querySelectorAll('.dnb-table__tr__accordion-content')
    ).toHaveLength(1)

    fireEvent.click(navRow)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick.mock.calls[0][1].trElement).toBe(navRow)
  })

  it('makes an accordion row expandable inside a navigation table', () => {
    render(
      <Table mode="navigation">
        <tbody>
          <Tr onClick={vi.fn()}>
            <Td>Facility</Td>
          </Tr>
          <Tr mode="accordion">
            <Td>Company</Td>
            <Td.AccordionContent>Facilities</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    // Row order: navigation row, accordion head, accordion content
    const rows = document.querySelectorAll('tbody > tr')
    const accordionHead = rows[1] as HTMLTableRowElement

    expect(Array.from(accordionHead.classList)).toContain(
      'dnb-table__tr--clickable'
    )

    // Renders the accordion toggle button (not the navigation chevron)
    const srButton = accordionHead.querySelector(
      '.dnb-table__button button'
    )
    expect(srButton.getAttribute('aria-label')).toBe(
      nb.accordionToggleButtonSR
    )

    const contentRow = accordionHead.nextElementSibling
    expect(Array.from(contentRow.classList)).toContain(
      'dnb-table__tr__accordion-content'
    )

    // Clicking the row toggles expansion
    expect(Array.from(accordionHead.classList)).not.toContain(
      'dnb-table__tr--expanded'
    )
    fireEvent.click(accordionHead)
    expect(Array.from(accordionHead.classList)).toContain(
      'dnb-table__tr--expanded'
    )
  })

  it('per-row mode overrides the table-wide mode', () => {
    render(
      <Table mode="accordion">
        <tbody>
          <Tr mode="navigation" onClick={vi.fn()}>
            <Td>Facility</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const row = document.querySelector('tbody > tr')
    const srButton = row.querySelector('.dnb-table__button button')

    // The navigation label wins over the accordion label
    expect(srButton.getAttribute('aria-label')).toBe(nb.navigationButtonSR)
    expect(
      document.querySelectorAll('.dnb-table__tr__accordion-content')
    ).toHaveLength(0)
  })

  it('works without a table-wide mode', () => {
    const onClick = vi.fn()

    render(
      <Table>
        <tbody>
          <Tr mode="navigation" onClick={onClick}>
            <Td>Facility</Td>
          </Tr>
          <Tr mode="accordion">
            <Td>Company</Td>
            <Td.AccordionContent>Facilities</Td.AccordionContent>
          </Tr>
        </tbody>
      </Table>
    )

    const rows = document.querySelectorAll('tbody > tr')
    const navRow = rows[0] as HTMLTableRowElement
    const accordionHead = rows[1] as HTMLTableRowElement

    expect(Array.from(navRow.classList)).toContain(
      'dnb-table__tr--clickable'
    )
    fireEvent.click(navRow)
    expect(onClick).toHaveBeenCalledTimes(1)

    fireEvent.click(accordionHead)
    expect(Array.from(accordionHead.classList)).toContain(
      'dnb-table__tr--expanded'
    )
  })

  it('does not leak the mode prop to the DOM', () => {
    render(
      <Table mode="accordion">
        <tbody>
          <Tr mode="navigation" onClick={vi.fn()}>
            <Td>Facility</Td>
          </Tr>
        </tbody>
      </Table>
    )

    const row = document.querySelector('tbody > tr')
    expect(row.hasAttribute('mode')).toBe(false)
  })

  it('should have no axe violations with mixed accordion and navigation rows', async () => {
    const Component = render(
      <Table mode="accordion" accordionChevronPlacement="right">
        <thead>
          <Tr>
            <Th>Column A</Th>
            <Th>Column B</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>Company</Td>
            <Td>Group</Td>
            <Td.AccordionContent>Facilities</Td.AccordionContent>
          </Tr>
          <Tr mode="navigation" onClick={vi.fn()}>
            <Td>Facility</Td>
            <Td>Detail</Td>
          </Tr>
        </tbody>
      </Table>
    )

    expect(await axeComponent(Component)).toHaveNoViolations()
  })

  describe('column alignment (accessibility)', () => {
    it('keeps the control column last for every row with accordionChevronPlacement="right"', () => {
      const log = spyOnEufemiaWarn()
      render(
        <Table mode="accordion" accordionChevronPlacement="right">
          <thead>
            <Tr>
              <Th>Company</Th>
              <Th>Org.nr</Th>
            </Tr>
          </thead>
          <tbody>
            <Tr>
              <Td>DNB</Td>
              <Td>984</Td>
              <Td.AccordionContent>Oslo</Td.AccordionContent>
            </Tr>
            <Tr mode="navigation" onClick={vi.fn()}>
              <Td>Facility</Td>
              <Td>—</Td>
            </Tr>
          </tbody>
        </Table>
      )
      log.mockRestore()

      const rows = document.querySelectorAll(
        'thead > tr, tbody > tr:not(.dnb-table__tr__accordion-content)'
      )

      // The header and every data row must place the control column last,
      // so screen readers associate each cell with the correct column header.
      rows.forEach((row) => {
        expect(controlColumnIndex(row)).toBe(row.children.length - 1)
      })
    })

    it('misaligns the control column without right placement (rationale for the warning)', () => {
      const log = spyOnEufemiaWarn()
      render(
        <Table mode="accordion">
          <tbody>
            <Tr>
              <Td>DNB</Td>
              <Td.AccordionContent>Oslo</Td.AccordionContent>
            </Tr>
            <Tr mode="navigation" onClick={vi.fn()}>
              <Td>Facility</Td>
            </Tr>
          </tbody>
        </Table>
      )
      log.mockRestore()

      const [accordionRow, , navRow] = Array.from(
        document.querySelectorAll('tbody > tr')
      )

      // Accordion (default/left) prepends, navigation appends -> misaligned.
      expect(controlColumnIndex(accordionRow)).toBe(0)
      expect(controlColumnIndex(navRow)).toBe(navRow.children.length - 1)
      expect(controlColumnIndex(accordionRow)).not.toBe(
        controlColumnIndex(navRow)
      )
    })
  })

  describe('accessibility warning', () => {
    it('warns when mixing modes without accordionChevronPlacement="right"', () => {
      const log = spyOnEufemiaWarn()
      render(
        <Table mode="accordion">
          <tbody>
            <Tr mode="navigation" onClick={vi.fn()}>
              <Td>Facility</Td>
            </Tr>
          </tbody>
        </Table>
      )

      expect(log).toHaveBeenCalledWith(
        expect.stringContaining('Eufemia'),
        expect.stringContaining('accordionChevronPlacement')
      )
      log.mockRestore()
    })

    it('does not warn when accordionChevronPlacement="right" is set', () => {
      const log = spyOnEufemiaWarn()
      render(
        <Table mode="accordion" accordionChevronPlacement="right">
          <tbody>
            <Tr mode="navigation" onClick={vi.fn()}>
              <Td>Facility</Td>
            </Tr>
          </tbody>
        </Table>
      )

      expect(log).not.toHaveBeenCalledWith(
        expect.stringContaining('Eufemia'),
        expect.stringContaining('accordionChevronPlacement')
      )
      log.mockRestore()
    })

    it('does not warn when the per-row mode matches the table mode', () => {
      const log = spyOnEufemiaWarn()
      render(
        <Table mode="accordion">
          <tbody>
            <Tr mode="accordion">
              <Td>Company</Td>
              <Td.AccordionContent>Facilities</Td.AccordionContent>
            </Tr>
          </tbody>
        </Table>
      )

      expect(log).not.toHaveBeenCalledWith(
        expect.stringContaining('Eufemia'),
        expect.stringContaining('accordionChevronPlacement')
      )
      log.mockRestore()
    })
  })
})
