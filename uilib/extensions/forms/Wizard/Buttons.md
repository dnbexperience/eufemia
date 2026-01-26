---
title: 'Wizard.Buttons'
description: '`Wizard.Buttons` is a combination of PreviousButton and NextButton for navigating between steps/pages.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.235Z
checksum: 4ea56087d0680bf07da056cf40e953588811b3ff8876526853e7bcc84fb35e61
---

# Wizard.Buttons

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.Buttons />)
```

## Description

`Wizard.Buttons` is a combination of [Wizard.PreviousButton](/uilib/extensions/forms/Wizard/PreviousButton/) and [Wizard.NextButton](/uilib/extensions/forms/Wizard/NextButton/) for navigating between steps/pages.

Only the relevant button is shown, depending on the current step.

These two buttons are wrapped in a [Form.ButtonRow](/uilib/extensions/forms/Form/ButtonRow/) component.

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">
        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)
```

But you can still use [Form.ButtonRow](/uilib/extensions/forms/Form/ButtonRow/) to wrap a [Form.SubmitButton](/uilib/extensions/forms/Form/SubmitButton/) as well:

```jsx
import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">
        <Form.ButtonRow>
          <Wizard.Buttons />
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)
```

## Demos

```tsx
const Step = ({ title }) => {
  return (
    <Wizard.Step title={title}>
      <Form.Card>
        <P>Contents of {title}</P>
      </Form.Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
render(
  <Form.Handler>
    <Wizard.Container mode="loose">
      <Step title="Step 1" />
      <Step title="Step 2" />
      <Step title="Step 3" />
    </Wizard.Container>
  </Form.Handler>
)
```

## Properties

```json
{
  "[Form.ButtonRow](/uilib/extensions/forms/Form/ButtonRow/properties/)": {
    "doc": "ButtonRow properties.",
    "type": "Various",
    "status": "optional"
  }
}
```
