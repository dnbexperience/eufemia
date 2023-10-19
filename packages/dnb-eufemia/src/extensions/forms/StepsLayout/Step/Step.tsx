import React, { useContext } from 'react'
import classnames from 'classnames'
import { ComponentProps } from '../../types'
import {
  Props as FlexContainerProps,
  pickFlexContainerProps,
} from '../../../../components/flex/Container'
import StepsContext from '../StepsContext'
import Flex from '../../../../components/flex/Flex'

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
    <Flex.Container
      className={classnames('dnb-forms-step', className)}
      direction="vertical"
      {...pickFlexContainerProps(props)}
    >
      {children}
    </Flex.Container>
  )
}

Step._supportsSpacingProps = true
export default Step
