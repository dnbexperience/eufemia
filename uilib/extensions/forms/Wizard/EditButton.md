---
title: 'EditButton'
description: '`Wizard.EditButton` is a button to be placed in a summary step.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Wizard/EditButton/metadata.json
---

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
  </Form.Handler>,
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
  </Form.Handler>,
)
```
