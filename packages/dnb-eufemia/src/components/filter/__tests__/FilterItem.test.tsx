import { render, fireEvent } from '@testing-library/react'
import FilterRoot from '../FilterRoot'
import FilterItem from '../FilterItem'

describe('Filter.Item', () => {
  it('renders accordion closed by default', () => {
    render(
      <FilterRoot>
        <FilterItem label="Category" filterKey="/category">
          <p>Item content</p>
        </FilterItem>
      </FilterRoot>
    )

    const item = document.querySelector('.dnb-filter__item')

    expect(item).toBeInTheDocument()

    const header = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    expect(header).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders accordion open when defaultOpen is true', () => {
    render(
      <FilterRoot>
        <FilterItem label="Category" filterKey="/category" defaultOpen>
          <p>Content</p>
        </FilterItem>
      </FilterRoot>
    )

    const header = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    expect(header).toHaveAttribute('aria-expanded', 'true')
  })

  it('opens and closes accordion on click', () => {
    render(
      <FilterRoot>
        <FilterItem label="Category" filterKey="/category">
          <p>Content</p>
        </FilterItem>
      </FilterRoot>
    )

    const accordionHeader = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )

    fireEvent.click(accordionHeader)

    expect(accordionHeader).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows a right chevron when closed and a down chevron when open', () => {
    render(
      <FilterRoot>
        <FilterItem label="Category" filterKey="/category">
          <p>Content</p>
        </FilterItem>
      </FilterRoot>
    )

    const accordionHeader = document.querySelector(
      '.dnb-accordion__tertiary-button'
    )
    const activeChevron = () =>
      accordionHeader
        .querySelector('.dnb-icon__state--active path')
        .getAttribute('d')

    expect(activeChevron()).toBe('m6 13 5-5-5-5')

    fireEvent.click(accordionHeader)

    expect(activeChevron()).toBe('m13 5.5-5 5-5-5')
  })
})
