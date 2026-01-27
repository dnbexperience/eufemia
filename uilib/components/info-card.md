---
title: 'InfoCard'
description: 'The InfoCard is used to give the user more information than a message box. It can also be used to give useful tips.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.785Z
checksum: f6295c152a47dd0bea9fa6ad3b8f342db592822c333edb25d08c39ed5acf57a5
---

# InfoCard

## Import

```tsx
import { InfoCard } from '@dnb/eufemia'
```

## Description

The InfoCard is used to give the user more information than a [FormStatus](/uilib/components/form-status/) (message box). It can also be used to give useful tips.

The text content is set to a max width of 70 characters to ensure an optimal [UU](https://www.uutilsynet.no/veiledning/tekst-og-struktur/226) recommended reading lengths.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=20315-8016)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/info-card)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/info-card)

## Demos

### InfoCard (default)

```tsx
render(
  <InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />
)
```

### InfoCard with a title

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
  />
)
```

### InfoCard with a stretched container

```tsx
render(
  <InfoCard
    stretch
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
  />
)
```

### InfoCard with Buttons

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    closeButtonText="Close"
    onClose={() => {
      console.log('onClose')
    }}
    acceptButtonText="Accept"
    onAccept={() => {
      console.log('onAccept')
    }}
  />
)
```

```tsx
render(
  <InfoCard
    centered
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    closeButtonText="Close"
    onClose={() => {
      console.log('onClose')
    }}
    acceptButtonText="Accept"
    onAccept={() => {
      console.log('onAccept')
    }}
  />
)
```

Each button can be used independently.

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    acceptButtonText="Accept"
    onAccept={() => {
      console.log('onAccept')
    }}
  />
)
```

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    closeButtonText="Close"
    onClose={() => {
      console.log('onClose')
    }}
  />
)
```

### InfoCard accepts a custom icon

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    icon={Card}
  />
)
```

### InfoCard centered content

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    centered={true}
  />
)
```

### InfoCard without drop shadow

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    dropShadow={false}
  />
)
```

### InfoCard custom image

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="This is the InfoCard with a custom image"
    src="/images/avatars/1501870.jpg"
    alt="Profile picture"
  />
)
```

### InfoCard custom image centered

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="This is the InfoCard with a custom image"
    centered={true}
    src="/images/avatars/1501870.jpg"
    alt="Profile picture"
  />
)
```

### InfoCard with children

```tsx
render(
  <InfoCard
    title="Title of your info/tip"
    acceptButtonText="Accept"
    onAccept={() => {
      console.log('onAccept')
    }}
  >
    <P>I want to inform you about the following items:</P>
    <Ul>
      <Li>Item 1</Li>
      <Li>Item 2</Li>
    </Ul>
    <P>Is this okay with you?</P>
  </InfoCard>
)
```

## Properties

```json
{
  "props": {
    "text": {
      "doc": "The text content of the InfoCard, displayed/rendered in a paragraph. To fully customize the content, see `children` property.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "title": {
      "doc": "The title of the InfoCard.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "centered": {
      "doc": "Centers the content. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "dropShadow": {
      "doc": "Sets the drop shadow of the info card. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "stretch": {
      "doc": "Stretch the card to fill the container.",
      "type": "boolean",
      "status": "optional"
    },
    "className": {
      "doc": "Custom className for the component root.",
      "type": "string",
      "status": "optional"
    },
    "icon": {
      "doc": "Custom icon. Defaults to the `lightbulb` icon.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "imgProps": {
      "doc": "[Image properties](/uilib/elements/image) applied to the `img` element if the component is used to display an image.",
      "type": "ImgProps",
      "status": "optional"
    },
    "alt": {
      "doc": "Used in combination with `src` to provide an alt attribute for the image element.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "src": {
      "doc": "Specifies the path to the image.",
      "type": "string",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "closeButtonText": {
      "doc": "The close button text.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "closeButtonAttributes": {
      "doc": "Define any valid Eufemia [Button properties](/uilib/components/button/properties) or HTML attribute inside an object.",
      "type": "ButtonProps",
      "status": "optional"
    },
    "acceptButtonText": {
      "doc": "The accept button text.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "acceptButtonAttributes": {
      "doc": "Define any valid Eufemia [Button properties](/uilib/components/button/properties) or HTML attribute inside an object.",
      "type": "ButtonProps",
      "status": "optional"
    },
    "children": {
      "doc": "Can be used to add custom content, which is displayed/rendered between the `text` property and buttons.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onAccept": {
      "doc": "Will be called when user clicks the accept button.",
      "type": "function",
      "status": "optional"
    },
    "onClose": {
      "doc": "Will be called when user clicks the close button.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
