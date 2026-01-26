---
title: 'Button'
description: 'The Button component should be used as the primary call-to-action in a form, or as a user interaction mechanism.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.228Z
checksum: 645a291f4bd74f6bc8be1d0815e533a6c6cc7067120767ff62377a423b90c256
---

# Button

## Import

```tsx
import { Button } from '@dnb/eufemia'
```

## Description

The Button component should be used as the **primary call-to-action** in a form, or as a user interaction mechanism.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=339-154)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/button)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/button)

### Variants and sizes

There should never be more than one `primary` button in a given context. The `secondary` and `tertiary` button variants do not have this constraint. A button should not be used when a link would suffice.

The Button component comes in different sizes.

For the primary variant, the recommended sizes are `default` and `large`.

```tsx
<Button
  text="Default button"
  on_click={() => {
    console.log('on_click')
  }}
/>
<Button
  text="Large button"
  on_click={() => {
    console.log('on_click')
  }}
  size="large"
  left
/>
<Button
  text="Default button icon"
  on_click={() => {
    console.log('on_click')
  }}
  icon="chevron_right"
  left
/>
<Button
  text="Large button icon"
  on_click={() => {
    console.log('on_click')
  }}
  size="large"
  icon="chevron_right"
  left
/>
```

For the secondary variant, the recommended sizes are `default` and `large`.

```tsx
<Button
  text="Default button"
  on_click={() => {
    console.log('on_click')
  }}
  variant="secondary"
/>
<Button
  text="Large button"
  on_click={() => {
    console.log('on_click')
  }}
  size="large"
  variant="secondary"
  left
/>
<Button
  text="Default button icon"
  on_click={() => {
    console.log('on_click')
  }}
  icon="chevron_right"
  variant="secondary"
  left
/>
<Button
  text="Large button icon"
  on_click={() => {
    console.log('on_click')
  }}
  size="large"
  icon="chevron_right"
  variant="secondary"
  left
/>
```

For the tertiary variant, the recommended size is `default`. A variant with `icon_position="top"` is also available.

It is **not** recommended to use the tertiary button without an icon. Looking for a similar variant without an icon? Check out [Anchor](/uilib/components/anchor) instead.

```tsx
<Button
  text="Default button"
  on_click={() => {
    console.log('on_click')
  }}
  icon="chevron_right"
  variant="tertiary"
/>
<Button
  text="Button large"
  on_click={() => {
    console.log('on_click')
  }}
  icon="chevron_right"
  variant="tertiary"
  size="large"
  left
/>
<Button
  text="Button text"
  on_click={() => {
    console.log('on_click')
  }}
  icon="bell"
  icon_position="top"
  variant="tertiary"
  left
/>
```

For the signal variant, the recommended sizes are `default` and `large`.

```tsx
<Button
  text="Default button"
  on_click={() => {
    console.log('on_click')
  }}
  variant="signal"
/>
<Button
  text="Large button"
  on_click={() => {
    console.log('on_click')
  }}
  size="large"
  variant="signal"
  left
/>
<Button
  text="Default button icon"
  on_click={() => {
    console.log('on_click')
  }}
  icon="chevron_right"
  variant="signal"
  left
/>
<Button
  text="Large button icon"
  on_click={() => {
    console.log('on_click')
  }}
  size="large"
  icon="chevron_right"
  variant="signal"
  left
/>
```

Icon buttons come in all sizes.

```tsx
<Button
  title="Small sized button with add icon"
  icon="add"
  size="small"
/>
<Button
  title="Medium sized button with add icon (default)"
  icon="add"
  size="medium"
  left
/>
<Button
  title="Default sized button with add icon (not default)"
  icon="add"
  size="default"
  left
/>
<Button
  title="Large sized button with add icon"
  icon="add"
  size="large"
  left
/>
```

## Demos

### Primary button

```tsx
render(
  <Button
    text="Primary button with text only"
    on_click={() => {
      console.log('on_click')
    }}
    data-visual-test="button-primary"
  />
)
```

### Secondary button

```tsx
render(
  <Button
    variant="secondary"
    onClick={() => {
      console.log('onClick')
    }}
    data-visual-test="button-secondary"
  >
    Secondary button with text only
  </Button>
)
```

### Primary button with icon

```tsx
render(<Button text="Primary button with icon" icon="chevron_right" />)
```

### Primary button with icon on left

```tsx
render(
  <Button icon_position="left" icon="chevron_left">
    Primary button with icon on left
  </Button>
)
```

### Tertiary button

The tertiary button variant does support newlines while the icon is placed top aligned. You can enable multiline support with the `wrap` property.

```tsx
<Button
  variant="tertiary"
  text="Tertiary button with icon on left"
  icon_position="left"
  icon="chevron_left"
  data-visual-test="button-tertiary"
/>
<Button
  variant="tertiary"
  text={<span>Text inside additional span</span>}
  icon_position="left"
  icon="chevron_left"
  left
/>
```

Tertiary button with **top** placed icon.

```tsx
<Button
  variant="tertiary"
  icon_position="top"
  icon="close"
  text="Button text"
/>
<Button
  variant="tertiary"
  icon_position="top"
  icon="close"
  text="Large button"
  size="large"
/>
```

Tertiary button with long text and text `wrap` enabled.

```tsx
render(
  <Button
    wrap
    variant="tertiary"
    text="A long text where wrap is enabled magnis rutrum netus neque ridiculus euismod sit dictum laoreet libero"
    icon="chevron_left"
    icon_position="left"
  />
)
```

### Anchor button

```tsx
<Button
  text="Primary with href"
  href="/uilib/components/button/demos"
  icon_position="right"
  icon="chevron_right"
  on_click={({ event }) => {
    event.preventDefault()
  }}
  right
/>
<Button
  variant="secondary"
  text="Secondary with href"
  href="/uilib/components/button/demos"
  target="_blank"
  right
/>
<Button
  href="/uilib/components/button/demos"
  title="This is a link"
  icon="chevron_right"
  size="default"
  right
/>
```

### Disabled buttons

```tsx
<Button text="Disabled primary button" disabled right />
<Button
  text="Disabled secondary button"
  variant="secondary"
  disabled
  right
/>
<Button
  text="Disabled tertiary button"
  variant="tertiary"
  disabled
  right
/>
<Button title="Disabled Icon Button" icon="calendar" disabled right />
<Button
  text="Disabled button with href"
  href="/uilib/components/button/demos"
  target="_blank"
  disabled
/>
```

### Signal button

Medium is equivalent to 24, but responsive. To import custom icons, use: `import { bell_medium as Bell } from '@dnb/eufemia/icons'`

```tsx
render(
  <Button
    variant="signal"
    text="Signal Button"
    icon={Bell}
    data-visual-test="button-signal"
  />
)
```

### Large Signal button

Large Signal button with medium sized icon. To import custom icons, use: `import { bell_medium as Bell } from '@dnb/eufemia/icons'`

```tsx
render(
  <Button
    variant="signal"
    text="Large Signal Button"
    icon={<Bell />}
    size="large"
    icon_size="medium"
  />
)
```

### Icon button

When the button has no text an `aria-label` attribute is required for accessibility. And a `title` attribute is recommended for mouse hover.

We automatically add an `aria-label` with the same value as `title` if `text` and `children` properties are undefined. So in most cases you only have to set the `title` property.

```tsx
<Button
  title="Disabled Icon only Button"
  icon="calendar"
  disabled
  right
/>
<Button
  title="Button with Icon only"
  icon="calendar"
  data-visual-test="button-icon"
/>
<Button title="Small sized icon button" icon="add" size="small" left />
<Button
  title="Large sized icon button"
  icon={question}
  size="large"
  left
/>
<Button
  title="Icon button with status"
  icon={question}
  status="error"
  left
/>
<VisibilityByTheme visible="sbanken">
  <Button
    title="Tertiary icon button"
    size="large"
    icon={question}
    variant="tertiary"
    data-visual-test="button-icon-tertiary"
  />
</VisibilityByTheme>
```

### Custom button content

This is, as all of the demos, only an example of how to achieve various needs, and not that you should do it.

```tsx
render(
  <Button
    icon="close"
    icon_position="right"
    text="Button with custom content"
    custom_content={<IconPrimary icon="check" right="small" />}
  />
)
```

```tsx
<Button
  text="Primary button error"
  status="error"
  data-visual-test="button-error-primary"
/>
<Button
  text="Secondary button error"
  variant="secondary"
  status="error"
  left
  data-visual-test="button-error-secondary"
/>
<Button
  text="Tertiary button error"
  icon="chevron_right"
  variant="tertiary"
  status="error"
  left
  data-visual-test="button-error-tertiary"
/>
<Button
  title="Primary icon button error"
  variant="primary"
  icon={question}
  size="default"
  status="error"
  left
/>
<Button
  title="Secondary icon button error"
  icon={question}
  size="default"
  status="error"
  left
/>
```

### Button on dark background

When placing the button on a dark background wrap the content of the dark section with `<Theme.Provider darkBackground>`
to get the correct styles.

```tsx
render(
  <Section innerSpace="1rem" backgroundColor="var(--sb-color-purple)">
    <Theme.Provider darkBackground>
      <Button data-visual-test="button-primary-on-dark" right>
        Primary button
      </Button>
      <Button
        data-visual-test="button-secondary-on-dark"
        right
        variant="secondary"
      >
        Secondary button
      </Button>
      <Button
        data-visual-test="button-tertiary-on-dark"
        variant="tertiary"
        icon_position="left"
        icon="chevron_left"
      >
        Tertiary button
      </Button>
    </Theme.Provider>
  </Section>
)
```

## Properties

```json
{
  "type": {
    "doc": "The type HTML attribute. Defaults to `button` for legacy reasons.",
    "type": ["button", "reset", "submit"],
    "status": "optional"
  },
  "text": {
    "doc": "The content of the button can be a string or a React Element.",
    "type": ["string", "React.ReactNode"],
    "status": "optional"
  },
  "aria-label": {
    "doc": "Required if there is no text in the button. If `text` and `children` are undefined, setting the `title` property will automatically set `aria-label` with the same value.",
    "type": "string",
    "status": "optional"
  },
  "title": {
    "doc": "Required if there is no text in the button. If `text` and `children` are undefined, setting the `title` property will automatically set `aria-label` with the same value.",
    "type": "string",
    "status": "optional"
  },
  "variant": {
    "doc": "Defines the kind of button. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `primary` (or `secondary` if icon only).",
    "type": ["primary", "secondary", "tertiary", "signal"],
    "status": "optional"
  },
  "size": {
    "doc": "The size of the button. For now there is `small`, `medium`, `default` and `large`.",
    "type": ["small", "medium", "default", "large"],
    "status": "optional"
  },
  "icon": {
    "doc": "To be included in the button. [Primary Icons](/icons/primary) can be set as a string (e.g. `icon=\"chevron_right\"`), other icons should be set as React elements.",
    "type": ["string", "React.ReactNode"],
    "status": "optional"
  },
  "icon_position": {
    "doc": "Position of icon inside the button. Set to `left` or `right`. Tertiary button variant also supports `top`. Defaults to `right` if not set.",
    "type": ["left", "right", "top"],
    "status": "optional"
  },
  "icon_size": {
    "doc": "Define icon width and height. Defaults to 16px.",
    "type": "string",
    "status": "optional"
  },
  "href": {
    "doc": "If you want the button to behave as a link. Use with caution! A link should normally visually be a link and not a button.",
    "type": "string",
    "status": "optional"
  },
  "target": {
    "doc": "When button behaves as a link. Used to specify where to open the linked document, specified by `href`. Possible values are `_self`, `_blank`, `_parent` and `_top`.",
    "type": ["_self", "_blank", "_parent", "_top"],
    "status": "optional"
  },
  "rel": {
    "doc": "When button behaves as a link. Used to specify the relationship between a linked resource and the current document. Examples(non-exhaustive list) of values are `nofollow`, `search`, and `tag`.",
    "type": "string",
    "status": "optional"
  },
  "to": {
    "doc": "Use this property only if you are using a router Link component as the `element` that uses the `to` property to declare the navigation url.",
    "type": "string",
    "status": "optional"
  },
  "wrap": {
    "doc": "If set to `true` the button text will wrap in to new lines if the overflow point is reached. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "stretch": {
    "doc": "Set it to `true` in order to stretch the button to the available space. Defaults to false.",
    "type": "boolean",
    "status": "optional"
  },
  "bounding": {
    "doc": "Set it to `true` in order to extend the bounding box (above the visual button background). You may also look into the HTML class `dnb-button__bounding` if it needs some CSS customization in order to get the particular button right for your use-case.",
    "type": "boolean",
    "status": "optional"
  },
  "element": {
    "doc": "Only meant to be used for special use cases. Defaults to `button` or `a` depending if href is set or not.",
    "type": "string",
    "status": "optional"
  },
  "custom_content": {
    "doc": "If you need to inject completely custom markup (React Element) into the button component. You have then to handle alignment and styling by yourself.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "skeleton": {
    "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
    "type": "boolean",
    "status": "optional"
  },
  "tooltip": {
    "doc": "Provide a string or a React Element to be shown as the tooltip content.",
    "type": ["string", "React.ReactNode"],
    "status": "optional"
  },
  "status": {
    "doc": "Set it to either `status=\"error\"` or a text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
    "type": ["error", "info", "boolean"],
    "status": "optional"
  },
  "status_state": {
    "doc": "Defines the state of the status. Currently there are two statuses `[error, info]`. Defaults to `error`.",
    "type": ["error", "info"],
    "status": "optional"
  },
  "status_props": {
    "doc": "Use an object to define additional FormStatus properties.",
    "type": "object",
    "status": "optional"
  },
  "globalStatus": {
    "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
    "type": "object",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

### Unstyled variant

In cases where it makes sense to use the button component, but with very different styles, you can use `unstyled` as a variant. For now, it is only meant to be used internally.

## Events

```json
{
  "on_click": {
    "doc": "Will be called on a click event. Returns an object with the native event: `{ event }`.",
    "type": "function",
    "status": "optional"
  }
}
```
