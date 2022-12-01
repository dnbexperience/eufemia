/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { VisuallyHidden, Section, Anchor, P } from '@dnb/eufemia/src'

export const VisuallyHiddenDefault = () => (
  <ComponentBox data-visual-test="visually-hidden-default">
    <P>
      <span>before|</span>
      <VisuallyHidden>hidden content</VisuallyHidden>
      <span>|after</span>
    </P>
  </ComponentBox>
)

export const VisuallyHiddenFocusable = () => (
  <ComponentBox data-visual-test="visually-hidden-focusable">
    <VisuallyHidden focusable>
      <Anchor href="/">Hidden, but focusable content</Anchor>
    </VisuallyHidden>
  </ComponentBox>
)

export const VisuallyHiddenUseCase = () => (
  <ComponentBox data-visual-test="visually-hidden-use-case">
    <Anchor href="/">
      Read more <VisuallyHidden>about Eufemia</VisuallyHidden>
    </Anchor>
  </ComponentBox>
)

export const VisuallyHiddenSection = () => (
  <ComponentBox data-visual-test="visually-hidden-element">
    {() => {
      const Box = styled.div`
        width: 1rem;
        height: 1rem;
      `
      const BoxBefore = styled(Box)`
        background-color: var(--color-summer-green);
      `
      const BoxAfter = styled(Box)`
        background-color: var(--color-emerald-green);
      `
      return (
        <>
          <BoxBefore />
          <VisuallyHidden aria-label="I'm a region" element={Section}>
            <P>but, not visible to you!</P>
          </VisuallyHidden>
          <BoxAfter />
        </>
      )
    }}
  </ComponentBox>
)
