/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Blockquote } from '@dnb/eufemia/src'

export const BlockquoteDefaultExample = () => (
  <ComponentBox hideCode>
    <Blockquote data-visual-test="blockquote-default">
      Dis leo aliquam neque aptent nascetur metus ad ut eu Choro vivendum
      tractatos ei quo.
      <cite>Cite Referance</cite>
    </Blockquote>
  </ComponentBox>
)

export const BlockquoteGraphicsExample = () => (
  <ComponentBox hideCode>
    <Blockquote data-visual-test="blockquote-top" showGraphicsOnTop>
      Dis leo aliquam neque aptent nascetur metus ad ut eu Choro{' '}
      <a className="dnb-anchor" href="/uilib/elements#blockquote">
        vivendum tractatos
      </a>{' '}
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
        <a
          className="dnb-anchor"
          href="/uilib/elements#blockquote"
          target="_blank"
        >
          Cite Referance
        </a>
      </cite>
    </Blockquote>
  </ComponentBox>
)

export const BlockquoteTransparentOnTopExample = () => (
  <ComponentBox hideCode>
    <Blockquote
      data-visual-test="blockquote-top-no-background"
      noBackground
      showGraphicsOnTop
    >
      Dis leo aliquam neque aptent nascetur metus ad ut eu Choro{' '}
      <a className="dnb-anchor" href="/uilib/elements#blockquote">
        vivendum tractatos
      </a>{' '}
      ei quo.
    </Blockquote>
  </ComponentBox>
)
