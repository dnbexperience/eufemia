'use client'

// Hydration check: smoke/check-hydration.mjs loads this page in a browser and fails on any
// hydration mismatch, both with and without a session storage draft.
import { useEffect } from 'react'
import { Form, Field, Wizard } from '@dnb/eufemia/extensions/forms'

export default function Page() {
  useEffect(() => {
    Object.assign(window, { __smokeHydrated: true })
  }, [])

  return (
    <Form.Handler sessionStorageId="smoke-hydration">
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <Field.Boolean variant="buttons" path="/choice" label="Choice" />
          <Form.Visibility pathTrue="/choice">
            <Field.String path="/extra" label="Extra" />
          </Form.Visibility>
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <Field.String path="/name" label="Name" />
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
