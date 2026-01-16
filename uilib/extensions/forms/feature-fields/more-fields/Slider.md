---
title: 'Slider'
description: '`Field.Slider` is a wrapper component for the Slider to make it easier to use inside a form.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/more-fields/Slider/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Slider />)
```

## Description

`Field.Slider` is a wrapper component for the [Slider](/uilib/components/slider/) component to make it easier to use inside a form.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Slider)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/more-fields/Slider)

## Multithumb support

You can use the `paths` property to define an array with JSON Pointers for multiple thumb buttons.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Slider paths={['/myValue', '/mySecondValue']} />)
```

Or values in an array:

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Slider value={[30, 60]} />)
```

## Min, max and step values

The `min`, `max` and `step` properties can be used to define the minimum and maximum value of the slider.

You can provider a JSON Pointer path as well:

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Slider min="/minValue" max="/maxValue" step="/stepValue" />)
```

## Demos

### Basic usage

```tsx
render(
  <Form.Handler
    defaultData={{
      myValue: 50,
    }}
  >
    <Field.Slider label="Slider" path="/myValue" />
  </Form.Handler>,
)
```

### Multi thumb

```tsx
render(
  <Form.Handler
    defaultData={{
      firstValue: 10,
      secondValue: 60,
    }}
  >
    <Flex.Stack>
      <Field.Composition width="large">
        <Field.Currency
          label="First value"
          path="/firstValue"
          decimalLimit={0}
        />
        <Field.Currency
          label="Second value"
          path="/secondValue"
          decimalLimit={0}
        />
      </Field.Composition>

      <Field.Slider
        label="My slider"
        paths={['/firstValue', '/secondValue']}
        multiThumbBehavior="push"
        width="large"
      />
    </Flex.Stack>
  </Form.Handler>,
)
```

### Sync with input

```tsx
render(
  <Form.Handler
    defaultData={{
      firstValue: 10,
      secondValue: 60,
    }}
  >
    <Flex.Stack>
      <Field.Composition width="large">
        <Field.Currency
          label="First value"
          path="/firstValue"
          decimalLimit={0}
        />
        <Field.Currency
          label="Second value"
          path="/secondValue"
          decimalLimit={0}
        />
      </Field.Composition>

      <Field.Composition width="large">
        <Field.Slider label="First slider" path="/firstValue" />
        <Field.Slider label="Second slider" path="/secondValue" />
      </Field.Composition>
    </Flex.Stack>
  </Form.Handler>,
)
```

### With stepper

```tsx
render(
  <Form.Handler
    defaultData={{
      myValue: 50,
    }}
  >
    <Flex.Stack>
      <Field.Currency
        label="Stepper"
        path="/myValue"
        width="medium"
        decimalLimit={0}
        showStepControls
      />
      <Field.Slider label="Slider" path="/myValue" width="large" />
    </Flex.Stack>
  </Form.Handler>,
)
```

### Path usage for min, max and step

```tsx
render(
  <Form.Handler
    defaultData={{
      currentValue: 1000,
      min: 0,
      max: 10000,
      step: 10,
    }}
  >
    <Flex.Stack>
      <Flex.Horizontal align="center">
        <P>
          Max value (
          <Value.Currency path="/max" decimals={0} inline />)
        </P>

        <HelpButton>Help text</HelpButton>

        <Field.Currency
          path="/currentValue"
          width="stretch"
          decimalLimit={0}
        />
      </Flex.Horizontal>

      <Field.Slider
        path="/currentValue"
        min="/min"
        max="/max"
        step="/step"
      />
    </Flex.Stack>
  </Form.Handler>,
)
```

### With help

```tsx
render(
  <Form.Handler
    defaultData={{
      myValue: 50,
    }}
  >
    <Field.Slider
      label="Slider"
      help={{
        title: 'Help is available',
        content:
          'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
      }}
      path="/myValue"
    />
  </Form.Handler>,
)
```
