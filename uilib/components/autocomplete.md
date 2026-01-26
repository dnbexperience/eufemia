---
title: 'Autocomplete'
description: 'The Autocomplete component is a combination of an Input and a Dropdown (ComboBox) that suggests matching data items during typing.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.197Z
checksum: 8a519d33a108b12cd604e58f7193b70b81649399ae0688a433d96560790e62a7
---

# Autocomplete

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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
            250
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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
  />
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
  </Flex.Vertical>
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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
)
```

## Properties

You may check out the [DrawerList Properties](#drawerlist-properties) down below as well as the [Data structure examples](#the-data-property).

```json
{
  "mode": {
    "doc": "If set to `async`, it prevents showing the \"no options\" message during typing / filtering. Defaults to `sync`.",
    "type": "string",
    "status": "optional"
  },
  "input_value": {
    "doc": "Lets you define a custom input value. Setting it to an empty string `\"\"` will reset the input value.",
    "type": "string",
    "status": "optional"
  },
  "placeholder": {
    "doc": "Use this to define the pre-filled placeholder text in the input. Defaults to `title=\"Skriv og velg\"`.",
    "type": "string",
    "status": "optional"
  },
  "title": {
    "doc": "Give a title to let the user know what they have to do. Defaults to `Skriv og få alternativer`.",
    "type": "React.Node",
    "status": "optional"
  },
  "disable_filter": {
    "doc": "If set to `true`, word highlighting will still be active, but no options will be filtered out. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "disable_highlighting": {
    "doc": "If set to `true`, word highlighting will be disabled, but the options will still get filtered. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "disable_reorder": {
    "doc": "If set to `true`, reordering of search results will be disabled. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "search_numbers": {
    "doc": "If set to `true` and `search_in_word_index` is not set, the user will be able to more easily search and filter e.g. bank account numbers. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "search_in_word_index": {
    "doc": "This gives you the possibility to change the threshold number, which defines from what word on we search \"inside words\". Does not work together with `search_numbers`. Defaults to `3`.",
    "type": "boolean",
    "status": "optional"
  },
  "searchMatch": {
    "doc": "Defines how search matching is performed. Use `starts-with` to only match items that begin with the first typed word. Defaults to `word`.",
    "type": "string",
    "status": "optional"
  },
  "keep_value": {
    "doc": "Use `true` to not remove the typed value on input blur, if it is invalid. By default, the typed value will disappear / replaced by a selected value from the data list during the input field blur. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "keep_selection": {
    "doc": "Use `true` to not remove selected item on input blur, when the input value is empty. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "keep_value_and_selection": {
    "doc": "Like `keep_value` – but would not reset to the selected value during input field blur. Also, the selected value would still be kept. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "prevent_selection": {
    "doc": "If set to `true`, no permanent selection will be made. Also, the typed value will not disappear on input blur (like `keep_value`). Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "show_clear_button": {
    "doc": "If set to `true`, a clear button is shown inside the input field. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "icon": {
    "doc": "To be included in the autocomplete input.",
    "type": ["string", "React.Node"],
    "status": "optional"
  },
  "icon_size": {
    "doc": "Change the size of the icon pragmatically.",
    "type": "string",
    "status": "optional"
  },
  "icon_position": {
    "doc": "Position of the icon inside the autocomplete. Set to `left` or `right`. Defaults to `left`.",
    "type": "string",
    "status": "optional"
  },
  "input_icon": {
    "doc": "Same as `icon`.",
    "type": ["string", "React.Node"],
    "status": "optional"
  },
  "triangle_position": {
    "doc": "Position of icon arrow / triangle the drawer. Set to `left` or `right`. Defaults to `left`.",
    "type": "string",
    "status": "optional"
  },
  "size": {
    "doc": "Define the height of the Autocomplete. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.",
    "type": "string",
    "status": "optional"
  },
  "drawer_class": {
    "doc": "Define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the `css` style method. Defaults to `null`.",
    "type": "string",
    "status": "optional"
  },
  "show_submit_button": {
    "doc": "Use `true` to show a Autocomplete button to toggle the [DrawerList](/uilib/components/fragments/drawer-list). Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "align_autocomplete": {
    "doc": "Use `right` to change the options alignment direction. Defaults to `left`.",
    "type": "string",
    "status": "optional"
  },
  "no_options": {
    "doc": "Text show in the \"no options\" item. If set to `false`, the list will not be rendered when there are no options available. Defaults to `Ingen alternativer`.",
    "type": "React.Node",
    "status": "optional"
  },
  "aria_live_options": {
    "doc": "Text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to `%s alternativer`.",
    "type": "React.Node",
    "status": "optional"
  },
  "show_all": {
    "doc": "Text that lets a user unravel all the available options. Defaults to `Vis alt`.",
    "type": "React.Node",
    "status": "optional"
  },
  "indicator_label": {
    "doc": "Text show on indicator \"options\" item. Defaults to `Henter data ...`.",
    "type": "React.Node",
    "status": "optional"
  },
  "show_options_sr": {
    "doc": "Only for screen readers. Title of the button to show the suggestions / options. It is always present and when activating, it opens the DrawerList and sets the focus on it. Defaults to `Bla gjennom alternativer`.",
    "type": "string",
    "status": "optional"
  },
  "selected_sr": {
    "doc": "Only for screen readers (VoiceOver). The label used to announce the selected item. Defaults to `Valgt:`.",
    "type": "string",
    "status": "optional"
  },
  "selectall": {
    "doc": "If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",
    "type": "boolean",
    "status": "optional"
  },
  "submit_button_title": {
    "doc": "Title on submit button. Defaults to `Vis alternativer`.",
    "type": "React.Node",
    "status": "optional"
  },
  "submit_button_icon": {
    "doc": "The icon used in the submit button. Defaults to `chevron_down`.",
    "type": ["string", "React.Element"],
    "status": "optional"
  },
  "submit_element": {
    "doc": "Replace the dropdown / submit button with a custom React element. Defaults to the input SubmitButton `import { SubmitButton } from &#39;@dnb/eufemia/components/input/Input&#39;`.",
    "type": "React.Node",
    "status": "optional"
  },
  "opened": {
    "doc": "If set to `true`, the Autocomplete will be rendered initially with a visible and accessible data list / options.",
    "type": "boolean",
    "status": "optional"
  },
  "open_on_focus": {
    "doc": "Use `true` to auto open the list once the user is entering the input field with the keyboard.",
    "type": "boolean",
    "status": "optional"
  },
  "stretch": {
    "doc": "If set to `true`, then the autocomplete will be 100% in available `width`.",
    "type": "boolean",
    "status": "optional"
  },
  "skip_portal": {
    "doc": "Set to `true` to disable the React Portal behavior. Defaults to `false`.",
    "type": "string",
    "status": "optional"
  },
  "status": {
    "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
    "type": ["error", "info", "boolean"],
    "status": "optional"
  },
  "status_state": {
    "doc": "Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.",
    "type": ["error", "info"],
    "status": "optional"
  },
  "status_props": {
    "doc": "Use an object to define additional FormStatus properties.",
    "type": "object",
    "status": "optional"
  },
  "globalStatus": {
    "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
    "type": "object",
    "status": "optional"
  },
  "label": {
    "doc": "Prepends the Form Label component. If no ID is provided, a random ID is created.",
    "type": "React.Node",
    "status": "optional"
  },
  "label_direction": {
    "doc": "Use `label_direction=\"vertical\"` to change the label layout direction. Defaults to `horizontal`.",
    "type": "React.Node",
    "status": "optional"
  },
  "label_sr_only": {
    "doc": "Use `true` to make the label only readable by screen readers.",
    "type": "boolean",
    "status": "optional"
  },
  "suffix": {
    "doc": "Text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component.",
    "type": "React.Node",
    "status": "optional"
  },
  "skeleton": {
    "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
    "type": "boolean",
    "status": "optional"
  },
  "input_ref": {
    "doc": "Use a React.Ref to get access to the `input` DOM element.",
    "type": "React.RefObject",
    "status": "optional"
  },
  "input_element": {
    "doc": "Lets you provide a custom React element as the input HTML element.",
    "type": ["string", "React.Element"],
    "status": "optional"
  },
  "[DrawerList](/uilib/components/fragments/drawer-list/properties)": {
    "doc": "All DrawerList properties.",
    "type": "Various",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## DrawerList Properties

```json
{
  "[data](#the-data-property)": {
    "doc": "The data we want to fill the list with. [Details on the type of {DATA} can be found below](#the-data-property). The data can be provided as an array or object. Or as a function that returns the data (called when user opens the list).",
    "type": ["{DATA}", "() => {DATA}"],
    "status": "required"
  },
  "groups": {
    "doc": "An array of group titles for the list items. Only the first group can be `undefined`",
    "type": "React.ReactNode[]",
    "status": "optional"
  },
  "value": {
    "doc": "Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).",
    "type": ["string", "number"],
    "status": "optional"
  },
  "default_value": {
    "doc": "Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to `null`.",
    "type": "number",
    "status": "optional"
  },
  "triangle_position": {
    "doc": "Position of the arrow icon/triangle inside the drawer-list. Set to 'left' or 'right'. Defaults to 'left' if not set.",
    "type": "string",
    "status": "optional"
  },
  "direction": {
    "doc": "Defines the direction of how the drawer-list shows the options list. Can be 'bottom' or 'top'. Defaults to 'auto'.",
    "type": "string",
    "status": "optional"
  },
  "label_direction": {
    "doc": "The direction of the label. If set to 'horizontal', the label will be positioned horizontally next to the input element. If set to 'vertical', the label will be positioned vertically above the input element.",
    "type": "string",
    "status": "optional"
  },
  "prevent_selection": {
    "doc": "If set to `true`, the DrawerList will then not make any permanent selection.",
    "type": "boolean",
    "status": "optional"
  },
  "focusable": {
    "doc": "If set to `true`, the element is then focusable by assertive technologies.",
    "type": "boolean",
    "status": "optional"
  },
  "prevent_close": {
    "doc": "If set to `true`, the DrawerList will not close on any events.",
    "type": "boolean",
    "status": "optional"
  },
  "keep_open": {
    "doc": "If set to `true`, the DrawerList will close on outside clicks, but not on selection.",
    "type": "boolean",
    "status": "optional"
  },
  "independent_width": {
    "doc": "If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.",
    "type": "boolean",
    "status": "optional"
  },
  "fixed_position": {
    "doc": "If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.",
    "type": "boolean",
    "status": "optional"
  },
  "enable_body_lock": {
    "doc": "If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.",
    "type": "boolean",
    "status": "optional"
  },
  "skip_keysearch": {
    "doc": "If set to `true`, search items by the first key will be ignored.",
    "type": "boolean",
    "status": "optional"
  },
  "ignore_events": {
    "doc": "If set to `true`, all keyboard and mouse events will be ignored.",
    "type": "boolean",
    "status": "optional"
  },
  "align_drawer": {
    "doc": "Use 'right' to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu` - or if an independent width is used.",
    "type": "string",
    "status": "optional"
  },
  "list_class": {
    "doc": "Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.",
    "type": "string",
    "status": "optional"
  },
  "portal_class": {
    "doc": "Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.",
    "type": "string",
    "status": "optional"
  },
  "scrollable": {
    "doc": "Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).",
    "type": "boolean",
    "status": "optional"
  },
  "no_scroll_animation": {
    "doc": "To disable scrolling animation.",
    "type": "boolean",
    "status": "optional"
  },
  "no_animation": {
    "doc": "To disable appear/disappear (show/hide) animation.",
    "type": "boolean",
    "status": "optional"
  },
  "skip_portal": {
    "doc": "To disable the React Portal behavior.",
    "type": "boolean",
    "status": "optional"
  },
  "min_height": {
    "doc": "Defines the minimum height (in `rem`) of the options list.",
    "type": "string",
    "status": "optional"
  },
  "max_height": {
    "doc": "Defines the maximum height (in `rem`) of the options list.",
    "type": "string",
    "status": "optional"
  },
  "page_offset": {
    "doc": "Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).",
    "type": "string",
    "status": "optional"
  },
  "observer_element": {
    "doc": "Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.",
    "type": "string",
    "status": "optional"
  },
  "cache_hash": {
    "doc": "Set a `cache_hash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.",
    "type": "string",
    "status": "optional"
  },
  "wrapper_element": {
    "doc": "Has to be an HTML Element, or a selector for one, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapper_element` will not trigger an outside click.",
    "type": ["string", "HTMLElement"],
    "status": "optional"
  },
  "options_render": {
    "doc": "Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-options_render). This can be used to add additional options above the actual rendered list.",
    "type": "function",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## The `data` property

The `data` can be structured in two main ways:

- As an array
- As an object.

An array is preferred as it gives you the most options.

### `data` as an array

```ts
// an array can contain complex items and offers the most control
const data = [
  {
    content: "Item 1",
  },
  {
    content: <span>Item 2</span>
  },
  {
    content: ["Item 3", "Line 2", <span>Line 3</span>]
  },
  {
    content: ['Main account', '1234 12 12345'],
    selected_value: 'Main account (605,22 kr)',
    suffix_value: '605,22 kr',
  },
  {
    content: ['Old account', <i>Closed</i>],
    disabled: true,
    suffix_value: '0,00 kr',
  },
]

// If you only use the `content` property, you can use it directly in the array.
// This list is identical to the one above:
const data = [
  "Item 1",
  <span>Item 2</span>,
  ["Item 3", "Line 2", <span>Line 3</span>],
  {
    content: ['Main account', '1234 12 12345'],
    selected_value: 'Main account (605,22 kr)',
    suffix_value: '605,22 kr',
  },
  {
    content: ['Old account', <i>Closed</i>],
    disabled: true,
    suffix_value: '0,00 kr',
  },
]

const onChange = ({ data, value }) => {
  console.log(data) // returns the item as it appears in the array
  console.log(value) // returns the index of the item
}
```

Each object in the array have the following properties:

```json
{
  "content": {
    "doc": "Visual content in the list item",
    "type": ["string", "React.node", "(string | React.Node)[]"],
    "status": "optional"
  },
  "disabled": {
    "doc": "Disables the list item from selection",
    "type": "boolean",
    "status": "optional"
  },
  "groupIndex": {
    "doc": "What group index in the `groups` prop this item belongs to.",
    "type": "number",
    "status": "optional"
  },
  "selectedKey": {
    "doc": "If set, can be used instead of array index by the `value` prop",
    "type": ["string", "number"],
    "status": "optional"
  },
  "selected_value": {
    "doc": "Replaces the standard value output for selected item. Only used in some implementations (Dropdown, Autocomplete).",
    "type": ["string", "React.Node"],
    "status": "optional"
  },
  "suffix_value": {
    "doc": "Content placed to the right in the list item.",
    "type": ["string", "React.node"],
    "status": "optional"
  },
  "selected_key": {
    "doc": "Use prop `selectedKey` instead",
    "type": ["string", "number"],
    "status": "deprecated"
  }
}
```

### `data` as an object

A simpler alternative, but with less options

```ts
// Each entry can contain the same type of value as the array's `content` property
const data = {
  first: "Item 1",,
  second: <span>Item 2</span>,
  last: ["Item 3", "Line 2", <span>Line 3</span>],
}

const onChange = ({ data, value }) => {
  console.log(data)
  // returns a generated object representing the item:
  // {
  //   selectedKey: 'first',
  //   value: 'first',
  //   content: 'Item 1',
  //   type: 'object'
  // }

  console.log(value) // returns the key ("first", "second", or "last"), instead of an index

}

```

### `data` types overview

The following is an overview of all the types that the `data` property accepts. (These are not actual names of actual types in the library.)

```ts
// The visual content that is shown in one DrawerList item.
// An array can be used to define multiple lines.
type CONTENT = string | React.Node | (string | React.Node)[]

// An array item
type ARRAY_OBJECT = {
  content: CONTENT
  disabled?: boolean
  selectedKey?: string | number
  selected_value?: string | React.Node
  suffix_value?: string | React.Node
  style?: React.CSSProperties
}

// `data` as an array. A list of "ARRAY_OBJECT" types is preferred,
// but the "CONTENT" type can be useful for simple lists.
type ARRAY = (CONTENT | ARRAY_OBJECT)[]

// `data` as an object. Can only contain the "CONTENT" type.
// Each `key` behaves like the "ARRAY_OBJECT"'s `selectedKey`.
type RECORD = Record<string, CONTENT>

// An object or array that represents the entire DrawerList list.
type DATA = ARRAY | RECORD

// The final type of the `data` property:
let data: DATA | () => DATA
```

#### JSON string

There is technically support for sending in a JSON string of the data to the `data` property. But this is an old functionality that we do not really support anymore.

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Autocomplete.aria_live_options": {
      "nb-NO": "%s alternativer",
      "en-GB": "%s options",
      "sv-SE": "%s alternativ",
      "da-DK": "%s muligheder"
    },
    "Autocomplete.indicator_label": {
      "nb-NO": "Henter data ...",
      "en-GB": "Getting data ...",
      "sv-SE": "Hämtar data ...",
      "da-DK": "Henter data ..."
    },
    "Autocomplete.no_options": {
      "nb-NO": "Ingen alternativer",
      "en-GB": "No option",
      "sv-SE": "Inga alternativ",
      "da-DK": "Ingen muligheder"
    },
    "Autocomplete.selected_sr": {
      "nb-NO": "Valgt:",
      "en-GB": "Selected:",
      "sv-SE": "Vald:",
      "da-DK": "Valgt:"
    },
    "Autocomplete.show_all": {
      "nb-NO": "Vis alt",
      "en-GB": "Show everything",
      "sv-SE": "Visa allt",
      "da-DK": "Vis alt"
    },
    "Autocomplete.show_options_sr": {
      "nb-NO": "Bla gjennom alternativer, lukk med esc knappen",
      "en-GB": "Browse options, close with esc button",
      "sv-SE": "Bläddra genom alternativ, stäng med esc-knappen",
      "da-DK": "Gennemse muligheder, luk med esc-knappen"
    },
    "Autocomplete.submit_button_title": {
      "nb-NO": "Vis alternativer",
      "en-GB": "Show options",
      "sv-SE": "Visa alternativ",
      "da-DK": "Vis muligheder"
    },
    "Autocomplete.title": {
      "nb-NO": "Skriv og velg",
      "en-GB": "Type and select",
      "sv-SE": "Skriv och välj",
      "da-DK": "Skriv og vælg"
    },
    "DrawerList.defaultGroupSR": {
      "nb-NO": "Standardvalg",
      "en-GB": "Default options",
      "sv-SE": "Standardval",
      "da-DK": "Standardvalg"
    },
    "DrawerList.missingGroup": {
      "nb-NO": "Gruppe",
      "en-GB": "Group",
      "sv-SE": "Grupp",
      "da-DK": "Gruppe"
    },
    "DrawerList.noGroupSR": {
      "nb-NO": "Andre valg",
      "en-GB": "Other options",
      "sv-SE": "Andra val",
      "da-DK": "Andre valg"
    }
  }
}
```

## Events

```json
{
  "on_type": {
    "doc": "Will be called for every key change the users makes. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data)",
    "type": "function",
    "status": "optional"
  },
  "on_focus": {
    "doc": "Will be called on user generated focus action. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).",
    "type": "function",
    "status": "optional"
  },
  "on_blur": {
    "doc": "Will be called on user generated blur action. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).",
    "type": "function",
    "status": "optional"
  },
  "on_change": {
    "doc": "Will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).",
    "type": "function",
    "status": "optional"
  },
  "on_select": {
    "doc": "Will be called once the users focuses or selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, active_item }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data). The \"active_item\" property is the currently selected item by keyboard navigation",
    "type": "function",
    "status": "optional"
  },
  "on_show": {
    "doc": "Will be called once the user presses the autocomplete. Returns the data item `{ data, attributes }`.",
    "type": "function",
    "status": "optional"
  },
  "on_hide": {
    "doc": "Will be called once the user presses the autocomplete again, or clicks somewhere else. Returns the data item `{ data, attributes }`.",
    "type": "function",
    "status": "optional"
  },
  "onClear": {
    "doc": "Will be called on a clear button click. Returns `{ value, previousValue, event }`.",
    "type": "function",
    "status": "optional"
  }
}
```

### The `on_change` vs `on_select` difference

The difference between `on_change` and `on_select` is:

- `on_change` will be called when the state changes, either with a **click** or **space/enter** keypress confirmation.
- `on_select` differs most when the user is navigating by keyboard. Once the user is pressing e.g. the arrow keys, the selection is changing, but not the state.

<AutocompleteMethods></AutocompleteMethods>
