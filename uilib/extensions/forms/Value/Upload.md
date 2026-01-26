---
title: 'Value.Upload'
description: '`Value.Upload` is a value component for displaying a list of files.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.207Z
checksum: adc00d6c075c1ed111082ea109c2ba4dcd3db8f148e6bc34ed075297e62f7bff
---

# Value.Upload

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Upload />)
```

## Description

`Value.Upload` is a value component for displaying a list of files.

There is a corresponding [Field.Upload](/uilib/extensions/forms/feature-fields/more-fields/Upload) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Upload />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Upload)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Upload)

## Demos

### Placeholder

```tsx
render(<Value.Upload placeholder="No value given" />)
```

### Value

```tsx
render(
  <Value.Upload
    inline
    value={[
      {
        file: createMockFile('fileName-1.png', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
      {
        file: createMockFile('fileName-2.png', 2000000, 'image/png'),
        exists: false,
        id: '2',
      },
    ]}
  />
)
```

### With `displaySize` property

```tsx
render(
  <Value.Upload
    displaySize
    value={[
      {
        file: createMockFile('fileName-1.png', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
    ]}
  />
)
```

### With `download` property

```tsx
render(
  <Value.Upload
    download
    value={[
      {
        file: createMockFile('fileName-1.png', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
    ]}
  />
)
```

### Custom format

```tsx
render(
  <Form.Handler
    locale="en-GB"
    data={{
      myPath: [
        {
          file: createMockFile('fileName-1.png', 1000000, 'image/png'),
          exists: false,
          id: '1',
        },
        {
          file: createMockFile('fileName-2.png', 2000000, 'image/png'),
          exists: false,
          id: '2',
        },
      ],
    }}
  >
    <Value.Upload
      inline
      path="/myPath"
      format={{
        type: 'disjunction',
      }}
    />
  </Form.Handler>
)
```

### Label

```tsx
render(<Value.Upload label="Label text" showEmpty />)
```

### Label and value

```tsx
render(
  <Value.Upload
    label="Label text"
    value={[
      {
        file: createMockFile('fileName-1.png', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
      {
        file: createMockFile('fileName-2.png', 2000000, 'image/png'),
        exists: false,
        id: '2',
      },
    ]}
  />
)
```

### Inline

```tsx
render(
  <Span>
    This is before the component{' '}
    <Value.Upload
      value={[
        {
          file: createMockFile('fileName-1.png', 1000000, 'image/png'),
          exists: false,
          id: '1',
        },
        {
          file: createMockFile('fileName-2.png', 2000000, 'image/png'),
          exists: false,
          id: '2',
        },
      ]}
      inline
    />{' '}
    This is after the component
  </Span>
)
```

### List variants

```tsx
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List"
  variant="ol"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Unordered List"
  variant="ul"
/>
```

### List types

```tsx
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List a"
  variant="ol"
  listType="a"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List A"
  variant="ol"
  listType="A"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List i"
  variant="ol"
  listType="i"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List I"
  variant="ol"
  listType="I"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Unordered List square"
  variant="ul"
  listType="square"
/>
<Value.Upload
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Unordered List circle"
  variant="ul"
  listType="circle"
/>
```

### Field.Upload path

```tsx
render(
  <Form.Handler
    data={{
      myPath: [
        {
          file: createMockFile('fileName-1.png', 1000000, 'image/png'),
          exists: false,
          id: '1',
        },
        {
          file: createMockFile('fileName-2.png', 3000000, 'image/png'),
          exists: false,
          id: '2',
        },
        {
          file: createMockFile('fileName-3.png', 3000000, 'image/png'),
          exists: false,
          id: '3',
        },
      ],
    }}
  >
    <Flex.Stack>
      <Field.Upload label="My selections" path="/myPath" />
      <Value.Upload
        inheritLabel
        path="/myPath"
        variant="ul"
        listType="unstyled"
      />
    </Flex.Stack>
  </Form.Handler>
)
```

### Using `onFileClick`

```tsx
render(
  <Value.Upload
    label="Label text"
    value={[
      {
        file: createMockFile('35217511.jpg', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
      {
        file: createMockFile('1501870.jpg', 2000000, 'image/png'),
        exists: false,
        id: '2',
      },
    ]}
    onFileClick={async ({ fileItem }) => {
      const request = createRequest()
      console.log(
        `making API request to fetch the url of the file: ${fileItem.file.name}`
      )
      await request(2000) // Simulate a request
      window.open(
        `https://eufemia.dnb.no/images/avatars/${fileItem.file.name}`,
        '_blank'
      )
    }}
  />
)
```

### Display files as non-clickable

When file size is 0 or not given (`new File([], name, { type })`), the file is displayed as a span instead of an anchor. How ever, when `onFileClick` is given, the file will be clickable as a button.

```tsx
render(
  <Value.Upload
    label="Label text"
    value={[
      {
        file: createMockFile('35217511.jpg', 0, 'image/png'),
        exists: false,
        id: '1',
      },
      {
        file: createMockFile('1501870.jpg', undefined, 'image/png'),
        exists: false,
        id: '2',
      },
    ]}
  />
)
```

```tsx
render(
  <Value.Upload
    onFileClick={() => {
      console.log('Clicked on file')
    }}
    label="Label text"
    value={[
      {
        file: createMockFile('fileName-1.png', 1000000, 'image/png'),
        exists: false,
        id: '1',
      },
      {
        file: createMockFile('fileName-2.png', 2000000, 'image/png'),
        exists: false,
        isLoading: true,
        id: '2',
      },
    ]}
  />
)
```

```tsx
<Value.Upload
  onFileClick={() => {
    console.log('Clicked on file')
  }}
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      isLoading: true,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
    },
  ]}
  label="Ordered List"
  variant="ol"
/>
<Value.Upload
  onFileClick={() => {
    console.log('Clicked on file')
  }}
  value={[
    {
      file: createMockFile('fileName-1.png', 1000000, 'image/png'),
      exists: false,
      id: '1',
    },
    {
      file: createMockFile('fileName-2.png', 2000000, 'image/png'),
      exists: false,
      id: '2',
      isLoading: true,
    },
    {
      file: createMockFile('fileName-3.png', 3000000, 'image/png'),
      exists: false,
      id: '3',
      isLoading: true,
    },
  ]}
  label="Unordered List"
  variant="ul"
/>
```

## Properties

### Value-specific properties

```json
{
  "download": {
    "doc": "Causes the browser to treat all listed files as downloadable instead of opening them in a new browser tab or window. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "displaySize": {
    "doc": "Can be used to display the file size of the file. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "value": {
    "doc": "The value to format. Can be given as `children` instead.",
    "type": ["Array<React.ReactNode>"],
    "status": "optional"
  },
  "children": {
    "doc": "The children to format.",
    "type": "React.ReactNode",
    "status": "optional"
  },
  "format": {
    "doc": "Formatting options for the value when variant is `text`. See the [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) documentation.",
    "type": "Intl.ListFormatOptions",
    "status": "optional"
  },
  "variant": {
    "doc": "Defines if the value should be displayed in list format (`ol`, `ul`) or regular text format in one line. Defaults to `text`.",
    "type": ["ol", "ul", "text"],
    "status": "optional"
  },
  "listType": {
    "doc": "Defines the type of list styling used for list variants. Used together with variant `ol` and `ul`. Variant `ol`: `a`, `A`, `i`, `I` and `1`. Variant `ul`: `circle`, `disc` and `square`. Defaults to `undefined`.",
    "type": [
      "a",
      "A",
      "i",
      "I",
      "1",
      "circle",
      "disc",
      "square",
      "unstyled",
      "undefined"
    ],
    "status": "optional"
  },
  "inside": {
    "doc": "Defines the position of the marker.",
    "type": "boolean",
    "status": "optional"
  },
  "outside": {
    "doc": "Defines the position of the marker (default).",
    "type": "boolean",
    "status": "optional"
  },
  "nested": {
    "doc": "Will ensure a nested structure of several lists.",
    "type": "boolean",
    "status": "optional"
  },
  "innerRef": {
    "doc": "Send along a custom React Ref.",
    "type": "React.RefObject",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

### General properties

<PropertiesTable
  props={ValueProperties}
  valueType="Array<string | number>"
/>

## Events

```json
{
  "onFileClick": {
    "doc": "Will be called once a file gets clicked on by the user. Access the clicked file with `{ fileItem }`. When providing this prop, the file will be rendered as a button instead of an anchor or plain text.",
    "type": "function",
    "status": "optional"
  }
}
```
