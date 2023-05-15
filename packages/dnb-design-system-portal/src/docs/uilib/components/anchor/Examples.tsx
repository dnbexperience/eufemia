/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Section, Anchor, IconPrimary } from '@dnb/eufemia/src'

export const AnchorExampleInSection = () => (
  <ComponentBox data-visual-test="anchor-in-section">
    <Section spacing style_type="emerald-green">
      <Anchor className="dnb-anchor--no-underline" href="https://dnb.no/">
        Anchor in Section without underline
      </Anchor>
    </Section>
  </ComponentBox>
)

export const AnchorExampleStates = () => (
  <ComponentBox>
    <ul className="dnb-ul dnb-unstyled-list">
      <li>
        <Anchor
          href="/uilib/components/anchor"
          data-visual-test="anchor-default"
        >
          Default Style
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          data-visual-test="anchor-hover"
          className="dnb-anchor--hover"
        >
          Hover Style
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          data-visual-test="anchor-active"
          className="dnb-anchor--active"
        >
          Active Style
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          data-visual-test="anchor-focus"
          className="dnb-anchor--focus"
        >
          Focus Style
        </Anchor>
      </li>
    </ul>
  </ComponentBox>
)

export const AnchorExampleHelperClasses = () => (
  <ComponentBox hideCode>
    <ul className="dnb-ul dnb-unstyled-list">
      <li
        style={{
          display: 'inline-block',
          padding: '0.5rem',
          margin: '-0.5rem',
          backgroundColor: 'var(--color-ocean-green)',
        }}
      >
        <Anchor
          href="/uilib/components/anchor"
          data-visual-test="anchor-contrast"
          className="dnb-anchor--contrast"
        >
          Contrast Style
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-underline"
        >
          No underline
        </Anchor>
      </li>
      <li>
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          className="dnb-anchor--no-icon"
        >
          Blank target without launch icon
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-hover"
        >
          No hover
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-radius"
        >
          No border-radius
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-animation"
        >
          No animation
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          className="dnb-anchor--no-style"
        >
          Reset anchor style
        </Anchor>
      </li>
      <li>
        <button className="dnb-anchor">I'm a Button!</button>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          data-visual-test="anchor-newline"
        >
          Newline <br />
          {' '}Newline
        </Anchor>
      </li>
      <li>
        <Anchor
          skeleton
          href="/uilib/components/anchor"
          data-visual-test="anchor-skeleton"
        >
          Skeleton
        </Anchor>
      </li>
    </ul>
  </ComponentBox>
)

export const AnchorExampleIcons = () => (
  <ComponentBox hideCode>
    <Anchor
      href="/uilib/components/anchor"
      data-visual-test="anchor-icon-right"
      icon="chevron_right"
      iconPosition="right"
    >
      Anchor with Icon right
    </Anchor>
    <br />
    <br />
    <Anchor
      href="/uilib/components/anchor"
      data-visual-test="anchor-icon-left"
      icon="question"
    >
      Anchor with Icon left
    </Anchor>
    <br />
    <br />
    <Anchor
      href="/uilib/components/anchor"
      data-visual-test="anchor-icon-node"
      icon={<IconPrimary icon="question" />}
    >
      Anchor with Icon left using a react element
    </Anchor>
    <br />
    <br />
    <p className="dnb-p" data-visual-test="anchor-paragraph">
      text{' '}
      <Anchor
        href="/uilib/components/anchor"
        icon="bell"
        iconPosition="right"
      >
        Inside a Paragraph
      </Anchor>{' '}
      text
    </p>
  </ComponentBox>
)

export const AnchorTargetBlank = () => (
  <ComponentBox hideCode>
    <ul className="dnb-ul dnb-unstyled-list">
      <li data-visual-test="anchor-blank">
        <Anchor target="_blank" href="/uilib/components/anchor">
          Blank target with https
        </Anchor>
      </li>
      <li>
        <Anchor
          target="_blank"
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
        >
          Blank target with different launch icon
        </Anchor>
      </li>
    </ul>
  </ComponentBox>
)

export const AnchorExampleHeadings = () => (
  <ComponentBox hideCode>
    <h2 className="dnb-h--large">
      <Anchor
        href="/uilib/components/anchor"
        data-visual-test="anchor-heading"
      >
        Inside Headings <IconPrimary icon="bell" />
      </Anchor>{' '}
      H2
    </h2>
    <h2 className="dnb-h--large">
      <Anchor
        target="_blank"
        href="/uilib/components/anchor"
        data-visual-test="anchor-heading-blank"
      >
        Blank target in headings
      </Anchor>{' '}
      H2
    </h2>
  </ComponentBox>
)

export const AnchorSbankenRegular = () => (
  <ComponentBox hideCode>
    <ul className="dnb-ul dnb-unstyled-list">
      <li>
        <Anchor href="/uilib/components/anchor" icon="chevron_right">
          Default
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          icon="chevron_right"
          className="dnb-anchor--hover"
        >
          Hover
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          icon="chevron_right"
          className="dnb-anchor--active"
        >
          Active
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          icon="chevron_right"
          className="dnb-anchor--focus"
        >
          Focus
        </Anchor>
      </li>
    </ul>
  </ComponentBox>
)

export const AnchorSbankenGoto = () => (
  <ComponentBox hideCode>
    <ul className="dnb-ul dnb-unstyled-list">
      <li>
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
        >
          Default
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
          className="dnb-anchor--hover"
        >
          Hover
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
          className="dnb-anchor--active"
        >
          Active
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/components/anchor"
          icon="arrow_right"
          iconPosition="right"
          className="dnb-anchor--focus"
        >
          Focus
        </Anchor>
      </li>
    </ul>
  </ComponentBox>
)

export const AnchorLegacyUsage = () => {
  if (!globalThis.IS_TEST) {
    return null
  }
  return (
    <ComponentBox hideCode>
      <ul className="dnb-ul dnb-unstyled-list">
        <li data-visual-test="anchor-legacy-icon">
          <Anchor href="/uilib/components/anchor">
            Anchor with Icon <IconPrimary icon="chevron_right" />
          </Anchor>
        </li>
        <li data-visual-test="anchor-legacy-paragraph">
          <p className="dnb-p">
            text{' '}
            <Anchor href="/uilib/components/anchor">
              Inside a Paragraph <IconPrimary icon="bell" />
            </Anchor>{' '}
            text
          </p>
        </li>
        <li data-visual-test="anchor-legacy-blank-with-icon">
          <Anchor target="_blank" href="/uilib/components/anchor">
            <IconPrimary icon="bell" /> Blank target with https
          </Anchor>
        </li>
      </ul>
    </ComponentBox>
  )
}
