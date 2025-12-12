/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Card, Logo, Flex } from '@dnb/eufemia/src'
import {
  DnbDefault,
  SbankenCompact,
  SbankenDefault,
  SbankenHorizontal,
  CarnegieDefault,
  EiendomDefault,
} from '@dnb/eufemia/src/components/Logo'
import MyThemeSelector from '../../../../core/ChangeStyleTheme'
import type { ThemeProps } from '@dnb/eufemia/src/shared/Theme'

function myLogoSelector(theme: ThemeProps) {
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

export const LogoAllExample = () => (
  <ComponentBox
    scope={{
      DnbDefault,
      SbankenCompact,
      SbankenDefault,
      SbankenHorizontal,
      CarnegieDefault,
      EiendomDefault,
    }}
    data-visual-test="logo-all"
  >
    <Flex.Container>
      <Logo height="48" svg={DnbDefault} />
      <Logo height="48" svg={CarnegieDefault} />
      <Logo height="48" svg={EiendomDefault} />
      <Logo height="48" svg={SbankenDefault} />
      <Logo height="48" svg={SbankenHorizontal} />
      <Logo height="48" svg={SbankenCompact} />
    </Flex.Container>
  </ComponentBox>
)

export const LogoDefaultExample = () => (
  <ComponentBox data-visual-test="logo-default">
    <Logo height="96" />
  </ComponentBox>
)

export const LogoInheritFontSizeExample = () => (
  <ComponentBox
    scope={{ myLogoSelector }}
    data-visual-test="logo-auto-size"
  >
    <span style={{ fontSize: '6rem' }}>
      <Logo svg={myLogoSelector} />
    </span>
  </ComponentBox>
)

export const LogoInheritHeightExample = () => (
  <ComponentBox
    scope={{ myLogoSelector }}
    data-visual-test="logo-inherit-size"
  >
    <span style={{ height: '6rem' }}>
      <Logo inheritSize svg={myLogoSelector} />
    </span>
  </ComponentBox>
)

export const LogoColorExample = () => (
  <ComponentBox scope={{ myLogoSelector }} data-visual-test="logo-color">
    <Flex.Container>
      <span style={{ color: 'tomato' }}>
        <Logo height="96" inheritColor svg={myLogoSelector} />
      </span>

      <Logo height="96" color="hotpink" svg={myLogoSelector} />
    </Flex.Container>
  </ComponentBox>
)

export const LogoChangeExample = () => (
  <ComponentBox
    scope={{
      MyThemeSelector,
      myLogoSelector,
      SbankenDefault,
      CarnegieDefault,
      EiendomDefault,
      DnbDefault,
    }}
    data-visual-test="logo-theme-change"
  >
    {() => {
      function myLogoSelector(theme: ThemeProps) {
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

      function MyApp() {
        return (
          <Card stack>
            <MyThemeSelector />
            <Logo height="96" svg={myLogoSelector} />
          </Card>
        )
      }

      return <MyApp />
    }}
  </ComponentBox>
)

export const LogoFixedSizeExample = () => (
  <ComponentBox data-visual-test="logo-fixed" scope={{ myLogoSelector }}>
    <Flex.Container>
      <Logo height="96" svg={myLogoSelector} />
      <Logo width="96" svg={myLogoSelector} />
    </Flex.Container>
  </ComponentBox>
)
