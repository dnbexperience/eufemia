/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { card_medium as Card } from '@dnb/eufemia/src/icons'
import InfoCard from '@dnb/eufemia/src/components/info-card/InfoCard'

export const InfoCardBasic = () => (
  <ComponentBox data-visual-test="info-card-basic">
    <InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />
  </ComponentBox>
)

export const InfoCardTitle = () => (
  <ComponentBox data-visual-test="info-card-title">
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="Title of your info/tip"
    />
  </ComponentBox>
)

export const InfoCardButtons = () => (
  <ComponentBox data-visual-test="info-card-buttons">
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="Title of your info/tip"
      closeButtonText="Close"
      onClose={() => {
        console.log('onClose')
      }}
      acceptButtonText="Accept"
      onAccept={() => {
        console.log('onAccept')
      }}
    />
  </ComponentBox>
)

export const InfoCardButtonsCentered = () => (
  <ComponentBox data-visual-test="info-card-buttons-centered">
    <InfoCard
      centered
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="Title of your info/tip"
      closeButtonText="Close"
      onClose={() => {
        console.log('onClose')
      }}
      acceptButtonText="Accept"
      onAccept={() => {
        console.log('onAccept')
      }}
    />
  </ComponentBox>
)

export const InfoCardAcceptButton = () => (
  <ComponentBox data-visual-test="info-card-accept-button">
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="Title of your info/tip"
      acceptButtonText="Accept"
      onAccept={() => {
        console.log('onAccept')
      }}
    />
  </ComponentBox>
)

export const InfoCardCloseButton = () => (
  <ComponentBox data-visual-test="info-card-close-button">
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="Title of your info/tip"
      closeButtonText="Close"
      onClose={() => {
        console.log('onClose')
      }}
    />
  </ComponentBox>
)

export const InfoCardCustomIcon = () => (
  <ComponentBox scope={{ Card }} data-visual-test="info-card-custom-icon">
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="Title of your info/tip"
      icon={Card}
    />
  </ComponentBox>
)

export const InfoCardCentered = () => (
  <ComponentBox data-visual-test="info-card-centered">
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="Title of your info/tip"
      centered={true}
    />
  </ComponentBox>
)

export const InfoCardWithoutDropShadow = () => (
  <ComponentBox>
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="Title of your info/tip"
      dropShadow={false}
    />
  </ComponentBox>
)

export const InfoCardCustomImage = () => (
  <ComponentBox data-visual-test="info-card-custom-image">
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="This is the InfoCard with a custom image"
      src="/images/avatars/1501870.jpg"
      alt="Profile picture"
    />
  </ComponentBox>
)

export const InfoCardCustomImageCentered = () => (
  <ComponentBox data-visual-test="info-card-custom-image-centered">
    <InfoCard
      text="This is a description of some information or a tip that will inform the user of something that will help them."
      title="This is the InfoCard with a custom image"
      centered={true}
      src="/images/avatars/1501870.jpg"
      alt="Profile picture"
    />
  </ComponentBox>
)
