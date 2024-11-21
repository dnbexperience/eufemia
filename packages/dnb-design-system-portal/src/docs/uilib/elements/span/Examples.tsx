/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Anchor from '@dnb/eufemia/src/components/Anchor'
import { Span, P, H4 } from '@dnb/eufemia/src/elements'

export function SpanBasic() {
  return (
    <ComponentBox data-visual-test="span-basic">
      <P>
        Here is a paragraph with a <Span size="x-small">x-small</Span> word
        and some <Span weight="medium">medium weight text</Span> in it.
      </P>
      <H4>
        Heading 4 with <Span size="x-large">x-large</Span> word
      </H4>

      <Anchor href="/">
        Anchor with <Span weight="medium">medium weight</Span> words
      </Anchor>
    </ComponentBox>
  )
}

export function SpanModifiers() {
  return (
    <ComponentBox data-visual-test="span-modifiers">
      <div>
        <Span>Default span</Span>
        <br />
        <Span weight="medium">Medium weight span</Span>
        <br />
        <Span size="basis">Basis size span</Span>
        <br />
        <Span weight="medium" size="x-small">
          X-small span with medium weight
        </Span>
      </div>
    </ComponentBox>
  )
}

export function SpanRegressionTests() {
  const SpanWrap = (props) => {
    const size = props.size || 'default'
    return (
      <div>
        <Span {...props}>{size}</Span>
        <br />
        <Span weight="medium" {...props}>
          {size} - Weight medium
        </Span>
        <br />
        <Span weight="bold" {...props}>
          {size} - Weight bold
        </Span>
      </div>
    )
  }

  return (
    <ComponentBox scope={{ SpanWrap }} data-visual-test="span-sizes">
      <SpanWrap />
      <SpanWrap size="xx-large" />
      <SpanWrap size="x-large" />
      <SpanWrap size="large" />
      <SpanWrap size="medium" />
      <SpanWrap size="basis" />
      <SpanWrap size="small" />
      <SpanWrap size="x-small" />
    </ComponentBox>
  )
}
