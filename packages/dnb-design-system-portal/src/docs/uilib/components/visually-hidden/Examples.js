/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const VisuallyHiddenDefault = () => (
  <ComponentBox data-visual-test="visually-hidden-default">
    {
      /* jsx */ `
<VisuallyHidden>Hidden content</VisuallyHidden>
`
    }
  </ComponentBox>
)

export const VisuallyHiddenFocusable = () => (
  <ComponentBox data-visual-test="visually-hidden-focusable">
    {
      /* jsx */ `
<VisuallyHidden focusable>
  <Anchor href="/">Hidden, but focusable content</Anchor>
</VisuallyHidden>
`
    }
  </ComponentBox>
)

export const VisuallyHiddenUseCase = () => (
  <ComponentBox data-visual-test="visually-hidden-use-case">
    {
      /* jsx */ `
<Anchor href="/">Read more <VisuallyHidden element="span">about Eufemia</VisuallyHidden></Anchor>
`
    }
  </ComponentBox>
)

export const VisuallyHiddenSpan = () => (
  <ComponentBox data-visual-test="visually-hidden-span">
    {
      /* jsx */ `
<VisuallyHidden element="span">Hidden, with custom HTML element</VisuallyHidden>
`
    }
  </ComponentBox>
)
