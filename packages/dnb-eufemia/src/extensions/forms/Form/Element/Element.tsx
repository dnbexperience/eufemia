import React from 'react'
import Context from '../../DataContext/Context'
import Space from '../../../../components/space/Space'
import classnames from 'classnames'
import type { SpacingProps } from '../../../../shared/types'

export type Props = React.HTMLAttributes<HTMLFormElement> & SpacingProps

export default function FormElement({
  children,
  className = null,
  onSubmit = null,
  ...rest
}: Props) {
  const dataContext = React.useContext(Context)

  /**
   * Set to true,
   * this way we prevent "handleSubmit" to be called twice when the SubmitButton is pressed.
   */
  dataContext._isInsideFormElement = true

  return (
    <Space
      element="form"
      className={classnames('dnb-forms-form', className)}
      onSubmit={onSubmitHandler}
      {...rest}
    >
      {children}
    </Space>
  )

  function onSubmitHandler(event: React.SyntheticEvent<HTMLFormElement>) {
    event?.preventDefault()

    dataContext?.handleSubmit?.()

    if (typeof onSubmit === 'function') {
      onSubmit(event)
    }
  }
}
