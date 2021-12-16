---
showTabs: true
---

import {
GlobalStatusError,
GlobalStatusInfo,
GlobalStatusUpdate,
GlobalStatusCoupling,
GlobalStatusAddRemoveItems,
GlobalStatusScrolling,
} from 'Docs/uilib/components/global-status/Examples'

## Demos

### GlobalStatus displaying error status

**NB:** Keep in mind, the `items` are handled automatically by all form components! This is just an example of how to define the content manually.

<GlobalStatusError />

### GlobalStatus displaying info status

<GlobalStatusInfo />

### To showcase the automated coupling between **FormStatus** and **GlobalStatus**

<GlobalStatusCoupling />

### GlobalStatus and update routines

<GlobalStatusUpdate />

### To showcase the custom **Update** and **Remove** possibility

<GlobalStatusAddRemoveItems />

### To showcase the scrolling

Some browsers (Safari, Edge) will need a polyfill like `smoothscroll-polyfill`.

<GlobalStatusScrolling />
