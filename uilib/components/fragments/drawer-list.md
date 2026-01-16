---
title: 'Drawer List'
description: 'The DrawerList component is a fragment inside other components.'
metadata: https://eufemia.dnb.no/uilib/components/fragments/drawer-list/metadata.json
---

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
    selected_key: 'key_0',

    // Item content as a string or array
    content: 'Item 1 Content',
  },

  // more items ...
  {
    selected_key: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content'],
  },
  {
    selected_key: 'key_2',
    content: ['Item 3 Content A', 'Item 3 Content B'],
  },
  {
    selected_key: 'key_3',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]

// as object
const data = {
  a: 'A',
  b: 'B',
}
```

### Example usage of `options_render`

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
      hidePreview
      hideToolbar
    >
      <DrawerList
        options_render={({ Items, Item, data }) => (
          <>
            <Items />
            <Item>Addition</Item>
            {data.length > 1 && <li>Addition</li>}
          </>
        )}
      />
    </ComponentBox>
  </Wrapper>,
)
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
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
    >
      {() => {
        const DrawerListWithState = (props) => {
          const [opened, setOpened] = React.useState(false)
          return (
            <>
              <ToggleButton
                id="state-toggle-button"
                text="Toggle"
                checked={opened}
                icon={`chevron_${opened ? 'up' : 'down'}`}
                icon_position="left"
                on_change={({ checked }) => setOpened(checked)}
              />
              <DrawerList
                wrapper_element="#state-toggle-button"
                skip_portal
                data={data}
                opened={opened}
                on_hide={() => setOpened(false)}
                {...props}
              />
            </>
          )
        }
        return <DrawerListWithState />
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### DrawerList list - only to visualize

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="drawer-list"
      scope={{
        data,
      }}
      hideCode
    >
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
                <NumberFormat ban>12345678902</NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Sparekonto - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat ban>11345678962</NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item item-nr-2">
                <a
                  className="dnb-anchor dnb-anchor--has-icon"
                  href="/uilib/components/fragments/drawer-list/"
                >
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
                <NumberFormat ban>15349648901</NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Oppussing - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__triangle" />
        </ul>
      </span>
    </ComponentBox>
  </Wrapper>,
)
```

### Default DrawerList

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
    >
      <DrawerList
        skip_portal
        opened
        prevent_close
        triangle_position="left"
        data={data}
        value={3}
        on_change={({ data: selectedDataItem }) => {
          console.log('on_change', selectedDataItem)
        }}
        on_show={() => {
          console.log('on_show')
        }}
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Disabled

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="drawer-list-disabled">
      <DrawerList
        skip_portal
        opened
        prevent_close
        data={[
          {
            content: 'Item 1',
          },
          {
            content: 'Item 2, disabled',
            disabled: true,
          },
          {
            content: 'Item 3',
          },
        ]}
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Custom event and link on single item

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
    >
      {() => {
        const CustomComponent = () => (
          <CustomComponentInner
            onTouchStart={preventDefault}
            onClick={(e) => {
              console.log('Do something different')
              preventDefault(e)
            }}
          >
            Custom event handler
          </CustomComponentInner>
        )
        const CustomComponentInner = styled.span`
          display: block;
          width: 100%;
          margin: -1rem -2rem -1rem -1rem;
          padding: 1rem 2rem 1rem 1rem;
        `
        const preventDefault = (e) => {
          e.stopPropagation()
          e.preventDefault()
        }
        const CustomWidth = styled(DrawerList)`
          .dnb-drawer-list__list {
            width: var(--drawer-list-width);
          }
        `
        return (
          <CustomWidth
            skip_portal
            opened
            prevent_close
            // more_menu
            right
            title="Choose an item"
            data={() => [
              <Link key="link" href="/">
                Go to this Link
              </Link>,
              'Or press on me',
              <CustomComponent key="custom" />,
            ]}
            on_change={({ value }) => {
              console.log('More menu:', value)
            }}
            suffix={
              <HelpButton title="Modal Title">Modal content</HelpButton>
            }
            observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
          />
        )
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### Using List and Items markup

**NB:** By using this method you lose currently a lot of the core functionality like keyboard support and other accessibility features.

```tsx
render(
  <Wrapper>
    <ComponentBox>
      {() => {
        const list = [
          {
            value: 'A',
          },
          {
            value: 'B',
          },
          {
            value: 'C',
          },
        ]
        const CustomWidth = styled(DrawerList)`
          .dnb-drawer-list__list {
            width: var(--drawer-list-width);
          }
        `
        const DrawerListWithState = () => {
          const [selected, setSelected] = React.useState('C')
          return (
            <CustomWidth skip_portal opened prevent_close>
              <DrawerList.Options>
                {list.map(({ value, ...props }, i) => (
                  <DrawerList.Item
                    key={i}
                    selected={value === selected}
                    value={value}
                    on_click={({ value }) => setSelected(value)}
                    {...props}
                  >
                    {value}
                  </DrawerList.Item>
                ))}
              </DrawerList.Options>
            </CustomWidth>
          )
        }
        return <DrawerListWithState />
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### Inline styling using JSX

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <DrawerList
        skip_portal
        opened
        prevent_close
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
      >
        <DrawerList.Options>
          <DrawerList.Item
            style={{
              color: 'red',
            }}
            key="A"
            selected={false}
            value="A"
            on_click={() => {
              console.log('on_click')
            }}
          >
            Item 1
          </DrawerList.Item>
          <DrawerList.HorizontalItem
            style={{
              color: 'green',
            }}
            key="B"
            selected={false}
            value="B"
          >
            Item 2
          </DrawerList.HorizontalItem>
        </DrawerList.Options>
      </DrawerList>
    </ComponentBox>
  </Wrapper>,
)
```

### Inline styling using `data`

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="drawer-list-inline-style">
      <DrawerList
        skip_portal
        opened
        prevent_close
        data={[
          {
            content:
              'They may be very large, like pneumonoultramicroscopicsilicovolcanoconiosis, a 45-letter hippopotomonstrosesquipedalian word for black lung disease.',
            style: {
              hyphens: 'auto',
              color: 'red',
            },
          },
          {
            content:
              'The longest word in the Oxford English Dictionary is the 45-letter pneumonoultramicroscopicsilicovolcanoconiosis, which refers to a form of lung disease.',
            style: {
              hyphens: 'none',
              color: 'green',
            },
          },
          {
            content:
              'According to the Oxford English Dictionary the longest word in the language is pneumonoultramicroscopicsilicovolcanoconiosis, with 45 letters.',
            style: {
              hyphens: 'manual',
              color: 'blue',
            },
          },
        ]}
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
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
    <ComponentBox data-visual-test="drawer-list-groups">
      <DrawerList
        skip_portal
        opened
        prevent_close
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
        groups={[undefined, 'Pets', undefined, 'Cars']}
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
            content: 'Something',
          },
          {
            groupIndex: 3,
            content: 'Jeep',
          },
          {
            groupIndex: 3,
            content: 'Van',
          },
          {
            content: 'No group',
          },
        ]}
      />
    </ComponentBox>
  </Wrapper>,
)
```
