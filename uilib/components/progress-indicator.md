---
title: 'ProgressIndicator'
description: 'The ProgressIndicator component is a waiting loader / spinner to show while other content is in progression.'
version: 11.0.1
generatedAt: 2026-04-24T10:40:50.751Z
checksum: fb55382fa240410045194bad0e3cb50e96ad1800e40b16e4d927c9de2a86b467
---

# ProgressIndicator

## Import

```tsx
import { ProgressIndicator } from '@dnb/eufemia'
```

## Description

Use a ProgressIndicator whenever the user has to wait for more than _150ms_. This component is also known as:

- Indicator (Activity-Indicator)
- Loader (Pre-loader)
- Spinner

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=21616-18893)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/progress-indicator)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/progress-indicator)

## Demos

### Default ProgressIndicator is Circular

```tsx
render(<ProgressIndicator />)
```

### Default Circular ProgressIndicator

```tsx
render(<ProgressIndicator type="circular" />)
```

### Circular ProgressIndicator with a label in a horizontal direction

```tsx
render(
  <ProgressIndicator
    // label="Custom label ..."
    type="circular"
    showDefaultLabel={true}
    labelDirection="horizontal"
  />
)
```

### Circular ProgressIndicator with a label in a vertical direction

```tsx
render(
  <ProgressIndicator
    // label="Custom label ..."
    type="circular"
    showDefaultLabel={true}
  />
)
```

### Circular ProgressIndicator with a label inside

Inside labels must be carefully sized, and are generally meant for just an icon or a number.

```tsx
<ProgressIndicator
  right
  label={<IconPrimary icon="save" />}
  type="circular"
  labelDirection="inside"
/>
<ProgressIndicator
  progress={72}
  size="large"
  type="circular"
  labelDirection="inside"
  data-visual-test="progress-indicator-label-inside"
  label={
    <span className="dnb-p dnb-t__weight--bold dnb-t__size--small">
      {72}%
    </span>
  }
/>
```

### Shows a large Circular ProgressIndicator with a static 50% in progress

```tsx
render(
  <ProgressIndicator
    type="circular"
    progress="50"
    size="large"
    noAnimation
  />
)
```

### Circular ProgressIndicator with random value

```tsx
const ChangeValue = () => {
  const [value, setValue] = React.useState(50)
  return (
    <Flex.Horizontal align="center">
      <ProgressIndicator
        type="circular"
        progress={value}
        showDefaultLabel
        labelDirection="horizontal"
        noAnimation
      />
      <Button
        left
        size="small"
        variant="secondary"
        onClick={() => setValue(Math.random() * 100)}
      >
        Change
      </Button>
    </Flex.Horizontal>
  )
}
render(<ChangeValue />)
```

### Circular ProgressIndicator with random progress value to show the transition

```tsx
const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [progress, setProgressIndicator] = React.useState(random(1, 100))
  React.useEffect(() => {
    const timer = setInterval(
      () => setProgressIndicator(random(1, 100)),
      1e3
    )
    return () => clearInterval(timer)
  })
  return (
    <ProgressIndicator type="circular" size="large" progress={progress} />
  )
}
render(<Example />)
```

### Circular ProgressIndicator with random `onComplete` callback

```tsx
const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [show, setShow] = React.useState(true)
  React.useEffect(() => {
    const timer = setInterval(() => setShow(!show), random(2400, 4200))
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="circular"
      size="large"
      show={show}
      onComplete={() => {
        console.log('onCompleteCircular')
      }}
    />
  )
}
render(<Example />)
```

### Circular ProgressIndicator inside a Dialog

```tsx
render(
  <Dialog
    spacing={false}
    maxWidth="12rem"
    fullscreen={false}
    alignContent="centered"
    hideCloseButton
    triggerAttributes={{
      text: 'Show',
    }}
    preventClose={false}
  >
    <ProgressIndicator
      type="circular"
      showDefaultLabel
      top="large"
      bottom="large"
      size="large"
    />
  </Dialog>
)
```

### Default Linear ProgressIndicator

```tsx
render(<ProgressIndicator type="linear" />)
```

### Small Linear ProgressIndicator

```tsx
render(<ProgressIndicator type="linear" size="small" />)
```

### Linear ProgressIndicator with a label in a horizontal direction

```tsx
render(
  <ProgressIndicator
    type="linear"
    // label="Custom label ..."
    showDefaultLabel={true}
    labelDirection="horizontal"
  />
)
```

### Linear ProgressIndicator with a label in a vertical direction

```tsx
render(<ProgressIndicator type="linear" showDefaultLabel={true} />)
```

### Shows a large Linear ProgressIndicator with a static 50% in progress

```tsx
render(
  <ProgressIndicator
    type="linear"
    progress="50"
    size="large"
    noAnimation
  />
)
```

### Linear ProgressIndicator with random value

```tsx
const ChangeValue = () => {
  const [value, setValue] = React.useState(50)
  return (
    <Flex.Horizontal align="center">
      <ProgressIndicator type="linear" progress={value} noAnimation />
      <Button
        left
        size="small"
        variant="secondary"
        onClick={() => setValue(Math.random() * 100)}
      >
        Change
      </Button>
    </Flex.Horizontal>
  )
}
render(<ChangeValue />)
```

### Linear ProgressIndicator with random progress value to show the transition

```tsx
const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [progress, setProgressIndicator] = React.useState(random(1, 100))
  React.useEffect(() => {
    const timer = setInterval(
      () => setProgressIndicator(random(1, 100)),
      1e3
    )
    return () => clearInterval(timer)
  })
  return <ProgressIndicator type="linear" progress={progress} />
}
render(<Example />)
```

### Linear ProgressIndicator with random `onComplete` callback

```tsx
const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [show, setShow] = React.useState(true)
  React.useEffect(() => {
    const timer = setInterval(() => setShow(!show), random(2400, 4200))
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="linear"
      size="large"
      show={show}
      onComplete={() => {
        console.log('onCompleteLinear')
      }}
    />
  )
}
render(<Example />)
```

### Linear ProgressIndicator inside a Dialog

```tsx
render(
  <Dialog
    spacing={false}
    maxWidth="12rem"
    fullscreen={false}
    alignContent="centered"
    hideCloseButton
    triggerAttributes={{
      text: 'Show',
    }}
    preventClose={false}
  >
    <ProgressIndicator
      type="linear"
      showDefaultLabel
      top="large"
      bottom="large"
    />
  </Dialog>
)
```

### Countdown indicator

```tsx
const ChangeValue = () => {
  const max = 60
  const [current, setCurrent] = React.useState(10)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(current === 0 ? max - 1 : current - 1)
    }, 1000)
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="countdown"
      progress={(current / max) * 100}
      title={`${current} av ${max}`}
      size="large"
      labelDirection="inside"
      label={<MyCustomLabel aria-hidden>{current}</MyCustomLabel>}
    />
  )
}
render(<ChangeValue />)
```

### Style customization

The sizes and colors can be customized with the properties `size`, `customColors`, and `customCircleWidth` if needed. The types `circular` and `countdown` has a few more options than `linear`.

```tsx
const MyProgressIndicator = () => {
  const StyledText = styled.span`
    color: var(--color-white);
    font-size: var(--font-size-small);
  `
  const StyledTitle = styled.span`
    display: block;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-medium);
  `
  const daysLeft = 20
  const daysInMonth = 31
  return (
    <DarkBackground>
      <ProgressIndicator
        type="countdown"
        progress={(daysLeft / daysInMonth) * 100}
        size="6rem"
        labelDirection="inside"
        customColors={{
          line: 'var(--color-summer-green)',
          shaft: 'transparent',
          background: 'var(--color-sea-green)',
        }}
        title={daysLeft + 'days left'}
        customCircleWidth="0.5rem"
        label={
          <StyledText>
            <StyledTitle>{daysLeft} d</StyledTitle>
            left
          </StyledText>
        }
      />
    </DarkBackground>
  )
}
render(<MyProgressIndicator />)
```

```tsx
const MyProgressIndicator = () => {
  const StyledText = styled.span`
    color: white;
    font-size: var(--font-size-basis);
  `
  return (
    <DarkBackground>
      <ProgressIndicator
        type="linear"
        progress={75}
        size="1rem"
        customColors={{
          line: 'var(--color-summer-green)',
          shaft: 'var(--color-sea-green)',
        }}
        label={
          <StyledText>
            <NumberFormat.Percent value={75} /> done
          </StyledText>
        }
      />
    </DarkBackground>
  )
}
render(<MyProgressIndicator />)
```

```tsx
<ProgressIndicator
  type="linear"
  progress={32}
  customColors={{
    line: 'red',
    shaft: 'green',
  }}
  size="4rem"
/>
<ProgressIndicator
  type="circular"
  progress={32}
  customColors={{
    line: 'red',
    shaft: 'green',
    background: 'blue',
  }}
  size="4rem"
/>
```

## Properties

```json
{
  "props": {
    "progress": {
      "doc": "A number between 0-100, if not supplied a continuous loading-type animation will be used.",
      "type": ["string", "number"],
      "defaultValue": "undefined",
      "status": "optional"
    },
    "show": {
      "doc": "Defines the visibility of the progress. Toggling the `show` property to `false` will force a fade-out animation.",
      "type": "boolean",
      "defaultValue": "true",
      "status": "optional"
    },
    "type": {
      "doc": "Defines the type.",
      "type": ["\"circular\"", "\"linear\"", "\"countdown\""],
      "defaultValue": "\"circular\"",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "Disables the fade-in and fade-out animation.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    },
    "size": {
      "doc": "Defines the size.",
      "type": [
        "\"default\"",
        "\"small\"",
        "\"medium\"",
        "\"large\"",
        "\"huge\"",
        "string"
      ],
      "defaultValue": "\"default\"",
      "status": "optional"
    },
    "label": {
      "doc": "Content of a custom label. (Overrides `indicatorLabel` and `showDefaultLabel`.)",
      "type": "React.ReactNode",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "children": {
      "doc": "Same as `label` prop (`label` prop has priority).",
      "type": "React.ReactNode",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "labelDirection": {
      "doc": "Sets the position of the label. `'inside'` only works with `type='circular'.",
      "type": ["\"horizontal\"", "\"vertical\"", "\"inside\""],
      "defaultValue": "\"vertical\"",
      "status": "optional"
    },
    "showDefaultLabel": {
      "doc": "If set to `true` a default label (from text locales) will be shown.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    },
    "indicatorLabel": {
      "doc": "Use this to override the default label from text locales.",
      "type": "string",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "title": {
      "doc": "Used to set title and `aria-label`. Defaults to the value of progress property, formatted as a percent.",
      "type": "string",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "[customColors](/uilib/components/progress-indicator/properties/#data-object-customcolors)": {
      "doc": "Send in custom css colors that overrides any css. See below for data structure.",
      "type": "object",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "customCircleWidth": {
      "doc": "Send in custom css width for circle progress line. (`undefined` defaults to one eighth of the size).",
      "type": "string",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  },
  "showDefaultValue": true
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "ProgressIndicator.indicatorLabel": {
      "nb-NO": "Vennligst vent ...",
      "en-GB": "Please wait ...",
      "sv-SE": "Vänligen vänta ...",
      "da-DK": "Vent venligst ..."
    }
  }
}
```

### Data object `customColors`

```json
{
  "props": {
    "line": {
      "doc": "Override the moving line color.",
      "type": "string",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "shaft": {
      "doc": "Override the background line color.",
      "type": "string",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "background": {
      "doc": "Set a background color for the center of the circle.",
      "type": "string",
      "defaultValue": "undefined",
      "status": "optional"
    }
  },
  "showDefaultValue": true
}
```

## Events

```json
{
  "props": {
    "onComplete": {
      "doc": "Will be called once it's no longer visible (`show=false`).",
      "type": "function",
      "defaultValue": "undefined",
      "status": "optional"
    }
  },
  "showDefaultValue": true
}
```
