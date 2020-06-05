---
showTabs: true
---

import TabsExamples from 'Pages/uilib/components/tabs/Examples'

## Demos

<TabsExamples />

## Example Content

```jsx
const exampleContent = {
  first: () => <h2 className="dnb-h--large">First</h2>,
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
