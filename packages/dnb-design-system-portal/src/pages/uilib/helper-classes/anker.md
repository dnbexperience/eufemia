---
header: 'UI Library'
title: 'Anker'
draft: false
order: 1
---

import { IconPrimary as Icon } from 'dnb-ui-lib/src'

# Anker

Beside that the Anker Tag gets assigned by default - or let's say, by only importing the core styles, there are also some classes to handle the visual states manually.

## Default Styles

- `a` <a href="/" >Anker with default style</a>
- `.dnb-hover-style` <a href="/" class="dnb-hover-style">Hover Style</a>
- `.dnb-active-style` <a href="/" class="dnb-active-style">Active Style</a>
- `.dnb-focus-style` <a href="/" class="dnb-focus-style">Focus Style</a>
- `.dnb-with-animation` <a href="/" class="dnb-with-animation">With a special animation Style</a>
- <a>No href</a> results in `user-select: none;`

## With Icon

- <a href="/">Anker with Icon <Icon icon="chevron_right" /></a>
- <p>
    Eros semper blandit tellus mollis primis quisque platea sollicitudin
    ipsum <a href="/">Inside a Paragraph <Icon icon="bell" /></a> auctor cursus mauris porta consectetur natoque vehicula vestibulum feugiat ultrices vitae fermentum eros euismod imperdiet eleifend justo vivamus posuere
  </p>
- <h2>
   <a href="/">Inside Headings <Icon icon="bell" /></a> H2
  </h2>

## Manipulation

- `.dnb-no-anker-animation` <a href="/" class="dnb-no-anker-animation">No Animation</a>
- `.dnb-no-anker-style` <a href="/" class="dnb-no-anker-style">No Style</a>
- `.dnb-no-anker-hover` <a href="/" class="dnb-no-anker-hover">No Hover</a>
- `.dnb-no-anker-underline` <a href="/" class="dnb-no-anker-underline">No Underline</a>
