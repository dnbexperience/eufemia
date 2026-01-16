---
title: 'ListFormat'
description: 'A ready to use DNB list formatter.'
metadata: https://eufemia.dnb.no/uilib/components/list-format/metadata.json
---

## Import

```tsx
import { ListFormat } from '@dnb/eufemia'
```

## Description

A ready-to-use list formatter. Use it wherever you have to display a list of strings, numbers, or React components (JSX).

Good reasons for why we have this is to:

- Uniform the creation and formatting of lists.
- Supports translation and localization.
- Built on top of web standards.

The component is designed to maximum display 10-20 items.
If you need to display more items than that, consider a different design, and perhaps using [Pagination](/uilib/components/pagination) and/or [InfinityScroller](/uilib/components/pagination/infinity-scroller).

When the `variant` property is set to `text` (default), the browser API [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) will be used with additional React components (JSX) support.

When the `variant` is set to a non-`text` variant, it uses [Lists](/uilib/elements/lists/) to render the given list.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/list-format)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/list-format)

## Formatting only

You can use the `listFormat` function without using the React Component `ListFormat`, to format strings, numbers, or React components (JSX) as a string. It does not return lists(ol, ul, etc).

```ts
import { listFormat } from '@dnb/eufemia/components/ListFormat'

return listFormat(myList, {
  format: { type: 'disjunction' },
  locale: 'en-US',
})
```

See the following [demo](/uilib/components/list-format/demos/#using-listformat-function) for a more detailed example.

The `listFormat` function supports an object with `{ format, locale }` as the second parameter. `format` and `locale` will accept the same values as documented in [format property](/uilib/components/list-format/properties/) of the `ListFormat` component.

## Demos

### Basic usage with `value`

```tsx
render(
  <ListFormat
    value={[
      <React.Fragment key="a">A</React.Fragment>,
      <>
        <b>B</b>
      </>,
      <>C</>,
      'D',
      123,
      <Anchor
        target="_blank"
        href="https://github.com/dnbexperience/eufemia"
        rel="noopener noreferrer"
        key="github"
      >
        Link to Eufemia's Github Repo
      </Anchor>,
      <>
        Text <Badge content="Info" variant="information" /> Text
      </>,
    ]}
  />,
)
```

### Basic usage with `children`

```tsx
render(
  <ListFormat>
    <React.Fragment key="a">A</React.Fragment>
    <>
      <b>B</b>
    </>
    <>C</>
    <>D</>
    123
    <Anchor
      target="_blank"
      href="https://github.com/dnbexperience/eufemia"
      rel="noopener noreferrer"
      key="github"
    >
      Link to Eufemia's Github Repo
    </Anchor>
    <>
      Text <Badge content="Info" variant="information" /> Text
    </>
  </ListFormat>,
)
```

### Custom format

```tsx
render(
  <Provider locale="en-GB">
    <ListFormat
      value={[
        <React.Fragment key="a">A</React.Fragment>,
        <>
          <b>B</b>
        </>,
        <>C</>,
        'D',
        123,
        <Anchor
          target="_blank"
          href="https://github.com/dnbexperience/eufemia"
          rel="noopener noreferrer"
          key="github"
        >
          Link to Eufemia's Github Repo
        </Anchor>,
        <>
          Text <Badge content="Info" variant="information" /> Text
        </>,
      ]}
      format={{
        type: 'disjunction',
      }}
    />
  </Provider>,
)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <ListFormat
      value={[
        123,
        <Anchor
          target="_blank"
          href="https://github.com/dnbexperience/eufemia"
          rel="noopener noreferrer"
          key="github"
        >
          Link to Eufemia's Github Repo
        </Anchor>,
        <>
          Text <Badge content="Info" variant="information" /> Text
        </>,
      ]}
    />{' '}
    This is after the component
  </P>,
)
```

### List variants

```tsx
<P>Ordered List:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" />
<P>Unordered List:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ul" />
```

### List types

```tsx
<P>Ordered List a:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="a" />
<P>Ordered List A:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="A" />
<P>Ordered List i:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="i" />
<P>Ordered List I:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="I" />
<P>Unordered List square:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="square"
/>
<P>Unordered List circle:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="circle"
/>
<P>Unordered List unstyled:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="unstyled"
/>
```

### Using listFormat function

```tsx
{
  listFormat(
    [
      <React.Fragment key="a">A</React.Fragment>,
      <>
        <b>B</b>
      </>,
      <>C</>,
      'D',
      123,
      <Anchor
        target="_blank"
        href="https://github.com/dnbexperience/eufemia"
        rel="noopener noreferrer"
        key="github"
      >
        Link to Eufemia's Github Repo
      </Anchor>,
      <>
        Text <Badge content="Info" variant="information" /> Text
      </>,
    ],
    {
      format: {
        type: 'disjunction',
      },
      locale: 'en-US',
    },
  )
}
```
