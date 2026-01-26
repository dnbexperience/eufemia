---
title: 'Form.Visibility'
description: '`Form.Visibility` makes it possible to hide components and elements on the screen based on the dynamic state of data.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.956Z
checksum: b83c9abcb73fcf248a0f40f68dbecca7fa5983c3d9d6ccbcea536f249aec56d2
---

# Form.Visibility

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Visibility />)
```

## Description

The `Form.Visibility` component allows you to conditionally show or hide components based on the state of data or field validation. You can either provide the values directly via properties or let it read data from a surrounding [Form.Handler](/uilib/extensions/forms/Form/Handler/). This enables dynamic visibility control based on the paths it points to.

### Iterate.Visibility

You can also use the [Iterate.Visibility](/uilib/extensions/forms/Iterate/Visibility/) component to target relative paths (`itemPath`) within an [Iterate.Array](/uilib/extensions/forms/Iterate/Array/) component.

### Data driven visibility

There are several [properties](/uilib/extensions/forms/Form/Visibility/properties/) you can use to control visibility, such as `pathDefined`, `pathTruthy`, `pathTrue` etc.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState">
      show me when the data value is true
    </Form.Visibility>
  </>
)
```

#### Dynamic value driven visibility

You can also use the `visibleWhen` property to conditionally show the children based on the data value of the path.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility
      visibleWhen={{
        path: '/myState',
        hasValue: (value) => value === true,
      }}
    >
      show me when the data value is true
    </Form.Visibility>
  </>
)
```

### Validation driven visibility

You can conditionally display children based on field validation by using the `visibleWhen` property with `isValid: true`:

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <>
    <Field.Boolean path="/myField" />
    <Form.Visibility
      visibleWhen={{
        path: '/myField',
        isValid: true,
      }}
    >
      show me when the validation succeeds
    </Form.Visibility>
  </>
)
```

To prevent visibility changes during user interactions like typing, it shows the children only when the field both has no errors and has lost focus (blurred). You can use the `validateContinuously: true` property to immediately show the children when the field has no errors.

## Accessibility

Children of the `Form.Visibility` component will be hidden from screen readers when visually hidden, even if `keepInDOM` is enabled. You do not need to do anything to make the content additionally inaccessible.

## Animate

You can use the `animate` property to animate the visibility change. It can be used in combination with `keepInDOM`.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState" animate>
      show me when the data value is true
    </Form.Visibility>
  </>
)
```

## Keep in DOM

You can use the `keepInDOM` property to keep the content in the DOM, even if it's not visible or accessible. This can be useful for fields that still need to run validation.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState" keepInDOM>
      show me when the data value is true
    </Form.Visibility>
  </>
)
```

## Disable children fields when hidden

You can disable children fields when they are hidden by using the `fieldPropsWhenHidden` property. It will pass the given properties to the children when the visibility is hidden. It needs to be used in combination with the `keepInDOM` property.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility
      pathTrue="/myState"
      keepInDOM
      fieldPropsWhenHidden={{ disabled: true }}
    >
      <Field.String />
    </Form.Visibility>
  </>
)
```

Check out the [Nested visibility example](#nested-visibility-example) to see how you can use `fieldPropsWhenHidden` and `keepInDOM`.

### Why is this useful?

In some cases, you want to keep the content in the DOM, even if it's not visible. This can be useful for fields that still need to run validation.

## Inherit visibility

By using the provider component `Value.Provider`, you can propagate the visibility (with the `inheritVisibility` property) of the parent to all nested values.

```tsx
import { Form, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Value.Provider inheritVisibility>
      <Value.String path="/foo" />
      <Value.String path="/bar" />
    </Value.Provider>
  </Form.Handler>
)
```

## Demos

### Boolean example

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Field.Boolean
        label="Show content"
        variant="buttons"
        path="/toggleValue"
        value={false}
      />
      <Form.Visibility pathTrue="/toggleValue" animate>
        <TestElement>Item 1</TestElement>
        <TestElement>Item 2</TestElement>
      </Form.Visibility>
    </Flex.Stack>
  </Form.Handler>
)
```

### Matching value

`visibleWhen` is pretty powerful. You can use it to show/hide based on the value of a `path`. You can also give it a `hasValue` function that gives you the current value, so you can assert it and return a boolean based on that.

```jsx
<Form.Visibility
  visibleWhen={{
    path: '/toggleValue',
    hasValue: (value) => value === 'checked',
  }}
>
  Content
</Form.Visibility>
```

```tsx
render(
  <Form.Handler>
    <Field.Toggle
      label="Show content"
      valueOn="checked"
      valueOff="unchecked"
      variant="buttons"
      path="/toggleValue"
      value="unchecked"
    />
    <Form.Visibility
      visibleWhen={{
        path: '/toggleValue',
        hasValue: 'checked',
      }}
      animate
    >
      <P>This is visible</P>
    </Form.Visibility>
  </Form.Handler>
)
```

### Direct properties

```tsx
render(
  <Form.Visibility visible={true}>
    <P>This is visible</P>
  </Form.Visibility>
)
```

### Based on DataContext

```tsx
render(
  <Form.Handler
    data={{
      toBe: true,
      notToBe: false,
    }}
  >
    <Form.Visibility pathTrue="/toBe">
      <P>This will show, as long as `toBe` is true.</P>
    </Form.Visibility>
    <Form.Visibility pathTrue="/notToBe">
      <P>This will not show until `notToBe` is true.</P>
    </Form.Visibility>
  </Form.Handler>
)
```

### InferData

```tsx
const MyComponent = () => {
  const { data } = Form.useData('example-form', {
    toggleValue: false,
  })
  const inferDataFunc = React.useCallback(
    () => data.toggleValue,
    [data.toggleValue]
  )
  return (
    <Form.Handler id="example-form">
      <Flex.Stack>
        <Field.Boolean path="/toggleValue" label="Check me" />
        <Form.Visibility inferData={inferDataFunc} animate>
          <P>This is visible</P>
        </Form.Visibility>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyComponent />)
```

### Nested visibility example

Use `fieldPropsWhenHidden` and `keepInDOM` to keep the content in the DOM, even if it's not visible.

In this example we filter out all fields that have the `data-exclude-field` attribute. See the console output for the result.

```tsx
const filterDataHandler = ({ props }) => !props['data-exclude-field']
const MyForm = () => {
  return (
    <Form.Handler
      defaultData={{
        isVisible: false,
      }}
    >
      <Flex.Stack>
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
          data-exclude-field
        />
        <Form.Visibility
          pathTrue="/isVisible"
          animate
          keepInDOM
          fieldPropsWhenHidden={{
            'data-exclude-field': true,
          }}
        >
          <Field.Selection
            label="Choose"
            variant="radio"
            value="less"
            path="/mySelection"
          >
            <Field.Option value="less" title="Less" />
            <Field.Option value="more" title="More" />
          </Field.Selection>

          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: 'more',
            }}
            animate
            keepInDOM
            fieldPropsWhenHidden={{
              'data-exclude-field': true,
            }}
          >
            <Field.String label="My String" path="/myString" value="foo" />
          </Form.Visibility>
        </Form.Visibility>
      </Flex.Stack>

      <Output />
    </Form.Handler>
  )
}
const Output = () => {
  const { filterData } = Form.useData()
  const filteredData = filterData(filterDataHandler)
  return <Tools.Log data={filteredData} top />
}
render(<MyForm />)
```

### Filter data

**Note:** This example uses `filterData` with `pathDefined` on a Visibility component along, which is a declarative way to describe the data to be shown.

```tsx
const filterDataPaths = {
  '/isVisible': false,
  '/mySelection': ({ data }) => data.isVisible,
  '/myString': ({ data }) => {
    return data.isVisible && data.mySelection === 'more'
  },
}
const MyForm = () => {
  return (
    <Form.Handler
      defaultData={{
        myString: 'foo',
      }}
    >
      <Flex.Stack>
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
          defaultValue={false}
        />
        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.Selection
            label="Choose"
            variant="radio"
            value="less"
            path="/mySelection"
          >
            <Field.Option value="less" title="Less" />
            <Field.Option value="more" title="More" />
          </Field.Selection>

          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: 'more',
            }}
            animate
          >
            <Field.String label="My String" path="/myString" />
          </Form.Visibility>
        </Form.Visibility>

        <Form.Visibility
          pathDefined="/myString"
          filterData={filterDataPaths}
          animate
        >
          <Form.Card>
            <P>
              Result: <Value.String path="/myString" inline />
            </P>
          </Form.Card>
        </Form.Visibility>
      </Flex.Stack>

      <Output />
    </Form.Handler>
  )
}
const Output = () => {
  const { filterData } = Form.useData()
  const filteredData = filterData(filterDataPaths)
  return <Tools.Log data={filteredData} top />
}
render(<MyForm />)
```

### Inherit visibility

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Field.Boolean
        variant="button"
        path="/isVisible"
        defaultValue={true}
      />

      <Form.Visibility pathTrue="/isVisible" animate>
        <Field.Name.First path="/foo" defaultValue="foo" />
        <Field.Name.Last path="/bar" defaultValue="bar" />
      </Form.Visibility>

      <Value.Provider inheritVisibility>
        <HeightAnimation>
          <Value.SummaryList>
            <Value.Name.First path="/foo" />
            <Value.Name.First path="/bar" />
          </Value.SummaryList>
        </HeightAnimation>
      </Value.Provider>
    </Form.Card>
  </Form.Handler>
)
```

### Show children when field has no errors (validation)

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Field.Name.First path="/foo" required />

      <Form.Visibility
        visibleWhen={{
          path: '/foo',
          isValid: true,
        }}
        animate
      >
        <Value.Name.First path="/foo" />
      </Form.Visibility>
    </Form.Card>
  </Form.Handler>
)
```

## Properties

```json
{
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
    "doc": "Given data context path must be undefined to show children.",
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
    "doc": "Given data context path must be true to show children.",
    "type": "string",
    "status": "optional"
  },
  "pathFalse": {
    "doc": "Given data context path must be false to show children.",
    "type": "string",
    "status": "optional"
  },
  "inferData": {
    "doc": "Will be called to decide by external logic, and show/hide contents based on the return value.",
    "type": "function",
    "status": "optional"
  },
  "visible": {
    "doc": "Control visibility directly using the `visible` prop. When used alongside other conditions, the `visible` prop takes precedence.",
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
    "doc": "When visibility is hidden, and `keepInDOM` is true, pass these props to the children.",
    "type": "various",
    "status": "optional"
  },
  "element": {
    "doc": "Define the type of element. Defaults to `div`. Only for when `animate` is true.",
    "type": "string or React.Element",
    "status": "optional"
  },
  "children": {
    "doc": "Contents.",
    "type": "React.Node",
    "status": "required"
  }
}
```

## Events

```json
{
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
```
