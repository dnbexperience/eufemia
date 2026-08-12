'use client'

// Smoke test: exercises the packed @dnb/eufemia artifact from a Next.js consumer —
// named exports from the main entry, the forms extension subpath, and a subpath
// type import.
import { Button, P } from '@dnb/eufemia'
import { Form, Field } from '@dnb/eufemia/extensions/forms'
import type { ButtonProps } from '@dnb/eufemia/components/Button'

const buttonProps: ButtonProps = { text: 'It builds' }

export default function Page() {
  return (
    <Form.Handler>
      <P>Eufemia packed-artifact smoke test</P>
      <Button {...buttonProps} />
      <Field.String label="Label" path="/myField" />
      <Form.SubmitButton text="It builds" />
    </Form.Handler>
  )
}
