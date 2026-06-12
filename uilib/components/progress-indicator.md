---
title: 'ProgressIndicator'
description: 'The ProgressIndicator component is a waiting loader / spinner to show while other content is in progression.'
version: 11.6.0
generatedAt: 2026-06-12T08:43:35.907Z
checksum: ffaea90c327ad61cf29b7449ea1a5e4a21b58c395f921b970883d755dbd451d6
---

# ProgressIndicator

## Import

```tsx
import { ProgressIndicator } from '@dnb/eufemia'
```

## Description

The ProgressIndicator component shows a visual indicator during loading or processing states. Use it whenever the user has to wait for more than _150ms_.

It supports three types: `circular` (default), `linear`, and `countdown`. Each type can display either a **determinate** state (with a known progress value) or an **indeterminate** state (when the duration is unknown).

This component is also known as: Indicator (Activity-Indicator), Loader (Pre-loader), Spinner.

### Determinate vs indeterminate

- **Determinate**: Use when the progress percentage is known (e.g. file uploads, multi-step processes). Set the `progress` prop to a value between `0` and `100`.
- **Indeterminate**: Use when the duration is unknown (e.g. fetching data, waiting for a response). Omit the `progress` prop to show a continuous animation.

### Types

- **`circular`** (default): A spinning ring. Works well inline or centered in a container. Supports label placement inside, horizontally, or vertically.
- **`linear`**: A horizontal bar. Suited for wider layouts or when vertical space is limited. Common at the top of a page or section.
- **`countdown`**: A circular variant that animates counterclockwise, useful for timers or session expiry indicators.

### Visibility

Use the `show` prop to control when the indicator appears and disappears. When `show` transitions to `false`, the indicator animates out and fires the `onComplete` callback once the exit animation finishes.

## Accessibility

- The component uses `role="progressbar"` with `aria-valuenow` for determinate states, giving screen readers the current progress.
- For indeterminate states, `role="alert"` is used to announce that loading is in progress.
- Use the `title` prop to provide a descriptive accessible label (e.g. `"Loading account details"`).
- The `showDefaultLabel` prop adds a visible "In progress..." label, which also helps screen reader users understand the context.

## When to use

- Processing or loading states lasting more than 150ms.
- File uploads, data fetching, or form submissions where the user needs feedback.
- Timers or countdowns using the `countdown` type.

## When not to use

- For full-page or section-level loading states, consider the [Skeleton](/uilib/components/skeleton) component instead.
- For processes lasting less than 150ms — no loading indicator is needed.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=21616-18893)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/progress-indicator)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/progress-indicator)


## Demos

### Indeterminate (unknown progress)

When the duration is unknown, omit the `progress` prop to show a continuous animation. The default type is `circular`.


```tsx
render(<ProgressIndicator />)
```


The `linear` type works well for wider layouts, such as the top of a page or section.


```tsx
render(<ProgressIndicator type="linear" />)
```


### Determinate (known progress)

Set the `progress` prop (0–100) when you know how far along the process is. This gives the user a clear expectation of remaining time.


```tsx
render(<ProgressIndicator type="circular" progress="50" size="large" noAnimation />)
```



```tsx
render(<ProgressIndicator type="linear" progress="50" size="large" noAnimation />)
```


### Labels

Labels help users understand what is loading. Use `showDefaultLabel` for the built-in "In progress..." text, or provide a custom `label`.

#### Horizontal label


```tsx
render(<ProgressIndicator
// label="Custom label ..."
type="circular" showDefaultLabel={true} labelDirection="horizontal" />)
```



```tsx
render(<ProgressIndicator type="linear"
// label="Custom label ..."
showDefaultLabel={true} labelDirection="horizontal" />)
```


#### Vertical label

The default label direction is vertical.


```tsx
render(<ProgressIndicator
// label="Custom label ..."
type="circular" showDefaultLabel={true} />)
```



```tsx
render(<ProgressIndicator type="linear" showDefaultLabel={true} />)
```


#### Inside label (circular only)

Inside labels are placed in the center of the circle. Use sparingly — they work best for short content like an icon or a number.


```tsx
<ProgressIndicator right label={<IconPrimary icon="save" />} type="circular" labelDirection="inside" />
<ProgressIndicator progress={72} size="large" type="circular" labelDirection="inside" data-visual-test="progress-indicator-label-inside" label={<span className="dnb-p dnb-t__weight--bold dnb-t__size--small">
        {72}%
      </span>} />
```


### Animated progress transitions

When the `progress` value changes, the indicator animates smoothly between values.


```tsx
const Example = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const [progress, setProgressIndicator] = useState(random(1, 100));
  useEffect(() => {
    const timer = setInterval(() => setProgressIndicator(random(1, 100)), 1e3);
    return () => clearInterval(timer);
  });
  return <ProgressIndicator type="circular" size="large" progress={progress} />;
};
render(<Example />);
```



```tsx
const Example = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const [progress, setProgressIndicator] = useState(random(1, 100));
  useEffect(() => {
    const timer = setInterval(() => setProgressIndicator(random(1, 100)), 1e3);
    return () => clearInterval(timer);
  });
  return <ProgressIndicator type="linear" progress={progress} />;
};
render(<Example />);
```


### Controlling visibility with `show`

Use the `show` prop to toggle the indicator. The `onComplete` callback fires after the exit animation finishes, which is useful for sequencing UI updates.


```tsx
const Example = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => setShow(!show), random(2400, 4200));
    return () => clearTimeout(timer);
  });
  return <ProgressIndicator type="circular" size="large" show={show} onComplete={() => {
    console.log('onCompleteCircular');
  }} />;
};
render(<Example />);
```


### Inside a Dialog

A ProgressIndicator can be placed inside a Dialog to block interaction while a process completes.


```tsx
render(<Dialog spacing={false} maxWidth="12rem" fullscreen={false} alignContent="centered" hideCloseButton triggerAttributes={{
  text: 'Show'
}} preventClose={false}>
      <ProgressIndicator type="circular" showDefaultLabel top="large" bottom="large" size="large" />
    </Dialog>)
```


### Countdown

The `countdown` type animates counterclockwise and is suited for timers, session expiry, or time-limited actions. Combine it with `labelDirection="inside"` to display a value in the center.


```tsx
const ChangeValue = () => {
  const max = 60;
  const [current, setCurrent] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(current === 0 ? max - 1 : current - 1);
    }, 1000);
    return () => clearTimeout(timer);
  });
  return <ProgressIndicator type="countdown" progress={current / max * 100} title={`${current} av ${max}`} size="large" labelDirection="inside" label={<MyCustomLabel aria-hidden>{current}</MyCustomLabel>} />;
};
render(<ChangeValue />);
```


### Style customization

The sizes and colors can be customized with the properties `size`, `customColors`, and `customCircleWidth` if needed. The types `circular` and `countdown` have a few more options than `linear`.


```tsx
const MyProgressIndicator = () => {
  const StyledText = styled.span`
          color: var(--color-white);
          font-size: var(--font-size-small);
        `;
  const StyledTitle = styled.span`
          display: block;
          font-weight: var(--font-weight-medium);
          font-size: var(--font-size-medium);
        `;
  const daysLeft = 20;
  const daysInMonth = 31;
  return <DarkBackground>
            <ProgressIndicator type="countdown" progress={daysLeft / daysInMonth * 100} size="6rem" labelDirection="inside" customColors={{
      line: 'var(--color-summer-green)',
      shaft: 'transparent',
      background: 'var(--color-sea-green)'
    }} title={daysLeft + 'days left'} customCircleWidth="0.5rem" label={<StyledText>
                  <StyledTitle>{daysLeft} d</StyledTitle>
                  left
                </StyledText>} />
          </DarkBackground>;
};
render(<MyProgressIndicator />);
```


```tsx
const MyProgressIndicator = () => {
  const StyledText = styled.span`
          color: white;
          font-size: var(--font-size-basis);
        `;
  return <DarkBackground>
            <ProgressIndicator type="linear" progress={75} size="1rem" customColors={{
      line: 'var(--color-summer-green)',
      shaft: 'var(--color-sea-green)'
    }} label={<StyledText>
                  <NumberFormat.Percent value={75} /> done
                </StyledText>} />
          </DarkBackground>;
};
render(<MyProgressIndicator />);
```



  
```tsx
<ProgressIndicator type="linear" progress={32} customColors={{
line: 'red',
shaft: 'green'
}} size="4rem" />
<ProgressIndicator type="circular" progress={32} customColors={{
line: 'red',
shaft: 'green',
background: 'blue'
}} size="4rem" />
```

## Properties


```json
{
  "props": {
    "progress": {
      "doc": "A number between 0-100, if not supplied a continuous loading-type animation will be used.",
      "type": [
        "string",
        "number"
      ],
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
      "type": [
        "\"circular\"",
        "\"linear\"",
        "\"countdown\""
      ],
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
      "doc": "Sets the position of the label. `'inside'` only works with `type='circular'`.",
      "type": [
        "\"horizontal\"",
        "\"vertical\"",
        "\"inside\""
      ],
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
      "doc": "Send in custom CSS colors that override any CSS. See below for data structure.",
      "type": "object",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "customCircleWidth": {
      "doc": "Send in custom CSS width for circle progress line. (`undefined` defaults to one eighth of the size).",
      "type": "string",
      "defaultValue": "undefined",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  },
  "showDefaultValue": true
}
```


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
