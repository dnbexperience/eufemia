import React from 'react'
import { render } from '@testing-library/react'
import SummaryList from '../SummaryList'
import { Value } from '../../..'

beforeEach(() => {
  global.console.log = jest.fn()
})

describe('Field.SummaryList', () => {
  it('should forward HTML attributes', () => {
    render(<SummaryList aria-label="Aria Label">Aria Summary</SummaryList>)

    const element = document.querySelector('.dnb-forms-summary-list')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <SummaryList top="x-large">Space Summary</SummaryList>
    )
    const element = document.querySelector('.dnb-forms-summary-list')

    expect(element.classList).toContain('dnb-space__top--x-large')

    rerender(<SummaryList top="x-small">Space Summary</SummaryList>)

    expect(element.classList).toContain('dnb-space__top--x-small')
  })

  it('should contain given classes', () => {
    render(
      <SummaryList className="custom-class">Class Summary</SummaryList>
    )

    const element = document.querySelector('.dnb-forms-summary-list')

    expect(Array.from(element.classList)).toEqual([
      'dnb-forms-summary-list',
      'custom-class',
      'dnb-dl',
    ])
  })

  it('should set grid class', () => {
    render(<SummaryList layout="grid">Class Summary</SummaryList>)

    const element = document.querySelector('.dnb-forms-summary-list')
    expect(element).toHaveClass('dnb-dl__layout--grid')
  })

  it('should render children', () => {
    render(<SummaryList>Children Summary</SummaryList>)

    const element = document.querySelector('.dnb-forms-summary-list')
    const children = element.childNodes

    expect(children.length).toEqual(1)
    expect(children[0].textContent).toEqual('Children Summary')
  })

  it('should render Value.String as dt and dd', () => {
    render(
      <SummaryList>
        <Value.String label="Label" value="Value" />
      </SummaryList>
    )

    const element = document.querySelector('.dnb-forms-summary-list')
    const children = element.childNodes

    expect(children.length).toEqual(2)
    expect(element.querySelector('dt')).toHaveTextContent('Label')
    expect(element.querySelector('dd')).toHaveTextContent('Value')
  })

  it('should render dt without label', () => {
    render(
      <SummaryList>
        <Value.String value="Value" />
      </SummaryList>
    )

    const element = document.querySelector('.dnb-forms-summary-list')
    const children = element.childNodes

    expect(children.length).toEqual(2)
    expect(element.querySelector('dt')).toBeEmptyDOMElement()
    expect(element.querySelector('dd')).toHaveTextContent('Value')
  })

  it('should default to medium heading', () => {
    render(<SummaryList>Summary</SummaryList>)

    const element = document.querySelector('.dnb-forms-summary-list')

    expect(element).toHaveClass('dnb-forms-summary-list dnb-dl')
  })
})
