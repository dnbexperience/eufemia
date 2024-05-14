/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Logo } from '@dnb/eufemia/src'

export const LogoDefaultExample = () => (
  <ComponentBox data-visual-test="logo-default">
    <Logo height="96" />
  </ComponentBox>
)

export const LogoAutoSizeExample = () => (
  <ComponentBox data-visual-test="logo-auto-size">
    <span style={{ fontSize: '6rem' }}>
      <Logo />
    </span>
  </ComponentBox>
)

export const LogoInheritSizeExample = () => (
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
