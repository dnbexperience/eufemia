---
title: 'Iterate.Visibility'
description: 'The `Iterate.Visibility` component allows you to conditionally display content based on relative paths (`itemPath`) within an `Iterate.Array` component.'
version: 11.0.4
generatedAt: 2026-04-29T19:30:11.641Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Iterate.Visibility

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Visibility />)
```

## Description

The `Iterate.Visibility` component allows you to conditionally display content based on relative paths (`itemPath`) within an [Iterate.Array](/uilib/extensions/forms/Iterate/Array/) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate/Visibility)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate/Visibility)

Fore more details, head over to the [Form.Visibility](/uilib/extensions/forms/Form/Visibility/) component documentation.

## Demos

### Basic example

```tsx
render(
  <Form.Handler
    defaultData={{
      myList: [
        {
          toggleValue: false,
        },
        {
          toggleValue: true,
        },
      ],
    }}
  >
    <Iterate.Array path="/myList">
      <Field.Boolean
        label="Show content for item no. {itemNo}"
        variant="checkbox"
        itemPath="/toggleValue"
      />
      <Iterate.Visibility pathTrue="/toggleValue" animate>
        <TestElement>
          <Iterate.ItemNo>
            {'Hide and show me item no. {itemNo}'}
          </Iterate.ItemNo>
        </TestElement>
      </Iterate.Visibility>
    </Iterate.Array>
  </Form.Handler>
)
```

## Properties

```json
{
  "props": {
    "visibleWhen": {
      "doc": "Provide a `path` or `itemPath`, and a `hasValue` function that returns either a boolean or the expected value to determine whether the children should be shown. The first parameter passed to `hasValue` is the value at the given `path`. If the `path` does not exist, the value will be `undefined`. \nAlternatively, you can use `isValid` instead of `hasValue` to show the children only when the field has no validation errors and has been blurred (lost focus). You can change this behavior by setting the `validateContinuously` property.",
      "type": "object",
      "status": "optional"
    },
    "visibleWhenNot": {
      "doc": "Same as `visibleWhen`, but with inverted logic.",
      "type": "object",
      "status": "optional"
    },
    "pathDefined": {
      "doc": "Given data context path must be defined to show children.",
      "type": "string",
      "status": "optional"
    },
    "pathUndefined": {
      "doc": "Given data context path must be `undefined` to show children.",
      "type": "string",
      "status": "optional"
    },
    "pathTruthy": {
      "doc": "Given data context path must be truthy to show children.",
      "type": "string",
      "status": "optional"
    },
    "pathFalsy": {
      "doc": "Given data context path must be falsy to show children.",
      "type": "string",
      "status": "optional"
    },
    "pathTrue": {
      "doc": "Given data context path must be `true` to show children.",
      "type": "string",
      "status": "optional"
    },
    "pathFalse": {
      "doc": "Given data context path must be `false` to show children.",
      "type": "string",
      "status": "optional"
    },
    "inferData": {
      "doc": "Will be called to decide by external logic, and show/hide contents based on the return value.",
      "type": "function",
      "status": "optional"
    },
    "visible": {
      "doc": "Control visibility directly using the `visible` property. When used alongside other conditions, the `visible` property takes precedence.",
      "type": "boolean",
      "status": "optional"
    },
    "animate": {
      "doc": "Define if the content should animate during show/hide.",
      "type": "boolean",
      "status": "optional"
    },
    "keepInDOM": {
      "doc": "Keep the content in the DOM, even if it's not visible. Can be used to let fields run validation.",
      "type": "boolean",
      "status": "optional"
    },
    "compensateForGap": {
      "doc": "To compensate for CSS gap between the rows, so animation does not jump during the animation. Provide a CSS unit or `auto`. Defaults to `null`.",
      "type": "string",
      "status": "optional"
    },
    "filterData": {
      "doc": "Filter data based on provided criteria. More info about `filterData` can be found in the [Getting Started](/uilib/extensions/forms/getting-started/#filter-data) documentation.",
      "type": ["object", "function"],
      "status": "optional"
    },
    "fieldPropsWhenHidden": {
      "doc": "When visibility is hidden, and `keepInDOM` is `true`, pass these properties to the children.",
      "type": "\"various\"",
      "status": "optional"
    },
    "element": {
      "doc": "Define the type of element. Defaults to `div`. Only for when `animate` is `true`.",
      "type": ["string", "React.Element"],
      "status": "optional"
    },
    "children": {
      "doc": "Contents.",
      "type": "React.ReactNode",
      "status": "required"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onVisible": {
      "doc": "Callback for when the content gets visible. Returns a boolean as the first parameter.",
      "type": "function",
      "status": "optional"
    },
    "onAnimationEnd": {
      "doc": "Is called when animation is done and the full height is reached. The first parameter is a string. Depending on the state, the value can be `opened`, `closed` or `adjusted`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
