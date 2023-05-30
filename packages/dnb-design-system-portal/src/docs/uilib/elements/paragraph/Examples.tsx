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
          {/* <i>Italic paragraph</i> */}
          {/* <u>Underline paragraph</u> */}
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

export function ParagraphTestVariants() {
  if (!globalThis.IS_TEST) {
    return null
  }

  const Content = () => (
    <>
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
        Text <sup>1</sup>
        <b>
          Text <sup>1</sup>
        </b>
      </Case>
      <Case>
        Text
        <sup>
          <Anchor href="/">1</Anchor>
        </sup>
        <b>
          Text
          <sup>
            <Anchor href="/">1</Anchor>
          </sup>
        </b>
      </Case>
      <Case>
        Text <sub>1</sub>
        <b>
          Text <sub>1</sub>
        </b>
      </Case>
    </>
  )

  const PWrap = ({customSize = null, ...props}) => (
    <>
      <P {...props} data-visual-test={'paragraph-size-' + (props.size || customSize) + '-regular'}>
        <Case>Weight: default</Case>
        <Content/>
      </P>
      <P medium {...props} data-visual-test={'paragraph-size-' + (props.size || customSize) + '-medium'}>
        <Case>Weight: medium</Case>
        <Content/>
      </P>
      <P bold {...props} data-visual-test={'paragraph-size-' + (props.size || customSize) + '-bold'}>
        <Case>Wight: bold</Case>
        <Content/>
      </P>
    </>
  )

  return (
    <ComponentBox scope={{PWrap}}>
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