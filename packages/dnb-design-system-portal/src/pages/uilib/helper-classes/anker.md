---
header: 'UI Library'
title: 'Anchor'
draft: false
order: 1
---

import { IconPrimary as Icon } from 'dnb-ui-lib/src'

# Anchor

By importing the core styles, the anchor tag get assigned styles by default. However, there are also some classes which can be applied manually to handle the visual states.

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

- `.dnb-no-Anchor-animation` <a href="/" class="dnb-no-Anchor-animation">No Animation</a>
- `.dnb-no-Anchor-style` <a href="/" class="dnb-no-Anchor-style">No Style</a>
- `.dnb-no-Anchor-hover` <a href="/" class="dnb-no-Anchor-hover">No Hover</a>
- `.dnb-no-Anchor-underline` <a href="/" class="dnb-no-Anchor-underline">No Underline</a>
