---
title: 'Wizard.PreviousButton'
description: '`Wizard.PreviousButton` connects to the `Wizard.Context` to move the user to the previous step when clicked.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.247Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Wizard.PreviousButton

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
  </Form.Handler>
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
  </Wizard.Provider>
)
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "WizardPreviousButton.text": {
      "nb-NO": "Tilbake",
      "en-GB": "Back",
      "sv-SE": "Tillbaka",
      "da-DK": "Tilbage"
    }
  }
}
```
