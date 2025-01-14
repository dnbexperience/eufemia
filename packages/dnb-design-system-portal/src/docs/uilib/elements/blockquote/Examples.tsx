/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Anchor, Blockquote, Code } from '@dnb/eufemia/src'

export const BlockquoteDefaultExample = () => (
  <ComponentBox hideCode>
    <Blockquote data-visual-test="blockquote-default">
      Dis leo aliquam neque aptent nascetur metus ad ut eu Choro vivendum
      tractatos ei quo.
      <cite>Cite Reference</cite>
    </Blockquote>
  </ComponentBox>
)

export const BlockquoteGraphicsExample = () => (
  <ComponentBox hideCode>
    <Blockquote data-visual-test="blockquote-top" direction="vertical">
      Dis leo aliquam neque aptent nascetur metus ad ut eu Choro{' '}
      <Anchor href="/uilib/elements#blockquote">vivendum tractatos</Anchor>{' '}
      ei quo.
    </Blockquote>
  </ComponentBox>
)

export const BlockquoteTransparentExample = () => (
  <ComponentBox hideCode>
    <Blockquote data-visual-test="blockquote-no-background" noBackground>
      Dis leo aliquam neque aptent nascetur metus ad ut eu Choro vivendum
      tractatos ei quo. Luctus cursus odio hendrerit ullamcorper adipiscing
      est dis curabitur sit.
      <cite>
        <Anchor href="/uilib/elements#blockquote" target="_blank">
          Cite Reference
        </Anchor>
      </cite>
    </Blockquote>
  </ComponentBox>
)

export const BlockquoteTransparentOnTopExample = () => (
  <ComponentBox hideCode>
    <Blockquote
      data-visual-test="blockquote-top-no-background"
      noBackground
      direction="vertical"
    >
      Dis leo aliquam neque aptent nascetur metus ad ut eu Choro{' '}
      <Anchor href="/uilib/elements#blockquote">vivendum tractatos</Anchor>{' '}
      ei quo.
    </Blockquote>
  </ComponentBox>
)

export const BlockquoteWithCodeExample = () => (
  <ComponentBox hideCode>
    <Blockquote data-visual-test="blockquote-with-code">
      <Code>display</Code> and <Code>background-color</Code> are CSS
      properties
    </Blockquote>
  </ComponentBox>
)
