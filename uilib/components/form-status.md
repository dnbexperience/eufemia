---
title: 'FormStatus (Messageboxes)'
description: 'The FormStatus is a simple component meant for displaying the status of a form (errors, messages, etc.).'
metadata: https://eufemia.dnb.no/uilib/components/form-status/metadata.json
---

## Import

```tsx
import { FormStatus } from '@dnb/eufemia'
```

## Description

The FormStatus is a simple component meant for displaying the status of a form (displaying form errors, messages, etc.).
The `FormStatus` component should be positioned relative to the form or form input to which it is referring.

Also, the `FormStatus` is used inside of many other form components.

The `FormStatus` component cooperates with the [GlobalStatus](/uilib/components/global-status) component to summarize and display several status messages in one place.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=16838-6706)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/form-status)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/form-status)

## Use the [**FormStatus**](/uilib/components/form-status) icons only

- `InfoIcon` <InfoIcon />
- `WarnIcon` <WarnIcon />
- `ErrorIcon` <ErrorIcon />
- `MarketingIcon` <MarketingIcon />

```jsx
import { InfoIcon } from '@dnb/eufemia/components/FormStatus

render(<InfoIcon />)
```

... or in combination with the [Icon](/uilib/components/form-status?fullscreen#form-status-icons) component. Have a look [at this example](/uilib/components/form-status#in-combination-with-the-icon-component).

## Accessibility

The `FormStatus` component is designed to be accessible. It is important to provide a meaningful message to the user. The `FormStatus` component should be used to provide feedback to the user about the status of the form or form input.

The `FormStatus` should be placed in the DOM before the form element itself and it should be linked together with the related form element by using `aria-describedby`.

This will allow screen readers to find and announce the error message without too much frustration.

This is done automatically in all Eufemia components when the `status` property is used.

Also, all the [fields](/uilib/extensions/forms/all-fields/) based on the [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock) support this feature without additional work. The `FieldBlock` also supports grouped messages and showing an error, warning, and info message at the same time.

### Width alignment

In order to enhance accessibility (readability), the FormStatus will align its width to a linked component. This means that if the FormStatus is built into the Input component, it will inherit the width of the input.

The `min-width` is set to be **12rem**. Use CSS `min-width` or `max-width` to set a custom (manual) width.

## Demos

### Displaying error status

```tsx
render(<FormStatus text="Failure text" />)
```

### Displaying info status

```tsx
render(
  <FormStatus
    title="Hover title"
    text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
    state="info"
  />,
)
```

### Displaying warn status

```tsx
render(
  <FormStatus state="warn" variant="outlined">
    Warningmessage. Take notice!
  </FormStatus>,
)
```

### Displaying marketing status

```tsx
render(
  <FormStatus state="marketing" variant="outlined">
    Marketingmessage. What a deal!
  </FormStatus>,
)
```

### Stretching the status message

**NB:** The inner text has a max-width of `var(--prose-max-width)` (defaults to `60ch`) to ensure we do not exceed characters limit per line for accessibility reasons.

```tsx
render(
  <FormStatus
    stretch={true}
    text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
    state="warn"
  />,
)
```

### Used by the Input Component

```tsx
render(
  <Input
    label="Input with status"
    status="You have to fill in this field"
    value="Input value"
  />,
)
```

### With a custom-styled content

```tsx
const CustomStatus = () => (
  <>
    My info <Link href="/">with a link</Link> and more text
  </>
)
render(
  <Input
    label="Input with custom status"
    status={<CustomStatus />}
    status_state="info"
    value="Input value"
  />,
)
```

### Large variant

```tsx
render(
  <FormStatus state="info" size="large" variant="outlined">
    My HTML{' '}
    <Anchor href="/" target="_blank">
      with a link
    </Anchor>{' '}
    and more text
  </FormStatus>,
)
```

### In combination with the Icon component

```tsx
<Icon
  icon={<InfoIcon />}
  size="medium"
  title="Some title"
  inheritColor={false}
  right
/>
<Icon
  icon={WarnIcon}
  size="medium"
  title="Some title"
  inheritColor={false}
  right
/>
<Icon
  icon={ErrorIcon}
  size="medium"
  title="Some title"
  inheritColor={false}
  right
/>
<Icon
  icon={MarketingIcon}
  size="medium"
  title="Some title"
  inheritColor={false}
/>
```

```tsx
render(
  <Grid.Container
    columns={{
      small: 2,
      medium: 3,
      large: 3,
    }}
    columnGap="small"
    rowGap="small"
  >
    <Grid.Container columns={1}>
      <FormStatus text="Text" state="info" variant="flat" />
      <FormStatus text="Text" state="info" variant="outlined" />
    </Grid.Container>
    <Grid.Container columns={1}>
      <FormStatus text="Text" state="success" />
      <FormStatus text="Text" state="success" variant="outlined" />
    </Grid.Container>
    <Grid.Container columns={1}>
      <FormStatus text="Text" state="warn" variant="flat" />
      <FormStatus text="Text" state="warn" variant="outlined" />
    </Grid.Container>
    <Grid.Container columns={1}>
      <FormStatus text="Text" state="error" variant="flat" />
      <FormStatus text="Text" state="error" variant="outlined" />
    </Grid.Container>
    <Grid.Container columns={1}>
      <FormStatus text="Text" state="marketing" />
      <FormStatus text="Text" state="marketing" variant="outlined" />
    </Grid.Container>
  </Grid.Container>,
)
```
