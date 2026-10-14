// @vitest-environment node

import { renderToString } from 'react-dom/server'
import FieldBlock from '../FieldBlock'
import { Form, Field } from '../../'

describe('FieldBlock SSR', () => {
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
})
