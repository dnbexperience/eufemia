---
title: 'Value.SummaryList'
description: '`Value.SummaryList` uses definition lists to semantically make content consumable for screen readers.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.176Z
checksum: 92c6b89f079b833cdcf9297959702e4b70e744cbcd2f1718096b55836b2b7b84
---

# Value.SummaryList

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.SummaryList />)
```

## Description

The `Value.SummaryList` component ensures that the wrapped `Value.*` components are rendered as definition lists, which helps maintain semantic correctness.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(
  <Value.SummaryList>
    <Value.String label="First value" path="/myValue" />
    <Value.String label="Second value" path="/mySecondValue" />
  </Value.SummaryList>
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/SummaryList)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/SummaryList)

## Demos

### With a default layout

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

### With a Horizontal layout

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList layout="horizontal">
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

### With a grid layout

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList layout="grid">
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

### With a combined layout

Using [Value.Composition](/uilib/extensions/forms/Value/Composition/) to combine two or more `Value.*` components into one.

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
      streetName: 'Osloveien',
      streetNr: 12,
      postalCode: '1234',
      city: 'Oslo',
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />

        <Value.Composition label="Street">
          <Value.String path="/streetName" />
          <Value.Number path="/streetNr" />
        </Value.Composition>

        <Value.Composition label="City">
          <Value.String path="/postalCode" />
          <Value.String path="/city" />
        </Value.Composition>
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
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

      <Value.SummaryList inheritVisibility>
        <Value.Name.First path="/foo" />
        <Value.Name.First path="/bar" />
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

### Inherit label

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Field.String path="/foo" defaultValue="foo" label="foo label" />
      <Field.String path="/bar" defaultValue="bar" label="bar label" />

      <Value.SummaryList inheritLabel>
        <Value.String path="/foo" />
        <Value.String path="/bar" />
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

### With animated Visibility

Below is a `SummaryList` containing two `Value.*` components. The second value will be shown and hidden with animation using the `Form.Visibility` component.

To maintain the semantic structure of the `dl` element, the `Form.Visibility` component animates the content of the `dl` element instead of wrapping it in a div element.

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Field.Boolean
        label="Make second field visible when toggled"
        path="/toggleValue"
        variant="checkbox"
      />

      <Form.Card>
        <Value.SummaryList>
          <Value.String label="Label" value="First field" />

          <Form.Visibility pathTrue="/toggleValue" animate>
            <Value.String label="Label" value="Second field" />
          </Form.Visibility>
        </Value.SummaryList>
      </Form.Card>
    </Flex.Stack>
  </Form.Handler>
)
```

### With [Value.\* components](/uilib/extensions/forms/Value/) using help button

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Form.Card>
        <Value.SummaryList>
          <Value.Boolean
            label={
              'Vil foretaket være involvert i, eller drive virksomhet knyttet til virtuell valuta?'
            }
            help={{
              open: true,
              title: 'Virtuell valuta',
              content:
                'For eksempel i forbindelse med veksling, oppbevaring, utvinning eller investering i kryptovaluta.',
            }}
            value={false}
          />
          <Value.Boolean
            label={
              'Skal foretaket drive med betalingsformidling som hovedvirksomhet eller som tilleggsvirksomhet til annen næring?'
            }
            help={{
              open: true,
              title: 'Betalingsformidling',
              content:
                'For eksempel betalingsforetak, agent, filial eller tilsvarende virksomhet som krever konsesjon.',
            }}
            value={false}
          />
        </Value.SummaryList>
        <Value.Boolean
          label={'Er foretaket registreringspliktig hos Finanstilsynet?'}
          help={{
            open: true,
            title: 'Registreringspliktig',
            content:
              'Driver virksomhet innenfor eiendomsmegling, inkasso, finans eller regnskapstjenester kan foretaket være regnskapspliktig.',
          }}
          value={true}
        />
      </Form.Card>
    </Flex.Stack>
  </Form.Handler>
)
```

```tsx
render(
  <Value.SummaryList layout="horizontal">
    <Value.String value="foo" label="Foo" />
    <Value.String value="bar" />
    <Value.String value="baz" label="Baz" />
  </Value.SummaryList>
)
```

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
      nickName: 'JD',
      streetName: 'Osloveien',
      streetNr: 12,
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList>
        <Value.Name.First
          path="/firstName"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Name.Last path="/lastName" />
        <Value.String
          path="/nickName"
          label="kallenavn"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Composition
          label="Street"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        >
          <Value.String path="/streetName" />
          <Value.Number
            path="/streetNr"
            help={{
              open: true,
              title: 'Help title',
              content: 'Help content',
            }}
          />
        </Value.Composition>
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
      nickName: 'JD',
      streetName: 'Osloveien',
      streetNr: 12,
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList layout="horizontal">
        <Value.Name.First
          path="/firstName"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Name.Last path="/lastName" />
        <Value.String
          path="/nickName"
          label="kallenavn"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Composition
          label="Street"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        >
          <Value.String
            path="/streetName"
            label="label"
            help={{
              open: true,
              title: 'Help title',
              content: 'Help content',
            }}
          />
          <Value.Number
            path="/streetNr"
            label="label"
            help={{
              open: true,
              title: 'Help title',
              content: 'Help content',
            }}
          />
        </Value.Composition>
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
      nickName: 'JD',
      streetName: 'Osloveien',
      streetNr: 12,
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList layout="grid">
        <Value.Name.First
          path="/firstName"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Name.Last path="/lastName" />
        <Value.String
          path="/nickName"
          label="kallenavn"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Composition
          label="Street"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        >
          <Value.String path="/streetName" />
          <Value.Number
            path="/streetNr"
            help={{
              open: true,
              title: 'Help title',
              content: 'Help content',
            }}
          />
        </Value.Composition>
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
      nickName: 'JD',
      streetName: 'Osloveien',
      streetNr: 12,
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList layout="grid">
        <Value.Composition
          label="Street"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        >
          <Value.String path="/streetName" label="Label" />
          <Value.Number path="/streetNr" label="Label" />
        </Value.Composition>
        <Value.Composition
          label="Street"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        >
          <Value.String
            path="/streetName"
            label="Label"
            help={{
              open: true,
              title: 'Help title',
              content: 'Help content',
            }}
          />
          <Value.Number
            path="/streetNr"
            label="Label"
            help={{
              open: true,
              title: 'Help title',
              content: 'Help content',
            }}
          />
        </Value.Composition>
        <Value.Composition label="Street">
          <Value.String
            path="/streetName"
            help={{
              open: true,
              title: 'Help title',
              content: 'Help content',
            }}
          />
          <Value.Number
            path="/streetNr"
            help={{
              open: true,
              title: 'Help title',
              content: 'Help content',
            }}
          />
        </Value.Composition>
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
    }}
  >
    <Form.InfoOverlay>
      <Value.SummaryList>
        <Value.Name.First
          path="/firstName"
          help={{
            title: 'Help title',
            content: 'Help content.',
          }}
        />
        <Value.Name.Last
          path="/lastName"
          help={{
            title: 'Help title',
            content: 'Help content.',
          }}
        />
      </Value.SummaryList>
    </Form.InfoOverlay>
  </Form.Handler>
)
```

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Value.SummaryList>
        <Value.String
          label="No maxWidth: This label is long so we can validate that the label can be longer."
          value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
        />
        <Value.String
          label="maxWidth='small': This label is long so we can validate that the label can be longer."
          maxWidth="small"
          value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
        />
        <Value.String
          label="maxWidth='medium': This label is long so we can validate that the label can be longer."
          maxWidth="medium"
          value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
        />
        <Value.String
          label="maxWidth='large': This label is long so we can validate that the label can be longer."
          maxWidth="large"
          value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
        />
        <Value.String
          label="maxWidth='auto': This label is long so we can validate that the label can be longer."
          maxWidth="auto"
          value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
        />
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

## Properties

```json
{
  "layout": {
    "doc": "Use `grid`, `horizontal` or `vertical`. Defaults to `vertical`.",
    "type": "string",
    "status": "optional"
  },
  "inheritVisibility": {
    "doc": "Use this property to propagate the `inheritVisibility` property to all nested values.",
    "type": "boolean",
    "status": "optional"
  },
  "inheritLabel": {
    "doc": "Use this property to propagate the `inheritLabel` property to all nested values.",
    "type": "boolean",
    "status": "optional"
  },
  "transformLabel": {
    "doc": "Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.",
    "type": "function",
    "status": "optional"
  },
  "children": {
    "doc": "Contents.",
    "type": "React.Node",
    "status": "required"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```
