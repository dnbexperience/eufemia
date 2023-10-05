/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Section, Heading, P, Anchor } from '@dnb/eufemia/src'

export const SectionDemo = () => (
  <ComponentBox hideCode data-visual-test="section-default">
    <Section>
      <P space={0}>
        Visual DNB Section: <Anchor href="#">default</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoSpacing = () => (
  <ComponentBox hideCode data-visual-test="section-spacing">
    <Section spacing>
      <P space={0}>
        Visual DNB Section: <Anchor href="#">default with spacing</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoBlock = () => (
  <ComponentBox hideCode data-visual-test="section-default">
    <Section layout="block">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">default</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoBlockSpacing = () => (
  <ComponentBox hideCode data-visual-test="section-spacing">
    <Section layout="block" spacing>
      <P space={0}>
        Visual DNB Section: <Anchor href="#">default with spacing</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoWhite = () => (
  <ComponentBox hideCode data-visual-test="section-white">
    <Section spacing="large" style_type="white">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">white</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoDivider = () => (
  <ComponentBox hideCode data-visual-test="section-divider">
    <Section spacing="medium" style_type="divider">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">divider</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoMintGreen = () => (
  <ComponentBox hideCode data-visual-test="section-mint-green">
    <Section spacing="small" style_type="mint-green">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">mint-green</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoSeaGreen = () => (
  <ComponentBox hideCode data-visual-test="section-sea-green">
    <Section spacing="large" style_type="sea-green">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">sea-green</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoEmeraldGreen = () => (
  <ComponentBox hideCode data-visual-test="section-emerald-green">
    <Section spacing="medium" style_type="emerald-green">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">emerald-green</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoLavender = () => (
  <ComponentBox hideCode data-visual-test="section-lavender">
    <Section spacing="small" style_type="lavender">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">lavender</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoBlack3 = () => (
  <ComponentBox hideCode data-visual-test="section-black-3">
    <Section spacing style_type="black-3">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">black-3</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoSandYellow = () => (
  <ComponentBox hideCode data-visual-test="section-sand-yellow">
    <Section spacing style_type="sand-yellow">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">sand-yellow</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoPistachio = () => (
  <ComponentBox hideCode data-visual-test="section-pistachio">
    <Section spacing style_type="pistachio">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">pistachio</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoFireRed = () => (
  <ComponentBox hideCode data-visual-test="section-fire-red">
    <Section spacing style_type="fire-red">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">fire-red</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoFireRed8 = () => (
  <ComponentBox hideCode data-visual-test="section-fire-red-8">
    <Section spacing style_type="fire-red-8">
      <P space={0}>
        Visual DNB Section: <Anchor href="#">fire-red-8</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionZIndex = () => (
  <ComponentBox hideCode data-visual-test="section-z-index">
    <Section spacing style_type="mint-green-12">
      mint-green-12
      <div>
        <Section spacing style_type="mint-green">
          mint-green
          <div>
            <Section spacing style_type="sea-green">
              sea-green
              <div>
                <Section spacing style_type="emerald-green">
                  emerald-green
                  <div>
                    <Section spacing style_type="fire-red">
                      fire-red
                      <div>
                        <Section spacing style_type="sand-yellow">
                          sand-yellow
                          <div>
                            <Section spacing style_type="pistachio">
                              pistachio
                              <div>
                                <Section spacing style_type="lavender">
                                  lavender
                                  <div>
                                    <Section spacing style_type="divider">
                                      divider
                                    </Section>
                                  </div>
                                </Section>
                              </div>
                            </Section>
                          </div>
                        </Section>
                      </div>
                    </Section>
                  </div>
                </Section>
              </div>
            </Section>
          </div>
        </Section>
      </div>
    </Section>
  </ComponentBox>
)

export const SectionDemoInfo = () => (
  <ComponentBox hideCode data-visual-test="section-info">
    <Section spacing variant="info" layout="full-width">
      <P space={0}>
        Generic info section: <Anchor href="#">info</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoInfoBlock = () => (
  <ComponentBox hideCode data-visual-test="section-info">
    <Section spacing variant="info" layout="block">
      <P space={0}>
        Generic info section: <Anchor href="#">info</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoError = () => (
  <ComponentBox hideCode data-visual-test="section-error">
    <Section spacing variant="error" layout="full-width">
      <P space={0}>
        Error section: <Anchor href="#">error</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoErrorBlock = () => (
  <ComponentBox hideCode data-visual-test="section-error">
    <Section spacing variant="error" layout="block">
      <P space={0}>
        Error section: <Anchor href="#">error</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoWarning = () => (
  <ComponentBox hideCode data-visual-test="section-warning">
    <Section spacing variant="warning" layout="full-width">
      <P space={0}>
        Warning section: <Anchor href="#">warning</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoWarningBlock = () => (
  <ComponentBox hideCode data-visual-test="section-warning">
    <Section spacing variant="warning" layout="block">
      <P space={0}>
        Warning section: <Anchor href="#">warning</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoSuccess = () => (
  <ComponentBox hideCode data-visual-test="section-success">
    <Section spacing variant="success" layout="full-width">
      <P space={0}>
        Success section: <Anchor href="#">success</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoSuccessBlock = () => (
  <ComponentBox hideCode data-visual-test="section-success">
    <Section spacing variant="success" layout="block">
      <P space={0}>
        Success section: <Anchor href="#">success</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoDynamicSpacing = () => (
  <ComponentBox hideCode data-visual-test="section-success">
    <Section layout="block" variant="info" dynamic_spacing>
      <P space={0}>
        Success section: <Anchor href="#">success</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoMediumDynamicSpacing = () => (
  <ComponentBox hideCode data-visual-test="section-success">
    <Section layout="block" variant="info" dynamic_spacing="medium">
      <P space={0}>
        Success section: <Anchor href="#">success</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoCustomDynamicSpacing = () => (
  <ComponentBox hideCode data-visual-test="section-success">
    <Section
      layout="block"
      variant="info"
      //spacing_large="xx-large"
      //spacing_medium="small"
      //spacing_small="x-small"
      spacing={{
        small: 'x-small',
        medium: 'small',
        large: 'xx-large',
      }}
    >
      <P space={0}>
        Success section: <Anchor href="#">success</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionDemoResponsiveAlignment = () => (
  <ComponentBox hideCode data-visual-test="section-success">
    <em>Outer content edge</em>
    <div style={{ border: '1px dashed rgba(128, 0, 0, 0.3)' }}>
      <Section
        layout="block"
        variant="transparent"
        spacing={{
          small: 'small',
          medium: 'medium',
          large: 'large',
        }}
      >
        <Heading level={3} size="medium">
          Lorem Ipsum
        </Heading>
        <P space={0}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          viverra sit amet nunc pellentesque cursus. Fusce mollis
          vestibulum sagittis. Nullam volutpat ac diam a posuere. Proin
          dignissim tortor lectus, eu pretium purus lobortis eu. Maecenas
          ut augue sapien. Vivamus posuere molestie dapibus. Duis vel odio
          lorem. Vestibulum enim sem, posuere quis facilisis vel, feugiat
          placerat turpis. Nullam ac est ac massa auctor convallis.
        </P>
      </Section>
      <Section
        layout="block"
        variant="transparent"
        spacing={{
          medium: 'medium',
          large: 'large',
        }}
      >
        <Section layout="block" variant="success">
          <Heading level={4} size="small">
            Lorem Ipsum
          </Heading>
          <P space={0}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            viverra sit amet nunc pellentesque cursus. Fusce mollis
            vestibulum sagittis. Nullam volutpat ac diam a posuere. Proin
            dignissim tortor lectus, eu pretium purus lobortis eu. Maecenas
            ut augue sapien. Vivamus posuere molestie dapibus. Duis vel
            odio lorem. Vestibulum enim sem, posuere quis facilisis vel,
            feugiat placerat turpis. Nullam ac est ac massa auctor
            convallis.
          </P>
        </Section>
      </Section>
    </div>
  </ComponentBox>
)
