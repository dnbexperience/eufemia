---
title: 'Colors'
order: 5
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import ColorsTable from 'Docs/quickguide-designer/colors-table.md'

# Colors

All Colors are provided by CSS Custom Properties.

You may have a look at the Quick Guide for Designers [About Colors](/quickguide-designer/colors).

## Polyfill

Read more about why and how to [use a polyfill](/uilib/usage/customisation/styling/polyfill).

## Example usage

<ComponentBox hideCode useRender>
{`
const ParagraphStyled = styled(P)\`
  color: var(--color-sky-blue);
\`
render(<ParagraphStyled>I'm Sky blue.</ParagraphStyled>)
`}
</ComponentBox>

## Colors Table

<ColorsTable />
