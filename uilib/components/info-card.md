---
title: 'InfoCard'
description: 'The InfoCard is used to give the user more information than a message box. It can also be used to give useful tips.'
metadata: https://eufemia.dnb.no/uilib/components/info-card/metadata.json
---

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
  <InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />,
)
```

### InfoCard with a title

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
  />,
)
```

### InfoCard with a stretched container

```tsx
render(
  <InfoCard
    stretch
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
  />,
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
  />,
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
  />,
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
  />,
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
  />,
)
```

### InfoCard accepts a custom icon

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    icon={Card}
  />,
)
```

### InfoCard centered content

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    centered={true}
  />,
)
```

### InfoCard without drop shadow

```tsx
render(
  <InfoCard
    text="This is a description of some information or a tip that will inform the user of something that will help them."
    title="Title of your info/tip"
    dropShadow={false}
  />,
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
  />,
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
  />,
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
  </InfoCard>,
)
```
