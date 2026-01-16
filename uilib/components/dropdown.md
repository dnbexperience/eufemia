---
title: 'Dropdown'
description: 'The Dropdown component is a custom-made data selection component.'
metadata: https://eufemia.dnb.no/uilib/components/dropdown/metadata.json
---

## Import

```tsx
import { Dropdown } from '@dnb/eufemia'
```

## Description

The Dropdown component is a fully custom-made component. This allows us to change its form based on context (small screens, touch devices, etc.).

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1494)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/dropdown)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/dropdown)

### When to use

Use a dropdown when you need to provide many options to the user but don't have space to display them all. The hidden options should only appear when the user requests them, reducing visual clutter.

1. When space is limited
1. When you want to reduce visual clutter
1. When it's intuitive for users to request hidden content

### When not to use

1. Do not use a dropdown if you have only a few options that could be shown using [Radio buttons](/uilib/components/radio) or [ToggleButtons](/uilib/components/toggle-button).

**Note:** This pattern can be constructed in various ways to achieve a similar effect—from using the HTML `select` element to custom building with divs, spans, and JavaScript.

## Action menu

The Dropdown component can be used as an **action button** by setting `action_menu={true}`. In mobile view, the title/text will be hidden, showing only the icon, and the DrawerList will open from the bottom of the browser.

## Menu button

The Dropdown component can be used as a **menu button** by setting `more_menu={true}`, which displays the [more](/icons/primary#icon-more) icon (appears as dots). You can also use `prevent_selection={true}` together with an empty title `title=""` and `aria-label="Choose an item"`.

## Accessibility

For both the Action Menu and the Menu Button (and when `prevent_selection` is true), the Dropdown will use `role="menu"` instead of `role="menuitems"` for better screen reader support.

## Custom size

You can change the **width** of the Dropdown component with CSS by using:

```css
.dnb-dropdown {
  --dropdown-width: 20rem; /* custom width */
}
```

You can also set the width directly, but then it has to be defined like so (including `min-width`):

```css
/** Because of the included label/status etc. we target the "__shell" */
.dnb-dropdown__shell {
  width: 10rem;
}

/** In order to change only the drawer-list width */
.dnb-dropdown .dnb-drawer-list__root {
  width: 10rem;
}

/** If more_menu={true} is used */
.dnb-dropdown--is-popup .dnb-drawer-list__root {
  width: 10rem;
}
```

## Demos

### Default dropdown

No `value` is defined, but a `title` is given.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-closed">
      {() => {
        const data = [
          // Every data item can, beside "content" - contain what ever
          {
            // (optional) can be what ever
            selected_key: 'key_0',
            // (optional) is show instead of "content", once selected
            selected_value: 'Item 1 Value',
            // Item content as a string or array
            content: 'Item 1 Content',
          },
          {
            selected_key: 'key_1',
            content: ['Item 2 Value', 'Item 2 Content'],
          },
          {
            selected_value: (
              <NumberFormat always_selectall ban>
                11345678962
              </NumberFormat>
            ),
            content: [
              <NumberFormat key="ban" always_selectall ban>
                11345678962
              </NumberFormat>,
              'Bank account number',
            ],
          },
          {
            selected_key: 'key_2',
            selected_value: 'Item 3 Value',
            content: ['Item 3 Content A', 'Item 3 Content B'],
          },
          {
            selected_key: 'key_3',
            selected_value: 'Item 4 Value',
            content: ['Item 4 Content A', <>Custom Component</>],
          },
        ]
        return (
          <Dropdown
            data={data}
            label="Label"
            title="Please select a value"
            on_change={({ data }) => {
              console.log('on_change', data)
            }}
          />
        )
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### Dropdown with different item content directions

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        visualTestProps,
      }}
      data-visual-test="dropdown-item-directions"
    >
      <Dropdown
        label="Label"
        data={[
          ['Vertical', 'alignment'],
          <>
            <P weight="medium">Vertical</P>
            <P>alignment</P>
          </>,
          <Dropdown.HorizontalItem key="item-1">
            <P weight="medium" right="x-small">
              Horizontal
            </P>
            <P>alignment</P>
          </Dropdown.HorizontalItem>,
        ]}
        {...visualTestProps(globalThis.IS_TEST)}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Icon on left side

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
      data-visual-test="dropdown-left-icon"
    >
      <Dropdown
        label="Label"
        icon_position="left"
        data={data}
        value={3}
        skip_portal={true}
        on_change={({ data: selectedDataItem }) => {
          console.log('on_change', selectedDataItem)
        }}
        on_show={() => {
          console.log('on_show')
        }}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### ActionMenu

The ActionMenu will change its characteristics in mobile view. It will hide the title, and the DrawerList will be placed on the bottom of the page.

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        trash,
        download,
      }}
      data-visual-test="dropdown-action_menu"
    >
      <Dropdown
        title="ActionMenu"
        action_menu={true}
        align_dropdown="left"
        data={() => ({
          trash: (
            <>
              <Icon icon={trash} right />
              Move to trash
            </>
          ),
          download: (
            <>
              <Icon icon={download} right />
              Download
            </>
          ),
        })}
        on_change={({ value }) => console.log('action:', value)}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### MoreMenu

No lasting selection will be made.

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        visualTestProps,
      }}
      data-visual-test="dropdown-more_menu"
    >
      <Dropdown
        more_menu={true}
        size="small"
        title="Choose an item"
        data={() => [
          <Link href="/" key="item-1">
            Go to this Link
          </Link>,
          'Or press on me',
          <>Custom component</>,
        ]}
        right="small"
        {...visualTestProps(globalThis.IS_TEST)}
      />
      <Dropdown
        prevent_selection={true}
        align_dropdown="right"
        size="small"
        title={null}
        aria-label="Choose an item"
        data={() => ({
          first: (
            <Link href="/" key="item-1">
              Go to this Link
            </Link>
          ),
          second: 'Or press on me',
          third: <>Custom component</>,
        })}
        right="small"
        {...visualTestProps(globalThis.IS_TEST)}
      />
      <Dropdown
        more_menu={true}
        title="Choose an item"
        data={[
          <Link href="/" key="item-1">
            Go to this Link
          </Link>,
          'Or press on me',
          <>Custom component</>,
        ]}
        right="small"
      />
      <Dropdown
        prevent_selection={true}
        align_dropdown="right"
        title={null}
        aria-label="Choose an item"
        data={() => ({
          first: (
            <Link href="/" key="item-1">
              Go to this Link
            </Link>
          ),
          second: 'Or press on me',
          third: <>Custom component</>,
        })}
        on_change={({ value }) => {
          console.log('on_change', value)
        }}
        on_select={({ active_item }) => {
          console.log('on_select', active_item)
        }}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Dropdown as tertiary variant

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
      data-visual-test="dropdown-tertiary"
    >
      <Dropdown
        variant="tertiary"
        direction="bottom"
        independent_width={true}
        icon_position="left"
        align_dropdown="left"
        data={data}
      />
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
      data-visual-test="dropdown-tertiary-right"
    >
      <Dropdown
        variant="tertiary"
        direction="bottom"
        independent_width={true}
        icon_position="right"
        align_dropdown="right"
        data={data}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Custom item events

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
        visualTestProps,
      }}
      data-visual-test="dropdown-action_menu-custom"
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
        return (
          <Dropdown
            action_menu
            right
            label="Label"
            title="Choose an item"
            data={() => ({
              first: (
                <Link href="/" key="item-1">
                  Go to this Link
                </Link>
              ),
              second: 'Or press on me',
              third: <CustomComponent key="item-2" />,
            })}
            on_change={({ value }) => {
              console.log('More menu:', value)
            }}
            suffix={
              <HelpButton title="Modal Title">Modal content</HelpButton>
            }
            {...visualTestProps(globalThis.IS_TEST)}
          />
        )
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### Dropdown in different sizes

Four sizes are available: `small`, `default`, `medium` and `large`

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="dropdown-sizes"
      scope={{
        data,
      }}
    >
      <Flex.Vertical>
        <Dropdown label="Label" size="default" data={() => data} />
        <Dropdown label="Label" size="medium" data={() => data} />
        <Dropdown label="Label" size="large" data={() => data} />
      </Flex.Vertical>
    </ComponentBox>
  </Wrapper>,
)
```

### Custom width

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
    >
      {() => {
        const CustomWidthOne = styled(Dropdown)`
          .dnb-dropdown__shell {
            width: 10rem;
          }
        `
        const CustomWidthTwo = styled(Dropdown)`
          &.dnb-dropdown--is-popup .dnb-drawer-list__root {
            width: 12rem;
          }
        `
        const CustomWidthThree = styled(Dropdown)`
          /** Change the "__shell" width */
          .dnb-dropdown__shell {
            width: 10rem;
          }

          /** Change the "__list" width */
          .dnb-drawer-list__root {
            width: 20rem;
          }
        `
        const CustomWidthFour = styled(Dropdown)`
          width: 60%;
          min-width: 224px; /** 14rem (please use pixels on min-width!) */
          max-width: 25rem;

          /** In case we have a label */
          .dnb-form-label + .dnb-dropdown__inner {
            width: 100%;
          }
        `
        return (
          <Flex.Vertical>
            <CustomWidthOne
              label="Label"
              size="default"
              icon_position="left"
              data={data}
            />
            <CustomWidthTwo
              label="Label"
              size="small"
              more_menu
              data={data}
            />
            <CustomWidthThree
              label="Label"
              size="large"
              align_dropdown="right"
              data={data}
            />
            <CustomWidthFour
              title="Min and max width"
              stretch={true}
              data={data}
            />
          </Flex.Vertical>
        )
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### Dropdown with status

And vertical label layout.

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="dropdown-status-error"
      scope={{
        data,
      }}
    >
      <Dropdown
        data={data}
        label="Label"
        label_direction="vertical"
        status="Message to the user"
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Findable list

With long list to make it scrollable and searchable

```tsx
render(
  <Wrapper>
    <ComponentBox>
      {() => {
        const scrollableData = [
          {
            content: 'A',
          },
          {
            content: 'B',
          },
          {
            selected_value: (
              <NumberFormat always_selectall ban>
                11345678962
              </NumberFormat>
            ),
            content: [
              <NumberFormat key="ban-1" always_selectall ban>
                11345678962
              </NumberFormat>,
              'C',
            ],
          },
          {
            selected_value: (
              <NumberFormat always_selectall ban>
                15349648901
              </NumberFormat>
            ),
            content: [
              <NumberFormat key="ban-2" always_selectall ban>
                15349648901
              </NumberFormat>,
              'D',
            ],
          },
          {
            content: 'E',
          },
          {
            selected_key: 'key_1',
            selected_value: 'Find me by keypress',
            content: ['F', 'F', 'F', 'F'],
          },
          {
            content: 'G',
          },
          {
            content: 'H',
          },
        ]
        return (
          <Dropdown
            data={scrollableData}
            value="key_1" // use either index (5) or selected_key: 'key_1'
            label="Label"
          />
        )
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### Disabled dropdown

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        data,
      }}
      data-visual-test="dropdown-disabled"
    >
      <Dropdown disabled data={['Disabled Dropdown']} label="Label" />
    </ComponentBox>
  </Wrapper>,
)
```

Individual options can also be disabled.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-disabled-options">
      <Dropdown
        data={[
          {
            content: 'Item 1 Content',
          },
          {
            content: 'Item 2 Content',
            disabled: true,
          },
          {
            content: 'Item 3 Content',
            disabled: true,
          },
          {
            content: 'Item 4 Content A',
          },
        ]}
        label="Label"
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Disabled tertiary dropdown

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-disabled-tertiary">
      <Dropdown
        disabled
        variant="tertiary"
        data={['Disabled Dropdown']}
        label="Disabled tertiary dropdown"
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Customized Dropdown

An example of how you can customize the look of your `Dropdown`

```tsx
render(
  <Wrapper>
    <ComponentBox
      scope={{
        chevron_right,
        newspaper,
        chevron_down,
      }}
    >
      {() => {
        const styles = {
          customTrigger: {
            backgroundColor: '#d4ecc5',
            color: '#14555a',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 600,
          },
          customMenuItem: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          customMenuItemTitle: {
            display: 'flex',
            flexFlow: 'column',
            gap: '0.5rem',
          },
        }
        const MenuItem = ({ title, content, key }) => (
          <span style={styles.customMenuItem} key="item-1">
            <span style={styles.customMenuItemTitle}>
              {title}
              <span>{content}</span>
            </span>
            <Icon icon={chevron_right} />
          </span>
        )
        const data = {
          accounts: (
            <MenuItem
              key="item-1"
              title="Accounts"
              content={'Bills, Savings'}
            />
          ),
          loans: (
            <MenuItem
              key="item-2"
              title="Loans"
              content={'Mortgage, Car'}
            />
          ),
          cards: (
            <MenuItem
              key="item-3"
              title="Cards"
              content={'Visa, Mastercard'}
            />
          ),
          stocks: (
            <MenuItem
              key="item-4"
              title="Stocks"
              content={'Nvidia, Apple'}
            />
          ),
        }
        return (
          <Dropdown
            data={data}
            action_menu
            trigger_element={(props) => (
              <button {...props} style={styles.customTrigger}>
                <Icon icon={newspaper} /> Custom trigger{' '}
                <Icon icon={chevron_down} />
              </button>
            )}
          />
        )
      }}
    </ComponentBox>
  </Wrapper>,
)
```

### DrawerList opened

Only to visualize and used for visual testing

```tsx
render(
  <Wrapper>
    <ComponentBox
      data-visual-test="dropdown-list"
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
                <NumberFormat always_selectall key="n-1" ban>
                  12345678902
                </NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Sparekonto - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat always_selectall key="n-2" ban>
                  11345678962
                </NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option last-of-type">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat always_selectall key="n-3" ban>
                  15349648901
                </NumberFormat>
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

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-ellipsis">
      <Dropdown
        data={['Long text that will overflow with CSS ellipsis']}
        value={0}
        label="Label"
      />
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-independent_width_left">
      <Dropdown
        independent_width={true}
        icon_position="left"
        direction="top"
        title="Choose an item"
        data={() => [
          <Link href="/" key="item-1">
            Go to this Link
          </Link>,
          'Or press on me',
          <>Custom component</>,
        ]}
        right="small"
      />
    </ComponentBox>
  </Wrapper>,
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-independent_width_right">
      <Dropdown
        independent_width={true}
        icon_position="right"
        direction="top"
        title="Choose an item"
        data={() => [
          <Link href="/" key="item-1">
            Go to this Link
          </Link>,
          'Or press on me',
          <>Custom component</>,
        ]}
        right="small"
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
    <ComponentBox data-visual-test="dropdown-groups">
      <Dropdown
        groups={[undefined, 'Pets', 'Cars']}
        data={[
          {
            groupIndex: 0,
            content: 'Default 2',
          },
          {
            groupIndex: 0,
            content: 'Default 1',
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
