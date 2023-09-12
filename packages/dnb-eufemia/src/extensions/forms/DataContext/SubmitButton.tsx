import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../types'
import { Button } from '../../../components'
import SharedContext from '../../../shared/Context'
import Context from './Context'

export type Props = ComponentProps & {
  children?: string
}

function SubmitButton(props: Props) {
  const sharedContext = useContext(SharedContext)
  const {
    className,
    children = sharedContext?.translation.Forms.contextSubmit,
  } = props
  const dataContext = useContext(Context)

  return (
    <Button
      className={classnames('dnb-forms-submit-button', className)}
      onClick={dataContext.handleSubmit}
    >
      {children}
    </Button>
  )
}

SubmitButton._supportsEufemiaSpacingProps = true
export default SubmitButton
