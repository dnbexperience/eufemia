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
  display: flex;
  padding: 0.5rem 0;

  html[data-visual-test] & {
    padding: 0.25rem 0;
  }

  h2 {
    margin: 0 !important;
  }
`
const Contrast = styled(Example)`
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
      <Section spacing style_type="emerald-green">
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
    <ComponentBox scope={{ Example }}>
      <Example data-visual-test="anchor-default">
        <Anchor href="/uilib/components/anchor">Default Style</Anchor>
      </Example>
      <Example data-visual-test="anchor-hover">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--hover"
        >
          Hover Style
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-active">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--active"
        >
          Active Style
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-focus">
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
    <ComponentBox hideCode scope={{ Example, Contrast }}>
      <Contrast data-visual-test="anchor-contrast">
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--contrast"
        >
          Contrast Style
        </Anchor>
      </Contrast>
      <Example>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-underline"
        >
          No underline
        </Anchor>
      </Example>
      <Example>
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          className="dnb-anchor--no-icon"
        >
          Blank target without launch icon
        </Anchor>
      </Example>
      <Example>
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
      <Example>
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
      <Example data-visual-test="anchor-contrast">
        <Anchor
          href="/uilib/components/anchor"
          data-visual-test="anchor-newline"
        >
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
          Anchor with Icon left using a react element
        </Anchor>
      </Example>
      <Example data-visual-test="anchor-paragraph">
        <P>
          text{' '}
          <Anchor
            href="/uilib/components/anchor"
            icon="bell"
            iconPosition="right"
          >
            Inside a Paragraph
          </Anchor>{' '}
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

export const AnchorLegacyUsage = () => {
  if (!globalThis.IS_TEST) {
    return null
  }
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
