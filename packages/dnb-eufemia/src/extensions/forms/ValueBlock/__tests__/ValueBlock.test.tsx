import React from 'react'
import { axeComponent } from '../../../../core/jest/jestSetup'
import { render, fireEvent } from '@testing-library/react'
import ValueBlock from '../ValueBlock'
import { Field, Form, Iterate, Value } from '../..'
import userEvent from '@testing-library/user-event'

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
    render(<ValueBlock>content</ValueBlock>)

    const element = document.querySelector(
      '.dnb-forms-value-block__content'
    )
    expect(element).toHaveClass(
      'dnb-forms-value-block__content--max-width-large'
    )
  })

  it('should set max-width', () => {
    render(<ValueBlock maxWidth="medium"> content</ValueBlock>)

    const element = document.querySelector(
      '.dnb-forms-value-block__content'
    )
    expect(element).toHaveClass(
      'dnb-forms-value-block__content--max-width-medium'
    )
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
          class="dnb-forms-summary-list dnb-dl__layout--vertical dnb-dl"
        >
          <dt
            class="dnb-forms-value-block__label dnb-dt"
          >
            <strong>
              Label
            </strong>
          </dt>
          <dd
            class="dnb-forms-value-block__content--max-width-large dnb-dd"
          >
            <span
              class="dnb-forms-value-block__content dnb-forms-value-block__content--gap-xx-small dnb-forms-value-block__content--max-width-large"
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

    it('should render only one dl when inside Composition and no label was given', () => {
      const { rerender } = render(
        <Value.SummaryList>
          <Value.Composition>
            <ValueBlock>Value</ValueBlock>
            <Value.String value="omit error" />
          </Value.Composition>
        </Value.SummaryList>
      )

      expect(document.querySelectorAll('dl')).toHaveLength(1)
      expect(document.querySelectorAll('dt')).toHaveLength(1)
      expect(document.querySelectorAll('dd')).toHaveLength(1)

      rerender(
        <Value.SummaryList>
          <Value.Composition>
            <ValueBlock label="Label">Value</ValueBlock>
            <Value.String value="omit error" />
          </Value.Composition>
        </Value.SummaryList>
      )

      expect(document.querySelectorAll('dl')).toHaveLength(2)
      expect(document.querySelectorAll('dt')).toHaveLength(2)
      expect(document.querySelectorAll('dd')).toHaveLength(2)
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

    it('renders Composition value from Iterate.Array', () => {
      render(
        <Value.Composition>
          <Iterate.Array
            defaultValue={[
              {
                value: 'value 1',
              },
              {
                value: 'value 2',
              },
            ]}
          >
            <Value.String label="Label {itemNo}" itemPath="/value" />
          </Iterate.Array>
        </Value.Composition>
      )

      expect(
        document.querySelectorAll(
          '.dnb-forms-value-block__composition--horizontal'
        )
      ).toHaveLength(1)
      expect(
        document.querySelectorAll(
          '.dnb-forms-value-block__content > .dnb-forms-value-block'
        )
      ).toHaveLength(2)

      expect(
        document.querySelector(
          '.dnb-forms-value-block__content > .dnb-forms-value-block > .dnb-forms-value-block__label'
        )
      ).toHaveTextContent('Label 1')
      expect(
        document.querySelector(
          '.dnb-forms-value-block__content > .dnb-forms-value-block > .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('value 1')
      expect(
        document.querySelector(
          '.dnb-forms-value-block__content > .dnb-forms-value-block:last-child > .dnb-forms-value-block__label'
        )
      ).toHaveTextContent('Label 2')
      expect(
        document.querySelector(
          '.dnb-forms-value-block__content > .dnb-forms-value-block:last-child > .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('value 2')
    })

    it('renders label given as a ValueBlock', () => {
      render(
        <Value.Composition>
          <Iterate.Array
            defaultValue={[
              {
                label: 'Label A',
                value: 'value 1',
              },
              {
                label: 'Label B',
                value: 'value 2',
              },
            ]}
          >
            <Value.String
              label={<Value.String itemPath="/label" />}
              itemPath="/value"
            />
          </Iterate.Array>
        </Value.Composition>
      )

      expect(
        document.querySelectorAll(
          '.dnb-forms-value-block__composition--horizontal'
        )
      ).toHaveLength(1)
      expect(
        document.querySelectorAll(
          '.dnb-forms-value-block__content > .dnb-forms-value-block'
        )
      ).toHaveLength(2)

      expect(
        document.querySelector(
          '.dnb-forms-value-block__content > .dnb-forms-value-block > .dnb-forms-value-block__label'
        )
      ).toHaveTextContent('Label A')
      expect(
        document.querySelector(
          '.dnb-forms-value-block__content > .dnb-forms-value-block > .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('value 1')
      expect(
        document.querySelector(
          '.dnb-forms-value-block__content > .dnb-forms-value-block:last-child > .dnb-forms-value-block__label'
        )
      ).toHaveTextContent('Label B')
      expect(
        document.querySelector(
          '.dnb-forms-value-block__content > .dnb-forms-value-block:last-child > .dnb-forms-value-block__content'
        )
      ).toHaveTextContent('value 2')
    })

    describe('with Visibility', () => {
      describe('with animate true', () => {
        it('should render HeightAnimation inside dt and dd', () => {
          render(
            <Value.SummaryList>
              <Value.String label="Label" value="First value" />

              <Form.Visibility pathUndefined="/undefined" animate>
                <Value.String label="Label" value="Second value" />
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

        it('should render HeightAnimation with a "span" element inside dt and dd', async () => {
          const result = render(
            <Value.SummaryList>
              <Value.String label="Label" value="First value" />

              <Form.Visibility pathUndefined="/undefined" animate>
                <Value.String label="Label" value="Second value" />
              </Form.Visibility>
            </Value.SummaryList>
          )

          const element = document.querySelector('.dnb-forms-summary-list')

          const thirdChild = element.children[2]
          const fourthChild = element.children[3]

          expect(
            thirdChild.querySelector('.dnb-height-animation').tagName
          ).toBe('SPAN')
          expect(
            fourthChild.querySelector('.dnb-height-animation').tagName
          ).toBe('SPAN')

          expect(await axeComponent(result)).toHaveNoViolations()
        })
      })

      describe('with keepInDOM true', () => {
        it('should render span inside dt and dd', async () => {
          const result = render(
            <Value.SummaryList>
              <Value.String label="Label" value="First value" />

              <Form.Visibility pathUndefined="/undefined" keepInDOM>
                <Value.String label="Label" value="Second value" />
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

          expect(
            thirdChild.querySelector('.dnb-forms-visibility').tagName
          ).toBe('SPAN')
          expect(
            fourthChild.querySelector('.dnb-forms-visibility').tagName
          ).toBe('SPAN')

          expect(element.tagName).toBe('DL')
          expect(firstChild.tagName).toBe('DT')
          expect(secondChild.tagName).toBe('DD')
          expect(thirdChild.tagName).toBe('DT')
          expect(fourthChild.tagName).toBe('DD')

          expect(await axeComponent(result)).toHaveNoViolations()
        })
      })
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

    it('should not transform a label when label is given as a ValueBlock', () => {
      const transformLabel = jest.fn((label) => label.toUpperCase())
      render(
        <Form.Handler data={{ label: 'The label' }}>
          <Value.String
            label={<Value.String path="/label" />}
            transformLabel={transformLabel}
            showEmpty
          />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-value-block')
      ).toHaveTextContent('The label')
    })
  })

  it('should allow a label to be served from a ValueBlock', () => {
    render(
      <Form.Handler data={{ label: 'The label' }}>
        <Value.String label={<Value.String path="/label" />} showEmpty />
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-forms-value-block')
    ).toHaveTextContent('The label')
  })

  describe('inheritLabel', () => {
    it('renders label from field with same path', () => {
      render(
        <Form.Handler
          data={{
            myPath: 'A value',
          }}
        >
          <Field.String path="/myPath" label="The label" />
          <Value.String path="/myPath" inheritLabel />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('The label')
    })

    it('renders label from field with same path given as a ValueBlock', () => {
      render(
        <Form.Handler data={{ label: 'The label' }}>
          <Field.String
            path="/myPath"
            label={<Value.String path="/label" />}
          />
          <Value.String path="/myPath" inheritLabel />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('The label')
    })
  })

  describe('help', () => {
    it('should render content when open is true', async () => {
      render(
        <ValueBlock
          label="Label"
          help={{
            open: true,
            title: 'Help title',
            content: '\nHelp content',
          }}
        >
          Value
        </ValueBlock>
      )

      const element = document.querySelector('.dnb-help-button__content')
      expect(element).toBeInTheDocument()
      expect(element.textContent).toBe('Help title\nHelp content')
    })

    it('should render content with a span element', async () => {
      const result = render(
        <ValueBlock
          label="Label"
          help={{
            open: true,
            title: 'Help title',
            content: '\nHelp content',
          }}
        >
          Value
        </ValueBlock>
      )

      const element = document.querySelector('.dnb-help-button__content')
      expect(element.tagName).toBe('SPAN')

      await axeComponent(result)
    })

    it('should open on click', async () => {
      render(
        <ValueBlock
          label="Label"
          help={{
            title: 'Help title',
            content: '\nHelp content',
          }}
        >
          Value
        </ValueBlock>
      )

      fireEvent.click(document.querySelector('button'))

      const element = document.querySelector('.dnb-help-button__content')
      expect(element).toBeInTheDocument()
      expect(
        document.querySelector('.dnb-help-button__content')
      ).toHaveTextContent('Help title Help content')
    })

    it('should close on click', async () => {
      render(
        <ValueBlock
          label="Label"
          help={{
            title: 'Help title',
            content: '\nHelp content',
          }}
        >
          Value
        </ValueBlock>
      )

      fireEvent.click(document.querySelector('button'))

      {
        const element = document.querySelector('.dnb-help-button__content')
        expect(element).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-help-button__content')
        ).toHaveTextContent('Help title Help content')
      }

      fireEvent.click(document.querySelector('button'))

      const element = document.querySelector('.dnb-help-button__content')
      expect(element).not.toBeInTheDocument()
    })

    it('should have correct id', async () => {
      render(
        <ValueBlock
          id="unique"
          label="Label"
          help={{
            open: true,
            title: 'Help title',
            content: '\nHelp content',
          }}
        >
          Value
        </ValueBlock>
      )

      {
        const element = document.querySelector('.dnb-help-button__content')
        expect(element).toBeInTheDocument()
        expect(document.querySelector('button').getAttribute('id')).toBe(
          'unique-help'
        )
      }
      {
        const element = document.querySelector('.dnb-help-button__content')
        expect(element).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-section').getAttribute('id')
        ).toBe('unique-help-content')
      }
    })

    it('should have aria-controls', async () => {
      render(
        <ValueBlock
          id="unique"
          label="Label"
          help={{
            open: true,
            title: 'Help title',
            content: '\nHelp content',
          }}
        >
          Value
        </ValueBlock>
      )

      const element = document.querySelector('.dnb-help-button__content')
      expect(element).toBeInTheDocument()
      expect(
        document.querySelector('button').getAttribute('aria-controls')
      ).toBe('unique-help-content')
    })

    describe('title', () => {
      it('should render correctly', async () => {
        render(
          <ValueBlock
            label="Label"
            help={{
              title: 'Help title',
            }}
          >
            Value
          </ValueBlock>
        )

        await userEvent.click(document.querySelector('button'))

        const element = document.querySelector('.dnb-section')
        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe('Help title')
      })

      it('should render correctly with content', async () => {
        render(
          <ValueBlock
            label="Label"
            help={{
              title: 'Help title',
              content: '\nHelp content',
            }}
          >
            Value
          </ValueBlock>
        )

        await userEvent.click(document.querySelector('button'))

        const element = document.querySelector('.dnb-help-button__content')
        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe('Help title\nHelp content')
      })
    })

    describe('content', () => {
      it('should render correctly', async () => {
        render(
          <ValueBlock
            label="Label"
            help={{
              content: 'Help content',
            }}
          >
            Value
          </ValueBlock>
        )

        await userEvent.click(document.querySelector('button'))

        const element = document.querySelector('.dnb-help-button__content')
        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe('Help content')
      })
    })
  })
})
