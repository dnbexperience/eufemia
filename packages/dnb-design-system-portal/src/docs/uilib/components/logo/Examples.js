/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const LogoDefaultExample = () => (
  <ComponentBox data-visual-test="logo-default">
    {
      /* jsx */ `
<Logo height="192" />
`
    }
  </ComponentBox>
)

export const LogoAutoSizeExample = () => (
  <ComponentBox data-visual-test="logo-auto-size">
    {
      /* jsx */ `
<span style={{ fontSize: '12rem' }}>
  <Logo size="auto" />
</span>
`
    }
  </ComponentBox>
)

export const LogoInheritSizeExample = () => (
  <ComponentBox data-visual-test="logo-inherit-size">
    {
      /* jsx */ `
<span style={{ height: '12rem' }}>
  <Logo size="inherit" />
</span>
`
    }
  </ComponentBox>
)

export const LogoInheritColorExample = () => (
  <ComponentBox data-visual-test="logo-inherit-color">
    {
      /* jsx */ `
<span style={{ color: 'tomato' }}>
  <Logo height="192" inherit_color />
</span>
`
    }
  </ComponentBox>
)
