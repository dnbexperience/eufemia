// @vitest-environment node

import type { ComponentType } from 'react'
import { renderToString } from 'react-dom/server'
import SharedProvider from '../../../../shared/Provider'
import { createSharedState } from '../../../../shared/helpers/useSharedState'
import FieldBlock from '../FieldBlock'
import { Form, Field, FormError } from '../../'
import { useFieldProps } from '../../hooks'
import type { FieldProps } from '../../types'

describe('FieldBlock SSR', () => {
  it.each([
    [
      'String',
      () => (
        <Field.String label="Standalone label" info="Standalone info" />
      ),
    ],
    [
      'Number',
      () => (
        <Field.Number label="Standalone label" info="Standalone info" />
      ),
    ],
    [
      'Date',
      () => <Field.Date label="Standalone label" info="Standalone info" />,
    ],
    [
      'Time',
      () => <Field.Time label="Standalone label" info="Standalone info" />,
    ],
    [
      'Expiry',
      () => (
        <Field.Expiry label="Standalone label" info="Standalone info" />
      ),
    ],
    [
      'Toggle',
      () => (
        <Field.Toggle
          label="Standalone label"
          info="Standalone info"
          valueOn={true}
          valueOff={false}
        />
      ),
    ],
    [
      'Selection',
      () => (
        <Field.Selection label="Standalone label" info="Standalone info" />
      ),
    ],
    [
      'ArraySelection',
      () => (
        <Field.ArraySelection
          label="Standalone label"
          info="Standalone info"
        />
      ),
    ],
    [
      'SelectCountry',
      () => (
        <Field.SelectCountry
          label="Standalone label"
          info="Standalone info"
        />
      ),
    ],
    [
      'SelectCurrency',
      () => (
        <Field.SelectCurrency
          label="Standalone label"
          info="Standalone info"
        />
      ),
    ],
    [
      'Slider',
      () => (
        <Field.Slider label="Standalone label" info="Standalone info" />
      ),
    ],
    [
      'MultiSelection',
      () => (
        <Field.MultiSelection
          label="Standalone label"
          info="Standalone info"
        />
      ),
    ],
    [
      'Upload',
      () => (
        <Field.Upload label="Standalone label" info="Standalone info" />
      ),
    ],
    [
      'DateOfBirth',
      () => (
        <Field.DateOfBirth
          label="Standalone label"
          info="Standalone info"
        />
      ),
    ],
    [
      'PhoneNumber',
      () => (
        <Field.PhoneNumber
          label="Standalone label"
          info="Standalone info"
        />
      ),
    ],
  ] as const)(
    'should preserve standalone %s labels and messages',
    (_, renderField) => {
      const html = renderToString(renderField())
      expect(html).toContain('Standalone label')
      expect(html).toContain('Standalone info')
    }
  )

  it('should not expose props from an interrupted field in a later render', () => {
    function Interrupted(): never {
      useFieldProps({ id: 'interrupted-field', info: 'Private message' })
      throw new Error('Interrupted render')
    }
    expect(() => renderToString(<Interrupted />)).toThrow(
      'Interrupted render'
    )

    const html = renderToString(
      <FieldBlock id="interrupted-field">Other request</FieldBlock>
    )
    expect(html).not.toContain('Private message')
  })

  it('should not leak field messages to a later server render inside Form.Handler', () => {
    renderToString(
      <Form.Handler>
        <Field.String id="ssr-email" info="Message for user A" />
      </Form.Handler>
    )

    const html = renderToString(
      <Form.Handler>
        <FieldBlock id="ssr-email" label="B">
          content
        </FieldBlock>
      </Form.Handler>
    )

    expect(html).not.toContain('Message for user A')
  })

  it('should not leak field messages to a later server render without Form.Handler', () => {
    renderToString(
      <Field.String id="ssr-email-standalone" info="Message for user A" />
    )

    const html = renderToString(
      <FieldBlock id="ssr-email-standalone" label="B">
        content
      </FieldBlock>
    )

    expect(html).not.toContain('Message for user A')
  })

  it('should not write the props of a standalone field to the process-wide store', () => {
    renderToString(
      <Field.String
        id="ssr-handoff-standalone"
        label="Label"
        info="Info text"
      />
    )

    expect(
      createSharedState('field-block-props-ssr-handoff-standalone').get()
    ).toBeUndefined()
  })

  it('should render the label and messages of a field', () => {
    const html = renderToString(
      <>
        <Field.String label="Standalone label" info="Standalone info" />
        <Form.Handler>
          <Field.String label="Handler label" info="Handler info" />
        </Form.Handler>
      </>
    )

    expect(html).toContain('Standalone label')
    expect(html).toContain('Standalone info')
    expect(html).toContain('Handler label')
    expect(html).toContain('Handler info')
  })

  it('should render a FormError given via error translated, in every server render', () => {
    // Shared between requests, like a module-level constant
    const error = new FormError('Field.errorRequired')
    const renderPage = (locale: 'nb-NO' | 'en-GB') =>
      renderToString(
        <SharedProvider locale={locale}>
          <FieldBlock>
            <Field.String error={error} />
          </FieldBlock>
        </SharedProvider>
      )

    const nbHtml = renderPage('nb-NO')
    const enHtml = renderPage('en-GB')

    expect(nbHtml).toContain('Dette feltet må fylles ut.')
    expect(enHtml).toContain('This field is required.')
    expect(enHtml).not.toContain('Dette feltet må fylles ut.')
    expect(nbHtml + enHtml).not.toContain('Field.errorRequired')
    expect(error.message).toBe('Field.errorRequired')
  })

  it('should render the label of a field when a Provider is between the field and its FieldBlock', () => {
    const MyField = (props: FieldProps<string>) => {
      const { id, fieldBlockProps } = useFieldProps(props)

      return (
        <SharedProvider>
          <FieldBlock {...fieldBlockProps} forId={id}>
            content
          </FieldBlock>
        </SharedProvider>
      )
    }

    const html = renderToString(
      <MyField label="Custom label" info="Custom info" />
    )

    expect(html).toContain('Custom label')
    expect(html).toContain('Custom info')
  })

  // A field that renders FieldBlock itself must pass the fieldBlockProps from
  // useFieldProps, or its label and messages are lost on the server.
  // This covers every Field export, so a new field is checked without a list.
  const notFields = ['Provider', 'Option']
  const fields = Object.keys(Field).filter(
    (name) => !notFields.includes(name)
  )

  it('should cover every Field export except the ones that are not fields', () => {
    expect(fields.length).toBeGreaterThan(20)
    for (const name of notFields) {
      expect(Object.keys(Field)).toContain(name)
    }
  })

  it.each(fields)(
    'should render the label and info of a standalone Field.%s',
    (name) => {
      const Component = Field[name as keyof typeof Field] as ComponentType<
        FieldProps & { label?: string; info?: string }
      >
      const html = renderToString(
        <Component label="Standalone label" info="Standalone info" />
      )

      expect(html).toContain('Standalone label')
      expect(html).toContain('Standalone info')
    }
  )
})
