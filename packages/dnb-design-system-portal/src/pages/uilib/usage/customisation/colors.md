---
title: 'Colors'
draft: false
order: 3
---

import ComponentBox from 'Tags/ComponentBox'
import ColorsTable from 'Pages/quickguide-designer/colors-table.md'

# Colors

All Colors are provided by CSS Custom Properties. Make sure you have also a PostCSS plugin like [postcss-preset-env](https://github.com/csstools/postcss-preset-env) in place.

You may have a look at the QuickStart for Designers [About Colors](/quickguide-designer/colors).

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
