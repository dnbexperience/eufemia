---
title: 'Naming Conventions'
icon: 'naming'
draft: false
---

import Img from 'Tags/Img'

import NamingSpace from 'Pages/quickguide-designer/assets/naming-space.svg'
import TablesSpace from 'Pages/quickguide-designer/assets/tables-space.svg'

# Naming conventions (Designers)

> Persist the same component name throughout design, code and conversation <cite>Nathan Curtis</cite>

## Naming space

Eufemia makes use of a very simple 8px unit grid. Margins, paddings, and distances consist of multiples of 8 (mostly - sometimes half and quarter units are required). If we were to combine multiples of this 8px 'space block', we could end up with something like this:

<Img src={NamingSpace} caption="Naming space units" alt="Naming space units" height="192" />

These titles can then be transferred to component for example tables. A 'medium' table would refer to the amount of padding in the cells.

<Img src={TablesSpace} caption="Applying space to tables" alt="Applying space to tables" height="384" />

The same can apply to components such as cards, form rows etc. responsive breakpoints can switch between these spacing units in order to expand or contract the overall size of an object.

## Naming Colors

Eufemia for web uses a simple naming system:

<div class="typography-box">
Color name + percentage
</div>

Depending on where the color will be used, it's name formation will be different. For example, in Figma (and other design tools), the name is constructed thus:

The color name is written with spaces between words. The first word starts with a capital. Some color names have a percentage sign denoting the tint value.

Example:

<div class="typography-box">
Cherry red 8%
</div>

Whereas in CSS as a custom property this is written:

<div class="typography-box">
--color-cherry-red
</div>

Colors have a naming convention across all platforms and formats. Please refer to the table in 'colors' section https://eufemia.dnb.no/quickguide-designer/colors.

NB! Android and iOS will have a different format for the same names. This guide is for application in <b>web</b> products.

### Naming conventions in design applications

We don't have a naming convention for design files in Figma. However, it is encouraged to name your design file frames and interface designs with clear logical names in english.

However, in order to maintain consistency, in Figma we name Pages and Frames (canvases) with the first letter capitalised.

Example of a Figma Page name:

<div class="typography-box">
Web components
</div>

Example of a Figma Frame name:

<div class="typography-box">
Spacing components
</div>

Actual components are written with all small letters.

Example of a Figma component name:

<div class="typography-box">
date picker
</div>

If in doubt, look at the master Eufemia file.
