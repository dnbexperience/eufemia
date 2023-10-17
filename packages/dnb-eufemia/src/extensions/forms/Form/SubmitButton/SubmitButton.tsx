import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import SharedContext from '../../../../shared/Context'
import Context from '../../DataContext/Context'
import Button, { ButtonProps } from '../../../../components/button/Button'

export type Props = ComponentProps &
  ButtonProps &
  Partial<React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>>

function SubmitButton(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    className,
    children = sharedContext?.translation.Forms.contextSubmit,
    ...rest
  } = props
  const dataContext = useContext(Context)

  return (
    <Button
      className={classnames('dnb-forms-submit-button', className)}
      onClick={
        dataContext._isInsideFormElement ? null : dataContext.handleSubmit
      }
      icon_position="left"
      type="submit"
      {...rest}
    >
      {children}
    </Button>
  )
}

SubmitButton._supportsSpacingProps = true
export default SubmitButton
