---
title: 'Component Properties'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.344Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
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
  </Wrapper>
)
```
