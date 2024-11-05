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
        and some <Span medium>medium weight text</Span> in it.
      </P>
      <H4>
        Heading 4 with <Span size="x-large">x-large</Span> word
      </H4>

      <Anchor href="/">
        Anchor with <Span medium>medium weight</Span> words
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
        <Span modifier="medium">Medium weight span</Span>
        <br />
        <Span size="small">Small span</Span>
        <br />
        <Span modifier="small medium">Small span with medium weight</Span>
        <br />
        {/* (Bold is currently not supported by DNB UX) */}
        {/* <Span modifier="bold">Bold weight span</Span> */}
        {/* <Span modifier="small bold">Small span with bold weight</Span> */}
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
        <Span medium {...props}>
          {size} - Weight medium
        </Span>
        <br />
        <Span bold {...props}>
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
