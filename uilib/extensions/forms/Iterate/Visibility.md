---
title: 'Visibility'
description: 'The `Iterate.Visibility` component allows you to conditionally display content based on relative paths (`itemPath`) within an `Iterate.Array` component.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Iterate/Visibility/metadata.json
---

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Visibility />)
```

## Description

The `Iterate.Visibility` component allows you to conditionally display content based on relative paths (`itemPath`) within an [Iterate.Array](/uilib/extensions/forms/Iterate/Array/) component.

Fore more details, head over to the [Form.Visibility](/uilib/extensions/forms/Form/Visibility/) component documentation.

## Demos

### Basic example

```tsx
render(
  <Form.Handler
    defaultData={{
      myList: [
        {
          toggleValue: false,
        },
        {
          toggleValue: true,
        },
      ],
    }}
  >
    <Iterate.Array path="/myList">
      <Field.Boolean
        label="Show content for item no. {itemNo}"
        variant="checkbox"
        itemPath="/toggleValue"
      />
      <Iterate.Visibility pathTrue="/toggleValue" animate>
        <TestElement>
          <Iterate.ItemNo>
            {'Hide and show me item no. {itemNo}'}
          </Iterate.ItemNo>
        </TestElement>
      </Iterate.Visibility>
    </Iterate.Array>
  </Form.Handler>,
)
```
