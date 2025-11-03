/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Card, Logo } from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/shared'
import {
  DnbDefault,
  SbankenCompact,
  SbankenDefault,
  CarnegieDefault,
  EiendomDefault,
} from '@dnb/eufemia/src/components/Logo'
import ChangeStyleTheme from '../../../../core/ChangeStyleTheme'
import type { ThemeProps } from '@dnb/eufemia/src/shared/Theme'

function getLogoSvg(theme: ThemeProps) {
  switch (theme?.name) {
    case 'sbanken':
      return SbankenDefault

    case 'carnegie':
      return CarnegieDefault

    case 'eiendom':
      return EiendomDefault

    default:
      return DnbDefault
  }
}

export const LogoDefaultExample = () => (
  <ComponentBox scope={{ getLogoSvg }} data-visual-test="logo-default">
    <Logo height="96" svg={getLogoSvg} />
  </ComponentBox>
)

export const LogoInheritFontSizeExample = () => (
  <ComponentBox scope={{ getLogoSvg }} data-visual-test="logo-auto-size">
    <span style={{ fontSize: '6rem' }}>
      <Logo svg={getLogoSvg} />
    </span>
  </ComponentBox>
)

export const LogoInheritHeightExample = () => (
  <ComponentBox
    scope={{ getLogoSvg }}
    data-visual-test="logo-inherit-size"
  >
    <span style={{ height: '6rem' }}>
      <Logo inheritSize svg={getLogoSvg} />
    </span>
  </ComponentBox>
)

export const LogoInheritColorExample = () => (
  <ComponentBox
    scope={{ getLogoSvg }}
    data-visual-test="logo-inherit-color"
  >
    <span style={{ color: 'tomato' }}>
      <Logo height="96" inheritColor svg={getLogoSvg} />
    </span>
  </ComponentBox>
)

export const LogoCompactVariantExample = () => (
  <ComponentBox
    data-visual-test="logo-compact-variant"
    scope={{ SbankenCompact }}
  >
    <Logo height="96" svg={SbankenCompact} />
  </ComponentBox>
)

export const LogoChangeExample = () => (
  <ComponentBox
    scope={{
      ChangeStyleTheme,
      getLogoSvg,
    }}
  >
    {() => {
      function MyApp() {
        return (
          <Provider>
            <Card stack>
              <ChangeStyleTheme />
              <Logo height="32" svg={getLogoSvg} />
            </Card>
          </Provider>
        )
      }

      return <MyApp />
    }}
  </ComponentBox>
)

export const LogoCarnegieDefaultExample = () => (
  <ComponentBox
    scope={{ CarnegieDefault }}
    data-visual-test="logo-carnegie"
  >
    <Logo
      height="96"
      svg={CarnegieDefault}
      color="var(--ca-color-burgundy-red)"
    />
  </ComponentBox>
)

export const LogoEiendomDefaultExample = () => (
  <ComponentBox scope={{ EiendomDefault }} data-visual-test="logo-eiendom">
    <Logo height="96" svg={EiendomDefault} />
  </ComponentBox>
)
