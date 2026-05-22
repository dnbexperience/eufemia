import { Form } from '@dnb/eufemia/extensions/forms'

type MyData = { firstName: string }

const MyComponent = () => {
  const { data } = Form.useData<MyData>()
  return data.firstName
}
