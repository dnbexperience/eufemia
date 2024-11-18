/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Anchor from '@dnb/eufemia/src/components/Anchor'
import P from '@dnb/eufemia/src/elements/P'

const Case = styled.span`
  display: block;
  padding: 0.25rem 0;
`

export function ParagraphWeightModifiers() {
  return (
    <ComponentBox hideCode data-visual-test="paragraph-modifiers">
      <P>Default paragraph</P>
      <P weight="regular">Regular weight paragraph (same as default)</P>
      <P weight="medium">Medium weight paragraph</P>
    </ComponentBox>
  )
}
export function ParagraphSizeModifiers() {
  return (
    <ComponentBox hideCode data-visual-test="paragraph-modifiers">
      <P size="x-small">x-small paragraph</P>
      <P size="small">small paragraph</P>
      <P size="medium">medium paragraph</P>
      <P size="basis">basis paragraph (same as default)</P>
      <P size="large">large paragraph</P>
      <P size="x-large">x-large paragraph</P>
      <P size="xx-large">xx-large paragraph</P>
    </ComponentBox>
  )
}
export function ParagraphAlignmentModifiers() {
  return (
    <ComponentBox hideCode data-visual-test="paragraph-modifiers">
      <P align="right">Right aligned paragraph</P>
      <P align="center">Center aligned paragraph</P>
      <P align="left">Left aligned paragraph</P>
    </ComponentBox>
  )
}
export function ParagraphFamilyModifiers() {
  return (
    <ComponentBox hideCode data-visual-test="paragraph-modifiers">
      <P family="basis">Basis family paragraph (same as default)</P>
      <P family="heading">
        Heading family paragraph (only different on some themes)
      </P>
      <P family="monospace">Monospace family paragraph</P>
    </ComponentBox>
  )
}

export function ParagraphLineHeightModifiers() {
  return (
    <ComponentBox hideCode data-visual-test="paragraph-modifiers">
      <P line="x-small">x-small line-height paragraph</P>
      <P line="small">small line-height paragraph</P>
      <P line="medium">medium line-height paragraph</P>
      <P line="basis">basis line-height paragraph (same as default)</P>
      <P line="large">large line-height paragraph</P>
      <P line="x-large">x-large line-height paragraph</P>
      <P line="xx-large">xx-large line-height paragraph</P>
    </ComponentBox>
  )
}
export function ParagraphAdditionalModifiers() {
  return (
    <ComponentBox
      hideCode
      data-visual-test="paragraph-additional-modifiers"
    >
      <div>
        <P weight="bold">Bold weight paragraph</P>
        <P decoration="underline">Underline paragraph</P>
        <P decoration="italic">Italic paragraph</P>
      </div>
    </ComponentBox>
  )
}

export function ParagraphDefault() {
  return (
    <ComponentBox
      scope={{ Case }}
      hideCode
      data-visual-test="paragraph-default"
    >
      <P>
        <Case>Here is a paragraph text</Case>
        <Case>
          <Anchor href="/">Anchor / Text Link</Anchor>
        </Case>
        <Case>
          <b>Bold paragraph (medium weight)</b>
        </Case>
        <Case>
          <strong>Strong paragraph (medium weight)</strong>
        </Case>
        {/* <i>Italic paragraph (Currently not supported by DNB UX)</i> */}
        {/* <u>Underline paragraph (Currently not supported by DNB UX)</u> */}
        <Case>Numbers 0123456789</Case>
        <Case>
          <code className="dnb-code">Code paragraph</code>
        </Case>
        <Case>
          <cite>Cite paragraph</cite>
        </Case>
        <Case>
          Text <sup>1</sup>{' '}
          <b>
            Text <sup>1</sup>
          </b>{' '}
        </Case>
        <Case>
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
        </Case>
        <Case>
          Text <sub>1</sub>{' '}
          <b>
            Text <sub>1</sub>
          </b>{' '}
        </Case>
      </P>
    </ComponentBox>
  )
}

export function ParagraphSmall() {
  return (
    <ComponentBox
      scope={{ Case }}
      hideCode
      data-visual-test="paragraph-small"
    >
      <div>
        <P size="small">
          <Case>Here is a small paragraph text</Case>
          <Case>
            <Anchor href="/">Anchor / Text Link</Anchor>
          </Case>
          <Case>
            <b>Bold paragraph (medium weight)</b>
          </Case>
          <Case>
            <strong>Strong paragraph (medium weight)</strong>
          </Case>
          <Case>Numbers 0123456789</Case>
          <Case>
            <code className="dnb-code">Code paragraph</code>
          </Case>
          <Case>
            <cite>Cite paragraph</cite>
          </Case>
          <Case>
            Text <sup>1</sup>{' '}
            <b>
              Text <sup>1</sup>
            </b>{' '}
          </Case>
          <Case>
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
          </Case>
          <Case>
            Text <sub>1</sub>{' '}
            <b>
              Text <sub>1</sub>
            </b>{' '}
          </Case>
        </P>
        <P size="x-small">
          <Case>
            Here is a x-small paragraph text
            <br />
            with a new line.
          </Case>
        </P>
      </div>
    </ComponentBox>
  )
}

export function ParagraphAdditional() {
  return (
    <ComponentBox
      scope={{ Case }}
      hideCode
      data-visual-test="paragraph-additional"
    >
      <P>
        <Case>
          <i>Italic paragraph</i>
        </Case>
        <Case>
          <u>Underline paragraph</u>
        </Case>
        <Case>
          <Anchor title="User Experience">UX</Anchor>
        </Case>
        <Case>
          <del>Deleted paragraph</del>
        </Case>
        <Case>
          <mark>Marked paragraph</mark>
        </Case>
        <Case>
          <ins>Inserted paragraph</ins>
        </Case>
        <Case>
          Text <sup>Superscript</sup>
        </Case>
        <Case>
          Text <sub>Subscript</sub>
        </Case>
      </P>
    </ComponentBox>
  )
}

export function ParagraphRegressionTests() {
  const PWrap = ({ customSize = null, ...props }) => {
    const size = props.size || customSize
    return (
      <>
        <P {...props}>
          <Case>{size}</Case>
        </P>
        <P medium {...props}>
          <Case>{size} - Weight medium</Case>
        </P>
        <P bold {...props}>
          <Case>{size} - Weight bold</Case>
        </P>
      </>
    )
  }

  return (
    <ComponentBox scope={{ PWrap }} data-visual-test="paragraph-sizes">
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
