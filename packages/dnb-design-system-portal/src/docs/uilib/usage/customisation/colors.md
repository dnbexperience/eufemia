---
title: 'Colors'
draft: false
order: 5
---

import ComponentBox from 'Tags/ComponentBox'
import ColorsTable from 'Pages/quickguide-designer/colors-table.md'

# Colors

All Colors are provided by CSS Custom Properties.

You may have a look at the QuickStart for Designers [About Colors](/quickguide-designer/colors).

## Polyfill

Read more about why and how to [use a polyfill](/uilib/usage/customisation/styling/polyfill).

## Example usage

<ComponentBox hideCode useRender>
{`
const P = styled.p\`
  color: var(--color-cherry-red);
\`
render(<P>I'm Cherry Red.</P>)
`}
</ComponentBox>

## Colors Table

<ColorsTable />
