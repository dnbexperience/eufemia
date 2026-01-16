---
title: 'clearData'
description: '`Form.clearData` lets you clear the data of a form.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/clearData/metadata.json
---

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.clearData
```

## Description

The `Form.clearData` lets you clear the data of a form.

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function Component() {
  return <Form.Handler id={myFormId}>...</Form.Handler>
}

// You can call it later and even outside of the form
Form.clearData(myFormId)
```
