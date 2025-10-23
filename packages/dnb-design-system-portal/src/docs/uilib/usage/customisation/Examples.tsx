import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Button, Icon } from '@dnb/eufemia/src'
import styled from '@emotion/styled'
import { hamburger as hamburgerIcon } from '@dnb/eufemia/src/icons'

export const LargeButtonsAndIconsExample = () => (
  <ComponentBox>
    <Button
      variant="secondary"
      text="Secondary Button"
      icon="chevron_right_medium"
      size="large"
    />
    <Button icon="chevron_right" iconSize="medium" size="large" />
  </ComponentBox>
)

export const ExtendedExample = () => (
  <ComponentBox scope={{ hamburgerIcon }}>
    {() => {
      const Wrapper = styled.div`
        .dnb-button {
          --button-width: 4rem;
          --button-height: 4rem;
          --button-border-radius: 2rem;
          svg {
            color: fuchsia;
          }
        }
      `
      const myHandler = () => alert('Hello')

      return (
        <Wrapper>
          <Button
            variant="secondary"
            icon={hamburgerIcon}
            size="default"
            on_click={myHandler}
          />
          <Button variant="secondary" size="default" on_click={myHandler}>
            <Icon icon={hamburgerIcon} />
          </Button>
        </Wrapper>
      )
    }}
  </ComponentBox>
)
