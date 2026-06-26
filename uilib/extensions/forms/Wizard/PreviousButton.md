---
title: 'Wizard.PreviousButton'
description: '`Wizard.PreviousButton` connects to the `Wizard.Context` to move the user to the previous step when clicked.'
version: 11.8.0
generatedAt: 2026-06-26T12:38:10.429Z
checksum: 2e434d6a3ef2aff33a13928ac7ca26f09a3676a13b2f369d62e72e749e4e5bec
---

# Wizard.PreviousButton

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.PreviousButton />)
```

## Description

`Wizard.PreviousButton` connects to `Wizard.Context` to move the user to the previous step when clicked.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/PreviousButton)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/PreviousButton)

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
render(<Wizard.Provider value={{
  activeIndex: 5,
  handlePrevious: () => console.log('handlePrevious'),
  handleNext: () => null,
  setActiveIndex: () => null,
  setFormError: () => null
}}>
      <ComponentBox>
        <Wizard.PreviousButton />
      </ComponentBox>
    </Wizard.Provider>)
```

## Properties


```json
{
  "props": {
    "variant": {
      "doc": "Defines the kind of button. Defaults to `tertiary`.",
      "type": [
        "\"primary\"",
        "\"secondary\"",
        "\"tertiary\"",
        "\"unstyled\""
      ],
      "status": "optional"
    },
    "icon": {
      "doc": "The icon shown in the button. Defaults to `chevron_left`.",
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "iconPosition": {
      "doc": "Position of the icon inside the button. Defaults to `left`.",
      "type": [
        "\"left\"",
        "\"right\"",
        "\"top\""
      ],
      "status": "optional"
    },
    "[Button](/uilib/components/button/properties)": {
      "doc": "All button properties.",
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
    "WizardPreviousButton.text": {
      "nb-NO": "Tilbake",
      "en-GB": "Back",
      "sv-SE": "Tillbaka",
      "da-DK": "Tilbage"
    }
  }
}
```
