import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../component-types'
import { Button } from '../../../components'
import { ButtonProps } from '../../../components/button/Button'
import SharedContext from '../../../shared/Context'
import StepsContext from './StepsContext'

export type Props = ComponentProps &
  ButtonProps & {
    children?: string
  }

export default function PreviousStepButton(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    className,
    'data-testid': dataTestId,
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
      data-testid={dataTestId ?? 'steps-layout-previous-button'}
      onClick={stepsContext?.handlePrevious}
      variant={variant}
      icon_position={icon_position}
      icon={icon}
    >
      {children}
    </Button>
  )
}
