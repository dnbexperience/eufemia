/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Anchor from '@dnb/eufemia/src/components/Anchor'
import P from '@dnb/eufemia/src/elements/P'

export function ParagraphDefault() {
  return (
    <ComponentBox hideCode data-visual-test="paragraph-default">
      <P>
        Here is a paragraph text
        <Anchor href="/">Anchor / Text Link</Anchor>
        <b>Bold paragraph (medium weight)</b>
        <strong>Strong paragraph (medium weight)</strong>
        {/* <i>Italic paragraph (Currently not supported by DNB UX)</i> */}
        {/* <u>Underline paragraph (Currently not supported by DNB UX)</u> */}
        Numbers 0123456789
        <code className="dnb-code">Code paragraph</code>
        <cite>Cite paragraph</cite>
        Text <sup>1</sup>{' '}
        <b>
          Text <sup>1</sup>
        </b>{' '}
        Text{' '}
        <sup>
          <Anchor href="/">1</Anchor>
        </sup>{' '}
        <b>
          Text{' '}
          <sup>
            <Anchor href="/">1</Anchor>
          </sup>
        </b>{' '}
        Text <sub>1</sub>{' '}
        <b>
          Text <sub>1</sub>
        </b>{' '}
      </P>
    </ComponentBox>
  )
}

export function ParagraphSmall() {
  return (
    <ComponentBox hideCode data-visual-test="paragraph-small">
      <div>
        <P size="small">
          Here is a small paragraph text
          <Anchor href="/">Anchor / Text Link</Anchor>
          <b>Bold paragraph (medium weight)</b>
          <strong>Strong paragraph (medium weight)</strong>
          {/* <i>Italic paragraph</i> */}
          {/* <u>Underline paragraph</u> */}
          Numbers 0123456789
          <code className="dnb-code">Code paragraph</code>
          <cite>Cite paragraph</cite>
          Text <sup>1</sup>{' '}
          <b>
            Text <sup>1</sup>
          </b>{' '}
          Text{' '}
          <sup>
            <Anchor href="/">1</Anchor>
          </sup>{' '}
          <b>
            Text{' '}
            <sup>
              <Anchor href="/">1</Anchor>
            </sup>
          </b>{' '}
          Text <sub>1</sub>{' '}
          <b>
            Text <sub>1</sub>
          </b>{' '}
        </P>
        <P size="x-small">
          Here is a x-small paragraph text
          <br />
          with a new line.
        </P>
      </div>
    </ComponentBox>
  )
}

export function ParagraphAdditional() {
  return (
    <ComponentBox hideCode data-visual-test="paragraph-additional">
      <P>
        <i>Italic paragraph</i>
        <u>Underline paragraph</u>
        <Anchor title="User Experience">UX</Anchor>
        <del>Deleted paragraph</del>
        <mark>Marked paragraph</mark>
        <ins>Inserted paragraph</ins>
        Text <sup>Superscript</sup>
        Text <sub>Subscript</sub>
      </P>
    </ComponentBox>
  )
}

export function ParagraphModifiers() {
  return (
    <ComponentBox data-visual-test="paragraph-modifiers">
      <div>
        <P>Default paragraph</P>
        <P modifier="medium">Medium weight paragraph</P>
        <P size="small">Small paragraph</P>
        <P modifier="small medium">Small paragraph with medium weight</P>
        {/* (Bold is currently not supported by DNB UX) */}
        {/* <P modifier="bold">Bold weight paragraph</P> */}
        {/* <P modifier="small bold">Small paragraph with bold weight</P> */}
      </div>
    </ComponentBox>
  )
}

export function ParagraphRegressionTests() {
  const PWrap = ({ customSize = null, ...props }) => {
    const size = props.size || customSize
    return (
      <>
        <P {...props}>{size}</P>
        <P medium {...props}>
          {size} - Weight medium
        </P>
        <P bold {...props}>
          {size} - Weight bold
        </P>
      </>
    )
  }

  return (
    <ComponentBox scope={{ PWrap }} data-visual-test={'paragraph-sizes'}>
      <PWrap customSize="default" />
      <PWrap size="xx-large" />
      <PWrap size="x-large" />
      <PWrap size="large" />
      <PWrap size="medium" />
      <PWrap size="basis" />
      <PWrap size="small" />
      <PWrap size="x-small" />
    </ComponentBox>
  )
}
