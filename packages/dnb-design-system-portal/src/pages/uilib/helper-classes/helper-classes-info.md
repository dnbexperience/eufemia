---
draft: true
---

import Examples from 'Pages/uilib/helper-classes/Examples'

## Description

To ensure a consistent class structure and to ensure that the class is owned by the DNB UI Library, all classes in the UI Library are prefixed with `dnb-`. Read more about that in the [Naming conventions](/uilib/development/naming)

### CSS Classes

Reusing classes in the markup instead of using SCSS extends or _mixins_ will prevent duplicate values in our CSS.

All CSS helper classes are to be found in `src/style/core/helper-classes.scss`

### Mixins

Most helper classes are SCSS _mixins_ which are then applied to the class when invoked. The helper _mixins_ can be found in `src/style/core/utilities.scss`.

## Usage

In the following example we show two sections with `.dnb-section` styling which gives a colored background. The helper class `.dnb-section--spacing` adds spacing to the section.

<Examples />
