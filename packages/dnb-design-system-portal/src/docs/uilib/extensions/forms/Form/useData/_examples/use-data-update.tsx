import React from 'react'
import { Form } from '@dnb/eufemia/extensions/forms'

function Component() {
  const { update } = Form.useData()

  React.useEffect(() => {
    update('/foo', 'new value')

    // - or with a callback function to get the existing value
    update('/foo', (existingValue) => existingValue + 'new value')
  }, [])
}
