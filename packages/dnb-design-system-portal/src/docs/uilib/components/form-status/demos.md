---
showTabs: true
redirect_from:
  - /uilib/components/status-message/demos
---

import {
FormStatusDefault,
FormStatusWithInfo,
FormStatusWithStretch,
FormStatusWithWarn,
FormSetDefaultInput,
FormStatusCustom,
FormStatusLarge,
FormStatusWithIcons,
} from 'Pages/uilib/components/form-status/Examples'

## Demos

### FormStatus displaying error status

<FormStatusDefault />

### FormStatus displaying info status

<FormStatusWithInfo />

### A stretched and independent FormStatus

NB: The inner text gets a max width of 47rem to ensure we not exceed 70 characters limit per line.

<FormStatusWithStretch />

### FormStatus displaying warn status

<FormStatusWithWarn />

### A form status, used by the Input Component

<FormSetDefaultInput />

### A form status, with a custom styled content

<FormStatusCustom />

### A form status with plain text/HTML

<FormStatusLarge />

### In combination with the Icon component

<FormStatusWithIcons />
