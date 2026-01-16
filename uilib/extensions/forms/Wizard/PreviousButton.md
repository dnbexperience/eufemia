---
title: 'PreviousButton'
description: '`Wizard.PreviousButton` connects to the `Wizard.Context` to move the user to the previous step when clicked.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Wizard/PreviousButton/metadata.json
---

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.PreviousButton />)
```

## Description

`Wizard.PreviousButton` connects to `Wizard.Context` to move the user to the previous step when clicked.

**Note:** This button is used in [Wizard.Buttons](/uilib/extensions/forms/Wizard/Buttons/), which is easier to integrate into most wizards.

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">previous step</Wizard.Step>
      <Wizard.Step title="Step 2">
        <Wizard.PreviousButton />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>,
)
```

## Demos

```tsx
render(
  <Wizard.Provider
    value={{
      activeIndex: 5,
      handlePrevious: () => console.log('handlePrevious'),
      handleNext: () => null,
      setActiveIndex: () => null,
      setFormError: () => null,
    }}
  >
    <ComponentBox>
      <Wizard.PreviousButton />
    </ComponentBox>
  </Wizard.Provider>,
)
```
