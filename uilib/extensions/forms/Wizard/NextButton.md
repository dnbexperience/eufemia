---
title: 'NextButton'
description: '`Wizard.NextButton` connects to the `Wizard.Context` to move the user to the next step when clicked.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Wizard/NextButton/metadata.json
---

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.NextButton />)
```

## Description

`Wizard.NextButton` connects to `Wizard.Context` to move the user to the next step when clicked.

**Note:** This button is used in [Wizard.Buttons](/uilib/extensions/forms/Wizard/Buttons/), which is easier to integrate into most wizards.

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">
        <Wizard.NextButton />
      </Wizard.Step>
      <Wizard.Step title="Step 2">next step</Wizard.Step>
    </Wizard.Container>
  </Form.Handler>,
)
```

## Demos

```tsx
render(
  <Wizard.Provider
    value={{
      activeIndex: 0,
      handlePrevious: () => null,
      handleNext: () => console.log('handleNext'),
      setActiveIndex: () => null,
      setFormError: () => null,
    }}
  >
    <ComponentBox>
      <Wizard.NextButton />
    </ComponentBox>
  </Wizard.Provider>,
)
```
