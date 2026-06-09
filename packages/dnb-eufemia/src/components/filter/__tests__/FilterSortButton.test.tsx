import { render, fireEvent } from '@testing-library/react'
import '../../../core/vitest/mockMatchMediaSetup'
import { setMedia } from 'mock-match-media'
import FilterSortButton from '../FilterSortButton'
import Provider from '../../../shared/Provider'
import nbNO from '../../../shared/locales/nb-NO'
import enGB from '../../../shared/locales/en-GB'

const sortOptions = [
  { selectedKey: 'newest', content: 'Newest first' },
  { selectedKey: 'oldest', content: 'Oldest first' },
  { selectedKey: 'amount-high', content: 'Amount high–low' },
]

describe('Filter.SortButton', () => {
  it('renders as a tertiary dropdown', () => {
    render(<FilterSortButton data={sortOptions} />)

    const button = document.querySelector('.dnb-dropdown .dnb-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('dnb-button--tertiary')
  })

  it('uses sort icon with left position', () => {
    render(<FilterSortButton data={sortOptions} />)

    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown).toHaveClass('dnb-dropdown--icon-position-left')
  })

  it('shows options when clicked', () => {
    render(<FilterSortButton data={sortOptions} />)

    fireEvent.click(document.querySelector('.dnb-dropdown .dnb-button'))

    const items = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('Newest first')
    expect(items[1]).toHaveTextContent('Oldest first')
    expect(items[2]).toHaveTextContent('Amount high–low')
  })

  it('calls onChange when selecting an option', () => {
    const onChange = vi.fn()

    render(<FilterSortButton data={sortOptions} onChange={onChange} />)

    fireEvent.click(document.querySelector('.dnb-dropdown .dnb-button'))
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[1]
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ selectedKey: 'oldest' }),
      })
    )
  })

  it('defaults to medium size', () => {
    render(<FilterSortButton data={sortOptions} />)

    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown).toHaveClass('dnb-dropdown--medium')
  })

  it('uses translated default title', () => {
    render(
      <Provider locale="nb-NO">
        <FilterSortButton data={sortOptions} />
      </Provider>
    )

    const button = document.querySelector('.dnb-dropdown .dnb-button')
    expect(button).toHaveAttribute(
      'title',
      nbNO['nb-NO'].Filter.sortButtonLabel
    )
  })

  it('uses English title when locale is en-GB', () => {
    render(
      <Provider locale="en-GB">
        <FilterSortButton data={sortOptions} />
      </Provider>
    )

    const button = document.querySelector('.dnb-dropdown .dnb-button')
    expect(button).toHaveAttribute(
      'title',
      enGB['en-GB'].Filter.sortButtonLabel
    )
  })

  it('does not change title after selecting an option', () => {
    render(
      <Provider locale="nb-NO">
        <FilterSortButton data={sortOptions} />
      </Provider>
    )

    const button = document.querySelector('.dnb-dropdown .dnb-button')
    const label = nbNO['nb-NO'].Filter.sortButtonLabel

    expect(button).toHaveAttribute('title', label)

    fireEvent.click(button)
    fireEvent.click(
      document.querySelectorAll('li.dnb-drawer-list__option')[1]
    )

    expect(button).toHaveAttribute('title', label)
  })

  it('forwards additional Dropdown props', () => {
    render(<FilterSortButton data={sortOptions} className="custom-sort" />)

    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown).toHaveClass('custom-sort')
  })

  it('marks the selected option visually', () => {
    render(<FilterSortButton data={sortOptions} value={1} />)

    fireEvent.click(document.querySelector('.dnb-dropdown .dnb-button'))

    const options = document.querySelectorAll('li.dnb-drawer-list__option')
    expect(options[1]).toHaveClass('dnb-drawer-list__option--selected')
    expect(options[0]).not.toHaveClass('dnb-drawer-list__option--selected')
  })

  it('uses independentWidth and align right', () => {
    render(<FilterSortButton data={sortOptions} />)

    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown).toHaveClass('dnb-dropdown--independent-width')
    expect(dropdown).toHaveClass('dnb-dropdown--right')
  })

  it('passes includeOwnerWidth to the drawer list via align right', () => {
    render(<FilterSortButton data={sortOptions} />)

    const drawerList = document.querySelector('.dnb-drawer-list')
    expect(drawerList).toHaveClass('dnb-drawer-list--right')
  })

  it('does not align right on small screens', () => {
    setMedia({ width: '30em' })

    render(<FilterSortButton data={sortOptions} />)

    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown).not.toHaveClass('dnb-dropdown--right')
    expect(dropdown).toHaveClass('dnb-dropdown--left')
  })
})
