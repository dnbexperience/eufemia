---
showTabs: true
redirect_from:
  - /uilib/components/status-message/info
---

import FormStatusIcons from 'Pages/icons/form-status.md'

## Description

The FormStatus is a simple component meant for displaying the status of a form ( displaying form errors, messages etc. )
The `FormStatus` component should be positioned relative to the form or form input to which it referring to.

Also, the `FormStatus` is used inside of many other form components.

The `FormStatus` component cooperates together with the [GlobalStatus](/uilib/components/global-status) component to summaries and have several status messages in once place.

<FormStatusIcons />

### Width alignment

In order to enhance accessibility (readability), the FormStatus will align its width to a linked component. That means, if the FormStatus is build into the Input component, it will inherit the width of the input.

The `min-width` is set to be **12rem**. Use CSS `min-width` or `max-width` to set a custom (manual) width.
