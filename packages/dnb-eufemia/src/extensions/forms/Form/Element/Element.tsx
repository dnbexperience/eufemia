import React from 'react'
import classnames from 'classnames'
import Space from '../../../../components/space/Space'
import useDataContext from '../data-context/useDataContext'
import type { SpacingProps } from '../../../../shared/types'

export type Props = React.HTMLAttributes<HTMLFormElement> & SpacingProps

export default function FormElement({
  children,
  className = null,
  onSubmit = null,
  ...rest
}: Props) {
  const dataContext = useDataContext()

  /**
   * Set to true,
   * this way we prevent "handleSubmit" to be called twice when the SubmitButton is pressed.
   */
  if (dataContext.isInsideFormElementRef) {
    dataContext.isInsideFormElementRef.current = true
  }

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

    const formElement = event.target as HTMLFormElement
    dataContext?.handleSubmit?.({ formElement })

    if (typeof onSubmit === 'function') {
      onSubmit(event)
    }
  }
}
