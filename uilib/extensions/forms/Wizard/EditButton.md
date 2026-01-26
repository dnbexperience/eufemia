---
title: 'Wizard.EditButton'
description: '`Wizard.EditButton` is a button to be placed in a summary step.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.245Z
checksum: d43acdbd40599e17d5d5ac71404f1b13ab47c7e14fcd42693e31368e140df117
---

# Wizard.EditButton

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.EditButton />)
```

## Description

`Wizard.EditButton` is a button to be placed in a summary step.

It provides a `toStep` property that lets you navigate to a specific step.

```jsx
import { Hr } from '@dnb/eufemia'
import { Form, Wizard, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Wizard.Layout>
      <Wizard.Step title="Summary">
        <Form.Card>
          <Value.Name.First path="/firstName" />
          <Hr />
          <Wizard.EditButton toStep={2} />
        </Form.Card>
      </Wizard.Step>
    </Wizard.Layout>
  </Form.Handler>
)
```

## Demos

```tsx
const Step = ({ title }) => {
  return (
    <Wizard.Step title={title}>
      <Form.Card>
        <P>Contents</P>
      </Form.Card>

      <Wizard.Buttons />
    </Wizard.Step>
  )
}
const Summary = () => {
  const { summaryTitle } = Form.useLocale().Step
  return (
    <Wizard.Step title={summaryTitle}>
      <Form.Card>
        <Value.SummaryList>
          <Value.Name.First path="/firstName" />
        </Value.SummaryList>

        <Wizard.EditButton toStep={0} />
      </Form.Card>
    </Wizard.Step>
  )
}
render(
  <Form.Handler
    data={{
      firstName: 'John',
    }}
  >
    <Wizard.Container initialActiveIndex={1}>
      <Step title="Step" />
      <Summary />
    </Wizard.Container>
  </Form.Handler>
)
```

## Properties

```json
{
  "toStep": {
    "doc": "Lets you navigate to a specific step.",
    "type": "number",
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "WizardEditButton.text": {
      "nb-NO": "Endre",
      "en-GB": "Edit",
      "sv-SE": "Ändra",
      "da-DK": "Rediger"
    }
  }
}
```
