import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import { Button } from '../../../../components'
import { ButtonProps } from '../../../../components/button/Button'
import SharedContext from '../../../../shared/Context'
import StepsContext from '../StepsContext'

export type Props = ComponentProps &
  ButtonProps & {
    children?: string
  }

function PreviousButton(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    className,
    variant = 'tertiary',
    icon_position = 'left',
    icon = 'chevron_left',
    children = sharedContext?.translation.Forms.stepPrevious,
  } = props
  const stepsContext = useContext(StepsContext)

  return (
    <Button
      {...props}
      className={classnames('dnb-forms-previous-button', className)}
      onClick={stepsContext?.handlePrevious}
      variant={variant}
      icon_position={icon_position}
      icon={icon}
    >
      {children}
    </Button>
  )
}

PreviousButton._supportsSpacingProps = true
export default PreviousButton
