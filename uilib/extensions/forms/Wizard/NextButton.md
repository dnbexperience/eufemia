---
title: 'Wizard.NextButton'
description: '`Wizard.NextButton` connects to the `Wizard.Context` to move the user to the next step when clicked.'
version: 11.8.1
generatedAt: 2026-06-29T11:30:04.337Z
checksum: 0143c11d6196b5cb2a7cfa42877ced738da7ef47c26b37790689ff998a6dd50a
---

# Wizard.NextButton

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.NextButton />)
```

## Description

`Wizard.NextButton` connects to `Wizard.Context` to move the user to the next step when clicked.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/NextButton)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/NextButton)

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
render(<Wizard.Provider value={{
  activeIndex: 0,
  handlePrevious: () => null,
  handleNext: () => console.log('handleNext'),
  setActiveIndex: () => null,
  setFormError: () => null
}}>
      <ComponentBox>
        <Wizard.NextButton />
      </ComponentBox>
    </Wizard.Provider>)
```

## Properties


```json
{
  "props": {
    "icon": {
      "doc": "The icon shown in the button. Defaults to `chevron_right`.",
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "iconPosition": {
      "doc": "Position of the icon inside the button. Defaults to `right`.",
      "type": [
        "\"left\"",
        "\"right\"",
        "\"top\""
      ],
      "status": "optional"
    },
    "[Button](/uilib/components/button/properties)": {
      "doc": "All button properties, except `variant`.",
      "type": "Various",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
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
