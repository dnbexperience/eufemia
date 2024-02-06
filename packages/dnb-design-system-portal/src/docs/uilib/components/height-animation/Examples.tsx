/**
 * UI lib Component Example
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  HeightAnimation,
  ToggleButton,
  Section,
  Button,
  Anchor,
  P,
} from '@dnb/eufemia/src'

export function HeightAnimationDefault() {
  return (
    <ComponentBox>
      {() => {
        const Example = () => {
          const [openState, setOpenState] = React.useState(false)
          const [contentState, setContentState] = React.useState(false)

          const onChangeHandler = ({ checked }) => {
            setOpenState(checked)
          }

          return (
            <>
              <ToggleButton
                checked={openState}
                on_change={onChangeHandler}
                right
              >
                Open/close
              </ToggleButton>
              <ToggleButton
                checked={contentState || !openState}
                disabled={!openState}
                on_change={({ checked }) => {
                  setContentState(checked)
                }}
                space={{ top: true, bottom: true }}
              >
                Change height inside
              </ToggleButton>

              <Section style_type="lavender" top>
                <HeightAnimation open={openState}>
                  <Section spacing style_type="lavender">
                    <P space={0}>Your content</P>
                  </Section>
                  {contentState && <P space={0}>More content</P>}
                </HeightAnimation>
              </Section>

              <P top>Look at me 👀</P>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export function HeightAnimationAutosizing() {
  return (
    <ComponentBox>
      {() => {
        const Example = () => {
          const [showMe, setShowMe] = React.useState(true)

          return (
            <>
              <HeightAnimation showOverflow>
                {showMe ? (
                  <Button
                    onClick={() => {
                      setShowMe(!showMe)
                    }}
                  >
                    Click me!
                  </Button>
                ) : (
                  <Anchor
                    onClick={() => {
                      setShowMe(!showMe)
                    }}
                  >
                    No, click me!
                  </Anchor>
                )}
              </HeightAnimation>

              <P top>Look at me 👀</P>
            </>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

export function HeightAnimationKeepInDOM() {
  return (
    <ComponentBox>
      {() => {
        const Example = () => {
          const [openState, setOpenState] = React.useState(true)
          const [contentState, setContentState] = React.useState(false)

          const onChangeHandler = ({ checked }) => {
            setOpenState(checked)
          }

          return (
            <>
              <ToggleButton
                checked={openState}
                on_change={onChangeHandler}
                right
              >
                Open/close
              </ToggleButton>
              <ToggleButton
                checked={contentState || !openState}
                disabled={!openState}
                on_change={({ checked }) => {
                  setContentState(checked)
                }}
                space={{ top: true, bottom: true }}
              >
                Change height inside
              </ToggleButton>

              <StyledSection style_type="lavender" top>
                <HeightAnimation
                  open={openState}
                  keepInDOM={true}
                  duration={1000}
                >
                  <Section spacing style_type="lavender">
                    <P space={0}>Your content</P>
                  </Section>
                  {contentState && <P space={0}>More content</P>}
                </HeightAnimation>
              </StyledSection>
            </>
          )
        }

        const StyledSection = styled(Section)`
          .content-element {
            transition: transform 1s var(--easing-default);
            transform: translateY(-2rem);

            padding: 4rem 0;
          }

          .dnb-height-animation--parallax .content-element {
            transform: translateY(0);
          }
        `

        return <Example />
      }}
    </ComponentBox>
  )
}
