---
draft: true
---

import Examples from 'Pages/uilib/components/tabs/Examples'

## Description

Tabs are a set of buttons which allow navigation between content that is related and on the same level of hierarchy.

## Demos

<Examples />

## Example Content

```jsx
const exampleContent = {
  first: () => <h2 className="dnb-h2">First</h2>,
  second: () => <Input label="Label:">Focus me with next Tab key</Input>,
  third: () => (
    <>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  ),
  fourth: 'Fourth as a string only'
}
```
