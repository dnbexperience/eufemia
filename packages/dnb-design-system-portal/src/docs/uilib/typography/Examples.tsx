/**
 * UI lib Component Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ComponentBox from '../../../shared/tags/ComponentBox'
import Anchor from '@dnb/eufemia/src/elements/Anchor'
import P from '@dnb/eufemia/src/elements/P'

const Wrapper = styled.div`
  margin-bottom: 3rem;
`

const FontUsageExample = ({ typo_class, font_family }) => (
  <div className="example-box">
    <h3 className={typo_class}>{font_family}</h3>
    <p className={typo_class}>
      Here is a paragraph with some nonsense{' '}
      <a href="/" className="dnb-anchor">
        Lorem Ipsum
      </a>{' '}
      comes from <b>sections</b> 1.10.32 and 1.10.33 of "de
      <i>Finibus Bonorum</i> et <u>Malorum</u>" (
      <strong>The Extremes</strong> of Good and Evil) by Cicero, written in
      45 BC.
    </p>
  </div>
)
FontUsageExample.propTypes = {
  typo_class: PropTypes.string,
  font_family: PropTypes.string.isRequired,
}
FontUsageExample.defaultProps = {
  typo_class: null,
}

export function FontWeightExample() {
  return (
    <Wrapper>
      {/* Regular */}
      <FontUsageExample
        font_family="DNB Regular"
        typo_class="dnb-typo-regular"
      />

      {/* Medium */}
      <FontUsageExample
        font_family="DNB Medium"
        typo_class="dnb-typo-medium"
      />

      {/* Bold */}
      <FontUsageExample
        font_family="DNB Bold"
        typo_class="dnb-typo-bold"
      />

      {/* Mono Regular */}
      <FontUsageExample
        font_family="DNB Mono Regular"
        typo_class="dnb-typo-mono-regular"
      />
    </Wrapper>
  )
}

const Case = styled.span`
  display: block;
  padding: 0.25rem 0;
`

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
        {/*<i>Italic paragraph (Currently not supported by DNB UX)</i>*/}
        {/*<u>Underline paragraph (Currently not supported by DNB UX)</u>*/}
        <Case>Numbers 0123456789</Case>
        <Case>
          <code className="dnb-code">Code paragraph</code>
        </Case>
        <Case>
          <cite>Cite paragraph</cite>
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
          {/*<i>Italic paragraph</i>*/}
          {/*<u>Underline paragraph</u>*/}
          <Case>Numbers 0123456789</Case>
          <Case>
            <code className="dnb-code">Code paragraph</code>
          </Case>
          <Case>
            <cite>Cite paragraph</cite>
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

export function ParagraphModifiers() {
  return (
    <ComponentBox data-visual-test="paragraph-modifiers">
      <div>
        <P>Default paragraph</P>
        <P modifier="medium">Medium weight paragraph</P>
        <P size="small">Small paragraph</P>
        <P modifier="small medium">Small paragraph with medium weight</P>
        {/*(Bold is currently not supported by DNB UX)*/}
        {/*<P modifier="bold">Bold weight paragraph</P>*/}
        {/*<P modifier="small bold">Small paragraph with bold weight</P>*/}
      </div>
    </ComponentBox>
  )
}
