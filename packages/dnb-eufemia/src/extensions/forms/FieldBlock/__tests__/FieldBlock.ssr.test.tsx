// @vitest-environment node

import { renderToString } from 'react-dom/server'
import SharedProvider from '../../../../shared/Provider'
import FieldBlock from '../FieldBlock'
import { Form, Field } from '../../'
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
})
