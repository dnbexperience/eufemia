import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const { getValue } = Form.useData()

  const value = getValue('/foo')
}
