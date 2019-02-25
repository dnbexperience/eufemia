---
draft: true
---

import CodeBlock from 'Tags/CodeBlock'
import { IconPrimary } from 'dnb-ui-lib/src'

## Tables

<CodeBlock scope={{IconPrimary}} reactLive hideCode data-dnb-test="table-default">
{`
<table className="dnb-table">
  <thead>
    <tr>
      <th colSpan="2">Column 1 + 2</th>
      <th>
        <a href="#sort" className="dnb-anchor">Column 3</a>
      </th>
      <th className="dnb-no-wrap">
        <a href="#sort" className="dnb-anchor dnb-anchor-no-underline">
          Column 4 <IconPrimary icon="chevron-down" />
        </a>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <p>
          Column 1 <b>width p</b>
        </p>
      </td>
      <td>
        <code className="dnb-code">Column 2 with code</code>
      </td>
      <td>
        <span>Column 3 with span</span>
      </td>
      <td>Column 4</td>
    </tr>
    <tr>
      <td>Column 1</td>
      <td>Column 2</td>
      <td>Column 3</td>
      <td>Column 4</td>
    </tr>
    <tr>
      <td>Column 1</td>
      <td>Column 2</td>
      <td>Column 3</td>
      <td>Column 4</td>
    </tr>
  </tbody>
</table>
`}
</CodeBlock>
