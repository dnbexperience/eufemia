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
const Paragraph = styled(P)\`
  color: var(--color-sky-blue);
\`
render(<Paragraph>I'm Sky blue.</Paragraph>)
`}
</ComponentBox>

## Colors Table

<ColorsTable />
