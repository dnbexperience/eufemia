---
title: 'Component Properties'
metadata: https://eufemia.dnb.no/uilib/usage/customisation/component-properties/metadata.json
---

# Component Properties

Every [Component](/uilib/components) has its own `properties` to make them work for a variety of cases. You may have a look at the table describing all the possibilities. Check out for example the [Button Properties](/uilib/components/button/properties).

## Naming

Both the properties- and event names should use **camelCase** to support a universal [naming convention](/contribute/style-guides/naming).

## Large Buttons & Icons

Below are some examples. You can even modify them right away in the Browser.

```tsx
<Button
  variant="secondary"
  text="Secondary Button"
  icon="chevron_right_medium"
  size="large"
/>
<Button icon="chevron_right" icon_size="medium" size="large" />
```

## Extended example

```tsx
const Wrapper = styled.div`
  .dnb-button {
    --button-width: 4rem;
    --button-height: 4rem;
    --button-border-radius: 2rem;
    svg {
      color: fuchsia;
    }
  }
`
const myHandler = () => alert('Hello')
render(
  <Wrapper>
    <Button
      variant="secondary"
      icon={hamburgerIcon}
      size="default"
      on_click={myHandler}
    />
    <Button variant="secondary" size="default" on_click={myHandler}>
      <Icon icon={hamburgerIcon} />
    </Button>
  </Wrapper>,
)
```
