---
title: 'Form.clearData'
description: '`Form.clearData` lets you clear the data of a form.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.409Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Form.clearData

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
