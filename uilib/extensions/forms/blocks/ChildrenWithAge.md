---
title: 'Block.ChildrenWithAge'
description: '`ChildrenWithAge` is a block for displaying children with age.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.273Z
checksum: 193f3ea42ea5bdb75b5504c8ab5d79a4fab668b6f038069544d7ab9da5235031
---

# Block.ChildrenWithAge

## Description

`ChildrenWithAge` is a block for displaying children with age. Check out the [source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/blocks/ChildrenWithAge) for more information.

```tsx
import { ChildrenWithAge } from '@dnb/eufemia/extensions/forms/blocks'
render(<ChildrenWithAge />)
```

## Demos

### In Wizard

All features, and additional questions (`enableAdditionalQuestions`) and custom translations, are enabled in this example.

```tsx
const MyForm = () => {
  const myTranslations = {
    'nb-NO': {
      ChildrenWithAge: {
        hasChildren: {
          title: 'Utgifter til barn',
          fieldLabel:
            'Har du/dere barn under 18 år som dere er økonomisk ansvarlige for?',
          required:
            'Du må angi om du/dere har barn under 18 år som dere er økonomisk ansvarlige for.',
        },
      },
    },
    'en-GB': {
      ChildrenWithAge: {
        hasChildren: {
          title: 'Child expenses',
          fieldLabel:
            'Do you have children under the age of 18 for whom you are financially responsible?',
          required:
            'You must state whether you have children under the age of 18 for whom you are financially responsible.',
        },
      },
    },
  }
  const { summaryTitle } = Form.useLocale().Step
  return (
    <Form.Handler
      onSubmit={(data, { reduceToVisibleFields }) => {
        console.log(reduceToVisibleFields(data))
      }}
      translations={myTranslations}
    >
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <Blocks.ChildrenWithAge
            enableAdditionalQuestions={['joint-responsibility', 'daycare']}
            {...props}
          />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title={summaryTitle}>
          <Blocks.ChildrenWithAge
            mode="summary"
            toWizardStep={0}
            {...props}
          />

          <Form.ButtonRow>
            <Wizard.Buttons />
            <Form.SubmitButton variant="send" />
          </Form.ButtonRow>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Basic

```tsx
render(
  <Form.Handler
    onSubmit={(data, { reduceToVisibleFields }) => {
      console.log(reduceToVisibleFields(data))
    }}
  >
    <WithToolbar>
      <Flex.Stack>
        <Blocks.ChildrenWithAge {...props} />
        <Blocks.ChildrenWithAge mode="summary" {...props} />
      </Flex.Stack>
    </WithToolbar>
  </Form.Handler>
)
```

### With `joint-responsibility` question

<Examples.ChildrenWithAge
enableAdditionalQuestions={['joint-responsibility']}
/>

### With `daycare` question

<Examples.ChildrenWithAge enableAdditionalQuestions={['daycare']} />

### With `daycare` and `joint-responsibility` question

<Examples.ChildrenWithAge
enableAdditionalQuestions={['daycare', 'joint-responsibility']}
/>

```tsx
render(
  <Form.Handler
    data={{
      hasChildren: true,
      hasJointResponsibility: true,
      usesDaycare: true,
      daycareExpenses: 123,
      countChildren: 2,
      children: [{}, {}],
    }}
  >
    <Flex.Stack>
      <Blocks.ChildrenWithAge
        enableAdditionalQuestions={['joint-responsibility', 'daycare']}
      />
    </Flex.Stack>
  </Form.Handler>
)
```

```tsx
<Blocks.ChildrenWithAge data={noChildren} />
<Blocks.ChildrenWithAge mode="summary" data={noChildren} />
```

```tsx
<Blocks.ChildrenWithAge
  data={multipleChildren}
  enableAdditionalQuestions={['daycare', 'joint-responsibility']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={multipleChildren}
  enableAdditionalQuestions={['daycare', 'joint-responsibility']}
/>
```

```tsx
<Blocks.ChildrenWithAge
  data={multipleChildrenNoJointAndDaycare}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={multipleChildrenNoJointAndDaycare}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>
```

```tsx
<Blocks.ChildrenWithAge
  data={noChildren}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>
<Blocks.ChildrenWithAge
  mode="summary"
  data={noChildren}
  enableAdditionalQuestions={['joint-responsibility', 'daycare']}
/>
```

## Properties

```json
{
  "mode": {
    "doc": "`summary` for a `Value.*` version, `edit` for an editable field version. Defaults to `edit`.",
    "type": "number",
    "status": "optional"
  },
  "enableAdditionalQuestions": {
    "doc": "[`joint-responsibility`, `daycare`]",
    "type": "array",
    "status": "optional"
  },
  "toWizardStep": {
    "doc": "If defined, a `Wizard.EditButton` will be shown.",
    "type": "number",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "ChildrenWithAge.childrenAge.fieldLabel": {
      "nb-NO": "Alder på barn nr. {itemNo}",
      "sv-SE": "Ålder på barn nr. {itemNo}",
      "da-DK": "Alder på barn nr. {itemNo}",
      "en-GB": "Age of child no. {itemNo}"
    },
    "ChildrenWithAge.childrenAge.required": {
      "nb-NO": "Du må skrive inn alder på barnet.",
      "sv-SE": "Du måste ange barnets ålder.",
      "da-DK": "Du skal indtaste barnets alder.",
      "en-GB": "You must enter the age of the child."
    },
    "ChildrenWithAge.childrenAge.suffix": {
      "nb-NO": "år",
      "sv-SE": "år",
      "da-DK": "år",
      "en-GB": "years old"
    },
    "ChildrenWithAge.countChildren.fieldLabel": {
      "nb-NO": "Antall barn under 18 år",
      "sv-SE": "Antal barn under 18 år",
      "da-DK": "Antal børn under 18 år",
      "en-GB": "Number of children under the age of 18"
    },
    "ChildrenWithAge.countChildren.required": {
      "nb-NO": "Du må skrive inn antall barn.",
      "sv-SE": "Du måste ange antal barn.",
      "da-DK": "Du skal indtaste antallet af børn.",
      "en-GB": "You must enter the number of children."
    },
    "ChildrenWithAge.countChildren.suffix": {
      "nb-NO": "barn",
      "sv-SE": "barn",
      "da-DK": "børn",
      "en-GB": "children"
    },
    "ChildrenWithAge.dayCareExpenses.fieldLabel": {
      "nb-NO": "Oppgi utgifter til SFO/AKS per måned",
      "sv-SE": "Ange utgifter för fritids per månad",
      "da-DK": "Angiv udgifter til SFO/AKS pr. måned",
      "en-GB": "Enter expenses for SFO/AKS per month"
    },
    "ChildrenWithAge.dayCareExpenses.required": {
      "nb-NO": "Du må oppgi dine utgifter til SFO/AKS per måned.",
      "sv-SE": "Du måste ange dina utgifter för fritids per månad.",
      "da-DK": "Du skal angive dine udgifter til SFO/AKS pr. måned.",
      "en-GB": "You must enter your expenses for SFO/AKS per month."
    },
    "ChildrenWithAge.hasChildren.fieldLabel": {
      "nb-NO": "Har du/dere barn under 18 år?",
      "sv-SE": "Har du barn under 18 år?",
      "da-DK": "Har du børn under 18 år?",
      "en-GB": "Do you have children under the age of 18?"
    },
    "ChildrenWithAge.hasChildren.required": {
      "nb-NO": "Du må angi om du har barn under 18 år eller ikke.",
      "sv-SE": "Du måste ange om du har barn under 18 år eller inte.",
      "da-DK": "Du skal angive, om du har børn under 18 år eller ej.",
      "en-GB": "You must state whether you have children under 18 or not."
    },
    "ChildrenWithAge.hasChildren.title": {
      "nb-NO": "Antall barn",
      "sv-SE": "Antal barn",
      "da-DK": "Antal børn",
      "en-GB": "Number of children"
    },
    "ChildrenWithAge.hasJointResponsibility.fieldLabel": {
      "nb-NO": "Betaler du/dere barnebidrag?",
      "sv-SE": "Betalar du barnbidrag?",
      "da-DK": "Betaler du børnebidrag?",
      "en-GB": "Do you pay child support?"
    },
    "ChildrenWithAge.hasJointResponsibility.required": {
      "nb-NO": "Du må angi om du/dere betaler barnebidrag.",
      "sv-SE": "Du måste ange om du betalar barnbidrag.",
      "da-DK": "Du skal angive, om du betaler børnebidrag.",
      "en-GB": "You must state whether you pay child support."
    },
    "ChildrenWithAge.jointResponsibilityExpenses.fieldLabel": {
      "nb-NO": "Oppgi barnebidrag per måned",
      "sv-SE": "Ange barnbidrag per månad",
      "da-DK": "Angiv børnebidrag pr. måned",
      "en-GB": "Enter child support per month"
    },
    "ChildrenWithAge.jointResponsibilityExpenses.required": {
      "nb-NO": "Du må oppgi barnebidrag per måned.",
      "sv-SE": "Du måste ange barnbidrag per månad.",
      "da-DK": "Du skal angive børnebidrag pr. måned.",
      "en-GB": "You must enter child support per month."
    },
    "ChildrenWithAge.usesDaycare.fieldLabel": {
      "nb-NO": "Har du/dere utgifter til SFO/AKS?",
      "sv-SE": "Har du utgifter för fritids?",
      "da-DK": "Har du udgifter til SFO/AKS?",
      "en-GB": "Do you have expenses for SFO/AKS?"
    },
    "ChildrenWithAge.usesDaycare.helpText": {
      "nb-NO": "Oppgi totalt beløp per måned som du betaler til Skolefritidsordningen (SFO) eller Aktivitetsskolen (AKS).{br}{br}Barnehageutgifter skal ikke tas med her.",
      "sv-SE": "Ange det totala beloppet per månad som du betalar för fritidsverksamhet.{br}{br}Förskole-/barnhageutgifter ska inte tas med här.",
      "da-DK": "Angiv det samlede beløb pr. måned, som du betaler til Skolefritidsordningen (SFO) eller Aktivitetsskolen (AKS).{br}{br}Udgifter til børnehave skal ikke medregnes her.",
      "en-GB": "State the total amount per month that you pay to Skolefritidsordningen (SFO) or Aktivitetsskolen (AKS).{br}{br}Kindergarten expenses are not to be included here."
    },
    "ChildrenWithAge.usesDaycare.required": {
      "nb-NO": "Du må angi om du/dere har utgifter til SFO/AKS.",
      "sv-SE": "Du måste ange om du har utgifter för fritids.",
      "da-DK": "Du skal angive, om du har udgifter til SFO/AKS.",
      "en-GB": "You must state whether you have any expenses for SFO/AKS."
    }
  }
}
```
