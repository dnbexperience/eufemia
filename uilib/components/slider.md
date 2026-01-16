---
title: 'Slider'
description: 'The Slider component provides a visual indication of adjustable value.'
metadata: https://eufemia.dnb.no/uilib/components/slider/metadata.json
---

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

### Define a `min` and `max` value

Keep in mind, you should most probably define your `min` and `max` value, because they are tied closely to your given value property.

## Demos

### Default Slider

```tsx
render(
  <Slider
    min={0}
    max={100}
    value={70}
    label="Default Slider"
    numberFormat={{
      currency: 'EUR',
    }}
    onChange={({ value }) => console.log('onChange:', value)}
  />,
)
```

### Slider with multiple thumb buttons

Provide the `value` property as an array with numbers. The `onChange` event will then also return the property `value` as an array. The `+` and `-` buttons will not be visible when when more than one thumb button is present.

```tsx
render(
  <Provider
    formElement={{
      label_direction: 'vertical',
    }}
  >
    <Flex.Vertical align="stretch">
      <Slider
        min={0}
        max={100}
        value={[30, 70]}
        step={5}
        label="Range with steps"
        numberFormat={{
          currency: 'USD',
        }}
        tooltip
        onChange={({ value }) => console.log('onChange:', value)}
      />
      <Slider
        min={0}
        max={100}
        value={[10, 30, 50, 70]}
        label="Multi thumbs"
        numberFormat={(value) =>
          format(value, {
            percent: true,
            decimals: 0,
          })
        }
        tooltip
        onChange={({ value, number }) =>
          console.log('onChange:', value, number)
        }
      />
    </Flex.Vertical>
  </Provider>,
)
```

By default, the thumbs can swap positions. You can change that behavior with `multiThumbBehavior`.

```tsx
render(
  <Provider
    formElement={{
      label_direction: 'vertical',
    }}
  >
    <Flex.Vertical align="stretch">
      <Slider
        multiThumbBehavior="omit"
        value={[30, 70]}
        label="Omit behavior"
        numberFormat={{
          currency: 'EUR',
        }}
        tooltip={true}
        onChange={({ value }) => console.log('onChange:', value)}
      />
      <Slider
        multiThumbBehavior="push"
        min={-40}
        value={[-10, 50, 70]}
        step={1}
        label="Push behavior"
        numberFormat={{
          currency: true,
        }}
        tooltip={true}
        onChange={({ value, number }) =>
          console.log('onChange:', value, number)
        }
      />
    </Flex.Vertical>
  </Provider>,
)
```

### Vertical slider with steps of 10

```tsx
const VerticalWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 12rem; /* max-height works fine except in Safari */
`
render(
  <VerticalWrapper>
    <Slider
      min={0}
      max={100}
      value={20}
      step={10}
      vertical={true}
      label="Vertical slider"
      labelDirection="vertical"
      onChange={({ value }) => console.log('onChange:', value)}
    />
  </VerticalWrapper>,
)
```

### Horizontal and vertical slider in sync with input field

```tsx
const Component = () => {
  const [value, setValue] = React.useState(70)
  return (
    <>
      <Slider
        value={value}
        step={1}
        hideButtons
        label="Slider A"
        numberFormat={{
          currency: 'EUR',
        }}
        tooltip={true}
        onChange={({ value }) => setValue(parseFloat(String(value)))}
      />
      <VerticalWrapper>
        <Slider
          value={value}
          vertical={true}
          hideButtons={true}
          step={10}
          label="Slider B"
          labelDirection="vertical"
          numberFormat={(value) =>
            format(value, {
              currency: 'NOK',
            })
          }
          tooltip
          alwaysShowTooltip
          onChange={({ value }) => setValue(parseFloat(String(value)))}
        />
        <Input
          align="center"
          selectall
          value={String(value)}
          on_change={({ value }) => setValue(value)}
        />
      </VerticalWrapper>
    </>
  )
}
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
`
render(<Component />)
```

### Slider with a suffix

```tsx
render(
  <Slider
    min={0}
    max={100}
    value={70}
    label="Slider with suffix"
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
  />,
)
```

### Slider with a marker

Marks a given point in the Slider with a small marker. If `text` property is provided to the `marker` object, it will be displayed in a tooltip.

You can import the marker like so:

```ts
import { SliderMarker } from '@dnb/eufemia/components/Slider'
```

```tsx
render(
  <Slider
    min={0}
    max={100}
    value={50}
    extensions={{
      marker: {
        instance: SliderMarker,
        value: 20,
        text: 'Default value',
      },
    }}
    label="Slider with marker"
  />,
)
```
