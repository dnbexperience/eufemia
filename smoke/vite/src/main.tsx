// Smoke test: exercises the packed @dnb/eufemia artifact from a Vite consumer —
// named exports from the main entry, the forms extension subpath, a subpath
// type import, and CSS imports.
import { createRoot } from 'react-dom/client'
import { Button, P } from '@dnb/eufemia'
import { Form, Field } from '@dnb/eufemia/extensions/forms'
import type { ButtonProps } from '@dnb/eufemia/components/Button'
import '@dnb/eufemia/style/dnb-ui-basis.min.css'
import '@dnb/eufemia/style/dnb-ui-core.min.css'
// Regression guard for issue #8951 (fixed in #8952): the components bundle once
// referenced flag SVGs via an out-of-package url(../../../assets/…) path that
// broke webpack/Next.js consumer builds. Importing the most commonly consumed
// CSS bundle here keeps that path covered against a bundling regression.
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
