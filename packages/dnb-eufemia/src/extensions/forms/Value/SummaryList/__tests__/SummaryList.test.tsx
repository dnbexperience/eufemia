import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryList from '../SummaryList'
import { Field, Form, Value } from '../../..'
import { axeComponent } from '../../../../../core/jest/jestSetup'

describe('Value.SummaryList', () => {
  it('should forward HTML attributes', () => {
    render(<SummaryList aria-label="Aria Label">Aria Summary</SummaryList>)

    const element = document.querySelector('.dnb-forms-summary-list')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should have dnb-sr-only class when no label is given', () => {
    render(
      <SummaryList>
        <Value.String value="Value" />
      </SummaryList>
    )
    expect(document.querySelector('dt')).toHaveClass('dnb-sr-only')
  })

  it('should set dnb-sr-only class when labelSrOnly is true', () => {
    render(
      <Value.SummaryList>
        <Value.String label="Label" labelSrOnly showEmpty />
      </Value.SummaryList>
    )

    const element = document.querySelector('dt')
    expect(element).toHaveClass('dnb-sr-only')
    expect(element).toHaveTextContent('Label')
  })

  it('should warn when child is not a Value.* component', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    render(
      <SummaryList>
        <Form.SubHeading>Heading</Form.SubHeading>
        <Value.String label="Label" value="Value" />
      </SummaryList>
    )

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.stringContaining(
        'Value.SummaryList accepts only Value.* components!'
      ),
      expect.any(Object)
    )

    log.mockRestore()
  })

  it('should warn when child is not a Value.* component and is inside a Fragment', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    render(
      <SummaryList>
        <>
          <Form.SubHeading>Heading</Form.SubHeading>
          <Value.String label="Label" value="Value" />
        </>
      </SummaryList>
    )

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenLastCalledWith(
      expect.any(String),
      expect.stringContaining(
        'Value.SummaryList accepts only Value.* components!'
      ),
      expect.any(Object)
    )

    log.mockRestore()
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

  describe('inheritVisibility', () => {
    it('renders value when visibility of field is initially true', async () => {
      render(
        <Form.Handler>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible">
            <Field.String path="/foo" defaultValue="Foo" />
            <Field.String path="/bar" defaultValue="Bar" />
          </Form.Visibility>

          <Value.SummaryList inheritVisibility>
            <Value.String path="/foo" />
            <Value.String path="/bar" />
          </Value.SummaryList>
        </Form.Handler>
      )

      expect(document.querySelectorAll('dd')).toHaveLength(2)
      expect(document.querySelectorAll('input')).toHaveLength(2)

      const [valueFoo, valueBar] = Array.from(
        document.querySelectorAll('dd')
      )

      expect(valueFoo).toHaveTextContent('Foo')
      expect(valueBar).toHaveTextContent('Bar')

      const button = document.querySelector('.dnb-toggle-button__button')
      await userEvent.click(button)

      await waitFor(() => {
        expect(document.querySelectorAll('input')).toHaveLength(0)
        expect(document.querySelectorAll('dd')).toHaveLength(0)
      })
    })
  })

  describe('inheritLabel', () => {
    it('renders labels', async () => {
      render(
        <Form.Handler>
          <Field.String path="/foo" defaultValue="foo" label="foo label" />
          <Field.String path="/bar" defaultValue="bar" label="bar label" />

          <Value.SummaryList inheritLabel>
            <Value.String path="/foo" />
            <Value.String path="/bar" />
          </Value.SummaryList>
        </Form.Handler>
      )

      const [labelFoo, labelBar] = Array.from(
        document.querySelectorAll('dt')
      )

      expect(labelFoo).toHaveTextContent('foo label')
      expect(labelBar).toHaveTextContent('bar label')
    })
  })

  describe('transformLabel', () => {
    it('renders labels', async () => {
      render(
        <Form.Handler>
          <Field.String path="/foo" defaultValue="foo" label="foo label" />
          <Field.String path="/bar" defaultValue="bar" label="bar label" />

          <Value.SummaryList
            inheritLabel
            transformLabel={(label: string) => label.toUpperCase()}
          >
            <Value.String path="/foo" />
            <Value.String path="/bar" />
          </Value.SummaryList>
        </Form.Handler>
      )

      const [labelFoo, labelBar] = Array.from(
        document.querySelectorAll('dt')
      )

      expect(labelFoo).toHaveTextContent('FOO LABEL')
      expect(labelBar).toHaveTextContent('BAR LABEL')
    })
  })

  describe('with Visibility', () => {
    it('should preserve the semantic structure of the dl element', async () => {
      render(
        <Form.Handler>
          <Field.Boolean
            label="Make second field visible when toggled"
            path="/toggleValue"
            variant="checkbox"
          />

          <Value.SummaryList>
            <Value.String label="Label" value="First field" />

            <Form.Visibility pathTrue="/toggleValue" animate>
              <Value.String label="Label" value="Second field" />
            </Form.Visibility>
          </Value.SummaryList>
        </Form.Handler>
      )

      const checkbox = document.querySelector('input')
      const element = document.querySelector('.dnb-forms-summary-list')

      const firstChild = element.children[0]
      const secondChild = element.children[1]
      const thirdChild = element.children[2]
      const fourthChild = element.children[3]

      expect(element.tagName).toBe('DL')

      expect(firstChild.textContent).toBe('Label')
      expect(secondChild.textContent).toBe('First field')
      expect(thirdChild.textContent).toBe('')
      expect(fourthChild.textContent).toBe('')

      expect(firstChild.tagName).toBe('DT')
      expect(secondChild.tagName).toBe('DD')
      expect(thirdChild.tagName).toBe('DT')
      expect(fourthChild.tagName).toBe('DD')

      await userEvent.click(checkbox)

      expect(firstChild.textContent).toBe('Label')
      expect(secondChild.textContent).toBe('First field')
      expect(thirdChild.textContent).toBe('Label')
      expect(fourthChild.textContent).toBe('Second field')

      expect(firstChild.tagName).toBe('DT')
      expect(secondChild.tagName).toBe('DD')
      expect(thirdChild.tagName).toBe('DT')
      expect(fourthChild.tagName).toBe('DD')

      expect(await axeComponent(element)).toHaveNoViolations()

      await userEvent.click(checkbox)

      expect(firstChild.textContent).toBe('Label')
      expect(secondChild.textContent).toBe('First field')

      await waitFor(() => {
        expect(thirdChild.textContent).toBe('')
        expect(fourthChild.textContent).toBe('')
      })
    })
  })

  describe('help', () => {
    it('should render', async () => {
      render(
        <Value.SummaryList>
          <Value.String
            label="Label"
            value="Value"
            help={{
              title: 'Help title',
              content: 'Help content',
            }}
          />
        </Value.SummaryList>
      )

      await userEvent.click(
        document.querySelector('.dnb-help-button__inline')
      )

      const element = document.querySelector('.dnb-forms-summary-list')
      const help = element.querySelector('.dnb-help-button__content')

      expect(help).toHaveTextContent('Help title')
      expect(help).toHaveTextContent('Help content')
    })

    it('should render without label', async () => {
      render(
        <Value.SummaryList>
          <Value.String
            value="Value"
            help={{
              title: 'Help title',
              content: 'Help content',
            }}
          />
        </Value.SummaryList>
      )

      await userEvent.click(
        document.querySelector('.dnb-help-button__inline')
      )

      const element = document.querySelector('.dnb-forms-summary-list')
      const help = element.querySelector('.dnb-help-button__content')

      expect(help).toHaveTextContent('Help title')
      expect(help).toHaveTextContent('Help content')
    })

    it('should render inside Value.Composition', async () => {
      render(
        <Value.SummaryList>
          <Value.Composition>
            <Value.String
              value="Value"
              help={{
                title: 'Help title',
                content: 'Help content',
              }}
            />
          </Value.Composition>
        </Value.SummaryList>
      )

      await userEvent.click(
        document.querySelector('.dnb-help-button__inline')
      )

      const element = document.querySelector('.dnb-forms-summary-list')
      const help = element.querySelector('.dnb-help-button__content')

      expect(help).toHaveTextContent('Help title')
      expect(help).toHaveTextContent('Help content')
    })
  })
})
