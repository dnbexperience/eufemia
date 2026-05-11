---
version: 11.2.2
generatedAt: 2026-05-11T08:17:55.839Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

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
