---
title: 'Dropdown'
description: 'The Dropdown component is a custom-made data selection component.'
version: 11.0.3
generatedAt: 2026-04-28T21:06:11.650Z
checksum: 1e3d4837783b622f108440442703c9b366fa7ad611927f646b6ea18919b836fa
---

# Dropdown

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

## Accessibility

When `preventSelection` is true, the Dropdown will use `role="menu"`, instead of `role="listbox"` for better screen reader support.

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

/** If using popup style (no title) */
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
            selectedKey: 'key_0',
            // (optional) is show instead of "content", once selected
            selectedValue: 'Item 1 Value',
            // Item content as a string or array
            content: 'Item 1 Content',
          },
          {
            selectedKey: 'key_1',
            content: ['Item 2 Value', 'Item 2 Content'],
          },
          {
            selectedValue: (
              <NumberFormat.BankAccountNumber alwaysSelectAll>
                11345678962
              </NumberFormat.BankAccountNumber>
            ),
            content: [
              <NumberFormat.BankAccountNumber key="ban" alwaysSelectAll>
                11345678962
              </NumberFormat.BankAccountNumber>,
              'Bank account number',
            ],
          },
          {
            selectedKey: 'key_2',
            selectedValue: 'Item 3 Value',
            content: ['Item 3 Content A', 'Item 3 Content B'],
          },
          {
            selectedKey: 'key_3',
            selectedValue: 'Item 4 Value',
            content: ['Item 4 Content A', <>Custom Component</>],
          },
        ]
        return (
          <Dropdown
            data={data}
            label="Label"
            title="Please select a value"
            onChange={({ data }) => {
              console.log('onChange', data)
            }}
          />
        )
      }}
    </ComponentBox>
  </Wrapper>
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
  </Wrapper>
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
        iconPosition="left"
        data={data}
        value={3}
        skipPortal={true}
        onChange={({ data: selectedDataItem }) => {
          console.log('onChange', selectedDataItem)
        }}
        onOpen={() => {
          console.log('onOpen')
        }}
      />
    </ComponentBox>
  </Wrapper>
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
        independentWidth={true}
        iconPosition="left"
        align="left"
        data={data}
      />
    </ComponentBox>
  </Wrapper>
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
        independentWidth={true}
        iconPosition="right"
        align="right"
        data={data}
      />
    </ComponentBox>
  </Wrapper>
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
  </Wrapper>
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
              iconPosition="left"
              data={data}
            />
            <CustomWidthTwo
              label="Label"
              size="small"
              preventSelection
              title={null}
              data={data}
            />
            <CustomWidthThree
              label="Label"
              size="large"
              align="right"
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
  </Wrapper>
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
      <Dropdown data={data} label="Label" status="Message to the user" />
    </ComponentBox>
  </Wrapper>
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
            selectedValue: (
              <NumberFormat.BankAccountNumber alwaysSelectAll>
                11345678962
              </NumberFormat.BankAccountNumber>
            ),
            content: [
              <NumberFormat.BankAccountNumber key="ban-1" alwaysSelectAll>
                11345678962
              </NumberFormat.BankAccountNumber>,
              'C',
            ],
          },
          {
            selectedValue: (
              <NumberFormat.BankAccountNumber alwaysSelectAll>
                15349648901
              </NumberFormat.BankAccountNumber>
            ),
            content: [
              <NumberFormat.BankAccountNumber key="ban-2" alwaysSelectAll>
                15349648901
              </NumberFormat.BankAccountNumber>,
              'D',
            ],
          },
          {
            content: 'E',
          },
          {
            selectedKey: 'key_1',
            selectedValue: 'Find me by keypress',
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
            value="key_1" // use either index (5) or selectedKey: 'key_1'
            label="Label"
          />
        )
      }}
    </ComponentBox>
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
  </Wrapper>
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
            preventSelection
            triggerElement={(props) => (
              <button {...props} style={styles.customTrigger}>
                <Icon icon={newspaper} /> Custom trigger{' '}
                <Icon icon={chevron_down} />
              </button>
            )}
          />
        )
      }}
    </ComponentBox>
  </Wrapper>
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
                <NumberFormat.BankAccountNumber alwaysSelectAll key="n-1">
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
                <NumberFormat.BankAccountNumber alwaysSelectAll key="n-2">
                  11345678962
                </NumberFormat.BankAccountNumber>
              </span>
              <span className="dnb-drawer-list__option__item">
                Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option last-of-type">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat.BankAccountNumber alwaysSelectAll key="n-3">
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
  </Wrapper>
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
  </Wrapper>
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-independent_width_left">
      <Dropdown
        independentWidth={true}
        iconPosition="left"
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
  </Wrapper>
)
```

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-independent_width_right">
      <Dropdown
        independentWidth={true}
        iconPosition="right"
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
  </Wrapper>
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
  </Wrapper>
)
```

## Properties

You may check out the [DrawerList Properties](#drawerlist-properties) down below as well as the [Data structure examples](#the-data-property).

```json
{
  "props": {
    "title": {
      "doc": "Give a title to let the users know what they have to do. Defaults to `Valgmeny`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "value": {
      "doc": "Define a preselected data entry (index). More info down below.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "variant": {
      "doc": "Defines the kind of dropdown. Possible values are `primary`, `secondary` and `tertiary`. Defaults to `secondary`.",
      "type": [
        "\"primary\"",
        "\"secondary\"",
        "\"tertiary\"",
        "\"unstyled\""
      ],
      "status": "optional"
    },
    "icon": {
      "doc": "Icon to be included in the dropdown.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "iconSize": {
      "doc": "Change the size of the icon pragmatically.",
      "type": "string",
      "status": "optional"
    },
    "iconPosition": {
      "doc": "Position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.",
      "type": ["\"left\"", "\"right\""],
      "status": "optional"
    },
    "arrowPosition": {
      "doc": "Position of arrow on the popup drawer. Set to `left` or `right`. Defaults to `right`.",
      "type": ["\"left\"", "\"right\""],
      "status": "optional"
    },
    "size": {
      "doc": "Define the height of the Dropdown. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.",
      "type": ["\"default\"", "\"small\"", "\"medium\"", "\"large\""],
      "status": "optional"
    },
    "open": {
      "doc": "If set to `true`, the Dropdown will be rendered initially with a visible and accessible data list / options.",
      "type": "boolean",
      "status": "optional"
    },
    "openOnFocus": {
      "doc": "If set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.",
      "type": "boolean",
      "status": "optional"
    },
    "preventSelection": {
      "doc": "If set to `true`, no permanent selection will be made. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "align": {
      "doc": "Use `right` to change the options alignment direction. Makes only sense to use in combination with `preventSelection`. Defaults to `left`.",
      "type": ["\"left\"", "\"right\""],
      "status": "optional"
    },
    "independentWidth": {
      "doc": "If set to `true`, the Dropdown will handle its width independent to the content width. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "skipPortal": {
      "doc": "Set to `true` to disable the React Portal behavior. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the dropdown will be 100% in available `width`.",
      "type": "boolean",
      "status": "optional"
    },
    "status": {
      "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
      "type": ["\"error\"", "\"information\"", "boolean"],
      "status": "optional"
    },
    "statusState": {
      "doc": "Defines the state of the status. It's two statuses `[error, information]`. Defaults to `error`.",
      "type": ["\"error\"", "\"information\""],
      "status": "optional"
    },
    "statusProps": {
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
      "type": "React.ReactNode",
      "status": "optional"
    },
    "labelDirection": {
      "doc": "Use `labelDirection=\"horizontal\"` to change the label layout direction. Defaults to `vertical`.",
      "type": ["\"horizontal\"", "\"vertical\""],
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "triggerElement": {
      "doc": "Lets you provide a custom React element as the trigger HTML element.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "ref": {
      "doc": "By providing a `React.Ref` you can get the internally used main element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "buttonRef": {
      "doc": "By providing a `React.Ref` you can get the internally used button element (DOM), e.g. `buttonRef={myRef}` by using `React.useRef(null)`.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
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
}
```

## DrawerList Properties

```json
{
  "props": {
    "[data](#the-data-property)": {
      "doc": "The data we want to fill the list with. [Details on the type of {DATA} can be found below](#the-data-property). The data can be provided as an array or object. Or as a function that returns the data (called when user opens the list).",
      "type": ["{DATA}", "() => {DATA}"],
      "status": "required"
    },
    "groups": {
      "doc": "An array of group titles for the list items. Only the first group can be `undefined`.",
      "type": "Array<React.ReactNode>",
      "status": "optional"
    },
    "value": {
      "doc": "Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` property (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).",
      "type": ["string", "number"],
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
      "type": ["\"auto\"", "\"top\"", "\"bottom\""],
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
      "type": ["string", "HTMLElement"],
      "status": "optional"
    },
    "optionsRender": {
      "doc": "Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-optionsRender). This can be used to add additional options above the actual rendered list.",
      "type": "function",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Value

Should either be an index (integer) of the data array or a key – defined by `selectedKey` inside an array item.

If `data` is an object, use the object key as the `value` to define the selected item. Can be a string or integer.

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
      "type": ["string", "number"],
      "status": "optional"
    },
    "selectedValue": {
      "doc": "Replaces the standard value output for selected item. Only used in some implementations (Dropdown, Autocomplete).",
      "type": ["string", "React.ReactNode"],
      "status": "optional"
    },
    "suffixValue": {
      "doc": "Content placed to the right in the list item.",
      "type": ["string", "React.ReactNode"],
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
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
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
    },
    "Dropdown.title": {
      "nb-NO": "Valgmeny",
      "en-GB": "Option Menu",
      "sv-SE": "Valmeny",
      "da-DK": "Valgmenu"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }`.",
      "type": "function",
      "status": "optional"
    },
    "onSelect": {
      "doc": "Will be called once the user focuses or selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, activeItem }`. The `activeItem` property is the currently selected item by keyboard navigation.",
      "type": "function",
      "status": "optional"
    },
    "onOpen": {
      "doc": "Will be called once the user presses the dropdown. Returns the data item `{ data, attributes }`.",
      "type": "function",
      "status": "optional"
    },
    "onClose": {
      "doc": "Will be called once the user presses the dropdown again, or clicks somewhere else. Returns the data item `{ data, attributes }`.",
      "type": "function",
      "status": "optional"
    },
    "onOpenFocus": {
      "doc": "Will be called when focus is set on an item inside the opened drawer list. Returns `{ element }` with the focused DOM element.",
      "type": "function",
      "status": "optional"
    },
    "onCloseFocus": {
      "doc": "Will be called when focus is moved back to the trigger button after the drawer list closes. Returns `{ element }` with the focused DOM element.",
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
