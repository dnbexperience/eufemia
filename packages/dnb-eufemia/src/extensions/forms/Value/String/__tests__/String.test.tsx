import React from 'react'
import { screen, render } from '@testing-library/react'
import { Field, Form, Value, Wizard } from '../../..'
import userEvent from '@testing-library/user-event'

describe('Value.String', () => {
  it('renders value', () => {
    render(<Value.String value="test123" />)
    expect(screen.getByText('test123')).toBeInTheDocument()
  })

  it('renders value inside correct class', () => {
    render(<Value.String label="The label" value="test123" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('test123')
  })

  it('renders placeholder', () => {
    render(<Value.String placeholder="Enter something" />)
    expect(screen.getByText('Enter something')).toBeInTheDocument()
  })

  it('does not render label if value is empty and showEmpty is false', () => {
    render(<Value.String label="The label" />)
    expect(screen.queryByText('The label')).not.toBeInTheDocument()
  })

  it('renders no label when no value and showEmpty is not set', () => {
    render(<Value.String label="The label" />)
    expect(document.querySelector('.dnb-forms-value-string')).toBeNull()
  })

  it('renders label', () => {
    render(<Value.String label="The label" showEmpty />)
    expect(screen.getByText('The label')).toBeInTheDocument()
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

    it('should not use label from field with same path when label is false', () => {
      render(
        <Form.Handler
          data={{
            myPath: 'A value',
          }}
        >
          <Field.String path="/myPath" label="The label" />
          <Value.String path="/myPath" />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).not.toHaveTextContent('The label')
    })

    it('should render different label from field with same path', () => {
      render(
        <Form.Handler>
          <Field.String path="/myPath" label="A field" />
          <Value.String
            path="/myPath"
            label="A value"
            inheritLabel
            showEmpty
          />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('A field')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('A value')
    })

    it('renders label from field with same path inside a Section', () => {
      render(
        <Form.Handler
          data={{
            section: {
              myPath: 'A value',
            },
          }}
        >
          <Form.Section path="/section">
            <Field.String path="/myPath" label="The label" />
            <Value.String path="/myPath" inheritLabel />
          </Form.Section>
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('The label')
    })

    it('renders label from field with same path inside a Wizard', async () => {
      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step>
              <Field.String path="/myPath" label="The label" />
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step>
              <Value.String path="/myPath" inheritLabel showEmpty />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')

      await userEvent.click(
        document.querySelector('.dnb-forms-next-button')
      )

      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('The label')
    })
  })

  it('renders default class', () => {
    render(<Value.String label="The label" showEmpty />)
    expect(
      document.querySelector('.dnb-forms-value-string')
    ).toHaveTextContent('The label')
  })
})
