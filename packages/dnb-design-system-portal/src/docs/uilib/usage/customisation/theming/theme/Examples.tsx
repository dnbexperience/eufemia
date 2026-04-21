/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { P, Button, Anchor, Section, Dropdown } from '@dnb/eufemia/src'
import { Theme } from '@dnb/eufemia/src/shared'
import type { ThemeNames } from '@dnb/eufemia/src/shared'

export const ThemeBasis = () => (
  <ComponentBox hideCode>
    {() => {
      const MyColors = styled.div`
        .eufemia-theme__dnb {
          --token-color-text-action: var(--color-sea-green);
        }
        .eufemia-theme__sbanken {
          --token-color-text-action: var(--sb-color-purple-alternative);
        }
      `

      const MyComponent = () => {
        return (
          <P
            top
            style={{
              color: 'var(--token-color-text-action)',
            }}
          >
            Text with different color based on theme. Change the theme to
            see the effect.
          </P>
        )
      }

      const Demo = () => {
        const [name, setName] = React.useState<ThemeNames>(
          'dnb' as ThemeNames,
        )

        return (
          <MyColors>
            <Dropdown
              data={['dnb', 'sbanken']}
              value={name}
              onChange={({ data }) => setName(String(data) as ThemeNames)}
            />
            <Theme name={name}>
              <MyComponent />
            </Theme>
          </MyColors>
        )
      }
      return <Demo />
    }}
  </ComponentBox>
)

export const ThemeSurfaceDark = () => (
  <ComponentBox data-visual-test="theme-surface-dark">
    <section
      style={{
        padding: '1rem',
        backgroundColor: 'var(--token-color-decorative-first-bold-static)',
      }}
    >
      <Theme.Context surface="dark">
        <Button right>Primary button</Button>
        <Button variant="secondary" right>
          Secondary button
        </Button>
        <Anchor href="/">Anchor on dark surface</Anchor>
      </Theme.Context>
    </section>
  </ComponentBox>
)

export const ThemeSurfaceInitial = () => (
  <ComponentBox data-visual-test="theme-surface-initial">
    <Section surface="dark" innerSpace>
      <Button right>Dark surface button</Button>
      <Theme.Context surface="initial">
        <Button>Default surface button</Button>
      </Theme.Context>
    </Section>
  </ComponentBox>
)
