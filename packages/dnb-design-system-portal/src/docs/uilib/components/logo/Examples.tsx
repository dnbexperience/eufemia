/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { Logo } from '@dnb/eufemia/src'

export const LogoDefaultExample = () => (
  <ComponentBox data-visual-test="logo-default">
    <Logo height="192" />
  </ComponentBox>
)

export const LogoAutoSizeExample = () => (
  <ComponentBox data-visual-test="logo-auto-size">
    <span style={{ fontSize: '12rem' }}>
      <Logo size="auto" />
    </span>
  </ComponentBox>
)

export const LogoInheritSizeExample = () => (
  <ComponentBox data-visual-test="logo-inherit-size">
    <span style={{ height: '12rem' }}>
      <Logo size="inherit" />
    </span>
  </ComponentBox>
)

export const LogoInheritColorExample = () => (
  <ComponentBox data-visual-test="logo-inherit-color">
    <span style={{ color: 'tomato' }}>
      <Logo height="192" inherit_color />
    </span>
  </ComponentBox>
)
