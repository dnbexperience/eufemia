---
title: 'Wizard.NextButton'
description: '`Wizard.NextButton` connects to the `Wizard.Context` to move the user to the next step when clicked.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.244Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Wizard.NextButton

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
  </Form.Handler>
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
  </Wizard.Provider>
)
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "WizardNextButton.text": {
      "nb-NO": "Neste",
      "en-GB": "Next",
      "sv-SE": "Nästa",
      "da-DK": "Næste"
    }
  }
}
```
