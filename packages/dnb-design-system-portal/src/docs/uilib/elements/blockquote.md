---
title: 'Blockquote'
draft: false
---

import CodeBlock from 'Tags/CodeBlock'

## Blockquote

<CodeBlock reactLive hideCode caption="Default Blockquote">
{`
<blockquote data-dnb-test="blockquote-default" className="dnb-blockquote">
  Dis leo aliquam neque aptent nascetur metus ad ut eu Choro vivendum tractatos ei quo.
  <cite>Cite Referance</cite>
</blockquote>
`}
</CodeBlock>

<CodeBlock reactLive hideCode caption="Blockquote with graphics on top">
{`
<blockquote data-dnb-test="blockquote-top" className="dnb-blockquote dnb-blockquote--top">
  Dis leo aliquam neque aptent nascetur metus ad ut eu Choro
  <a className="dnb-anchor" href="/uilib/elements#blockquote">
    vivendum tractatos
  </a> ei quo.
</blockquote>
`}
</CodeBlock>

<CodeBlock reactLive hideCode caption="Blockquote with transparent background (`no-background`)">
{`
<blockquote data-dnb-test="blockquote-no-background" className="dnb-blockquote dnb-blockquote--no-background">
  Dis leo aliquam neque aptent nascetur metus ad ut eu Choro vivendum tractatos ei quo. Luctus cursus odio hendrerit ullamcorper adipiscing est dis curabitur sit.

  <cite>
    <a className="dnb-anchor" href="/uilib/elements#blockquote" target="_blank">
      Cite Referance
    </a>
  </cite>
</blockquote>
`}
</CodeBlock>

<CodeBlock reactLive hideCode caption="Blockquote with transparent background and graphics on top">
{`
<blockquote data-dnb-test="blockquote-top-no-background" className="dnb-blockquote dnb-blockquote--no-background dnb-blockquote--top">
  Dis leo aliquam neque aptent nascetur metus ad ut eu Choro
  <a className="dnb-anchor" href="/uilib/elements#blockquote">
    vivendum tractatos
  </a> ei quo.
</blockquote>
`}
</CodeBlock>
