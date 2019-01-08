---
status: 'wip'
---

## Description

To ensure a consistant class structure and to enure that the class is owned by the DNB UI Library, all classes in the UI Library are prefixed with `dnb-`.

Most helper classes are SCSS mixins which are then applied to the class when envoked.
Reusing classes in the markup instead of using SCSS extends or mixins will prevent duplicate values in our CSS.

All helper classes are to be found in `src/style/core/utilities.scss`
