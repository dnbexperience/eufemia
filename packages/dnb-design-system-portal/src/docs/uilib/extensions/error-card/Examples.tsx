/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import ErrorCard from '@dnb/eufemia/src/extensions/error-card'

export const ErrorCardDefaultExample = () => (
  <ComponentBox scope={{ ErrorCard }} data-visual-test="error-card-basic">
    {
      /* jsx */ `
<ErrorCard
  title="This is the default look"
  message="this is the message"
/>
	`
    }
  </ComponentBox>
)

export const ErrorCardCenteredExample = () => (
  <ComponentBox
    scope={{ ErrorCard }}
    data-visual-test="error-card-centered"
  >
    {
      /* jsx */ `
<ErrorCard
  title="This is the centered variant"
  message="this is the message"
  isCentered
/>
	`
    }
  </ComponentBox>
)

export const ErrorCardDefaultActionExample = () => (
  <ComponentBox
    scope={{ ErrorCard }}
    data-visual-test="error-card-centered-with-button"
  >
    {
      /* jsx */ `
<ErrorCard
  title="This is the centered variant"
  message="when passing onTryAgainCLick we have a default text for the button"
  onTryAgainClick={() => {}}
/>
	`
    }
  </ComponentBox>
)

export const ErrorCardSlimExample = () => (
  <ComponentBox scope={{ ErrorCard }} data-visual-test="error-card-slim">
    {
      /* jsx */ `
<ErrorCard
  title="This is the small variant"
  message="this is the message"
  variant="slim"
  onTryAgainClick={() => {}}
/>
	`
    }
  </ComponentBox>
)

export const ErrorCardSlimCenteredExample = () => (
  <ComponentBox
    scope={{ ErrorCard }}
    data-visual-test="error-card-slim-centered"
  >
    {
      /* jsx */ `
<ErrorCard
  title="This is the small and centered variant"
  message="this is the message"
  variant="slim"
  isCentered
  onTryAgainClick={() => {}}
/>
	`
    }
  </ComponentBox>
)

export const ErrorCardCustomActionsExample = () => (
  <ComponentBox
    scope={{ ErrorCard }}
    data-visual-test="error-card-custom-actions"
  >
    {
      /* jsx */ `
<ErrorCard
  title="This is the small and centered variant"
  message="this is the message"
  onTryAgainClick={() => {}}
  customActions={<Button>Custom actions</Button>}
/>
	`
    }
  </ComponentBox>
)

// export const ErrorCardManyCustomActionsExample = () => (
//   <ComponentBox
//     scope={{ ErrorCard }}
//     data-visual-test="error-card-multiple-custom-actions"
//   >
//     {
//       /* jsx */ `
// <ErrorCard
//   title="This is the small and centered variant"
//   message="this is the message"
//   onTryAgainClick={() => {}}
//   customActions={
//     [
//       <Button>Custom actions</Button>,
//       <Button>Custom actions</Button>,
//       <Button>Custom actions</Button>,
//     ]
//   }
// />
// 	`
//     }
//   </ComponentBox>
// )
