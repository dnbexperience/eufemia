---
title: 'ProgressIndicator'
description: 'The ProgressIndicator component is a waiting loader / spinner to show while other content is in progression.'
metadata: https://eufemia.dnb.no/uilib/components/progress-indicator/metadata.json
---

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
  />,
)
```

### Circular ProgressIndicator with a label in a vertical direction

```tsx
render(
  <ProgressIndicator
    // label="Custom label ..."
    type="circular"
    showDefaultLabel={true}
    labelDirection="vertical"
  />,
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
>
  <span className="dnb-p dnb-t__weight--bold dnb-t__size--small">
    {72}%
  </span>
</ProgressIndicator>
```

### Shows a large Circular ProgressIndicator with a static 50% in progress

```tsx
render(
  <ProgressIndicator
    type="circular"
    progress="50"
    size="large"
    noAnimation
  />,
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
      1e3,
    )
    return () => clearInterval(timer)
  })
  return (
    <ProgressIndicator type="circular" size="large" progress={progress} />
  )
}
render(<Example />)
```

### Circular ProgressIndicator with random `on_complete` callback

```tsx
const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [visible, setVisible] = React.useState(true)
  React.useEffect(() => {
    const timer = setInterval(
      () => setVisible(!visible),
      random(2400, 4200),
    )
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="circular"
      size="large"
      visible={visible}
      onComplete={() => {
        console.log('on_complete_circular')
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
      labelDirection="vertical"
      top="large"
      bottom="large"
      size="large"
    />
  </Dialog>,
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
  />,
)
```

### Linear ProgressIndicator with a label in a vertical direction

```tsx
render(
  <ProgressIndicator
    type="linear"
    // label="Custom label ..."
    showDefaultLabel={true}
    labelDirection="vertical"
  />,
)
```

### Shows a large Linear ProgressIndicator with a static 50% in progress

```tsx
render(
  <ProgressIndicator
    type="linear"
    progress="50"
    size="large"
    noAnimation
  />,
)
```

### Linear ProgressIndicator with random value

```tsx
const ChangeValue = () => {
  const [value, setValue] = React.useState(50)
  return (
    <FormRow centered>
      <ProgressIndicator type="linear" progress={value} noAnimation />
      <Button
        left
        size="small"
        variant="secondary"
        onClick={() => setValue(Math.random() * 100)}
      >
        Change
      </Button>
    </FormRow>
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
      1e3,
    )
    return () => clearInterval(timer)
  })
  return <ProgressIndicator type="linear" progress={progress} />
}
render(<Example />)
```

### Linear ProgressIndicator with random `on_complete` callback

```tsx
const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [visible, setVisible] = React.useState(true)
  React.useEffect(() => {
    const timer = setInterval(
      () => setVisible(!visible),
      random(2400, 4200),
    )
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="linear"
      size="large"
      visible={visible}
      onComplete={() => {
        console.log('on_complete_linear')
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
      labelDirection="vertical"
      top="large"
      bottom="large"
    />
  </Dialog>,
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
    >
      <MyCustomLabel aria-hidden>{current}</MyCustomLabel>
    </ProgressIndicator>
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
      >
        <StyledText>
          <StyledTitle>{daysLeft} d</StyledTitle>
          left
        </StyledText>
      </ProgressIndicator>
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
        labelDirection="vertical"
        customColors={{
          line: 'var(--color-summer-green)',
          shaft: 'var(--color-sea-green)',
        }}
      >
        <StyledText>
          <NumberFormat percent value={75} /> done
        </StyledText>
      </ProgressIndicator>
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
