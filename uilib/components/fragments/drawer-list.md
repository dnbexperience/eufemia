---
title: 'DrawerList'
description: 'The DrawerList component is a fragment inside other components.'
version: 11.1.1
generatedAt: 2026-05-05T18:42:12.325Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# DrawerList

## Import

```tsx
import { DrawerList } from '@dnb/eufemia/fragments'
```

## Description

The DrawerList component is a fragment inside other components.

It is used e.g. in the [Dropdown](/uilib/components/dropdown).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/fragments/drawer-list)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/fragments/drawer-list)

## Data structure

```js
// as array
const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selectedKey: 'key_0',

    // Item content as a string or array
    content: 'Item 1 Content',
  },

  // more items ...
  {
    selectedKey: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content'],
  },
  {
    selectedKey: 'key_2',
    content: ['Item 3 Content A', 'Item 3 Content B'],
  },
  {
    selectedKey: 'key_3',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]

// as object
const data = {
  a: 'A',
  b: 'B',
}
```

### Example usage of `optionsRender`


```tsx
render(<Wrapper>
    <ComponentBox scope={{
    data
  }} hidePreview hideToolbar>
      <DrawerList optionsRender={({
      Items,
      Item,
      data
    }) => <>
            <Items />
            <Item>Addition</Item>
            {data.length > 1 && <li>Addition</li>}
          </>} />
    </ComponentBox>
  </Wrapper>)
```


### data-dnb-drawer-list-active

When a DrawerList is open, it will set an HTML attribute on the main HTML Element called `data-dnb-drawer-list-active`. The attribute value will be the ID of the current DrawerList.

This can be used to handle z-index issues from within CSS only:

```css
html[data-dnb-drawer-list-active='DrawerList-ID'] {
  /* Your css */
}
```


## Demos

### Default DrawerList, triggered by a ToggleButton


```tsx
render(<Wrapper>
    <ComponentBox scope={{
    data
  }}>
      {() => {
      const DrawerListWithState = props => {
        const [open, setOpen] = React.useState(false);
        return <>
              <ToggleButton id="state-toggle-button" text="Toggle" checked={open} icon={`chevron_${open ? 'up' : 'down'}`} iconPosition="left" onChange={({
            checked
          }) => setOpen(checked)} />
              <DrawerList wrapperElement="#state-toggle-button" skipPortal data={data} open={open} onClose={() => setOpen(false)} {...props} />
            </>;
      };
      return <DrawerListWithState />;
    }}
    </ComponentBox>
  </Wrapper>)
```


### DrawerList list - only to visualize


```tsx
render(<Wrapper>
    <ComponentBox data-visual-test="drawer-list" scope={{
    data
  }} hideCode>
      <span className="dnb-drawer-list__list">
        <ul className="dnb-drawer-list__options">
          <li className="dnb-drawer-list__option first-of-type">
            <span className="dnb-drawer-list__option__inner">
              Brukskonto - Kari Nordmann
            </span>
          </li>
          <li className="dnb-drawer-list__option dnb-drawer-list__option--selected">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat.BankAccountNumber>
                  12345678902
                </NumberFormat.BankAccountNumber>
              </span>
              <span className="dnb-drawer-list__option__item">
                Sparekonto - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat.BankAccountNumber>
                  11345678962
                </NumberFormat.BankAccountNumber>
              </span>
              <span className="dnb-drawer-list__option__item item-nr-2">
                <a className="dnb-anchor dnb-anchor--has-icon" href="/uilib/components/fragments/drawer-list/">
                  Long link that will wrap over several lines
                </a>
              </span>
              <span className="dnb-drawer-list__option__item">
                Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option last-of-type">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat.BankAccountNumber>
                  15349648901
                </NumberFormat.BankAccountNumber>
              </span>
              <span className="dnb-drawer-list__option__item">
                Oppussing - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__arrow" />
        </ul>
      </span>
    </ComponentBox>
  </Wrapper>)
```


### Default DrawerList


```tsx
render(<Wrapper>
    <ComponentBox scope={{
    data
  }}>
      <DrawerList skipPortal open preventClose arrowPosition="left" data={data} value={3} onChange={({
      data: selectedDataItem
    }) => {
      console.log('onChange', selectedDataItem);
    }} onOpen={() => {
      console.log('onOpen');
    }} observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
    />
    </ComponentBox>
  </Wrapper>)
```


### Disabled


```tsx
render(<Wrapper>
    <ComponentBox data-visual-test="drawer-list-disabled">
      <DrawerList skipPortal open preventClose data={[{
      content: 'Item 1'
    }, {
      content: 'Item 2, disabled',
      disabled: true
    }, {
      content: 'Item 3'
    }]} observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
    />
    </ComponentBox>
  </Wrapper>)
```


### Custom event and link on single item


```tsx
render(<Wrapper>
    <ComponentBox scope={{
    data
  }}>
      {() => {
      const CustomComponent = () => <CustomComponentInner onTouchStart={preventDefault} onClick={e => {
        console.log('Do something different');
        preventDefault(e);
      }}>
            Custom event handler
          </CustomComponentInner>;
      const CustomComponentInner = styled.span`
          display: block;
          width: 100%;
          margin: -1rem -2rem -1rem -1rem;
          padding: 1rem 2rem 1rem 1rem;
        `;
      const preventDefault = e => {
        e.stopPropagation();
        e.preventDefault();
      };
      const CustomWidth = styled(DrawerList)`
          .dnb-drawer-list__list {
            width: var(--drawer-list-width);
          }
        `;
      return <CustomWidth skipPortal open preventClose right title="Choose an item" data={() => [<Link key="link" href="/">
                Go to this Link
              </Link>, 'Or press on me', <CustomComponent key="custom" />]} onChange={({
        value
      }) => {
        console.log('More menu:', value);
      }} suffix={<HelpButton title="Modal Title">Modal content</HelpButton>} observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
      />;
    }}
    </ComponentBox>
  </Wrapper>)
```


### Using List and Items markup

**NB:** By using this method you lose currently a lot of the core functionality like keyboard support and other accessibility features.


```tsx
render(<Wrapper>
    <ComponentBox>
      {() => {
      const list = [{
        value: 'A'
      }, {
        value: 'B'
      }, {
        value: 'C'
      }];
      const CustomWidth = styled(DrawerList)`
          .dnb-drawer-list__list {
            width: var(--drawer-list-width);
          }
        `;
      const DrawerListWithState = () => {
        const [selected, setSelected] = React.useState('C');
        return <CustomWidth skipPortal open preventClose>
              <DrawerList.Options>
                {list.map(({
              value,
              ...props
            }, i) => <DrawerList.Item key={i} selected={value === selected} value={value} onClick={({
              value
            }) => setSelected(value)} {...props}>
                    {value}
                  </DrawerList.Item>)}
              </DrawerList.Options>
            </CustomWidth>;
      };
      return <DrawerListWithState />;
    }}
    </ComponentBox>
  </Wrapper>)
```


### Inline styling using JSX


```tsx
render(<Wrapper>
    <ComponentBox>
      <DrawerList skipPortal open preventClose observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
    >
        <DrawerList.Options>
          <DrawerList.Item style={{
          color: 'red'
        }} key="A" selected={false} value="A" onClick={() => {
          console.log('onClick');
        }}>
            Item 1
          </DrawerList.Item>
          <DrawerList.HorizontalItem style={{
          color: 'green'
        }} key="B" selected={false} value="B">
            Item 2
          </DrawerList.HorizontalItem>
        </DrawerList.Options>
      </DrawerList>
    </ComponentBox>
  </Wrapper>)
```


### Inline styling using `data`


```tsx
render(<Wrapper>
    <ComponentBox data-visual-test="drawer-list-inline-style">
      <DrawerList skipPortal open preventClose data={[{
      content: 'They may be very large, like pneumonoultramicroscopicsilicovolcanoconiosis, a 45-letter hippopotomonstrosesquipedalian word for black lung disease.',
      style: {
        hyphens: 'auto',
        color: 'red'
      }
    }, {
      content: 'The longest word in the Oxford English Dictionary is the 45-letter pneumonoultramicroscopicsilicovolcanoconiosis, which refers to a form of lung disease.',
      style: {
        hyphens: 'none',
        color: 'green'
      }
    }, {
      content: 'According to the Oxford English Dictionary the longest word in the language is pneumonoultramicroscopicsilicovolcanoconiosis, with 45 letters.',
      style: {
        hyphens: 'manual',
        color: 'blue'
      }
    }]} observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
    />
    </ComponentBox>
  </Wrapper>)
```


### Groups

If an item has a `groupIndex` property, it will use the groups in the `groups` property. Only the first group can be without title, all other groups must have a title.


```tsx
render(<Wrapper>
    <ComponentBox data-visual-test="drawer-list-groups">
      <DrawerList skipPortal open preventClose observerElement=".dnb-live-preview" // prevents direction to change when scrolling in this example
    groups={[undefined, 'Pets', undefined, 'Cars']} data={[{
      groupIndex: 0,
      content: 'Default 1'
    }, {
      groupIndex: 0,
      content: 'Default 2'
    }, {
      groupIndex: 1,
      content: 'Cat'
    }, {
      groupIndex: 1,
      content: 'Dog'
    }, {
      groupIndex: 2,
      content: 'Something'
    }, {
      groupIndex: 3,
      content: 'Jeep'
    }, {
      groupIndex: 3,
      content: 'Van'
    }, {
      content: 'No group'
    }]} />
    </ComponentBox>
  </Wrapper>)
```

## Properties


```json
{
  "props": {
    "[data](#the-data-property)": {
      "doc": "The data we want to fill the list with. [Details on the type of {DATA} can be found below](#the-data-property). The data can be provided as an array or object. Or as a function that returns the data (called when user opens the list).",
      "type": [
        "{DATA}",
        "() => {DATA}"
      ],
      "status": "required"
    },
    "groups": {
      "doc": "An array of group titles for the list items. Only the first group can be `undefined`.",
      "type": "Array<React.ReactNode>",
      "status": "optional"
    },
    "value": {
      "doc": "Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` property (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to `null`.",
      "type": "number",
      "status": "optional"
    },
    "arrowPosition": {
      "doc": "Position of the arrow on the popup drawer. Set to `left` or `right`. Defaults to `left` if not set.",
      "type": "string",
      "status": "optional"
    },
    "direction": {
      "doc": "Defines the direction of how the drawer-list shows the options list. Can be `bottom` or `top`. Defaults to `auto`.",
      "type": [
        "\"auto\"",
        "\"top\"",
        "\"bottom\""
      ],
      "status": "optional"
    },
    "labelDirection": {
      "doc": "Use `labelDirection=\"horizontal\"` to change the label layout direction. Defaults to `vertical`.",
      "type": "string",
      "status": "optional"
    },
    "preventSelection": {
      "doc": "If set to `true`, the DrawerList will then not make any permanent selection.",
      "type": "boolean",
      "status": "optional"
    },
    "focusable": {
      "doc": "If set to `true`, the element is then focusable by assertive technologies.",
      "type": "boolean",
      "status": "optional"
    },
    "preventClose": {
      "doc": "If set to `true`, the DrawerList will not close on any events.",
      "type": "boolean",
      "status": "optional"
    },
    "keepOpen": {
      "doc": "If set to `true`, the DrawerList will close on outside clicks, but not on selection.",
      "type": "boolean",
      "status": "optional"
    },
    "independentWidth": {
      "doc": "If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.",
      "type": "boolean",
      "status": "optional"
    },
    "fixedPosition": {
      "doc": "If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.",
      "type": "boolean",
      "status": "optional"
    },
    "enableBodyLock": {
      "doc": "If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.",
      "type": "boolean",
      "status": "optional"
    },
    "skipKeysearch": {
      "doc": "If set to `true`, search items by the first key will be ignored.",
      "type": "boolean",
      "status": "optional"
    },
    "ignoreEvents": {
      "doc": "If set to `true`, all keyboard and mouse events will be ignored.",
      "type": "boolean",
      "status": "optional"
    },
    "alignDrawer": {
      "doc": "Use 'right' to change the options alignment direction. Makes only sense to use in combination with `preventSelection` - or if an independent width is used.",
      "type": "string",
      "status": "optional"
    },
    "listClass": {
      "doc": "Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.",
      "type": "string",
      "status": "optional"
    },
    "portalClass": {
      "doc": "Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.",
      "type": "string",
      "status": "optional"
    },
    "scrollable": {
      "doc": "Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).",
      "type": "boolean",
      "status": "optional"
    },
    "noScrollAnimation": {
      "doc": "To disable scrolling animation.",
      "type": "boolean",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "To disable appear/disappear (show/hide) animation.",
      "type": "boolean",
      "status": "optional"
    },
    "skipPortal": {
      "doc": "To disable the React Portal behavior.",
      "type": "boolean",
      "status": "optional"
    },
    "minHeight": {
      "doc": "Defines the minimum height (in `rem`) of the options list.",
      "type": "string",
      "status": "optional"
    },
    "maxHeight": {
      "doc": "Defines the maximum height (in `rem`) of the options list.",
      "type": "string",
      "status": "optional"
    },
    "pageOffset": {
      "doc": "Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).",
      "type": "string",
      "status": "optional"
    },
    "observerElement": {
      "doc": "Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.",
      "type": "string",
      "status": "optional"
    },
    "cacheHash": {
      "doc": "Set a `cacheHash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.",
      "type": "string",
      "status": "optional"
    },
    "wrapperElement": {
      "doc": "Has to be an HTML Element, or a selector for one, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapperElement` will not trigger an outside click.",
      "type": [
        "string",
        "HTMLElement"
      ],
      "status": "optional"
    },
    "optionsRender": {
      "doc": "Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-optionsRender). This can be used to add additional options above the actual rendered list.",
      "type": "function",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
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
    selectedValue: 'Main account (605,22 kr)',
    suffixValue: '605,22 kr',
  },
  {
    content: ['Old account', <i>Closed</i>],
    disabled: true,
    suffixValue: '0,00 kr',
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
    selectedValue: 'Main account (605,22 kr)',
    suffixValue: '605,22 kr',
  },
  {
    content: ['Old account', <i>Closed</i>],
    disabled: true,
    suffixValue: '0,00 kr',
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
  "props": {
    "content": {
      "doc": "Visual content in the list item.",
      "type": [
        "string",
        "React.ReactNode",
        "Array<(string | React.ReactNode)>"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Disables the list item from selection.",
      "type": "boolean",
      "status": "optional"
    },
    "groupIndex": {
      "doc": "What group index in the `groups` property this item belongs to.",
      "type": "number",
      "status": "optional"
    },
    "selectedKey": {
      "doc": "If set, can be used instead of array index by the `value` prop.",
      "type": [
        "string",
        "number"
      ],
      "status": "optional"
    },
    "selectedValue": {
      "doc": "Replaces the standard value output for selected item. Only used in some implementations (Dropdown, Autocomplete).",
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "suffixValue": {
      "doc": "Content placed to the right in the list item.",
      "type": [
        "string",
        "React.ReactNode"
      ],
      "status": "optional"
    }
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
type CONTENT = string | React.ReactNode | (string | React.ReactNode)[]

// An array item
type ARRAY_OBJECT = {
  content: CONTENT
  disabled?: boolean
  selectedKey?: string | number
  selectedValue?: string | React.ReactNode
  suffixValue?: string | React.ReactNode
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
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
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
  "props": {
    "onPreChange": {
      "doc": "Will be called before `onChange`, this way you can return false to prevent selection and to prevent `onChange` execution.",
      "type": "function",
      "status": "optional"
    },
    "onChange": {
      "doc": "Will be called on state changes made by the user.",
      "type": "function",
      "status": "optional"
    },
    "onSelect": {
      "doc": "Will be called once the user focuses or selects an item by a click or keyboard navigation.",
      "type": "function",
      "status": "optional"
    },
    "onOpen": {
      "doc": "Will be called once the user presses the drawer-list.",
      "type": "function",
      "status": "optional"
    },
    "onClose": {
      "doc": "Will be called once the user presses the drawer-list again, or clicks somewhere else.",
      "type": "function",
      "status": "optional"
    }
  }
}
```


### The `onChange` vs `onSelect` difference

The difference between `onChange` and `onSelect` is:

- `onChange` will be called when the state changes, either with a **click** or **space/enter** keypress confirmation.
- `onSelect` differs most when the user is navigating by keyboard. Once the user is pressing e.g. the arrow keys, the selection is changing, but not the state.
