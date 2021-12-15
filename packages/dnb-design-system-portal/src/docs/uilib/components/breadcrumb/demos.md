---
showTabs: true
---

import {
BreadcrumbSingle,
BreadcrumbMultiple,
BreadcrumbMultipleData,
BreadcrumbVariants,
BreadcrumbCollapseOpen
} from 'Docs/uilib/components/breadcrumb/Examples'

## Demos

### Multiple Breadcrumb (recommended)

To ensure the correct use of the Breadcrumb, we recommend passing down pages as a variable to `data`. If you have other specific cases, check out how to customize with [children in Multiple Breadcrumb](/uilib/components/breadcrumb/#multiple-breadcrumb-with-children).

<BreadcrumbMultipleData />

Some extra functionality is provided to this variant:

- The first item, `Home`, gets assigned a home icon and an appropriate text label based on the current locale.
- The last item in pages will be static text, corresponding to the current page.
- Another variant, `collapse`, appears for small screens.

### Single Breadcrumb

When you only want a single button for `back`, this variant is recommended and default when neither `data` nor `children` is present.

<BreadcrumbSingle />

### Multiple Breadcrumb with children

For customizing the Breadcrumb to fit your needs, this variant can be utilized.

<BreadcrumbMultiple />

### Setting property 'variant'

Property variant is by default set based on the combination of children and data properties, and also screen size.
If you want to override this property, pass in the prop `variant` to be either `single`, `multiple`, or `collapse`.

<BreadcrumbVariants />

### Setting property 'variant' and overriding 'isCollapsed'

<BreadcrumbCollapseOpen />
