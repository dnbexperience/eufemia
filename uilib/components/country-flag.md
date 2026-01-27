---
title: 'CountryFlag'
description: 'The CountryFlag component lets you display a country flag based on a country ISO code.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.670Z
checksum: e95e21927630e53209d67e09696c37bbb6bcd26ccaef3599d84b19c26f3202d5
---

# CountryFlag

## Import

```tsx
import { CountryFlag } from '@dnb/eufemia'

// Import the flag icons as CSS
import '@dnb/eufemia/components/country-flag/style/dnb-country-flag-icons.min.css'

// ... or as SASS
import '@dnb/eufemia/components/country-flag/style/dnb-country-flag-icons.scss'
```

## Description

The `CountryFlag` component lets you display a country flag based on a [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) like `NO` for Norway.

In order to use the CountryFlag component, you need to import the flag styles as CSS or SASS. The flag styles are available in the `dnb-country-flag-icons.min.css` and `dnb-country-flag-icons.scss` files. See the import example above.

These style files will import the SVG flag icon via a CSS `background-image`. This way only the used flags will be loaded by the browser.

For UX designers, there is the [Figma Flags Library](https://www.figma.com/design/Uc4ydRIqv0Ab4YiR6mSOZH/Eufemia---Flags), which provides a comprehensive collection of flag icons that can be used in your design projects.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/country-flag)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/country-flag)

## Demos

### All sizes

```tsx
render(
  <Flex.Horizontal align="center">
    <CountryFlag iso="NO" size="auto" />
    <CountryFlag iso="NO" size="xx-small" />
    <CountryFlag iso="NO" size="x-small" />
    <CountryFlag iso="NO" size="small" />
    <CountryFlag iso="NO" size="medium" />
    <CountryFlag iso="NO" size="large" />
    <CountryFlag iso="NO" size="x-large" />
  </Flex.Horizontal>
)
```

### Square

```tsx
render(<CountryFlag iso="CH" shape="square" size="large" />)
```

### Eufemia Forms

```tsx
const MyComponent = ({ label, ...props }) => {
  const { value } = useValueProps(props)
  const iso = String(value)
  return (
    <FieldBlock label={label}>
      <CountryFlag iso={iso} size="large" />
    </FieldBlock>
  )
}
render(
  <Form.Handler>
    <Field.Composition>
      <Field.SelectCountry
        label="Select a country"
        path="/country"
        width="medium"
        value="SE"
      />
      <MyComponent label="Country flag" path="/country" />
    </Field.Composition>
  </Form.Handler>
)
```

### In various components

```tsx
render(
  <Flex.Vertical gap="x-small">
    <Button icon={<CountryFlag iso="NO" />} title="Icon button" />
    <Button
      icon={<CountryFlag iso="NO" />}
      title="Icon button"
      size="large"
    />
    <Button
      icon={<CountryFlag iso="NO" />}
      icon_position="left"
      text="Button"
      variant="secondary"
    />
    <Button
      icon={<CountryFlag iso="NO" />}
      icon_size="medium"
      icon_position="left"
      size="large"
      text="Button"
      variant="secondary"
    />
    <Input
      icon={<CountryFlag iso="NO" />}
      icon_position="left"
      placeholder="Write something"
    />
    <Input
      icon={<CountryFlag iso="NO" />}
      icon_position="left"
      size="large"
      placeholder="Write something"
    />
    <Dropdown
      value="NO"
      icon_position="left"
      data={{
        NO: (
          <Dropdown.HorizontalItem>
            <CountryFlag iso="NO" />
            {' '}Norway
          </Dropdown.HorizontalItem>
        ),
        SE: (
          <Dropdown.HorizontalItem>
            <CountryFlag iso="SE" />
            {' '}Sweden
          </Dropdown.HorizontalItem>
        ),
      }}
    />
    <Dropdown icon={<CountryFlag iso="NO" />} size="large" />

    <Flex.Horizontal align="center" gap="x-small">
      In Icon component:
      <Icon icon={<CountryFlag iso="NO" />} />
      <Icon icon={<CountryFlag iso="NO" />} size="medium" />
    </Flex.Horizontal>

    <Flex.Vertical>
      <Heading level="1">
        H1 heading <CountryFlag iso="NO" />
      </Heading>
      <Heading level="2">
        H2 heading <CountryFlag iso="NO" />
      </Heading>
      <Heading level="3">
        H3 heading <CountryFlag iso="NO" />
      </Heading>
      <P
        style={{
          maxWidth: '20rem',
        }}
      >
        <CountryFlag iso="NO" /> Paragraph Eiusmod id cillum Lorem nulla
        non consectetur pariatur mollit Lorem non do nulla reprehenderit
        {' '}
        <CountryFlag iso="NO" />
      </P>
    </Flex.Vertical>
  </Flex.Vertical>
)
```

## Properties

```json
{
  "props": {
    "iso": {
      "doc": "[ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) representing the country, such as `NO` for Norway. Defaults to `NO`.",
      "type": "string",
      "status": "optional"
    },
    "size": {
      "doc": "The size of the component. Can be `auto`, `xx-small`, `x-small`, `small`, `medium`, `large` or `x-large`. Defaults to `auto` (1em).",
      "type": "string",
      "status": "optional"
    },
    "shape": {
      "doc": "The shape of the component. Can be `round` or `square`. Defaults to `round`.",
      "type": "string",
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

## List of available countries

[Link to the code of the available countries](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/extensions/forms/constants/countries.ts#L46).

<AvailableCountriesTable />
