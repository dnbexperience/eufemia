/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { H1, H2, H3, H4, H5, H6, P } from '@dnb/eufemia/src'
import styled from '@emotion/styled'

export const HeadingBasicsExample = () => (
  <ComponentBox>
    <H1>Heading 1</H1>
    <H2>Heading 2</H2>
    <H3>Heading 3</H3>
    <H4>Heading 4</H4>
    <H5>Heading 5</H5>
    <H6>Heading 6</H6>
    <P>Regular text</P>
  </ComponentBox>
)

export const HeadingTypographyExample = () => (
  <ComponentBox>
    <H1>Heading 1 (default size 'xx-large')</H1>
    <H1 size="x-large">Heading 1 style 'x-large'</H1>
    <H1 size="small">Heading 1 style small</H1>
  </ComponentBox>
)

export const HeadingTypographyXLargeExample = () => (
  <ComponentBox>
    <H1 size="x-large">Heading style x-large (using 'size')</H1>
    <H1>
      <small>Heading style x-large (using &lt;small&gt;)</small>
    </H1>
  </ComponentBox>
)

export const HeadingVanillaHTMLExample = () => (
  <ComponentBox hideCode data-visual-test="heading-default">
    <h1 className="dnb-h--xx-large">Heading style xx-large</h1>
    <h2 className="dnb-h--x-large">Heading style x-large</h2>
    <h5 className="dnb-h--large">Heading style large</h5>
    <h3 className="dnb-h--small">Heading style small</h3>
    <h3 className="dnb-h--basis">Heading style basis</h3>
  </ComponentBox>
)

export const HeadingModifiersExample = () => (
  
  <ComponentBox hideCode data-visual-test="heading-additional">
    <article>
      <h1 className="dnb-h--xx-large">
        <small>dnb-h--x-large</small> Normal dnb-h--xx-large
      </h1>
      <h2 className="dnb-h--large">
        Normal dnb-h--large <small>dnb-h--medium</small>
      </h2>
      <h3 className="dnb-lead">
        Normal dnb-h--medium <small>dnb-h--basis</small>
      </h3>
    </article>
  </ComponentBox>
)

export const HeadingMarginCollapsingExample = () => (
  <ComponentBox>
    <H1 size="small" top bottom="small">
      Spacing with bottom margin: small
    </H1>
    <P top="large" bottom="small">
      Spacing with top margin: large
    </P>
  </ComponentBox>
)
export const HeadingTestVariants = () => {
  if (!globalThis.IS_TEST) {
    return null
  }

  const Spacer = styled.div`
    overflow: auto; // prevent margin collapse
  `

  const HSmalls = ({tag: Tag, name, customSize = null, ...props}) => (
    <>
      <Spacer>
        <Tag {...props}>{name} - {customSize || props.size}</Tag>
      </Spacer>
      <Spacer>
        <Tag {...props}><small>{'<small>'}{name} - {customSize || props.size}{'</small>'}</small></Tag>
      </Spacer>
      <Spacer>
        <Tag {...props}>{name} - <small>{'<small>'}{customSize || props.size}{'</small>'}</small></Tag>
      </Spacer>      
      <hr/>
    </>

  )

  const HSizes = ({tag: Tag, name, ...props}) => (
    <div {...props}>
      <HSmalls tag={Tag} name={name} customSize="default"/>
      <HSmalls tag={Tag} name={name} size="xx-large" />
      <HSmalls tag={Tag} name={name} size="x-large" />
      <HSmalls tag={Tag} name={name} size="large" />
      <HSmalls tag={Tag} name={name} size="medium" />
      <HSmalls tag={Tag} name={name} size="basis" />
      <HSmalls tag={Tag} name={name} size="small" />
      <HSmalls tag={Tag} name={name} size="x-small" />
    </div>
  )

  return (
    <ComponentBox scope={{HSizes}}>
      <HSizes tag={H1} name="Heading 1" data-visual-test="heading-1-variants" />
      <HSizes tag={H2} name="Heading 2" data-visual-test="heading-2-variants" />
      <HSizes tag={H3} name="Heading 3" data-visual-test="heading-3-variants" />
      <HSizes tag={H4} name="Heading 4" data-visual-test="heading-4-variants" />
      <HSizes tag={H5} name="Heading 5" data-visual-test="heading-5-variants" />
      <HSizes tag={H6} name="Heading 6" data-visual-test="heading-6-variants" />
    </ComponentBox>
  )
}