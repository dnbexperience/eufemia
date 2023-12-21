/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia/src'

const Wrapper = styled.div`
  [data-visual-test-wrapper] {
    margin: 0;
  }
`
const Example = styled.div`
  padding: 0.5rem 0;

  html[data-visual-test] & {
    padding: 0.25rem 0;
  }

  h2 {
    margin: 0 !important;
  }
`
const ContrastExample = styled(Example)`
  display: inline-block;
  padding: 0.5rem;

  html[data-visual-test] & {
    padding: 1.5rem;
  }

  background-color: var(--color-ocean-green);
`

export const AnchorExampleInSection = () => (
  <Wrapper>
    <ComponentBox data-visual-test="anchor-in-section">
      <Section spacing>
        <Anchor
          className="dnb-anchor--no-underline"
          href="https://dnb.no/"
        >
          Anchor in Section without underline
        </Anchor>
      </Section>
    </ComponentBox>
  </Wrapper>
)

export const AnchorExampleStates = () => (
  <Wrapper>
    <ComponentBox scope={{ Example }} data-visual-test="anchor-states">
      <Example data-visual-test="anchor-default">
        <Anchor href="/uilib/components/anchor">Default Style</Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--hover"
        >
          Hover Style
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--active"
        >
          Active Style
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--focus"
        >
          Focus Style
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorExampleHelperClasses = () => (
  <Wrapper>
    <ComponentBox hideCode scope={{ Example, ContrastExample }}>
      <ContrastExample data-visual-test="anchor-contrast">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--contrast"
        >
          Contrast Style
        </Anchor>
      </ContrastExample>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-underline"
        >
          No underline
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-no-icon">
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          className="dnb-anchor--no-icon"
        >
          Blank target without launch icon
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-no-hover">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-hover"
        >
          No hover
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-radius"
        >
          No border-radius
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-animation"
        >
          No animation
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-no-style">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-style"
        >
          Reset anchor style
        </Anchor>
      </Example>
      <Example>
        <button className="dnb-anchor">I'm a Button!</button>
      </Example>
      <Example data-visual-test="anchor-newline">
        <Anchor href="/uilib/components/anchor">
          Newline <br />
          Newline
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-skeleton">
        <Anchor skeleton href="/uilib/components/anchor">
          Skeleton
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorExampleHelperContrastVariations = () => (
  <Wrapper>
    <ComponentBox hideCode scope={{ Example, ContrastExample }}>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-hover">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-hover"
          >
            Contrast - no hover
          </Anchor>
        </ContrastExample>
      </Example>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-radius">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-radius"
          >
            Contrast - no radius
          </Anchor>
        </ContrastExample>
      </Example>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-underline">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-underline"
          >
            Contrast - no underline
          </Anchor>
        </ContrastExample>
      </Example>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-underline-no-hover">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-underline dnb-anchor--no-hover"
          >
            Contrast - no underline - no hover
          </Anchor>
        </ContrastExample>
      </Example>
      <Example>
        <ContrastExample data-visual-test="anchor-contrast-no-underline-no-radius">
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--contrast dnb-anchor--no-underline dnb-anchor--no-radius"
          >
            Contrast - no underline - no radius
          </Anchor>
        </ContrastExample>
      </Example>
    </ComponentBox>
  </Wrapper>
)
export const AnchorExampleIcons = () => (
  <Wrapper>
    <ComponentBox hideCode scope={{ Example }}>
      <Example data-visual-test="anchor-icon-right">
        <Anchor
          href="/uilib/components/anchor"
          icon="chevron_right"
          iconPosition="right"
        >
          Anchor with Icon right
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-icon-left">
        <Anchor href="/uilib/components/anchor" icon="question">
          Anchor with Icon left
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-icon-node">
        <Anchor
          href="/uilib/components/anchor"
          icon={<IconPrimary icon="question" />}
        >
          Anchor with Icon left using a html/react element
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-paragraph">
        <P>
          text
          {' '}
          <Anchor
            href="/uilib/components/anchor"
            icon="bell"
            iconPosition="right"
            className="dnb-anchor--inline"
          >
            Inside a Paragraph
          </Anchor>
          {' '}
          text
        </P>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorTargetBlank = () => (
  <Wrapper>
    <ComponentBox hideCode scope={{ Example }}>
      <Example data-visual-test="anchor-blank">
        <Anchor target="_blank" href="/uilib/components/anchor">
          Blank target with https
        </Anchor>
      </Example>
      <Example>
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
        >
          Blank target with different launch icon
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-blank-icon-left">
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          icon="bell"
          iconPosition="left"
        >
          Blank target with icon to the left
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorProtocol = () => (
  <Wrapper>
    <ComponentBox
      hideCode
      scope={{ Example }}
      data-visual-test="anchor-protocol"
    >
      <Example>
        <Anchor target="_blank" href="mailto:john.doe@email.com">
          Send a mail to: john.doe@email.com
        </Anchor>
      </Example>
      <Example>
        <Anchor target="_blank" href="tel:12345678">
          Make a phone call to: 12345678
        </Anchor>
      </Example>
      <Example>
        <Anchor target="_blank" href="sms:12345678">
          Send an SMS to: 12345678
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorExampleHeadings = () => (
  <Wrapper>
    <ComponentBox hideCode scope={{ Example }}>
      <Example data-visual-test="anchor-heading">
        <H2>
          <Anchor
            href="/uilib/components/anchor"
            icon="bell"
            iconPosition="right"
          >
            Inside Headings
          </Anchor>{' '}
          H2
        </H2>
      </Example>
      <Example data-visual-test="anchor-heading-blank">
        <H2>
          <Anchor target="_blank" href="/uilib/components/anchor">
            Blank target in headings
          </Anchor>{' '}
          H2
        </H2>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorSbankenRegular = () => (
  <Wrapper>
    <ComponentBox hideCode scope={{ Example }}>
      <Example>
        <Anchor href="/uilib/components/anchor" icon="chevron_right">
          Default
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          icon="chevron_right"
          className="dnb-anchor--hover"
        >
          Hover
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          icon="chevron_right"
          className="dnb-anchor--active"
        >
          Active
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          icon="chevron_right"
          className="dnb-anchor--focus"
        >
          Focus
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorSbankenGoto = () => (
  <Wrapper>
    <ComponentBox hideCode scope={{ Example }}>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
        >
          Default
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
          className="dnb-anchor--hover"
        >
          Hover
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
          className="dnb-anchor--active"
        >
          Active
        </Anchor>
      </Example>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
          className="dnb-anchor--focus"
        >
          Focus
        </Anchor>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorSbankenInline = () => (
  <Wrapper>
    <ComponentBox hideCode scope={{ Example }}>
      <Example data-visual-test="anchor-inline">
        <P>
          A paragraph with an{' '}
          <Anchor
            href="/uilib/components/anchor"
            className="dnb-anchor--inline"
          >
            inline anchor
          </Anchor>{' '}
          uses a different styling.
        </P>
      </Example>
    </ComponentBox>
  </Wrapper>
)

export const AnchorLegacyUsage = () => {
  return (
    <Wrapper>
      <ComponentBox hideCode scope={{ Example }}>
        <Example data-visual-test="anchor-legacy-icon">
          <Anchor href="/uilib/components/anchor">
            Anchor with Icon <IconPrimary icon="chevron_right" />
          </Anchor>
        </Example>
        <Example data-visual-test="anchor-legacy-paragraph">
          <P>
            text{' '}
            <Anchor href="/uilib/components/anchor">
              Inside a Paragraph <IconPrimary icon="bell" />
            </Anchor>{' '}
            text
          </P>
        </Example>
        <Example data-visual-test="anchor-legacy-blank-with-icon">
          <Anchor target="_blank" href="/uilib/components/anchor">
            <IconPrimary icon="bell" /> Blank target with https
          </Anchor>
        </Example>
      </ComponentBox>
    </Wrapper>
  )
}
