/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { card_medium as Card } from '@dnb/eufemia/src/icons'

export const InfoCardBasic = () => (
  <ComponentBox data-visual-test="info-card-basic">
    {() => /* jsx */ `
<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them." 
/>
`}
  </ComponentBox>
)

export const InfoCardTitle = () => (
  <ComponentBox noFragments={false} data-visual-test="info-card-title">
    {() => /* jsx */ `
<InfoCard 
  text="This is a description of some information or a tip that will inform the user of something that will help them." 
  title="Title of your info/tip" 
/>
    `}
  </ComponentBox>
)

export const InfoCardButtons = () => (
  <ComponentBox noFragments={false} data-visual-test="info-card-buttons">
    {() => /* jsx */ `
<InfoCard 
  text="This is a description of some information or a tip that will inform the user of something that will help them." 
  title="Title of your info/tip" 
  closeButtonText="Close"
  onClose={() => {console.log("onClose")}}
  acceptButtonText="Accept"
  onAccept={() => {console.log("onAccept")}}
/>
      `}
  </ComponentBox>
)

export const InfoCardButtonsCentered = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="info-card-buttons-centered"
  >
    {() => /* jsx */ `
<InfoCard 
  centered
  text="This is a description of some information or a tip that will inform the user of something that will help them." 
  title="Title of your info/tip" 
  closeButtonText="Close"
  onClose={() => {console.log("onClose")}}
  acceptButtonText="Accept"
  onAccept={() => {console.log("onAccept")}}
/>
      `}
  </ComponentBox>
)

export const InfoCardAcceptButton = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="info-card-accept-button"
  >
    {() => /* jsx */ `
<InfoCard 
  text="This is a description of some information or a tip that will inform the user of something that will help them." 
  title="Title of your info/tip" 
  acceptButtonText="Accept"
  onAccept={() => {console.log("onAccept")}}
/>
    `}
  </ComponentBox>
)

export const InfoCardCloseButton = () => (
  <ComponentBox
    noFragments={false}
    data-visual-test="info-card-close-button"
  >
    {() => /* jsx */ `
<InfoCard 
  text="This is a description of some information or a tip that will inform the user of something that will help them." 
  title="Title of your info/tip" 
  closeButtonText="Close"
  onClose={() => {console.log("onClose")}}
/>
    `}
  </ComponentBox>
)

export const InfoCardCustomIcon = () => (
  <ComponentBox scope={{ Card }} data-visual-test="info-card-custom-icon">
    {() => /* jsx */ `
<InfoCard 
  text="This is a description of some information or a tip that will inform the user of something that will help them." 
  title="Title of your info/tip" 
  icon={Card} 
/>
`}
  </ComponentBox>
)

export const InfoCardCentered = () => (
  <ComponentBox data-visual-test="info-card-centered">
    {() => /* jsx */ `
<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."  
  title="Title of your info/tip" 
  centered={true}
/>
`}
  </ComponentBox>
)

export const InfoCardCustomImage = () => (
  <ComponentBox data-visual-test="info-card-custom-image">
    {() => /* jsx */ `
<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."  
  title="This is the InfoCard with a custom image" 
  src="/images/avatars/1501870.jpg"
  alt="Profile picture"
/>
`}
  </ComponentBox>
)

export const InfoCardCustomImageCentered = () => (
  <ComponentBox data-visual-test="info-card-custom-image-centered">
    {() => /* jsx */ `
<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."  
  title="This is the InfoCard with a custom image" 
  centered={true}
  src="/images/avatars/1501870.jpg"
  alt="Profile picture"
/>
`}
  </ComponentBox>
)
