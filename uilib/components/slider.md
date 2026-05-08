---
title: 'Slider'
description: 'The Slider component provides a visual indication of adjustable value.'
version: 11.2.0
generatedAt: 2026-05-08T07:25:36.894Z
checksum: 8f2e2e4e70ce4198f504e9269644b5c67a4cd3a211bc960e08da96547d0050c9
---

# Slider

## Import

```tsx
import { Slider } from '@dnb/eufemia'
```

## Description

The Slider component provides a visual indication of an adjustable value. A value can be adjusted (increased or decreased) by moving the drag handle along a track (usually horizontal or vertical). Remember to inform users that they can also adjust the value directly in the value input field (if it exists).

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4314-723)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/slider)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/slider)

## Accessibility

The Slider uses a semantic `<input type="range">` element for the thumb control, ensuring keyboard accessibility. Arrow keys adjust the value, and Home/End keys jump to min/max values. The current value, minimum, and maximum are announced to screen readers via `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.

### Define a `min` and `max` value

Keep in mind, you should most probably define your `min` and `max` value, because they are tied closely to your given value property.


## Demos

### Default Slider


```tsx
render(<Slider min={0} max={100} value={70} label="Default Slider" numberFormat={{
  currency: 'EUR'
}} onChange={({
  value
}) => console.log('onChange:', value)} />)
```


### Slider with multiple thumb buttons

Provide the `value` property as an array with numbers. The `onChange` event will then also return the property `value` as an array. The `+` and `-` buttons will not be visible when when more than one thumb button is present.


```tsx
render(<Flex.Vertical align="stretch">
      <Slider min={0} max={100} value={[30, 70]} step={5} label="Range with steps" numberFormat={{
    currency: 'USD'
  }} tooltip onChange={({
    value
  }) => console.log('onChange:', value)} />
      <Slider min={0} max={100} value={[10, 30, 50, 70]} label="Multi thumbs" numberFormat={value => formatPercent(value, {
    decimals: 0
  })} tooltip onChange={({
    value,
    number
  }) => console.log('onChange:', value, number)} />
    </Flex.Vertical>)
```


By default, the thumbs can swap positions. You can change that behavior with `multiThumbBehavior`.


```tsx
render(<Flex.Vertical align="stretch">
      <Slider multiThumbBehavior="omit" value={[30, 70]} label="Omit behavior" numberFormat={{
    currency: 'EUR'
  }} tooltip={true} onChange={({
    value
  }) => console.log('onChange:', value)} />
      <Slider multiThumbBehavior="push" min={-40} value={[-10, 50, 70]} step={1} label="Push behavior" numberFormat={{
    currency: true
  }} tooltip={true} onChange={({
    value,
    number
  }) => console.log('onChange:', value, number)} />
    </Flex.Vertical>)
```


### Vertical slider with steps of 10


```tsx
const VerticalWrapper = styled.div`
        display: inline-flex;
        flex-direction: column;
        height: 12rem; /* max-height works fine except in Safari */
      `;
render(<VerticalWrapper>
          <Slider min={0} max={100} value={20} step={10} vertical={true} label="Vertical slider" onChange={({
    value
  }) => console.log('onChange:', value)} />
        </VerticalWrapper>);
```


### Horizontal and vertical slider in sync with input field


```tsx
const Component = () => {
  const [value, setValue] = useState(70);
  return <>
            <Slider value={value} step={1} hideButtons label="Slider A" numberFormat={{
      currency: 'EUR'
    }} tooltip={true} onChange={({
      value
    }) => setValue(parseFloat(String(value)))} />
            <VerticalWrapper>
              <Slider value={value} vertical={true} hideButtons={true} step={10} label="Slider B" numberFormat={value => formatCurrency(value, {
        currency: 'NOK'
      })} tooltip alwaysShowTooltip onChange={({
        value
      }) => setValue(Number(value))} />
              <Input align="center" selectAll value={String(value)} onChange={({
        value
      }) => setValue(Number(value))} />
            </VerticalWrapper>
          </>;
};
const VerticalWrapper = styled.div`
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        height: 20rem; /* max-height works fine except in Safari */
        margin-top: 1rem;
        padding: 1rem;
        background: var(--color-lavender);
        border: 1px solid var(--color-black-20);
        .dnb-input {
          width: 4rem;
          margin-top: 1rem;
        }
      `;
render(<Component />);
```


### Slider with a suffix


```tsx
render(<Slider min={0} max={100} value={70} label="Slider with suffix" suffix={<HelpButton title="Modal Title">Modal content</HelpButton>} />)
```


### Slider with a marker

Marks a given point in the Slider with a small marker. If `text` property is provided to the `marker` object, it will be displayed in a tooltip.

You can import the marker like so:

```ts
import { SliderMarker } from '@dnb/eufemia/components/Slider'
```


```tsx
render(<Slider min={0} max={100} value={50} extensions={{
  marker: {
    instance: SliderMarker,
    value: 20,
    text: 'Default value'
  }
}} label="Slider with marker" />)
```

## Properties


```json
{
  "props": {
    "value": {
      "doc": "The `value` of the slider as a number or an array. If an array with numbers is provided, each number will represent a thumb button (the `+` and `-` button will be hidden on multiple thumbs).",
      "type": [
        "number",
        "Array<number>"
      ],
      "status": "optional"
    },
    "min": {
      "doc": "The minimum value. Can be a negative number as well. Defaults to `0`.",
      "type": "number",
      "status": "optional"
    },
    "max": {
      "doc": "The maximum value. Defaults to `100`.",
      "type": "number",
      "status": "optional"
    },
    "step": {
      "doc": "The steps the slider takes on changing the value. Defaults to `null`.",
      "type": "number",
      "status": "optional"
    },
    "vertical": {
      "doc": "Show the slider vertically. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "reverse": {
      "doc": "Show the slider reversed. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the slider will be 100% in `width`.",
      "type": "boolean",
      "status": "optional"
    },
    "hideButtons": {
      "doc": "Removes the helper buttons. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "multiThumbBehavior": {
      "doc": "Use either `omit`, `push` or `swap`. This property only works for two (range) or more thumb buttons, while `omit` will stop the thumb from swapping, `push` will push its nearest thumb along. Defaults to `swap`.",
      "type": [
        "\"omit\"",
        "\"push\"",
        "\"swap\""
      ],
      "status": "optional"
    },
    "thumbTitle": {
      "doc": "Give the slider thumb button a title for accessibility reasons. Defaults to `null`.",
      "type": "string",
      "status": "optional"
    },
    "subtractTitle": {
      "doc": "Give the subtract button a title for accessibility reasons. Defaults to `Decrease (%s)`.",
      "type": "string",
      "status": "optional"
    },
    "addTitle": {
      "doc": "Give the add button a title for accessibility reasons. Defaults to `Increase (%s)`.",
      "type": "string",
      "status": "optional"
    },
    "numberFormat": {
      "doc": "Will extend the return object with a `number` property (from `onChange` event). You can use all the options from the [NumberFormat](/uilib/components/number-format/properties) component. It also will use that formatted number in the increase/decrease buttons. If it has to represent a currency, then use e.g. `numberFormat={{ currency: true, decimals: 0 }}`.",
      "type": [
        "object",
        "function"
      ],
      "status": "optional"
    },
    "tooltip": {
      "doc": "Use `true` to show a tooltip on `mouseOver`, `touchStart` and `focus`, showing the current number (if `numberFormat` is given) or the raw value.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysShowTooltip": {
      "doc": "Use `true` to always show the tooltip, in addition to the `tooltip` property.",
      "type": "boolean",
      "status": "optional"
    },
    "label": {
      "doc": "Prepends the Form Label component. If no ID is provided, a random ID is created.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "labelDirection": {
      "doc": "Use `labelDirection=\"horizontal\"` to change the label layout direction. Defaults to `vertical`.",
      "type": [
        "\"horizontal\"",
        "\"vertical\""
      ],
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "status": {
      "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
      "type": [
        "\"error\"",
        "\"information\"",
        "boolean"
      ],
      "status": "optional"
    },
    "statusState": {
      "doc": "Defines the state of the status. Currently, there are two statuses `[error, information]`. Defaults to `error`.",
      "type": [
        "\"error\"",
        "\"information\""
      ],
      "status": "optional"
    },
    "statusProps": {
      "doc": "Use an object to define additional FormStatus properties.",
      "type": "object",
      "status": "optional"
    },
    "globalStatus": {
      "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
      "type": "object",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the Slider more than the label. You can also send in a React component, so it gets wrapped inside the Slider component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "extensions": {
      "doc": "Makes it possible to display overlays with other functionality such as a marker on the slider marking a given value.",
      "type": "object",
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
  }
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
    "Slider.addTitle": {
      "nb-NO": "Øk (%s)",
      "en-GB": "Increase (%s)",
      "sv-SE": "Öka (%s)",
      "da-DK": "Forøg (%s)"
    },
    "Slider.subtractTitle": {
      "nb-NO": "Reduser (%s)",
      "en-GB": "Decrease (%s)",
      "sv-SE": "Minska (%s)",
      "da-DK": "Reducer (%s)"
    }
  }
}
```


## Extensions

A Slider Extension should be an object with the following properties:

```tsx
import Slider, { SliderMarker } from '@dnb/eufemia/components/Slider'

render(
  <Slider
    extensions={{
      marker: {
        instance: SliderMarker,
        value: 50,
      },
    }}
  />
)
```

## Events


```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on state changes made by the user. The callback `value` and `rawValue` is a number `{ value, rawValue, event }`. But if the `numberFormat` property is given, then it will return an additional `number` with the given format `{ value, number, rawValue, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onDragStart": {
      "doc": "Will be called once the user starts dragging. Returns `{ event }`.",
      "type": "function",
      "status": "optional"
    },
    "onDragEnd": {
      "doc": "Will be called once the user stops dragging. Returns `{ event }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
