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

  it('renders no label when inline prop is true', () => {
    render(
      <ValueBlock inline label="Don't show me" placeholder="Placeholder" />
    )
    expect(document.querySelector('.dnb-form-label')).toBeNull()
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

  it('should have large max-width by default', () => {
    render(<ValueBlock showEmpty />)

    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).toHaveClass('dnb-forms-value-block--max-width-large')
  })

  it('should set max-width', () => {
    render(<ValueBlock showEmpty maxWidth="medium" />)

    const element = document.querySelector('.dnb-forms-value-block')
    expect(element).toHaveClass('dnb-forms-value-block--max-width-medium')
  })

  it('should put children in a wrapper element "__content"', () => {
    render(<ValueBlock>content</ValueBlock>)

    const element = document.querySelector(
      '.dnb-forms-value-block__content'
    )
    expect(element).toHaveTextContent('content')
  })

  it('renders the label as a strong element', () => {
    render(<ValueBlock label="Label">Value</ValueBlock>)

    expect(
      document.querySelector('.dnb-forms-value-block__label').tagName
    ).toBe('STRONG')
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
          class="dnb-forms-summary-list dnb-dl"
        >
          <dt
            class="dnb-forms-value-block__label dnb-dt"
          >
            <strong>
              Label
            </strong>
          </dt>
          <dd
            class="dnb-forms-value-block--max-width-large dnb-dd"
          >
            <span
              class="dnb-forms-value-block__content dnb-forms-value-block__content--gap-xx-small"
            >
              Value
            </span>
          </dd>
        </dl>
      `)
      const label = document.querySelector('.dnb-forms-value-block__label')
      expect(label?.tagName).toBe('DT')
    })

    it('should render a dt and dd depending if its empty or not', () => {
      const { rerender } = render(
        <Value.SummaryList>
          <ValueBlock>Value</ValueBlock>
        </Value.SummaryList>
      )

      expect(document.querySelector('dl')).toBeInTheDocument()
      expect(document.querySelector('dt')).toBeEmptyDOMElement()
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

    it('renders no label when not given', () => {
      render(
        <Value.SummaryList>
          <ValueBlock>Value</ValueBlock>
        </Value.SummaryList>
      )

      expect(
        document.querySelector('.dnb-forms-value-block__label')
      ).toBeEmptyDOMElement()
    })

    it('renders the label with a strong element', () => {
      render(
        <Value.SummaryList>
          <ValueBlock label="Label">Value</ValueBlock>
        </Value.SummaryList>
      )

      expect(
        document.querySelector('.dnb-forms-value-block__label strong')
      ).toBeInTheDocument()
    })
  })

  it('renders support gap', () => {
    const { rerender } = render(
      <ValueBlock gap="medium" label="Label">
        Value
      </ValueBlock>
    )

    expect(
      document.querySelector('.dnb-forms-value-block__content')
    ).toHaveClass('dnb-forms-value-block__content--gap-medium')

    rerender(
      <ValueBlock gap={false} label="Label">
        Value
      </ValueBlock>
    )

    expect(
      document.querySelector('.dnb-forms-value-block__content')
    ).toHaveClass('dnb-forms-value-block__content--gap-none')
  })

  it('should warn when ValueBlocks are siblings without being in a SummaryList', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    render(
      <>
        <ValueBlock label="Value A">Value</ValueBlock>
        <ValueBlock label="Value B">Value</ValueBlock>
      </>
    )
    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenLastCalledWith(
      expect.any(String),
      'Value components as siblings should be wrapped inside a Value.SummaryList!',
      'Value B'
    )

    render(<ValueBlock>Value</ValueBlock>)
    expect(log).toHaveBeenCalledTimes(1)

    render(
      <>
        <ValueBlock>Value</ValueBlock>
        <ValueBlock>Value</ValueBlock>
        <ValueBlock>Value</ValueBlock>
      </>
    )
    expect(log).toHaveBeenCalledTimes(3)
    expect(log).toHaveBeenLastCalledWith(
      expect.any(String),
      'Value components as siblings should be wrapped inside a Value.SummaryList!'
    )

    render(
      <Value.SummaryList>
        <ValueBlock>Value</ValueBlock>
        <ValueBlock>Value</ValueBlock>
      </Value.SummaryList>
    )
    expect(log).toHaveBeenCalledTimes(3)

    render(
      <>
        <ValueBlock>Value</ValueBlock>
        <Value.Composition label="Composition label">
          <ValueBlock>Value</ValueBlock>
          <ValueBlock>Value</ValueBlock>
        </Value.Composition>
      </>
    )
    expect(log).toHaveBeenCalledTimes(4)
    expect(log).toHaveBeenLastCalledWith(
      expect.any(String),
      'Value components as siblings should be wrapped inside a Value.SummaryList!',
      'Composition label'
    )

    log.mockRestore()
  })
})
