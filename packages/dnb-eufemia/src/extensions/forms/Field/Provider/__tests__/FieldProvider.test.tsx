import React from 'react'
import { render } from '@testing-library/react'
import FieldProviderContext from '../FieldProviderContext'
import { Form, Field } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Field.Provider', () => {
  it('should have constant of _supportsSpacingProps="children"', () => {
    expect(Field.Provider._supportsSpacingProps).toBe('children')
  })

  it('should merge inheritedContext with props passed to extend', () => {
    let collectedProps = null

    const Collector = (props) => {
      return (
        <FieldProviderContext.Consumer>
          {({ extend }) => {
            collectedProps = extend(props)
            return null
          }}
        </FieldProviderContext.Consumer>
      )
    }

    render(
      <Field.Provider disabled={true}>
        <Collector myProp="value" />
      </Field.Provider>
    )

    expect(collectedProps).toEqual({
      disabled: true,
      myProp: 'value',
    })
  })

  it('props passed to extend should override inheritedContext', () => {
    let collectedProps = null

    const Collector = (props) => {
      return (
        <FieldProviderContext.Consumer>
          {({ extend }) => {
            collectedProps = extend(props)
            return null
          }}
        </FieldProviderContext.Consumer>
      )
    }

    render(
      <Field.Provider disabled={true}>
        <Collector disabled={false} myProp="value" />
      </Field.Provider>
    )

    expect(collectedProps).toEqual({
      disabled: false,
      myProp: 'value',
    })
  })

  it('props passed to extend should override nested inheritedContext', () => {
    let collectedProps = null

    const Collector = (props) => {
      return (
        <FieldProviderContext.Consumer>
          {({ extend }) => {
            collectedProps = extend(props)
            return null
          }}
        </FieldProviderContext.Consumer>
      )
    }

    render(
      <Field.Provider disabled={true}>
        <Field.Provider disabled={false}>
          <Collector disabled={true} myProp="value" />
        </Field.Provider>
      </Field.Provider>
    )

    expect(collectedProps).toEqual({
      disabled: true,
      myProp: 'value',
    })
  })

  it('second provider should override nested inheritedContext', () => {
    let collectedProps = null

    const Collector = (props) => {
      return (
        <FieldProviderContext.Consumer>
          {({ extend }) => {
            collectedProps = extend(props)
            return null
          }}
        </FieldProviderContext.Consumer>
      )
    }

    render(
      <Field.Provider disabled={true}>
        <Field.Provider disabled={false}>
          <Collector myProp="value" />
        </Field.Provider>
      </Field.Provider>
    )

    expect(collectedProps).toEqual({
      disabled: false,
      myProp: 'value',
    })
  })

  describe('disable', () => {
    it('should disable the input and button', () => {
      render(
        <Field.Provider disabled={true}>
          <Field.String />
          <Form.SubmitButton />
        </Field.Provider>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      expect(input).toBeDisabled()
      expect(button).toBeDisabled()
    })

    it('should not disable the input when prop is set', () => {
      render(
        <Field.Provider disabled={true}>
          <Field.String disabled={false} />
          <Form.SubmitButton disabled={false} />
        </Field.Provider>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      expect(input).not.toBeDisabled()
      expect(button).not.toBeDisabled()
    })

    it('should handle the disabled prop from the Form.Handler', () => {
      const { rerender } = render(
        <Form.Handler disabled={true}>
          <Field.Provider>
            <Field.String />
            <Form.SubmitButton />
          </Field.Provider>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      expect(input).toBeDisabled()
      expect(button).toBeDisabled()

      rerender(
        <Form.Handler disabled={true}>
          <Field.Provider disabled={false}>
            <Field.String />
            <Form.SubmitButton />
          </Field.Provider>
        </Form.Handler>
      )

      expect(input).not.toBeDisabled()
      expect(button).not.toBeDisabled()

      rerender(
        <Form.Handler disabled={true}>
          <Field.Provider>
            <Field.String disabled={false} />
            <Form.SubmitButton disabled={false} />
          </Field.Provider>
        </Form.Handler>
      )

      expect(input).not.toBeDisabled()
      expect(button).not.toBeDisabled()
    })

    it('should handle nested FieldProps', () => {
      const { rerender } = render(
        <Field.Provider disabled={true}>
          <Field.Provider>
            <Field.String />
            <Form.SubmitButton />
          </Field.Provider>
        </Field.Provider>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      expect(input).toBeDisabled()
      expect(button).toBeDisabled()

      rerender(
        <Field.Provider disabled={true}>
          <Field.Provider disabled={false}>
            <Field.String />
            <Form.SubmitButton />
          </Field.Provider>
        </Field.Provider>
      )

      expect(input).not.toBeDisabled()
      expect(button).not.toBeDisabled()

      rerender(
        <Field.Provider disabled={true}>
          <Field.Provider>
            <Field.String disabled={false} />
            <Form.SubmitButton disabled={false} />
          </Field.Provider>
        </Field.Provider>
      )

      expect(input).not.toBeDisabled()
      expect(button).not.toBeDisabled()
    })

    it('should support data-* attributes in fields', () => {
      render(
        <Field.Provider data-exclude-field>
          <Field.String />
          <Form.SubmitButton />
        </Field.Provider>
      )

      const input = document.querySelector('input')
      const button = document.querySelector('button')

      expect(input).toHaveAttribute('data-exclude-field')
      expect(button).not.toHaveAttribute('data-exclude-field')
    })
  })

  describe('require', () => {
    it('should require the input and button', () => {
      render(
        <Field.Provider required={true}>
          <Field.String validateInitially />
        </Field.Provider>
      )

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )
    })

    it('should not require the input when prop is set', () => {
      render(
        <Field.Provider required={true}>
          <Field.String validateInitially required={false} />
        </Field.Provider>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('should handle the required prop from the Form.Handler', () => {
      const { rerender } = render(
        <Form.Handler required={true}>
          <Field.Provider>
            <Field.String validateInitially />
          </Field.Provider>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()

      rerender(
        <Form.Handler required={true}>
          <Field.Provider required={false}>
            <Field.String validateInitially />
          </Field.Provider>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      rerender(
        <Form.Handler required={true}>
          <Field.Provider>
            <Field.String validateInitially required={false} />
          </Field.Provider>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })
  })
})
