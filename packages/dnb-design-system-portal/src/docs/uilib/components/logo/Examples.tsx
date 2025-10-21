/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Card, Logo } from '@dnb/eufemia/src'
import { Provider, useTheme } from '@dnb/eufemia/shared'
import {
  DnbDefault,
  SbankenDefault,
} from '@dnb/eufemia/src/components/Logo'
import ChangeStyleTheme from '../../../../core/ChangeStyleTheme'

export const LogoDefaultExample = () => (
  <ComponentBox data-visual-test="logo-default">
    <Logo height="96" />
  </ComponentBox>
)

export const LogoInheritFontSizeExample = () => (
  <ComponentBox data-visual-test="logo-auto-size">
    <span style={{ fontSize: '6rem' }}>
      <Logo />
    </span>
  </ComponentBox>
)

export const LogoInheritHeightExample = () => (
  <ComponentBox data-visual-test="logo-inherit-size">
    <span style={{ height: '6rem' }}>
      <Logo inheritSize />
    </span>
  </ComponentBox>
)

export const LogoInheritColorExample = () => (
  <ComponentBox data-visual-test="logo-inherit-color">
    <span style={{ color: 'tomato' }}>
      <Logo height="96" inheritColor />
    </span>
  </ComponentBox>
)

export const LogoCompactVariantExample = () => (
  <ComponentBox data-visual-test="logo-compact-variant">
    <Logo height="96" variant="compact" />
  </ComponentBox>
)

export const LogoChangeExample = () => (
  <ComponentBox
    scope={{ ChangeStyleTheme, useTheme, DnbDefault, SbankenDefault }}
  >
    {() => {
      function getLogoSvg(themeName) {
        switch (themeName) {
          case 'sbanken':
            return SbankenDefault

          default:
            return DnbDefault
        }
      }

      function MyApp() {
        const { name } = useTheme()

        return (
          <Provider>
            <Card stack>
              <ChangeStyleTheme />
              <Logo height="32" svg={getLogoSvg(name)} />
            </Card>
          </Provider>
        )
      }

      return <MyApp />
    }}
  </ComponentBox>
)

export const LogoCustomSvgExample = () => {
  const CustomSvg = (props) => (
    <svg viewBox="0 0 32 32" {...props}>
      <title>Custom SVG</title>
      <circle cx="16" cy="16" r="14" />
    </svg>
  )

  return (
    <ComponentBox scope={{ CustomSvg }}>
      <Logo
        svg={CustomSvg}
        height="64"
        color="var(--color-emerald-green)"
      />
    </ComponentBox>
  )
}
