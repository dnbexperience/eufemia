---
header: 'UI Library'
title: 'Anchor'
draft: false
order: 2
---

import { IconPrimary as Icon } from 'dnb-ui-lib/src'

# Anchor

Beside that the Anchor Tag gets assigned by default - or let's say, by only importing the core styles, there are also some classes to handle the visual states manually.

## Default Styles

- `a` <a href="/" >Anchor with default style</a>
- `.dnb-hover-style` <a href="/" class="dnb-hover-style">Hover Style</a>
- `.dnb-active-style` <a href="/" class="dnb-active-style">Active Style</a>
- `.dnb-focus-style` <a href="/" class="dnb-focus-style">Focus Style</a>
- `.dnb-with-animation` <a href="/" class="dnb-with-animation">With a special animation Style</a>
- <a>No href</a> results in `user-select: none;`

## With Icon

- <a href="/">Anchor with Icon <Icon icon="chevron_right" /></a>
- <p>
    Eros semper blandit tellus mollis primis quisque platea sollicitudin
    ipsum <a href="/">Inside a Paragraph <Icon icon="bell" /></a> auctor cursus mauris porta consectetur natoque vehicula vestibulum feugiat ultrices vitae fermentum eros euismod imperdiet eleifend justo vivamus posuere
  </p>
- <h2>
    <a href="/">Inside Headings <Icon icon="bell" /></a> H2
  </h2>

## Manipulation

- `.dnb-no-anchor-animation` <a href="/" class="dnb-no-anchor-animation">No Animation</a>
- `.dnb-no-anchor-style` <a href="/" class="dnb-no-anchor-style">No Style</a>
- `.dnb-no-anchor-hover` <a href="/" class="dnb-no-anchor-hover">No Hover</a>
- `.dnb-no-anchor-underline` <a href="/" class="dnb-no-anchor-underline">No Underline</a>
