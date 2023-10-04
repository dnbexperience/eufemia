import React, { useContext } from 'react'
import classnames from 'classnames'
import { ComponentProps } from '../../types'
import FlexContainer, {
  Props as FlexContainerProps,
  pickFlexContainerProps,
} from '../../../../components/layout/FlexContainer'
import StepsContext from '../StepsContext'

export type Props = ComponentProps &
  FlexContainerProps & {
    index?: number
    title?: string
  }

function Step(props: Props) {
  const { className, index, children } = props
  const stepsContext = useContext(StepsContext)

  if (stepsContext?.activeIndex !== index) {
    // Another step is active
    return null
  }

  return (
    <FlexContainer
      className={classnames('dnb-forms-step', className)}
      direction="vertical"
      {...pickFlexContainerProps(props)}
    >
      {children}
    </FlexContainer>
  )
}

Step._supportsEufemiaSpacingProps = true
export default Step
