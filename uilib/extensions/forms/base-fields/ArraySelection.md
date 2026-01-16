---
title: 'ArraySelection'
description: '`Field.ArraySelection` is a component for selecting between a fixed set of options using checkboxes or similar, that will produce a value in the form of an array containing the values of selected options.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/base-fields/ArraySelection/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.ArraySelection />)
```

## Description

`Field.ArraySelection` is a component for selecting between a fixed set of options using checkboxes or similar, that will produce a value in the form of an array containing the values of selected options.

Uses the [Field.Option](/uilib/extensions/forms/base-fields/Option/) pseudo-component to define options.

There is a corresponding [Value.ArraySelection](/uilib/extensions/forms/Value/ArraySelection) component.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.ArraySelection>
    <Field.Option />
    <Field.Option />
  </Field.ArraySelection>,
)
```

You can also use the `dataPath` property to provide the data to the component:

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    data={{
      myDataPath: [
        { title: 'Foo!', value: 'foo' },
        { title: 'Bar!', value: 'bar' },
      ],
    }}
  >
    <Field.ArraySelection dataPath="/myDataPath" />
  </Form.Handler>,
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/ArraySelection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/ArraySelection)

## Demos

### Checkbox variant (default)

```tsx
render(
  <Field.ArraySelection
    onFocus={(value) => console.log('onFocus', value)}
    onBlur={(value) => console.log('onBlur', value)}
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Fooo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

### Button variant

```tsx
render(
  <Field.ArraySelection
    variant="button"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Fooo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

### Button with checkbox variant

```tsx
render(
  <Field.ArraySelection
    variant="checkbox-button"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Fooo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

---

### Checkbox variant demos

#### Checkbox label

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Fooo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox option selected

```tsx
render(
  <Field.ArraySelection
    value={['bar']}
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox horizontal layout

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    value={['bar']}
    layout="horizontal"
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox horizontal options-layout

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    value={['bar']}
    optionsLayout="horizontal"
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox horizontal layout and horizontal options-layout

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    value={['bar']}
    layout="horizontal"
    optionsLayout="horizontal"
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox with help

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.ArraySelection>,
)
```

#### Checkbox disabled

```tsx
render(
  <Field.ArraySelection
    value={['bar']}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox disabled options

```tsx
render(
  <Field.ArraySelection
    value={['foo']}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" disabled />
    <Field.Option value="baz" title="Bazz!" disabled />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox info

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    info="FYI"
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox warning

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    warning="I'm warning you..."
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox error

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Checkbox with nested fields and logic

You can nest other fields and show them based on your desired logic.

```tsx
render(
  <Form.Handler onSubmit={console.log}>
    <Flex.Stack>
      <Form.Card>
        <Field.ArraySelection
          label="Make a selection"
          path="/mySelection"
          required
        >
          <Field.Option value="nothing" title="Nothing" />

          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showInput')
                  : false
              },
            }}
            animate
            compensateForGap="auto" // makes animation smooth
          >
            <Section variant="info" innerSpace>
              <Field.String placeholder="Enter some value" required />
            </Section>
          </Form.Visibility>

          <Field.Option
            value="showAdditionalOption"
            title="Show additional option"
          />
          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showAdditionalOption')
                  : false
              },
            }}
            animate
            compensateForGap="auto" // makes animation smooth
          >
            <Field.Option
              value="showMeMore"
              title="Show even more"
              bottom="x-small"
            />
            <Form.Visibility
              animate
              visibleWhen={{
                path: '/mySelection',
                hasValue: (value) => {
                  return Array.isArray(value)
                    ? value.includes('showMeMore')
                    : false
                },
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" required />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.ArraySelection>
      </Form.Card>

      <Form.SubmitButton />
    </Flex.Stack>
  </Form.Handler>,
)
```

#### Checkbox with a path to populate the data

```tsx
render(
  <Form.Handler
    data={{
      myDataPath: [
        {
          title: 'Foo!',
          value: 'foo',
        },
        {
          title: 'Bar!',
          value: 'bar',
        },
        {
          title: 'Baz!',
          value: 'baz',
        },
      ],
    }}
  >
    <Field.ArraySelection
      label="Populated by dataPath"
      dataPath="/myDataPath"
    />
  </Form.Handler>,
)
```

#### Checkbox with the data property

```tsx
render(
  <Field.ArraySelection
    label="Populated by data"
    data={[
      {
        title: 'Foo!',
        value: 'foo',
      },
      {
        title: 'Bar!',
        value: 'bar',
      },
      {
        title: 'Baz!',
        value: 'baz',
      },
    ]}
  />,
)
```

---

### Button variant demos

#### Button Label

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Fooo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button option selected

```tsx
render(
  <Field.ArraySelection
    variant="button"
    value={['bar']}
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button horizontal layout

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    value={['bar']}
    layout="horizontal"
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button horizontal options-layout

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    value={['bar']}
    optionsLayout="horizontal"
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button horizontal layout and horizontal options-layout

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    value={['bar']}
    layout="horizontal"
    optionsLayout="horizontal"
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button with help

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.ArraySelection>,
)
```

#### Button disabled

```tsx
render(
  <Field.ArraySelection
    variant="button"
    value={['bar']}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button disabled options

```tsx
render(
  <Field.ArraySelection
    variant="button"
    value={['foo']}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" disabled />
    <Field.Option value="baz" title="Bazz!" disabled />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button info

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    info="FYI"
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button warning

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    warning="I'm warning you..."
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button error

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>,
)
```

#### Button with a path to populate the data

```tsx
render(
  <Form.Handler
    data={{
      myDataPath: [
        {
          title: 'Foo!',
          value: 'foo',
        },
        {
          title: 'Bar!',
          value: 'bar',
        },
        {
          title: 'Baz!',
          value: 'baz',
        },
      ],
    }}
  >
    <Field.ArraySelection
      variant="button"
      label="Populated by dataPath"
      dataPath="/myDataPath"
    />
  </Form.Handler>,
)
```

#### Button with the data property

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Populated by data"
    data={[
      {
        title: 'Foo!',
        value: 'foo',
      },
      {
        title: 'Bar!',
        value: 'bar',
      },
      {
        title: 'Baz!',
        value: 'baz',
      },
    ]}
  />,
)
```

#### Button with nested fields and logic

You can nest other fields and show them based on your desired logic.

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Field.ArraySelection
        variant="button"
        label="Make a selection"
        path="/mySelection"
      >
        <Field.Option value="nothing" title="Nothing" />

        <Field.Option value="showInput" title="Show an input" />
        <Form.Visibility
          visibleWhen={{
            path: '/mySelection',
            hasValue: (value) => {
              return Array.isArray(value)
                ? value.includes('showInput')
                : false
            },
          }}
          animate
          compensateForGap="auto" // makes animation smooth
        >
          <Section variant="info" innerSpace>
            <Field.String placeholder="Enter some value" />
          </Section>
        </Form.Visibility>

        <Field.Option
          value="showAdditionalOption"
          title="Show additional option"
        />
        <Form.Visibility
          visibleWhen={{
            path: '/mySelection',
            hasValue: (value) => {
              return Array.isArray(value)
                ? value.includes('showAdditionalOption')
                : false
            },
          }}
          animate
          compensateForGap="auto" // makes animation smooth
        >
          <Field.Option
            value="showMeMore"
            title="Show even more"
            bottom="x-small"
          />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showMeMore')
                  : false
              },
            }}
          >
            <Section variant="info" innerSpace>
              <Field.String placeholder="Enter more info" />
            </Section>
          </Form.Visibility>
        </Form.Visibility>
      </Field.ArraySelection>
    </Form.Card>
  </Form.Handler>,
)
```

#### Button with checkbox variant

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    value={['bar']}
    variant="checkbox-button"
    optionsLayout="horizontal"
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
    <Field.Option value="quux" title="Quuux!" />
    <Field.Option value="quuz" title="Quuuuz!" />
    <Field.Option value="corge" title="Corge!" />
  </Field.ArraySelection>,
)
```
