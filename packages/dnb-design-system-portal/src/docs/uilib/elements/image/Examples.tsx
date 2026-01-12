/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Skeleton, ToggleButton, Img } from '@dnb/eufemia/src'
import styled from '@emotion/styled'

export const ImagePlainExample = () => (
  <ComponentBox data-visual-test="image-plain" hideCode>
    {() => {
      const StyledImg = styled(Img)`
        border-radius: 1rem;
      `
      const CustomImage = () => {
        return (
          <StyledImg
            width="100"
            height="100"
            alt="DNB logo"
            src="/dnb/android-chrome-192x192.png"
          />
        )
      }
      return <CustomImage />
    }}
  </ComponentBox>
)

export const ImageInvalidSourceExample = () => (
  <ComponentBox data-visual-test="image-no-source" hideCode>
    {() => {
      const MyImg = Img

      return (
        <MyImg
          width="100"
          height="100"
          alt="Alt text"
          src="https://invalid"
        />
      )
    }}
  </ComponentBox>
)

export const ImageCaptionExample = () => (
  <ComponentBox data-visual-test="image-caption" hideCode>
    {() => {
      const StyledImg = styled(Img)`
        border-radius: 1rem;
      `
      const CustomImage = () => {
        return (
          <StyledImg
            width="100"
            height="100"
            alt="Alt text"
            caption="Caption text"
            src="/dnb/android-chrome-192x192.png"
          />
        )
      }
      return <CustomImage />
    }}
  </ComponentBox>
)

export const ImageSkeletonExample = () => (
  <ComponentBox data-visual-test="image-skeleton">
    {() => {
      const StyledImg = styled(Img)`
        border-radius: 1rem;
      `
      const CustomImage = () => {
        const [state, setState] = React.useState(true)
        return (
          <Skeleton show={state}>
            <StyledImg
              width="100"
              height="100"
              alt="DNB logo"
              src="/dnb/android-chrome-192x192.png"
            />
            <br />
            <Skeleton.Exclude>
              <ToggleButton
                checked={state}
                onChange={({ checked }) => setState(checked)}
                top="large"
              >
                Toggle
              </ToggleButton>
            </Skeleton.Exclude>
          </Skeleton>
        )
      }
      return <CustomImage />
    }}
  </ComponentBox>
)
