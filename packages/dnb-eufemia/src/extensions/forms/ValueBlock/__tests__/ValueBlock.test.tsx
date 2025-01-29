import React from 'react'
import { axeComponent } from '../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import ValueBlock from '../ValueBlock'
import { Form, Value } from '../..'

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

  it('should set dnb-sr-only class when labelSrOnly is true', () => {
    render(
      <ValueBlock label="Label" labelSrOnly>
        content
      </ValueBlock>
    )

    const element = document.querySelector('.dnb-form-label')
    expect(element).toHaveClass('dnb-sr-only')
    expect(element).toHaveTextContent('Label')
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

    it('should render HeightAnimation inside dt and dd when animate is true', () => {
      render(
        <Value.SummaryList>
          <Value.String label="Label" value="First field" />

          <Form.Visibility pathUndefined="/undefined" animate>
            <Value.String label="Label" value="Second field" />
          </Form.Visibility>
        </Value.SummaryList>
      )

      const element = document.querySelector('.dnb-forms-summary-list')

      const firstChild = element.children[0]
      const secondChild = element.children[1]
      const thirdChild = element.children[2]
      const fourthChild = element.children[3]

      expect(
        firstChild.querySelector('.dnb-height-animation')
      ).not.toBeInTheDocument()
      expect(
        secondChild.querySelector('.dnb-height-animation')
      ).not.toBeInTheDocument()

      expect(
        thirdChild.querySelector('.dnb-height-animation')
      ).toBeInTheDocument()
      expect(
        fourthChild.querySelector('.dnb-height-animation')
      ).toBeInTheDocument()

      expect(element.tagName).toBe('DL')
      expect(firstChild.tagName).toBe('DT')
      expect(secondChild.tagName).toBe('DD')
      expect(thirdChild.tagName).toBe('DT')
      expect(fourthChild.tagName).toBe('DD')
    })

    it('should render div inside dt and dd when keepInDOM is true', () => {
      render(
        <Value.SummaryList>
          <Value.String label="Label" value="First field" />

          <Form.Visibility pathUndefined="/undefined" keepInDOM>
            <Value.String label="Label" value="Second field" />
          </Form.Visibility>
        </Value.SummaryList>
      )

      const element = document.querySelector('.dnb-forms-summary-list')

      const firstChild = element.children[0]
      const secondChild = element.children[1]
      const thirdChild = element.children[2]
      const fourthChild = element.children[3]

      expect(
        firstChild.querySelector('.dnb-forms-visibility')
      ).not.toBeInTheDocument()
      expect(
        secondChild.querySelector('.dnb-forms-visibility')
      ).not.toBeInTheDocument()

      expect(
        thirdChild.querySelector('.dnb-forms-visibility')
      ).toBeInTheDocument()
      expect(
        fourthChild.querySelector('.dnb-forms-visibility')
      ).toBeInTheDocument()

      expect(element.tagName).toBe('DL')
      expect(firstChild.tagName).toBe('DT')
      expect(secondChild.tagName).toBe('DD')
      expect(thirdChild.tagName).toBe('DT')
      expect(fourthChild.tagName).toBe('DD')
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
      'Value components as siblings should be wrapped inside a Value.SummaryList:',
      { itemPath: undefined, label: 'Value B', path: undefined }
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
      'Value components as siblings should be wrapped inside a Value.SummaryList:',
      { itemPath: undefined, label: undefined, path: undefined }
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
      'Value components as siblings should be wrapped inside a Value.SummaryList:',
      { itemPath: undefined, label: 'Composition label', path: undefined }
    )

    log.mockRestore()
  })

  describe('transformLabel', () => {
    it('should transform label', () => {
      const transformLabel = jest.fn((label) => label.toUpperCase())
      render(
        <ValueBlock
          label="The label"
          transformLabel={transformLabel}
          showEmpty
        />
      )
      expect(transformLabel).toHaveBeenCalledTimes(1)
      expect(transformLabel).toHaveBeenLastCalledWith(
        'The label',
        expect.anything()
      )
      expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
        'THE LABEL'
      )
    })

    it('should transform label in Value.String', () => {
      const transformLabel = jest.fn((label) => label.toUpperCase())
      render(
        <Form.Handler>
          <Value.String
            label="The label"
            transformLabel={transformLabel}
            showEmpty
          />
        </Form.Handler>
      )
      expect(transformLabel).toHaveBeenCalledTimes(1)
      expect(transformLabel).toHaveBeenLastCalledWith(
        'The label',
        expect.anything()
      )
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('THE LABEL')
    })

    it('should transform a JSX label and return "convertJsxToString"', () => {
      const transformLabel = jest.fn((label, { convertJsxToString }) =>
        convertJsxToString(label).toUpperCase()
      )
      render(
        <Form.Handler>
          <Value.String
            label={<span>The label</span>}
            transformLabel={transformLabel}
            showEmpty
          />
        </Form.Handler>
      )
      expect(transformLabel).toHaveBeenCalledTimes(1)
      expect(transformLabel).toHaveBeenLastCalledWith(
        <span>The label</span>,
        expect.anything()
      )
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('THE LABEL')
    })

    it('should transform label using Value.Provider', () => {
      const transformLabel = jest.fn((label) => label.toUpperCase())
      render(
        <Form.Handler>
          <Value.Provider transformLabel={transformLabel}>
            <Value.SummaryList>
              <Value.String label="The label A" showEmpty />
              <Value.String label="The label B" showEmpty />
            </Value.SummaryList>
          </Value.Provider>
        </Form.Handler>
      )

      const [first, second] = Array.from(document.querySelectorAll('dt'))
      expect(first).toHaveTextContent('THE LABEL A')
      expect(second).toHaveTextContent('THE LABEL B')
      expect(transformLabel).toHaveBeenCalledTimes(2)
      expect(transformLabel).toHaveBeenNthCalledWith(
        1,
        'The label A',
        expect.anything()
      )
      expect(transformLabel).toHaveBeenNthCalledWith(
        2,
        'The label B',
        expect.anything()
      )
    })
  })
})
