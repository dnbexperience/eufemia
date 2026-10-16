import { fireEvent, render } from '@testing-library/react'
import type { TableThProps } from '../TableTh'
import TableTh from '../TableTh'
import TableSortButton from '../TableSortButton'
import TableHelpButton from '../TableHelpButton'
import useHandleSortState from '../useHandleSortState'

const sortConfig = { one: {}, two: {} }

function SortableHeader() {
  const { sortState, sortHandler } = useHandleSortState(sortConfig)

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(sortConfig).map((name) => (
            <TableTh
              key={name}
              sortable
              active={sortState[name].active}
              reversed={sortState[name].reversed}
            >
              <TableSortButton text={name} onClick={sortHandler[name]} />
            </TableTh>
          ))}
        </tr>
      </thead>
    </table>
  )
}

describe('TableTh', () => {
  it('renders with props as an object', () => {
    const props: TableThProps = {}

    render(
      <table>
        <tbody>
          <tr>
            <TableTh {...props} />
          </tr>
        </tbody>
      </table>
    )
    expect(document.querySelector('th')).toBeInTheDocument()
  })

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

  it('should set correct role when scope is rowgroup', () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableTh scope="rowgroup">th content</TableTh>
          </tr>
        </tbody>
      </table>
    )

    const element = document.querySelector('th')

    expect(element.getAttribute('role')).toBe('rowheader')
    expect(element.getAttribute('scope')).toBe('rowgroup')
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
    expect(element.hasAttribute('aria-sort')).toBe(false)
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
    expect(element.hasAttribute('aria-sort')).toBe(false)
  })

  it('should set aria-sort to descending when active and reversed', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh sortable active reversed>
              th content
            </TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(element.getAttribute('aria-sort')).toBe('descending')
  })

  it('should set aria-sort only on the active column', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh sortable>one</TableTh>
            <TableTh sortable active>
              two
            </TableTh>
            <TableTh sortable reversed>
              three
            </TableTh>
          </tr>
        </thead>
      </table>
    )

    const values = Array.from(document.querySelectorAll('th')).map((th) =>
      th.getAttribute('aria-sort')
    )
    expect(values).toEqual([null, 'ascending', null])
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
    expect(element).toHaveClass('dnb-table__th custom-class', {
      exact: true,
    })
  })

  it('should set the subtle variant class', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh variant="subtle">th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__th--subtle'
    )
  })

  it('should set variant class when variant is emphasis', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh variant="emphasis">th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__th--emphasis'
    )
  })

  it('should have Th.SortButton', () => {
    expect(TableTh.SortButton).toBe(TableSortButton)
  })

  it('should have Th.HelpButton', () => {
    expect(TableTh.HelpButton).toBe(TableHelpButton)
  })

  it('should set the highlight class', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh highlight>th content</TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain(
      'dnb-table__th--highlight'
    )
  })

  it('should not set the highlight class when highlight is false', () => {
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
    expect(Array.from(element.classList)).not.toContain(
      'dnb-table__th--highlight'
    )
  })

  it('should combine highlight with other classes', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh highlight sortable active className="custom">
              th content
            </TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    const classList = Array.from(element.classList)
    expect(classList).toContain('dnb-table__th--highlight')
    expect(classList).toContain('dnb-table--sortable')
    expect(classList).toContain('dnb-table--active')
    expect(classList).toContain('custom')
  })

  it('should set sort-off class when sortedBefore and not active', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh sortable sortedBefore>
              th content
            </TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).toContain('dnb-table--sort-off')
  })

  it('should not set sort-off class when sortedBefore and active', () => {
    render(
      <table>
        <thead>
          <tr>
            <TableTh sortable sortedBefore active>
              th content
            </TableTh>
          </tr>
        </thead>
      </table>
    )

    const element = document.querySelector('th')
    expect(Array.from(element.classList)).not.toContain(
      'dnb-table--sort-off'
    )
  })

  it('should set sort-off class after sorting is turned off while hovering, until the pointer leaves', () => {
    render(<SortableHeader />)

    const th = document.querySelector('th')
    const button = th.querySelector('button')

    fireEvent.mouseEnter(th)
    fireEvent.click(button) // asc
    fireEvent.click(button) // desc
    expect(th.classList).not.toContain('dnb-table--sort-off')

    fireEvent.click(button) // off
    expect(th.classList).not.toContain('dnb-table--active')
    expect(th.classList).toContain('dnb-table--sort-off')

    fireEvent.mouseLeave(th)
    expect(th.classList).not.toContain('dnb-table--sort-off')

    fireEvent.mouseEnter(th)
    expect(th.classList).not.toContain('dnb-table--sort-off')
  })

  it('should not set sort-off class when deactivated by another column', () => {
    render(<SortableHeader />)

    const [first, second] = Array.from(document.querySelectorAll('th'))

    fireEvent.mouseEnter(first)
    fireEvent.click(first.querySelector('button'))
    fireEvent.mouseLeave(first)

    fireEvent.mouseEnter(second)
    fireEvent.click(second.querySelector('button'))

    expect(first.classList).not.toContain('dnb-table--active')
    expect(first.classList).not.toContain('dnb-table--sort-off')
  })

  it('should not set sort-off class when sorting was turned off without hovering', () => {
    render(<SortableHeader />)

    const th = document.querySelector('th')
    const button = th.querySelector('button')

    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.mouseEnter(th)

    expect(th.classList).not.toContain('dnb-table--sort-off')
  })

  it('should call the given mouse enter and leave handlers', () => {
    const onMouseEnter = vi.fn()
    const onMouseLeave = vi.fn()

    render(
      <table>
        <thead>
          <tr>
            <TableTh
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              th content
            </TableTh>
          </tr>
        </thead>
      </table>
    )

    const th = document.querySelector('th')
    fireEvent.mouseEnter(th)
    fireEvent.mouseLeave(th)

    expect(onMouseEnter).toHaveBeenCalledTimes(1)
    expect(onMouseLeave).toHaveBeenCalledTimes(1)
  })

  it('should not set sort-off class without sortedBefore', () => {
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
    expect(Array.from(element.classList)).not.toContain(
      'dnb-table--sort-off'
    )
  })
})
