import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import { ButtonProps } from '../../../../components/button/Button'
import SharedContext from '../../../../shared/Context'
import StepsContext from '../StepsContext'
import ButtonRow from '../../Form/ButtonRow'
import SubmitButton from '../../Form/SubmitButton'

export type Props = ComponentProps &
  ButtonProps & {
    children?: string
  }

function NextButton(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    className,
    variant = 'primary',
    icon_position = 'right',
    icon = 'chevron_right',
    children = sharedContext?.translation.Forms.stepNext,
  } = props
  const stepsContext = useContext(StepsContext)

  return (
    <ButtonRow>
      <SubmitButton
        type="button"
        className={classnames('dnb-forms-next-button', className)}
        onClick={stepsContext?.handleNext}
        variant={variant}
        icon_position={icon_position}
        icon={icon}
        {...props}
      >
        {children}
      </SubmitButton>
    </ButtonRow>
  )
}

NextButton._supportsSpacingProps = true
export default NextButton
