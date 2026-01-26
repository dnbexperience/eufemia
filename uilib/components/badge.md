---
title: 'Badge'
description: 'The Badge component allows the user to focus on new or unread content or notifications.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.213Z
checksum: 2c1982de052a9d5afd0ac34e55c13a93d11ef62bbd002fa16d2bec40fedc36e4
---

# Badge

## Import

```tsx
import { Badge } from '@dnb/eufemia'
```

## Description

Badge can be overlayed on another element by wrapping it, or can be a standalone badge.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=26322-25223)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/badge)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/badge)

### Badge variants

#### Notification Badge

The notification badge has a very limited use. The area of use is currently limited to a counter of messages in the message center.

#### Information Badge

Can be used to describe or inform about new activity or features in our applications. The label can be placed on top of element backgrounds or inline with text within cells.

The logic of how long it should be visible would differ from case to case, so that's up to the designer.

## Demos

### Setting the `variant` property

#### Information

The default variant. Equivalent to `variant='information'`.

```tsx
render(<Badge content="New" />)
```

```tsx
render(
  <div>
    Text <Badge content="Info" variant="information" /> Text
  </div>
)
```

#### Notification

`variant='notification'`.

```tsx
render(<Badge content={1} label="Notifications" variant="notification" />)
```

```tsx
render(
  <div>
    Text{' '}
    <Badge content={1234} label="Notifications" variant="notification" />{' '}
    Text
  </div>
)
```

### Overlayed badge

You can overlay the badge on top of an element by wrapping the `<Badge>` component around it.

```tsx
render(
  <Badge content="Ny" variant="information">
    <Avatar.Group label="Persons">
      <Avatar size="large" variant="secondary">
        A
      </Avatar>
    </Avatar.Group>
  </Badge>
)
```

```tsx
render(
  <Badge content={1234} label="Notifications" variant="notification">
    <Avatar.Group label="Persons">
      <Avatar size="large">A</Avatar>
    </Avatar.Group>
  </Badge>
)
```

#### Setting property `horizontal` and `vertical`

When overlaying the badge you can control its position.

```tsx
render(
  <Flex.Container>
    <Badge
      content={66}
      label="Notifications"
      vertical="top"
      horizontal="left"
      variant="notification"
      data-visual-test="badge-top-left"
    >
      <Avatar.Group label="Persons">
        <Avatar size="large">A</Avatar>
      </Avatar.Group>
    </Badge>

    <Badge
      content={1234}
      label="Notifications"
      vertical="top"
      horizontal="right"
      variant="notification"
      data-visual-test="badge-top-right"
    >
      <Avatar.Group label="Persons">
        <Avatar size="large">B</Avatar>
      </Avatar.Group>
    </Badge>

    <Badge
      content={13}
      label="Notifications"
      vertical="bottom"
      horizontal="left"
      variant="notification"
      data-visual-test="badge-bottom-left"
    >
      <Avatar.Group label="Persons">
        <Avatar size="large">C</Avatar>
      </Avatar.Group>
    </Badge>

    <Badge
      content={58}
      label="Notifications"
      vertical="bottom"
      horizontal="right"
      variant="notification"
      data-visual-test="badge-bottom-right"
    >
      <Avatar.Group label="Persons">
        <Avatar size="large">D</Avatar>
      </Avatar.Group>
    </Badge>
  </Flex.Container>
)
```

### Setting the `status` and `subtle` properties

The information variant has 5 possible `status` values, and two possible `subtle` values.

The default state is equivalent to `status='default'` and `subtle={false}`.

```tsx
render(
  <Grid.Container
    rowGap
    columnGap
    style={{
      display: 'inline-grid',
      placeItems: 'start',
      gridTemplateColumns: 'repeat(2, auto)',
    }}
  >
    <Badge content="default" status="default" />
    <Badge content="default (subtle)" status="default" subtle />
    <Badge content="neutral" status="neutral" />
    <Badge content="neutral (subtle)" status="neutral" subtle />
    <Badge content="positive" status="positive" />
    <Badge content="positive (subtle)" status="positive" subtle />
    <Badge content="warning" status="warning" />
    <Badge content="warning (subtle)" status="warning" subtle />
    <Badge content="negative" status="negative" />
    <Badge content="negative (subtle)" status="negative" subtle />
  </Grid.Container>
)
```

### Hiding Badge with `hideBadge`

Sometimes you need to hide the badge without hiding the overlayed element. To make this less complicated you can use the `hideBadge` prop.

The example below hides the badge when there are no notifications. You can add or remove notifications with the "+" and "-" buttons.

```tsx
const Example = () => {
  type Data = {
    notifications: number
  }
  const { data } = Form.useData<Data>('badge-hide-example')
  const notifications = data?.notifications
  return (
    <Form.Handler id="badge-hide-example">
      <Form.Card>
        <Badge
          label="Notifications"
          variant="notification"
          content={notifications}
          hideBadge={notifications === 0}
        >
          <Avatar.Group label="Persons">
            <Avatar size="large">A</Avatar>
          </Avatar.Group>
        </Badge>

        <Field.Number
          label="Define number of notifications"
          width="small"
          path="/notifications"
          defaultValue={1}
          minimum={0}
          step={1}
          showStepControls
        />
      </Form.Card>
    </Form.Handler>
  )
}
render(<Example />)
```

## Properties

```json
{
  "content": {
    "doc": "Content of the component.",
    "type": ["string", "number", "React.ReactNode"],
    "status": "optional"
  },
  "children": {
    "doc": "Content to display the badge on top of.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "vertical": {
    "doc": "Vertical positioning of the component. Options: `bottom` | `top`.",
    "type": ["\"top\"", "\"bottom\""],
    "status": "optional"
  },
  "horizontal": {
    "doc": "Horizontal positioning of the component. Options: `left` | `right`.",
    "type": ["\"left\"", "\"right\""],
    "status": "optional"
  },
  "className": {
    "doc": "Custom className for the component.",
    "type": "string",
    "status": "optional"
  },
  "skeleton": {
    "doc": "Applies loading skeleton.",
    "type": "boolean",
    "status": "optional"
  },
  "variant": {
    "doc": "Defines the visual appearance of the badge. There are two main variants `notification` and `information`. The `content` variant is just for placement purposes, and will require you to style the `content` all by yourself. Default variant is `information`.",
    "type": ["\"information\"", "\"notification\"", "\"content\""],
    "status": "optional"
  },
  "status": {
    "doc": "Defines the status color of the `\"information\"` variant. Has no effect on other variants. Default is `\"default\"`.",
    "type": [
      "\"default\"",
      "\"success\"",
      "\"warning\"",
      "\"error\"",
      "\"neutral\""
    ],
    "status": "optional"
  },
  "subtle": {
    "doc": "Applies subtle style to `\"information\"` variant. Has no effect on other variants. Default is `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "hideBadge": {
    "doc": "Removes the badge without removing children. Useful when Badge wraps content. Default is `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "label": {
    "doc": "The label description of the badge. Only required when passing a number as the badge content.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```
