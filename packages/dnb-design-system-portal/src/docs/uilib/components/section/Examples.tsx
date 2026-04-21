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
    <Section
      breakout={false}
      backgroundColor="var(--token-color-background-neutral-subtle)"
    >
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
        small: 'var(--token-color-background-neutral)',
        medium: 'var(--token-color-background-neutral-subtle)',
        large: 'var(--token-color-background-neutral-subtle)',
      }}
      dropShadow={{
        small: false,
        medium: true,
        large: true,
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
        small: { block: 'small', inline: 'x-small' },
        medium: { block: 'medium', inline: 'small' },
        large: false,
      }}
      backgroundColor="var(--token-color-background-neutral-subtle)"
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

export const SectionZIndex = () => (
  <ComponentBox hideCode data-visual-test="section-z-index">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      backgroundColor="var(--token-color-background-neutral-subtle)"
    >
      token-color-background-neutral-subtle
      <div>
        <Section
          innerSpace={{ top: 'large', bottom: 'large' }}
          backgroundColor="var(--token-color-background-positive-subtle)"
        >
          token-color-background-positive-subtle
          <div>
            <Section
              innerSpace={{ top: 'large', bottom: 'large' }}
              textColor="var(--token-color-text-neutral-ondark)"
              backgroundColor="var(--token-color-background-info)"
            >
              token-color-background-info
              <div>
                <Section
                  innerSpace={{ top: 'large', bottom: 'large' }}
                  textColor="var(--token-color-text-neutral-ondark)"
                  backgroundColor="var(--token-color-background-marketing)"
                >
                  token-color-background-marketing
                  <div>
                    <Section
                      innerSpace={{ top: 'large', bottom: 'large' }}
                      textColor="var(--token-color-text-neutral-ondark)"
                      backgroundColor="var(--token-color-background-error)"
                    >
                      token-color-background-error
                      <div>
                        <Section
                          innerSpace={{ top: 'large', bottom: 'large' }}
                          backgroundColor="var(--token-color-background-warning-subtle)"
                        >
                          token-color-background-warning-subtle
                          <div>
                            <Section
                              innerSpace={{
                                top: 'large',
                                bottom: 'large',
                              }}
                              backgroundColor="var(--token-color-background-neutral-subtle)"
                            >
                              token-color-background-neutral-subtle
                              <div>
                                <Section
                                  innerSpace={{
                                    top: 'large',
                                    bottom: 'large',
                                  }}
                                  backgroundColor="var(--token-color-background-marketing-subtle)"
                                >
                                  token-color-background-marketing-subtle
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
  <ComponentBox hideCode data-visual-test="section-information">
    <Section
      innerSpace={{ top: 'large', bottom: 'large' }}
      variant="information"
    >
      <P space={0}>
        Generic information section: <Anchor href="#">info</Anchor>
      </P>
    </Section>
  </ComponentBox>
)

export const WithError = () => (
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
