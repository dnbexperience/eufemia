---
title: 'Avatar'
description: 'The Avatar component is an identifier that makes people and companies more scannable.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.616Z
checksum: ff009813a4f1ecae3163225075557e7175e0fd0d77c827e8fc7e043b3f87a0b4
---

# Avatar

## Import

```tsx
import { Avatar } from '@dnb/eufemia'
```

## Description

Avatars are identifiers that make people and companies more scannable for payments, spending overviews, and social functionality. The fallback for a person is the letter version that uses the first letter of a person's name. A company has the icon version as its default/fallback. The badge is used to mark country/currency if needed.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=17869-0)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/avatar)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/avatar)

## Demos

### Avatar

To ensure the correct use of Avatars, we require using a `Avatar.Group` with `Avatar`-components as children. <br/>
The required `label`-property in `Avatar.Group` will ensure the correct use of accessibility for screen readers. <br/>
See more examples below.

### Setting property `size`

#### default `size` is 'medium'

```tsx
render(
  <Avatar.Group label="Persons">
    <Avatar>Ola Nordmann</Avatar>
  </Avatar.Group>
)
```

#### `size` 'small'

```tsx
Text{' '}
<Avatar.Group label="Animals">
  <Avatar size="small">Duck</Avatar>
</Avatar.Group>{' '}
Text
```

#### `size` 'medium'

```tsx
render(
  <Avatar.Group label="Stocks">
    <Avatar size="medium">NFLX</Avatar>
  </Avatar.Group>
)
```

#### `size` 'large'

```tsx
render(
  <Avatar.Group label="Companies">
    <Avatar size="large">Amazon</Avatar>
  </Avatar.Group>
)
```

#### `size` 'x-large'

```tsx
render(
  <Avatar.Group label="TV Shows">
    <Avatar size="x-large">Friends</Avatar>
  </Avatar.Group>
)
```

### Setting property `variant`

#### default `variant` is 'primary'

```tsx
render(
  <Avatar.Group label="Dogs">
    <Avatar>Kleiner münsterländer</Avatar>
  </Avatar.Group>
)
```

#### `variant` 'primary'

```tsx
render(
  <Avatar.Group label="Cities">
    <Avatar variant="primary">Oslo</Avatar>
  </Avatar.Group>
)
```

#### `variant` 'secondary'

```tsx
render(
  <Avatar.Group label="Countries">
    <Avatar variant="secondary">Spain</Avatar>
  </Avatar.Group>
)
```

#### `variant` 'tertiary'

```tsx
render(
  <Avatar.Group label="Cars">
    <Avatar variant="tertiary">Tesla</Avatar>
  </Avatar.Group>
)
```

### Passing `icon`

#### Auto-size

An icon will automatically be given the correct size (`size="auto"`) unless the icon's `size` property is set.

```tsx
<Avatar icon={Bank} size="small" />
<Avatar icon={BankMedium} />
<Avatar icon={BankMedium} size="large" />
<Avatar icon={BankMedium} size="x-large" />
```

#### Accepted values

The `icon` property can accept either an imported icon, a primary icon string, or an `<Icon>` or `<IconPrimary>` component.

```
import {
  calendar_medium as CalendarMedium,
} from '@dnb/eufemia/src/icons'
```

```tsx
render(
  <Avatar.Group label="Icons" variant="secondary">
    <Avatar icon={CalendarMedium} />
    <Avatar icon="calendar_medium" />
    <Avatar icon={<IconPrimary icon={CalendarMedium} />} />
    <Avatar icon={<Icon icon={CalendarMedium} />} />
  </Avatar.Group>
)
```

### Passing `children`

```tsx
render(
  <Avatar.Group label="Logos">
    <Avatar>
      <Logo size="auto" inheritColor />
    </Avatar>
  </Avatar.Group>
)
```

#### Icon as child

A single `<Icon>` or `<IconPrimary>` component sent as a child will also follow the same auto sizing rules as the `icon` property.

```tsx
render(
  <Avatar.Group label="Icons">
    <Avatar variant="tertiary">
      <Icon icon={AccountCardMedium} />
    </Avatar>
  </Avatar.Group>
)
```

### Passing image as `src`

```tsx
render(
  <Avatar.Group label="Icons">
    <Avatar
      variant="tertiary"
      src="/dnb/safari-pinned-tab.svg"
      alt="DNB Logo"
    />
  </Avatar.Group>
)
```

```tsx
render(
  <Avatar.Group label="Banks">
    <Avatar
      src="/dnb/android-chrome-192x192.png"
      alt="DNB Logo"
      size="x-large"
    />
  </Avatar.Group>
)
```

```tsx
render(
  <Avatar.Group label="Profiles">
    <Avatar
      src="/images/avatars/1501870.jpg"
      alt="Profile picture"
      size="large"
    />
  </Avatar.Group>
)
```

```tsx
render(
  <Avatar.Group label="Images of banks">
    <Avatar
      variant="secondary"
      size="large"
      imgProps={{
        width: '48',
        height: '48',
        src: '/dnb/android-chrome-192x192.png',
        alt: 'DNB Logo',
      }}
    />
  </Avatar.Group>
)
```

### Grouping Avatars

```tsx
Text{' '}
<Avatar.Group
  label="Friends"
  size="small"
  variant="primary"
  maxElements={6}
>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>{' '}
Text
```

```tsx
render(
  <Avatar.Group label="Employees" size="medium" maxElements={5}>
    <Avatar>Anders</Avatar>
    <Avatar>Bjørnar</Avatar>
    <Avatar>Cathrine</Avatar>
    <Avatar>Didrik</Avatar>
    <Avatar>Erlend</Avatar>
    <Avatar>Frida</Avatar>
    <Avatar>Gøril</Avatar>
  </Avatar.Group>
)
```

```tsx
render(
  <Avatar.Group
    label="Borrowers"
    size="large"
    variant="tertiary"
    maxElements={4}
  >
    <Avatar>Anders</Avatar>
    <Avatar>Bjørnar</Avatar>
    <Avatar>Cathrine</Avatar>
    <Avatar>Didrik</Avatar>
    <Avatar>Erlend</Avatar>
    <Avatar>Frida</Avatar>
    <Avatar>Gøril</Avatar>
  </Avatar.Group>
)
```

```tsx
render(
  <Avatar.Group
    label="Enemies"
    size="x-large"
    variant="secondary"
    maxElements={3}
  >
    <Avatar>Anders</Avatar>
    <Avatar>Bjørnar</Avatar>
    <Avatar>Cathrine</Avatar>
    <Avatar>Didrik</Avatar>
    <Avatar>Erlend</Avatar>
    <Avatar>Frida</Avatar>
    <Avatar>Gøril</Avatar>
  </Avatar.Group>
)
```

```tsx
render(
  <Avatar.Group label="Eufemia contributors" size="large" maxElements={5}>
    <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
    <Avatar src="/images/avatars/35217511.jpg" alt="Profile picture" />
    <Avatar src="/images/avatars/21338570.jpg" alt="Profile picture" />
    <Avatar src="/images/avatars/1359205.jpg" alt="Profile picture" />
    <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
    <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
    <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
  </Avatar.Group>
)
```

### Customizing colors

```tsx
render(
  <Avatar.Group label="Persons">
    <Avatar backgroundColor="fire-red" color="sky-blue">
      Ola Nordmann
    </Avatar>
  </Avatar.Group>
)
```

### Avatar with a [CountryFlag](/uilib/components/country-flag) as a [Badge](/uilib/components/badge)

```tsx
<Badge
  content={<CountryFlag iso="NO" size="xx-small" />}
  vertical="bottom"
  horizontal="right"
  variant="content"
>
  <Avatar.Group label="Persons">
    <Avatar size="small">A</Avatar>
  </Avatar.Group>
</Badge>
<Badge
  content={<CountryFlag iso="NO" size="x-small" />}
  vertical="bottom"
  horizontal="right"
  variant="content"
>
  <Avatar.Group label="Persons">
    <Avatar size="medium">A</Avatar>
  </Avatar.Group>
</Badge>
<Badge
  content={<CountryFlag iso="NO" size="medium" />}
  vertical="bottom"
  horizontal="right"
  variant="content"
>
  <Avatar.Group label="Persons">
    <Avatar size="large">A</Avatar>
  </Avatar.Group>
</Badge>
<Badge
  content={<CountryFlag iso="NO" size="large" />}
  vertical="bottom"
  horizontal="right"
  variant="content"
>
  <Avatar.Group label="Persons">
    <Avatar size="x-large">A</Avatar>
  </Avatar.Group>
</Badge>
```

## Properties

### `Avatar` properties

```json
{
  "props": {
    "size": {
      "doc": "Size of the Avatar. Options: `small` | `medium` | `large` | `x-large`. Defaults to `medium`.",
      "type": ["small", "medium", "large", "x-large"],
      "status": "optional"
    },
    "children": {
      "doc": "Content of the component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "alt": {
      "doc": "Used in combination with `src` to provide an alt attribute for the `img` element.",
      "type": "string",
      "status": "optional"
    },
    "src": {
      "doc": "Specifies the path to the image.",
      "type": "string",
      "status": "optional"
    },
    "imgProps": {
      "doc": "[Image properties](/uilib/elements/image) applied to the `img` element if the component is used to display an image.",
      "type": ["ImgProps"],
      "status": "optional"
    },
    "icon": {
      "doc": "An icon name or component. (Will override the `src` property.)",
      "type": ["string", "[Icon](/uilib/components/icon)"],
      "status": "optional"
    },
    "variant": {
      "doc": "Override the variant of the component. Options: `primary` | `secondary` | `tertiary`. Defaults to `primary`.",
      "type": ["primary", "secondary", "tertiary"],
      "status": "optional"
    },
    "hasLabel": {
      "doc": "If aria-hidden is set to `true` or if a label is given, typical inside a table or dl (definition list), then you can disable Avatar.Group as a dependent of Avatar. Use `true` to omit the `Avatar group required:` warning.",
      "type": "boolean",
      "status": "optional"
    },
    "backgroundColor": {
      "doc": "Define a custom background color, instead of a variant. Use a Eufemia color.",
      "type": "string",
      "status": "optional"
    },
    "color": {
      "doc": "Define a custom color to compliment the backgroundColor. Use a Eufemia color.",
      "type": "string",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```

### `Avatar.Group` properties

```json
{
  "props": {
    "label": {
      "doc": "The label description of the group of avatars.",
      "type": "string",
      "status": "required"
    },
    "size": {
      "doc": "Size of the Avatars, and \"elements hidden text (+x)\". Options: `small` | `medium` | `large` | `x-large`. Defaults to `medium`.",
      "type": ["small", "medium", "large", "x-large"],
      "status": "optional"
    },
    "variant": {
      "doc": "Override the variant of the Avatars. Options: `primary` | `secondary` | `tertiary`. Defaults to `primary`.",
      "type": ["primary", "secondary", "tertiary"],
      "status": "optional"
    },
    "maxElements": {
      "doc": "Number of max displayed elements, including the \"elements hidden text (+x)\". Defaults to `4`.",
      "type": "number",
      "status": "optional"
    },
    "children": {
      "doc": "The Avatars to group.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```
