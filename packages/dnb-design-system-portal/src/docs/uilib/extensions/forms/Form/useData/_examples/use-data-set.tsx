import React from 'react'
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const { data, set } = Form.useData(myFormId)

  React.useEffect(() => {
    set({ foo: 'bar' })
  }, [])

  return (
    <Form.Handler id={myFormId}>
      <Field.String path="/foo" />
    </Form.Handler>
  )
}
