import { useEffect } from 'react'
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference
const initialData = { foo: 'bar' }

function MyForm() {
  return (
    <Form.Handler id={myFormId} data={initialData}>
      <Field.String path="/foo" />
    </Form.Handler>
  )
}

function ComponentA() {
  Form.useData(myFormId, { foo: 'bar' })
}

function ComponentB() {
  const { set } = Form.useData(myFormId)

  useEffect(() => {
    set({ foo: 'bar' })
  }, [])
}
