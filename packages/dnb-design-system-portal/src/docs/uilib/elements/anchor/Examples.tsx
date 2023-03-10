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
          href="/uilib/elements/anchor"
          data-visual-test="anchor-default"
        >
          Default Style
        </Anchor>
      </li>
      <li data-visual-test="anchor-blank">
        <Anchor target="_blank" href="/uilib/elements/anchor">
          Blank target with https
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/elements/anchor"
          data-visual-test="anchor-hover"
          className="dnb-anchor--hover"
        >
          Hover Style
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/elements/anchor"
          data-visual-test="anchor-active"
          className="dnb-anchor--active"
        >
          Active Style
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/elements/anchor"
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
          href="/uilib/elements/anchor"
          data-visual-test="anchor-contrast"
          className="dnb-anchor--contrast"
        >
          Contrast Style
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/elements/anchor"
          className="dnb-anchor--no-underline"
        >
          No underline
        </Anchor>
      </li>
      <li>
        <Anchor
          target="_blank"
          href="/uilib/elements/anchor"
          className="dnb-anchor--no-icon"
        >
          Blank target without launch icon
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/elements/anchor"
          className="dnb-anchor--no-hover"
        >
          No hover
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/elements/anchor"
          className="dnb-anchor--no-radius"
        >
          No border-radius
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/elements/anchor"
          className="dnb-anchor--no-animation"
        >
          No animation
        </Anchor>
      </li>
      <li>
        <Anchor
          href="/uilib/elements/anchor"
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
          href="/uilib/elements/anchor"
          data-visual-test="anchor-newline"
        >
          Newline <br />
          {' '}Newline
        </Anchor>
      </li>
      <li>
        <Anchor
          skeleton
          href="/uilib/elements/anchor"
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
    <Anchor href="/uilib/elements/anchor" data-visual-test="anchor-icon">
      Anchor with Icon <IconPrimary icon="chevron_right" />
    </Anchor>
    <br />
    <br />
    <p className="dnb-p" data-visual-test="anchor-paragraph">
      text{' '}
      <Anchor href="/uilib/elements/anchor">
        Inside a Paragraph <IconPrimary icon="bell" />
      </Anchor>{' '}
      text
    </p>
  </ComponentBox>
)

export const AnchorExampleHeadings = () => (
  <ComponentBox hideCode>
    <h2 className="dnb-h--large">
      <Anchor
        href="/uilib/elements/anchor"
        data-visual-test="anchor-heading"
      >
        Inside Headings <IconPrimary icon="bell" />
      </Anchor>{' '}
      H2
    </h2>
    <h2 className="dnb-h--large">
      <Anchor
        target="_blank"
        href="/uilib/elements/anchor"
        data-visual-test="anchor-heading-blank"
      >
        Blank target in headings
      </Anchor>{' '}
      H2
    </h2>
  </ComponentBox>
)
