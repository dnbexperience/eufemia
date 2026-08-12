// Smoke test: exercises the packed @dnb/eufemia artifact from a Vite consumer —
// named exports from the main entry, the forms extension subpath, a subpath
// type import, and CSS imports.
import { createRoot } from 'react-dom/client'
import { Button, P } from '@dnb/eufemia'
import { Form, Field } from '@dnb/eufemia/extensions/forms'
import type { ButtonProps } from '@dnb/eufemia/components/Button'
import '@dnb/eufemia/style/dnb-ui-basis.min.css'
import '@dnb/eufemia/style/dnb-ui-core.min.css'
// The components bundle references flag SVGs through an out-of-package
// url(../../../assets/…) path. When @dnb/eufemia is installed under node_modules
// that path resolves outside the package, so the referenced assets cannot be
// found. This import is intentionally kept to demonstrate the bug: it FAILS the
// Next.js consumer build (webpack) — see the sibling nextjs fixture — while Vite
// surfaces it as an unresolved-asset warning. The breakage is deliberate and
// documents exactly why #8951 must be fixed. Once #8951 is fixed, REBASE this
// PR — both consumer builds will then pass and this smoke test will permanently
// guard the most commonly consumed CSS bundle against bundling regressions.
import '@dnb/eufemia/style/dnb-ui-components.min.css'

const buttonProps: ButtonProps = { text: 'It builds' }

function App() {
  return (
    <Form.Handler>
      <P>Eufemia packed-artifact smoke test</P>
      <Button {...buttonProps} />
      <Field.String label="Label" path="/myField" />
      <Form.SubmitButton text="It builds" />
    </Form.Handler>
  )
}

const element = document.getElementById('root')
if (element) {
  createRoot(element).render(<App />)
}
