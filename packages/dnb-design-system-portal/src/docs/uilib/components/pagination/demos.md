---
showTabs: true
---

import {
PaginationExampleDefault,
PaginationExampleCentered,
PaginationExampleInfinityLoadButton,
PaginationExampleInfinityIndicator,
PaginationExampleInfinityUnknown,
PaginationExampleInfinityTable,
} from 'Pages/uilib/components/pagination/Examples'

## Demos

### Default pagination

<PaginationExampleDefault />

### Centered Pagination with random delay

Note that we keep the hight of the previous page. All pages can for sure have their own height.

<PaginationExampleCentered />

### Infinity scroller with load button

A load button is shown on the bottom by having `use_load_button={true}` - but here we define our `startup_page={5}`, so we also get a load button on top.

<PaginationExampleInfinityLoadButton />

### Infinity scroller with custom load indicator

<PaginationExampleInfinityIndicator />

### Infinity scroller with unknown `page_count`

<PaginationExampleInfinityUnknown />

### Advanced Table infinity scroller

You can find the code either on [GitHub](https://github.com/dnbexperience/eufemia/blob/develop/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/PaginationTableExample.js) or on [CodeSandbox](https://codesandbox.io/s/eufemia-table-pagination-infinity-546f7)

<PaginationExampleInfinityTable />
