import { Form, Field } from '@dnb/eufemia/extensions/forms'

const filterDataHandler = ({ path, value, data, props, error }) => {
  if (props['data-exclude-field']) {
    return false
  }
}

const myFormId = 'unique-id' // or a function, object or React Context reference

const MyForm = () => {
  const { filterData } = Form.useData(myFormId)
  const filteredData = filterData(filterDataHandler)

  return (
    <Form.Handler id={myFormId}>
      <Field.String path="/foo" data-exclude-field />
    </Form.Handler>
  )
}
