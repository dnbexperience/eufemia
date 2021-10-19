/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

export const SectionDemo = () => (
  <ComponentBox hideCode data-visual-test="section-default">
    {() => /* jsx */ `
<Section>
	<P top="xx-large">Visual DNB Section: <Anchor href="#">default</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoSpacing = () => (
  <ComponentBox hideCode data-visual-test="section-spacing">
    {() => /* jsx */ `
<Section spacing="large">
  <P space={0}>Visual DNB Section: <Anchor href="#">default with spacing</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoWhite = () => (
  <ComponentBox hideCode data-visual-test="section-white">
    {() => /* jsx */ `
<Section spacing="true" style_type="white">
  <P space={0}>Visual DNB Section: <Anchor href="#">white</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoDivier = () => (
  <ComponentBox hideCode data-visual-test="section-divider">
    {() => /* jsx */ `
<Section spacing="true" style_type="divider">
  <P space={0}>Visual DNB Section: <Anchor href="#">divider</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoMintGreen = () => (
  <ComponentBox hideCode data-visual-test="section-mint-green">
    {() => /* jsx */ `
<Section spacing="true" style_type="mint-green">
  <P space={0}>Visual DNB Section: <Anchor href="#">mint-green</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoSeaGreen = () => (
  <ComponentBox hideCode data-visual-test="section-sea-green">
    {() => /* jsx */ `
<Section spacing="true" style_type="sea-green">
  <P space={0}>Visual DNB Section: <Anchor href="#">sea-green</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoEmeraldGreen = () => (
  <ComponentBox hideCode data-visual-test="section-emerald-green">
    {() => /* jsx */ `
<Section spacing="true" style_type="emerald-green">
  <P space={0}>Visual DNB Section: <Anchor href="#">emerald-green</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoLavender = () => (
  <ComponentBox data-visual-test="section-lavender">
    {() => /* jsx */ `
<Section spacing="true" style_type="lavender">
  <P space={0}>Visual DNB Section: <Anchor href="#">lavender</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoBlack3 = () => (
  <ComponentBox data-visual-test="section-black-3">
    {() => /* jsx */ `
<Section spacing="true" style_type="black-3">
  <P space={0}>Visual DNB Section: <Anchor href="#">black-3</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoSandYellow = () => (
  <ComponentBox data-visual-test="section-sand-yellow">
    {() => /* jsx */ `
<Section spacing="true" style_type="sand-yellow">
  <P space={0}>Visual DNB Section: <Anchor href="#">sand-yellow</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoPistachio = () => (
  <ComponentBox data-visual-test="section-pistachio">
    {() => /* jsx */ `
<Section spacing="true" style_type="pistachio">
  <P space={0}>Visual DNB Section: <Anchor href="#">pistachio</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoFireRed = () => (
  <ComponentBox data-visual-test="section-fire-red">
    {() => /* jsx */ `
<Section spacing="true" style_type="fire-red">
  <P space={0}>Visual DNB Section: <Anchor href="#">fire-red</Anchor></P>
</Section>
`}
  </ComponentBox>
)

export const SectionDemoFireRed8 = () => (
  <ComponentBox data-visual-test="section-fire-red-8">
    {() => /* jsx */ `
<Section spacing="true" style_type="fire-red-8">
  <P space={0}>Visual DNB Section: <Anchor href="#">fire-red-8</Anchor></P>
</Section>
`}
  </ComponentBox>
)
