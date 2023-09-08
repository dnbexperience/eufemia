import React, { useContext } from 'react'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import StepsContext from './StepsContext'
import FlexContainer, {
  Props as FlexContainerProps,
} from '../../../components/layout/FlexContainer'

export type Props = ComponentProps & {
  index?: number
  title?: string
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  children: React.ReactNode
}

function Step(props: Props) {
  const {
    className,
    index,
    direction = 'column',
    spacing = 'medium',
    children,
  } = props
  const stepsContext = useContext(StepsContext)

  if (stepsContext?.activeIndex !== index) {
    // Another step is active
    return null
  }

  return (
    <FlexContainer
      className={classnames('dnb-forms-step', className)}
      direction={direction}
      spacing={spacing}
      {...forwardSpaceProps(props)}
    >
      {children}
    </FlexContainer>
  )
}

Step._supportsEufemiaSpacingProps = true
export default Step
