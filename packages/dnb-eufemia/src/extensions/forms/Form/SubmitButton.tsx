import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../types'
import { Button } from '../../../components'
import SharedContext from '../../../shared/Context'
import Context from '../DataContext/Context'

export type Props = ComponentProps &
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
      className={classnames('dnb-forms__submit-button', className)}
      onClick={
        dataContext._isInsideFormElement ? null : dataContext.handleSubmit
      }
      type="submit"
      {...rest}
    >
      {children}
    </Button>
  )
}

SubmitButton._supportsEufemiaSpacingProps = true
export default SubmitButton
