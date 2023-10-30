/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Section, P, Anchor } from '@dnb/eufemia/src'

export const Default = () => (
  <ComponentBox hideCode data-visual-test="section-default">
    <Section>
      <P space={0}>
        Visual Section: <Anchor href="#">default</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const NoBreakout = () => (
  <ComponentBox hideCode data-visual-test="section-no-breakout">
    <Section breakout={false} backgroundColor="pistachio">
      <P space={0}>No breakout</P>
    </Section>
  </ComponentBox>
)

export const ResponsiveAppearance = () => (
  <ComponentBox hideCode data-visual-test="section-responsive-appearance">
    <Section
      breakout={{
        small: true,
        medium: false,
        large: false,
      }}
      outline={{
        medium: true,
        large: 'black',
      }}
      roundedCorner={{ large: true }}
      backgroundColor={{
        small: 'white',
        medium: 'pistachio',
        large: 'pistachio',
      }}
      innerSpace
    >
      <P space={0}>Responsive properties</P>
    </Section>
  </ComponentBox>
)

export const ResponsiveInnerSpace = () => (
  <ComponentBox hideCode>
    <Section
      innerSpace={{
        small: { top: 'small', bottom: 'small' },
        medium: true,
        large: false,
      }}
      backgroundColor="pistachio"
      breakout={false}
    >
      <P space={0}>Responsive innerSpace</P>
    </Section>
  </ComponentBox>
)

export const Spacing = () => (
  <ComponentBox hideCode>
    <Section innerSpace={{ top: 'large', bottom: 'large', left: 'small' }}>
      <P space={0}>
        Visual Section: <Anchor href="#">default with innerSpace</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const White = () => (
  <ComponentBox hideCode data-visual-test="section-white">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      backgroundColor="white"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">white</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const Divider = () => (
  <ComponentBox hideCode data-visual-test="section-divider">
    <Section
      innerSpace={{ top: 'medium', bottom: 'medium' }}
      variant="divider"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">divider</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const MintGreen = () => (
  <ComponentBox hideCode data-visual-test="section-mint-green">
    <Section
      innerSpace={{ top: 'small', bottom: 'small' }}
      backgroundColor="mint-green"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">mint-green</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SeaGreen = () => (
  <ComponentBox hideCode data-visual-test="section-sea-green">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      style_type="sea-green"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">sea-green</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const EmeraldGreen = () => (
  <ComponentBox hideCode data-visual-test="section-emerald-green">
    <Section
      innerSpace={{ top: 'medium', bottom: 'medium' }}
      style_type="emerald-green"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">emerald-green</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const Lavender = () => (
  <ComponentBox hideCode data-visual-test="section-lavender">
    <Section
      innerSpace={{ top: 'small', bottom: 'small' }}
      textColor="black-80"
      backgroundColor="lavender"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">lavender</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const Black3 = () => (
  <ComponentBox hideCode data-visual-test="section-black-3">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      backgroundColor="black-3"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">black-3</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SandYellow = () => (
  <ComponentBox hideCode data-visual-test="section-sand-yellow">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      backgroundColor="sand-yellow"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">sand-yellow</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const Pistachio = () => (
  <ComponentBox hideCode data-visual-test="section-pistachio">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      backgroundColor="pistachio"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">pistachio</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const FireRed = () => (
  <ComponentBox hideCode data-visual-test="section-fire-red">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      style_type="fire-red"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">fire-red</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const FireRed8 = () => (
  <ComponentBox hideCode data-visual-test="section-fire-red-8">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      backgroundColor="fire-red-8"
    >
      <P space={0}>
        Visual Section: <Anchor href="#">fire-red-8</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const SectionZIndex = () => (
  <ComponentBox hideCode data-visual-test="section-z-index">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      backgroundColor="mint-green-12"
    >
      mint-green-12
      <div>
        <Section
          innerSpace={{ top: 'large', bottom: 'large' }}
          backgroundColor="mint-green"
        >
          mint-green
          <div>
            <Section
              innerSpace={{ top: 'large', bottom: 'large' }}
              textColor="white"
              backgroundColor="sea-green"
            >
              sea-green
              <div>
                <Section
                  innerSpace={{ top: 'large', bottom: 'large' }}
                  textColor="mint-green"
                  backgroundColor="emerald-green"
                >
                  emerald-green
                  <div>
                    <Section
                      innerSpace={{ top: 'large', bottom: 'large' }}
                      textColor="white"
                      backgroundColor="fire-red"
                    >
                      fire-red
                      <div>
                        <Section
                          innerSpace={{ top: 'large', bottom: 'large' }}
                          textColor="black-80"
                          backgroundColor="sand-yellow"
                        >
                          sand-yellow
                          <div>
                            <Section
                              innerSpace={{
                                top: 'large',
                                bottom: 'large',
                              }}
                              textColor="black-80"
                              backgroundColor="pistachio"
                            >
                              pistachio
                              <div>
                                <Section
                                  innerSpace={{
                                    top: 'large',
                                    bottom: 'large',
                                  }}
                                  textColor="black-80"
                                  backgroundColor="lavender"
                                >
                                  lavender
                                  <div>
                                    <Section
                                      innerSpace={{
                                        top: 'large',
                                        bottom: 'large',
                                      }}
                                      variant="divider"
                                    >
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

export const Info = () => (
  <ComponentBox hideCode data-visual-test="section-info">
    <Section innerSpace={{ top: 'large', bottom: 'large' }} variant="info">
      <P space={0}>
        Generic info section: <Anchor href="#">info</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const Error = () => (
  <ComponentBox hideCode data-visual-test="section-error">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      variant="error"
    >
      <P space={0}>
        Error section: <Anchor href="#">error</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const Warning = () => (
  <ComponentBox hideCode data-visual-test="section-warning">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      variant="warning"
    >
      <P space={0}>
        Warning section: <Anchor href="#">warning</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const Success = () => (
  <ComponentBox hideCode data-visual-test="section-success">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      variant="success"
    >
      <P space={0}>
        Success section: <Anchor href="#">success</Anchor>
      </P>
    </Section>
  </ComponentBox>
)
