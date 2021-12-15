---
showTabs: true
---

## Description

The Drawer component is a part of (mode) the [Modal component](/uilib/components/modal) because they have many similarities.

### Drawer content wrapper

In order to make it easier to have another colored area below the title, you can make use of the extra wrapper `<Modal.Content>`. Underneath, the [Section](/uilib/components/section) is used, but with the color `black-3` as default. This extra "section" is also customized to work together with the Modal and Drawer component.

```jsx
<Modal mode="drawer">
  <Modal.Content>Drawer Content</Modal.Content>
</Modal>
```

### Drawer bar and header

You can provide a custom content to both the drawer bar and header. You can provide it either as a React property (`bar_content` and `header_content`), or by markup.

You may want to provide the title heading as a property. But if you need to, you can also provide a `<H1 />` Eufemia Component inside the header.

```jsx
<Modal mode="drawer" title="Heading title">
  <Modal.Bar>Drawer Bar Content</Modal.Bar>
  <Modal.Header>Drawer Header Content</Modal.Header>
  <Modal.Content>Drawer Content</Modal.Content>
</Modal>
```

See [demo](/uilib/components/modal#drawer-mode-with-custom-header) for more details.
