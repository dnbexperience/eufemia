---
title: 'Tag'
description: 'The Tag component is a compact element for displaying discrete information.'
metadata: https://eufemia.dnb.no/uilib/components/tag/metadata.json
---

## Import

```tsx
import { Tag } from '@dnb/eufemia'
```

## Description

The Tag is a compact element for displaying discrete information. The component should have a clear and helpful relationship to the content or task it represents. For example, a Tag can be used to display a category of an item.

Tags with the `onDelete` property can be used to define an action. A clickable tag will change appearance on focus, hover, and click.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=18412-7293)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/tag)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/tag)

## Demos

### Tag

There are three interactive tag variants:

- `clickable` (can also accept a custom icon as it does not have one of its own)
- `addable`
- `removable` (also triggers `onClick` when pressing the `Delete` or `Backspace` keyboard key (`keyup` event), can be disabled with the `omitOnKeyUpDeleteEvent` property)

We require `<Tag>`-components to be wrapped by a `<Tag.Group>`-component. The required `label`-property in `<Tag.Group>` will ensure the correct use of accessibility for screen readers.

```tsx
render(
  <Tag.Group label="Interactable tags">
    <Tag
      data-visual-test="tag-clickable"
      variant="clickable"
      onClick={() => 'click'}
    >
      Clickable
    </Tag>
    <Tag
      data-visual-test="tag-addable"
      variant="addable"
      onClick={() => 'click'}
    >
      Addable
    </Tag>
    <Tag
      data-visual-test="tag-removable"
      variant="removable"
      onClick={() => 'click'}
    >
      Removable
    </Tag>
  </Tag.Group>,
)
```

### Non-interactive tag

- Not interactable
- Can have icon

Non-interactable tags are simply made by skipping all callback properties, and are the only type that can have an icon.

```tsx
render(
  <Tag.Group label="Payment types">
    <Tag>Digipost</Tag>
    <Tag>AvtaleGiro</Tag>
  </Tag.Group>,
)
```

### Non-interactive tag with icon

```tsx
render(
  <Tag.Group label="Betalingstyper">
    <Tag icon={AInvoice} text="AvtaleGiro" />
    <Tag icon={EInvoice} text="eFaktura" />
    <Tag icon={DigiPost} text="DigiPost" />
  </Tag.Group>,
)
```

## Usage examples

### Multiple removable tags

Removable tags can for example be used in filter lists. This is a simple example on how to implement a filter list using removable `Tags`.

```tsx
const Genres = () => {
  const [tagsAdded, setTagsAdded] = React.useState([
    {
      key: 0,
      text: 'Action',
    },
    {
      key: 1,
      text: 'Comedy',
    },
    {
      key: 2,
      text: 'Drama',
    },
    {
      key: 3,
      text: 'Horror',
    },
  ])
  const [tagsRemoved, setTagsRemoved] = React.useState([
    {
      key: 4,
      text: 'Fantasy',
    },
  ])
  const handleRemove = React.useCallback(
    (tagToRemove) => () => {
      setTagsAdded(tagsAdded.filter((tag) => tag.key !== tagToRemove.key))
      setTagsRemoved([...tagsRemoved, tagToRemove])
    },
    [tagsAdded, tagsRemoved],
  )
  const handleAdd = React.useCallback(
    (tagToAdd) => () => {
      setTagsAdded([...tagsAdded, tagToAdd])
      setTagsRemoved(tagsRemoved.filter((tag) => tag.key !== tagToAdd.key))
    },
    [tagsAdded, tagsRemoved],
  )
  return (
    <Flex.Stack>
      <FieldBlock label="Selected">
        <Tag.Group label="Genres Selected">
          {tagsAdded.map((tag) => {
            return (
              <Tag
                key={tag.key}
                text={tag.text}
                variant="removable"
                onClick={handleRemove(tag)}
              />
            )
          })}
        </Tag.Group>
      </FieldBlock>
      <FieldBlock label="Removed">
        <Tag.Group label="Genres Available">
          {tagsRemoved.map((tag) => {
            return (
              <Tag
                key={tag.key}
                text={tag.text}
                variant="addable"
                onClick={handleAdd(tag)}
              />
            )
          })}
        </Tag.Group>
      </FieldBlock>
    </Flex.Stack>
  )
}
render(<Genres />)
```

### Tag used inside text

```tsx
Text{' '}
<Tag.Group label="Inline">
  <Tag text="First" /> between
  <Tag text="Second" />
  <Tag text="Third" />
</Tag.Group>{' '}
Text
```

### Tag used as skeleton

```tsx
render(
  <Tag.Group label="Skeletons">
    <Tag skeleton text="Skeleton" />
    <Tag skeleton text="Skeleton" />
    <Tag skeleton text="Skeleton" />
  </Tag.Group>,
)
```
