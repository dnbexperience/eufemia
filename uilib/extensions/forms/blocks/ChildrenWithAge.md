---
title: 'ChildrenWithAge'
description: '`ChildrenWithAge` is a block for displaying children with age.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/blocks/ChildrenWithAge/metadata.json
---

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
  </Form.Handler>,
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
  </Form.Handler>,
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
