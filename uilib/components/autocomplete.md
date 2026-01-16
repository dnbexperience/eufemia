---
title: 'Autocomplete'
description: 'The Autocomplete component is a combination of an Input and a Dropdown (ComboBox) that suggests matching data items during typing.'
metadata: https://eufemia.dnb.no/uilib/components/autocomplete/metadata.json
---

## Import

```tsx
import { Autocomplete } from '@dnb/eufemia'
```

## Description

The Autocomplete component is a combination of an [Input](/uilib/components/input) and a [Dropdown](/uilib/components/dropdown), also called **ComboBox**. During typing, matching data items get suggested in an option menu (listbox).

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=48469-4820)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/autocomplete)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/autocomplete)

## Typeahead and ComboBox

The Autocomplete component may also be known as _Typeahead_ or _ComboBox_. But autocomplete describes the purpose more precisely and descriptively, therefore Eufemia uses this term.

### When to use it

Use it for both small autocomplete purposes and large (async) data set searches. The component supports two ways of showing [ProgressIndicator](/uilib/components/progress-indicator).

You may check out the [Dropdown](/uilib/components/dropdown/info) component for more details on how to use it. They both share the same [DrawerList](/uilib/components/fragments/drawer-list).

### Highlighting

Words found during typing are highlighted. The rules are:

1. The first two words will match the beginning of a word
1. The third word will match inside a word (can be changed with `search_in_word_index`)
1. Case-insensitive

To only match items that begin with the first typed word, set `searchMatch="starts-with"`.

#### Using Components inside content

It is **not** possible to wrap them inside React Components. The reason is that the Autocomplete component needs to know what data it wants to search for before your React Component has rendered. Additionally, the component cannot update the HTML to make the bold highlighting after your component has rendered.

That means you cannot run a component that will render as soon as it is displayed.

If you need to format numbers, then do it before you send in the data content.

It is possible to wrap your content inside one HTML Element. Nested elements are **not** supported.

To wrap your content only visually, you can provide your wrappers inside an array:

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <Autocomplete
        data={[
          {
            content: [
              <IconPrimary icon="bell" key="item-1" />,
              <span className="custom-selector-a" key="item-2">
                The Shawshank Redemption
              </span>,
              <span className="custom-selector-b" key="item-3">
                The Dark Knight
              </span>,
              // etc.
              <NumberFormat value={1234} key="item-4" />, // <-- Not searchable nor highlightable
            ],
          },
        ]}
        label="Label"
      />
    </ComponentBox>
  </Wrapper>,
)
```

or you can provide it inside a fragment:

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <Autocomplete
        data={[
          {
            content: (
              <>
                <IconPrimary icon="bell" />
                <span className="custom-selector-a">
                  The Shawshank Redemption
                </span>
                <span className="custom-selector-b">The Dark Knight</span>
              </>
            ),
          },
        ]}
        label="Label"
      />
    </ComponentBox>
  </Wrapper>,
)
```

and if you need to decouple the searchable content from what's displayed, then you can put your searchable content inside `search_content`:

```tsx
render(
  <Wrapper>
    <ComponentBox hidePreview>
      <Autocomplete
        data={[
          {
            content: ['your visual content'],
            search_content: ['your search content'],
          },
        ]}
        label="Label"
      />
    </ComponentBox>
  </Wrapper>,
)
```

## Re-render data

For performance optimization, you should ensure the `data` array/object is memoized (with `useMemo`, `useState`, or `useRef`), so when the Autocomplete re-renders, it does not have to process the internal data unnecessarily.

```tsx
const MyComponent = () => {
  const data = React.useMemo(() => ['Item 1', 'Item 2'], [])
  return <Autocomplete data={data} />
}
```

Or keep it outside the component:

```tsx
const data = ['Item 1', 'Item 2']
const MyComponent = () => {
  return <Autocomplete data={data} />
}
```

### Numbers

Numbers are often different from a word filter. You can use `search_numbers={true}` to enable number-specialized filtering. See examples in the demos.

Now the user could search for e.g. bank account numbers by just entering `201`, even if you format it like `2000 12 34567` (e.g. use `format(20001234567, { ban: true })` from `@dnb/eufemia/components/number-format/NumberUtils`).

### Screen reader support

To enhance screen reader usage, this component uses `aria-live` to announce the number of options found (`aria_live_options`).

## Custom size

```css
.dnb-autocomplete {
  --autocomplete-width: 20rem; /* custom width */
}
```

You can also set the width directly, but then it has to be defined like so (including `min-width`):

```css
/** Because of the included label/status etc. we target the "__shell" */
.dnb-autocomplete__shell {
  width: 10rem;
}

/** In order to change only the drawer-list width */
.dnb-autocomplete .dnb-drawer-list__root {
  width: 10rem;
}
```

## Dynamically change data

You can manipulate the used data dynamically, either by changing the `data` property or during user events like `on_type` or `on_focus`. The following properties and methods are there to use:

### Methods

- `updateData` replace all data entries.
- `emptyData` remove all data entries.
- `resetSelectedItem` will invalidate the selected key.
- `revalidateSelectedItem` will re-validate the internal selected key on the given `value`.
- `revalidateInputValue` will re-validate the current input value and update it – based on the given `value`.
- `setInputValue` update the input value.
- `clearInputValue` will set the current input value to an empty string.
- `focusInput` will set focus on the input element.
- `showIndicator` shows a progress indicator instead of the icon (inside the input).
- `hideIndicator` hides the progress indicator inside the input.
- `showIndicatorItem` shows an item with a [ProgressIndicator](/uilib/components/progress-indicator) status as an data option item.
- `showNoOptionsItem` shows the "no entries found" status as an data option item.
- `setVisible` shows the [DrawerList](/uilib/components/fragments/drawer-list).
- `setHidden` hides the [DrawerList](/uilib/components/fragments/drawer-list).
- `showAllItems` shows all [DrawerList](/uilib/components/fragments/drawer-list) items.
- `setMode` switch the mode during runtime.
- `debounce` a debounce method with a cancel invocation method on repeating calls. There is [more documentation](/uilib/helpers/functions/#debounce) about this method.

### Properties

- `dataList` contains all the data entries.

### Example

```jsx
<Autocomplete
  on_focus={({ updateData, showIndicator }) => {
    showIndicator()
    setTimeout(() => {
      updateData(topMovies)
    }, 1e3)
  }}
  on_type={({ value /* updateData, ... */ }) => {
    console.log('on_type', value)
  }}
/>
```

## Demos

### Default autocomplete

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        topMovies,
      }}
    >
      <Autocomplete data={topMovies} label="Label" />
    </ComponentBox>
  </Wrapper>,
)
```

### Autocomplete with numbers

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        numbersData,
      }}
    >
      <Autocomplete
        input_value="201"
        show_clear_button
        label="Label"
        data={numbersData}
        search_numbers={true}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Autocomplete with a custom title

- `keep_value` means the input value gets not removed after an input blur happens.
- `show_clear_button` means a clear button will show up when the input field contains a value.

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-closed"
      scope={{
        topMovies,
      }}
    >
      <Autocomplete
        data={topMovies}
        keep_value={true}
        show_clear_button={true}
        label="Label"
        placeholder="Custom placeholder ..."
        on_change={({ data }) => {
          console.log('on_change', data)
        }}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Async usage, dynamically update data during typing

This example simulates server delay with a timeout and - if it gets debounced, we cancel the timeout. Read more about the [debounce method](/uilib/components/autocomplete/events/#methods).

Also, you may consider using `disable_filter` if you have a backend doing the search operation.

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        topMovies,
      }}
    >
      {() => {
        const onTypeHandler = ({
          value,
          showIndicator,
          hideIndicator,
          updateData,
          debounce,
          /* ... */
        }) => {
          console.log('typed value:', value)
          showIndicator()
          debounce(
            ({ value }) => {
              console.log('debounced value:', value)

              // simulate server delay
              const timeout = setTimeout(() => {
                // update the drawerList
                updateData(topMovies)
                hideIndicator()
              }, 600)

              // cancel invocation method
              return () => clearTimeout(timeout)
            },
            {
              value,
            },
            250,
          )
        }
        return (
          <Autocomplete
            mode="async"
            on_type={onTypeHandler}
            no_scroll_animation={true}
            placeholder="Search ..."
          />
        )
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### Update data dynamically on the first focus

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        topMovies,
      }}
    >
      {() => {
        const onFocusHandler = ({
          updateData,
          dataList,
          showIndicatorItem,
        }) => {
          if (!dataList.length) {
            showIndicatorItem()
            setTimeout(() => {
              updateData(topMovies)
            }, 1e3)
          }
        }
        return (
          <Autocomplete
            mode="async"
            no_scroll_animation={true}
            prevent_selection={true}
            on_type={({ value /* updateData, ... */ }) => {
              console.log('on_type', value)
            }}
            on_focus={onFocusHandler}
          />
        )
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### With a Button to toggle the open / close state

**NB:** Just to show the possibility; the data is given as a function.

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-drawer-button"
      scope={{
        topMovies,
      }}
    >
      <Autocomplete
        label="Label"
        value={10}
        show_submit_button={true}
        on_change={({ data }) => {
          console.log('on_change', data)
        }}
      >
        {() => topMovies}
      </Autocomplete>
    </ComponentBox>
  </Wrapper>,
)
```

### With a predefined input/search value

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-drawer-search"
      scope={{
        topMovies,
      }}
    >
      <Autocomplete
        label="Label"
        input_value="the pa ther"
        no_animation
        on_change={({ data }) => {
          console.log('on_change', data)
        }}
      >
        {() => topMovies}
      </Autocomplete>
    </ComponentBox>
  </Wrapper>,
)
```

### Different sizes

Four sizes are available: `small`, `default`, `medium` and `large`.

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-sizes"
      scope={{
        topMovies,
      }}
    >
      <Flex.Vertical>
        <Autocomplete
          label="Label"
          size="default"
          data={() => topMovies}
        />
        <Autocomplete label="Label" size="medium" data={() => topMovies} />
        <Autocomplete label="Label" size="large" data={() => topMovies} />
      </Flex.Vertical>
    </ComponentBox>
  </Wrapper>,
)
```

### Data suffix value

Data is provided as such:

```js
const { locale } = React.useContext(Context)
const data = [
  {
    suffix_value: (
      <NumberFormat currency srLabel="Total:" locale={locale}>
        {12345678}
      </NumberFormat>
    ),
    selected_value: `Brukskonto (${ban})`,
    content: ['Brukskonto', ban],
  },
]
```

```tsx
const CustomWidth = styled(Autocomplete)`
  .dnb-drawer-list__root,
  .dnb-autocomplete__shell {
    width: 50vw;
    min-width: 15rem;
    max-width: 30rem;
  }
`
render(
  <CustomWidth
    value={1}
    data={numbers}
    size="medium"
    input_icon={null}
    show_submit_button
    label="From account"
    label_direction="vertical"
  />,
)
```

### Custom width

```tsx
const CustomWidthOne = styled(Autocomplete)`
  .dnb-autocomplete__shell {
    width: 10rem;
  }
`
const CustomWidthTwo = styled(Autocomplete)`
  &.dnb-autocomplete--is-popup .dnb-drawer-list__root {
    width: 12rem;
  }
`
const CustomWidthThree = styled(Autocomplete)`
  /** Change the "__shell" width */
  .dnb-autocomplete__shell {
    width: 12rem;
  }

  /** Change the "__list" width */
  .dnb-drawer-list__root {
    width: 20rem;
  }
`
render(
  <Flex.Vertical>
    <CustomWidthOne
      label="Label"
      label_sr_only
      size="default"
      icon_position="left"
      data={topMovies}
    />
    <CustomWidthTwo
      label="Label"
      label_sr_only
      size="medium"
      data={topMovies}
    />
    <CustomWidthThree
      label="Label"
      label_sr_only
      size="large"
      align_autocomplete="right"
      icon_position="right"
      input_icon="bell"
      data={topMovies}
    />
  </Flex.Vertical>,
)
```

### Autocomplete with status message

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-status-info"
      scope={{
        topMovies,
      }}
    >
      <Autocomplete
        data={topMovies}
        label="Label"
        status="Please select a valid date"
        status_state="info"
        show_submit_button
      />
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="autocomplete-status-error"
      scope={{
        topMovies,
      }}
    >
      <Autocomplete
        label="Status error"
        data={[topMovies[0]]}
        status="Error"
        status_state="error"
        show_submit_button
        opened
        no_animation
        prevent_close
        direction="bottom"
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Groups

If an item has a `groupIndex` property, it will use the groups in the `groups` property. Only the first group can be without title, all other groups must have a title.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="autocomplete-groups">
      <Autocomplete
        groups={[undefined, 'Pets', 'Cars']}
        data={[
          {
            groupIndex: 0,
            content: 'Default 1',
          },
          {
            groupIndex: 0,
            content: 'Default 2',
          },
          {
            groupIndex: 1,
            content: 'Cat',
          },
          {
            groupIndex: 1,
            content: 'Dog',
          },
          {
            groupIndex: 2,
            content: 'Jeep',
          },
          {
            groupIndex: 2,
            content: 'Van',
          },
        ]}
      />
    </ComponentBox>
  </Wrapper>,
)
```
