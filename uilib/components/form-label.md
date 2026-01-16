---
title: 'FormLabel'
description: 'The FormLabel component represents a caption for all sorts of HTML elements in a user interface.'
metadata: https://eufemia.dnb.no/uilib/components/form-label/metadata.json
---

## Import

```tsx
import { FormLabel } from '@dnb/eufemia'
```

## Description

The FormLabel component represents a caption for all sorts of HTML elements in a user interface.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=44978-544)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/form-label)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/form-label)

### Colon character

DNB UX has chosen to not use colon on the end of form element labels. For consistency throughout our websites, please avoid using them.

## Demos

### Default form-label

```tsx
<FormLabel forId="alone-1">Default horizontal FormLabel</FormLabel>
<Checkbox id="alone-1" label="Checkbox" />
```

### Vertical form-label

```tsx
<FormLabel forId="alone-2" vertical>
  Vertical FormLabel
</FormLabel>
<Checkbox id="alone-2" label="Checkbox" />
```

### Vertical form-label without a `forId`

```tsx
<FormLabel vertical={true}>Without forId (select me)</FormLabel>
<Checkbox label="Checkbox" />
```

### Linked label (pattern)

```tsx
render(
  <form>
    <div>
      <div>
        <FormLabel forId="switch-1" text="Form Label (click me):" />
      </div>
      <div>
        <Switch id="switch-1" value="Value of switch" />
      </div>
    </div>
  </form>,
)
```
