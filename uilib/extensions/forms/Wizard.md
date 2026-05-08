---
title: 'Wizard'
description: '`Wizard` is a set of components for showing forms with a [StepIndicator](/uilib/components/step-indicator/) for navigation between several wizard. It also includes components for navigating between wizard.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.510Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Wizard

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
  </Wizard.Container>
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard)

## Intro example


```tsx
const MyForm = () => {
  // Routers like "react-router" are supported as well
  Wizard.useQueryLocator('my-wizard');
  return <Form.Handler>
              <Wizard.Container id="my-wizard" omitScrollManagement>
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
            </Form.Handler>;
};
render(<MyForm />);
```


## Dynamic steps support

You can use the `Wizard.Step` component to create dynamic steps. The `include` and `includeWhen` properties allow you to show or hide a step based on specific conditions. You find an [example](/uilib/extensions/forms/Wizard/Step/#dynamic-steps) in the demo section.

## Summary step

A wizard needs a summary step at the end. You can use the `Wizard.Step` component for that, including the [Value.SummaryList](/uilib/extensions/forms/Value/SummaryList/) component:

```tsx
import { Form, Wizard, Value } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  const { summaryTitle } = Form.useTranslation().Step

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


## [Wizard.Container](/uilib/extensions/forms/Wizard/Container/)

The `Wizard.Container` is a container component for multi-page forms including a step indicator.

## [Wizard.Step](/uilib/extensions/forms/Wizard/Step/)

Each step should be wrapped with a `Wizard.Step` component directly inside Wizard.Container.

## [Wizard.Buttons](/uilib/extensions/forms/Wizard/Buttons/)

`Wizard.Buttons` is a combination of PreviousButton and NextButton for navigating between steps/pages.

## [Wizard.EditButton](/uilib/extensions/forms/Wizard/EditButton/)

`Wizard.EditButton` is a button to be placed in a summary step.

## [Wizard.NextButton](/uilib/extensions/forms/Wizard/NextButton/)

`Wizard.NextButton` connects to the `Wizard.Context` to move the user to the next step when clicked.

## [Wizard.PreviousButton](/uilib/extensions/forms/Wizard/PreviousButton/)

`Wizard.PreviousButton` connects to the `Wizard.Context` to move the user to the previous step when clicked.

## [Wizard.useStep](/uilib/extensions/forms/Wizard/useStep/)

`Wizard.useStep` returns `Wizard.Context` parameters such as totalSteps, activeIndex or a setActiveIndex handler.

## [Wizard.LocationHooks](/uilib/extensions/forms/Wizard/location-hooks/)

Is a set of React Hooks that lets you easily hook up your existing router in order to store the current step in the URL query string.

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
    "Step.stepHasError": {
      "nb-NO": "Skjemaet inneholder feil.",
      "en-GB": "The form contains errors.",
      "sv-SE": "Formuläret innehåller fel.",
      "da-DK": "Skemaet indeholder fejl."
    },
    "Step.summaryTitle": {
      "nb-NO": "Oppsummering",
      "en-GB": "Summary",
      "sv-SE": "Sammanfattning",
      "da-DK": "Oversigt"
    },
    "WizardEditButton.text": {
      "nb-NO": "Endre",
      "en-GB": "Edit",
      "sv-SE": "Ändra",
      "da-DK": "Rediger"
    },
    "WizardNextButton.text": {
      "nb-NO": "Neste",
      "en-GB": "Next",
      "sv-SE": "Nästa",
      "da-DK": "Næste"
    },
    "WizardPreviousButton.text": {
      "nb-NO": "Tilbake",
      "en-GB": "Back",
      "sv-SE": "Tillbaka",
      "da-DK": "Tilbage"
    }
  }
}
```
