---
title: 'Wizard'
description: '`Wizard` is a set of components for showing forms with a [StepIndicator](/uilib/components/step-indicator/) for navigation between several wizard. It also includes components for navigating between wizard.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Wizard/metadata.json
---

## Import

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'
```

## Description

`Wizard` is a set of components for showing forms with a [StepIndicator](/uilib/components/step-indicator/) for navigation between several steps. It also includes components for navigating between steps.

```tsx
import { Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Wizard.Container>
    <Wizard.Step title="Step 1">...</Wizard.Step>
    <Wizard.Step title="Step 2">...</Wizard.Step>
  </Wizard.Container>,
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard)

## Intro example

```tsx
const MyForm = () => {
  // Routers like "react-router" are supported as well
  Wizard.useQueryLocator('my-wizard')
  return (
    <Form.Handler>
      <Wizard.Container
        id="my-wizard"
        variant="drawer"
        omitScrollManagement
      >
        <Wizard.Step title="Step 1">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Form.Card>
            <P>Step 1</P>
          </Form.Card>
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Form.Card>
            <P>Step 2</P>
          </Form.Card>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
```

## Dynamic steps support

You can use the `Wizard.Step` component to create dynamic steps. The `include` and `includeWhen` properties allow you to show or hide a step based on specific conditions. You find an [example](/uilib/extensions/forms/Wizard/Step/#dynamic-steps) in the demo section.

## Summary step

A wizard needs a summary step at the end. You can use the `Wizard.Step` component for that, including the [Value.SummaryList](/uilib/extensions/forms/Value/SummaryList/) component:

```tsx
import { Form, Wizard, Value } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  const { summaryTitle } = Form.useLocale().Step

  return (
    <Form.Handler>
      <Wizard.Container>
        <Wizard.Step title="Step 1">...</Wizard.Step>
        <Wizard.Step title="Step 2">...</Wizard.Step>
        <Wizard.Step title={summaryTitle}>
          <Value.SummaryList layout="grid">
            <Value.String label="Label" path="/myValue" />
          </Value.SummaryList>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
```

## Components

<ListWizardComponents size="small" />
