import React from 'react'
import { HelpButtonProps } from './HelpButton'
import HelpButtonInstance from './HelpButtonInstance'
import HeightAnimation from '../HeightAnimation'
import styled from '@emotion/styled'

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const BreakItem = styled.div`
  flex-basis: 100%;
  height: 0;
`

const HelpContent = styled.div``

export default function HelpButtonInline(props: HelpButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const { children, ...rest } = props

  return (
    <StyledDiv>
      <HelpButtonInstance
        {...rest}
        on_click={() => setIsOpen((open) => !open)}
      />
      <BreakItem />
      <HelpContent>
        <HeightAnimation open={isOpen}>
          <div>{children}</div>
        </HeightAnimation>
      </HelpContent>
    </StyledDiv>
  )
}
