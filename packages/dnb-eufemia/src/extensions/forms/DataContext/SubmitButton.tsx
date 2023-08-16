import React, { useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../component-types'
import { Button } from '../../../components'
import SharedContext from '../../../shared/Context'
import Context from './Context'

export type Props = ComponentProps & {
  children?: string
}

export default function SubmitDataContextButton(props: Props) {
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
