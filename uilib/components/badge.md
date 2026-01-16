---
title: 'Badge'
description: 'The Badge component allows the user to focus on new or unread content or notifications.'
metadata: https://eufemia.dnb.no/uilib/components/badge/metadata.json
---

## Import

```tsx
import { Badge } from '@dnb/eufemia'
```

## Description

Badge generates a small badge on its children, or can be an inline/standalone badge.

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

#### Notification

`variant='notification'`.

```tsx
render(<Badge content={1} label="Notifications" variant="notification" />)
```

### Usage examples

```tsx
render(
  <div>
    Text <Badge content="Info" variant="information" /> Text
  </div>,
)
```

```tsx
render(
  <Badge content="Ny" variant="information">
    <Avatar.Group label="Persons">
      <Avatar size="large" variant="secondary">
        A
      </Avatar>
    </Avatar.Group>
  </Badge>,
)
```

```tsx
render(
  <div>
    Text{' '}
    <Badge content={1234} label="Notifications" variant="notification" />{' '}
    Text
  </div>,
)
```

```tsx
render(
  <Badge content={1234} label="Notifications" variant="notification">
    <Avatar.Group label="Persons">
      <Avatar size="large">A</Avatar>
    </Avatar.Group>
  </Badge>,
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
  </Grid.Container>,
)
```

### Setting property `horizontal` and `vertical`

#### `vertical` 'top' `horizontal` 'left'

```tsx
render(
  <Badge
    content={66}
    label="Notifications"
    vertical="top"
    horizontal="left"
    variant="notification"
  >
    <Avatar.Group label="Persons">
      <Avatar size="large">A</Avatar>
    </Avatar.Group>
  </Badge>,
)
```

#### `vertical` 'top' `horizontal` 'right'

```tsx
render(
  <Badge
    content={1234}
    label="Notifications"
    vertical="top"
    horizontal="right"
    variant="notification"
  >
    <Avatar.Group label="Persons">
      <Avatar size="large">A</Avatar>
    </Avatar.Group>
  </Badge>,
)
```

#### `vertical` 'bottom' `horizontal` 'left'

```tsx
render(
  <Badge
    content={13}
    label="Notifications"
    vertical="bottom"
    horizontal="left"
    variant="notification"
  >
    <Avatar.Group label="Persons">
      <Avatar size="large">A</Avatar>
    </Avatar.Group>
  </Badge>,
)
```

#### `vertical` 'bottom' `horizontal` 'right'

```tsx
render(
  <Badge
    content={58}
    label="Notifications"
    vertical="bottom"
    horizontal="right"
    variant="notification"
  >
    <Avatar.Group label="Persons">
      <Avatar size="large">A</Avatar>
    </Avatar.Group>
  </Badge>,
)
```
