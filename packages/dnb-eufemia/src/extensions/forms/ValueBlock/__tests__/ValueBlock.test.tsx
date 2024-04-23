import React from 'react'
import { axeComponent } from '../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import ValueBlock from '../ValueBlock'
import { Value } from '../..'

describe('ValueBlock', () => {
  it('renders without crashing', () => {
    render(<ValueBlock placeholder="Placeholder" />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).toBeInTheDocument()
  })

  it('renders label and placeholder correctly', () => {
    render(<ValueBlock label="Label" placeholder="Placeholder" />)
    const label = document.querySelector('.dnb-forms-value-block__label')
    const placeholder = document.querySelector(
      '.dnb-forms-value-block__placeholder'
    )
    expect(label).toBeInTheDocument()
    expect(label?.textContent).toBe('Label')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder?.textContent).toBe('Placeholder')
  })

  it('renders children correctly', () => {
    render(<ValueBlock>Children</ValueBlock>)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).toBeInTheDocument()
    expect(element?.textContent).toBe('Children')
  })

  it('renders inline class when inline prop is true', () => {
    render(<ValueBlock inline placeholder="Placeholder" />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).toHaveClass('dnb-forms-value-block--inline')
  })

  it('renders when showEmpty is provided', () => {
    render(<ValueBlock showEmpty />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).toBeInTheDocument()
  })

  it('does not render when children, showEmpty, and placeholder are not provided', () => {
    render(<ValueBlock />)
    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).not.toBeInTheDocument()
  })

  describe('when used in a SummaryList', () => {
    it('should render in a dl list', () => {
      render(
        <Value.SummaryList>
          <ValueBlock label="Label">Value</ValueBlock>
        </Value.SummaryList>
      )
      const dl = document.querySelector('dl')
      expect(dl).toMatchInlineSnapshot(`
        <dl
          class="dnb-form-summary-list dnb-dl"
        >
          <dt
            class="dnb-forms-value-block__label dnb-dt"
          >
            Label
          </dt>
          <dd
            class="dnb-forms-value-block--width-large dnb-dd"
          >
            Value
          </dd>
        </dl>
      `)
      const label = document.querySelector('.dnb-forms-value-block__label')
      expect(label?.tagName).toBe('DT')
    })

    it('should always render a dt and dd even if no label is provided', () => {
      const { rerender } = render(
        <Value.SummaryList>
          <ValueBlock>Value</ValueBlock>
        </Value.SummaryList>
      )

      expect(document.querySelector('dl')).toBeInTheDocument()
      expect(document.querySelector('dt')).toBeInTheDocument()
      expect(document.querySelector('dd')).toBeInTheDocument()

      rerender(
        <Value.SummaryList>
          <ValueBlock label="Label">Value</ValueBlock>
        </Value.SummaryList>
      )

      expect(document.querySelector('dl')).toBeInTheDocument()
      expect(document.querySelector('dt')).toBeInTheDocument()
      expect(document.querySelector('dd')).toBeInTheDocument()
    })

    it('should validate with ARIA rules', async () => {
      const result = render(
        <Value.SummaryList>
          <ValueBlock label="Label">Value</ValueBlock>
        </Value.SummaryList>
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('renders label and placeholder correctly', () => {
      render(
        <Value.SummaryList>
          <ValueBlock label="Label" placeholder="Placeholder">
            Value
          </ValueBlock>
        </Value.SummaryList>
      )
      const label = document.querySelector('.dnb-forms-value-block__label')
      const placeholder = document.querySelector(
        '.dnb-forms-value-block__placeholder'
      )
      expect(label).toBeInTheDocument()
      expect(label?.textContent).toBe('Label')
      expect(placeholder).not.toBeInTheDocument()
    })
  })
})
