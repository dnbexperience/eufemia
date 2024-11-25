import React, { useCallback, useContext, useRef } from 'react'
import classnames from 'classnames'
import DataContext from '../../DataContext/Context'
import Space from '../../../../components/space/Space'
import useId from '../../../../shared/helpers/useId'
import type { SpacingProps } from '../../../../shared/types'
import { FormStatus } from '../../../../components'
import { combineLabelledBy } from '../../../../shared/component-helper'

export type Props = Omit<
  React.HTMLProps<HTMLFormElement>,
  'ref' | 'autoComplete'
> &
  SpacingProps

export default function FormElement(props: Props) {
  const id = useId()
  const dataContext = useContext(DataContext)
  const { submitState, restHandlerProps } = dataContext || {}
  const states = Object.entries(submitState || {}).filter(
    ([, value]) => value
  )

  const { children, className, onSubmit, ...restProps } = {
    ...restHandlerProps,
    ...props,
  } as Props

  /**
   * Set to true,
   * this way we prevent "handleSubmit" to be called twice when the SubmitButton is pressed.
   */
  const hasElementRef = useRef(false)
  if (!dataContext.hasElementRef) {
    dataContext.hasElementRef = hasElementRef
  }
  dataContext.hasElementRef.current = true

  const onSubmitHandler = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      event?.preventDefault()

      const formElement = event.target as HTMLFormElement

      if (dataContext.hasContext) {
        dataContext.formElementRef.current = formElement
        dataContext.handleSubmit()
      }

      if (typeof onSubmit === 'function') {
        onSubmit(event)
      }
    },
    [dataContext, onSubmit]
  )

  return (
    <Space
      element="form"
      className={classnames('dnb-forms-form', className)}
      onSubmit={onSubmitHandler}
      aria-labelledby={
        combineLabelledBy(
          restProps,
          states.map(([key]) => {
            return `${id}-form-status-${key}`
          })
        ) || undefined
      }
      {...restProps}
    >
      {children}

      {['error', 'warning', 'info'].map((key) => {
        const value = submitState?.[key]
        return (
          <FormStatus
            key={key}
            state={key}
            id={`${id}-form-status-${key}`}
            className="dnb-forms-status"
            show={Boolean(value)}
            no_animation={false}
            shellSpace={{ top: 'small' }}
          >
            {String(value?.['message'] || value || '')}
          </FormStatus>
        )
      })}
    </Space>
  )
}
