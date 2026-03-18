import React, { useCallback, useContext, useRef } from 'react'
import clsx from 'clsx'
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
  SpacingProps & {
    ref?: React.RefObject<HTMLFormElement>
    /**
     * Set to `false` to allow the browser's native form submission.
     */
    preventDefaultOnSubmit?: boolean
  }

export default function FormElement(props: Props) {
  return <FormElementInstance {...props} />
}

function FormElementInstance(props: Props) {
  const id = useId()
  const dataContext = useContext(DataContext)
  const { submitState, restHandlerProps } = dataContext || {}
  const states = Object.entries(submitState || {}).filter(
    ([, value]) => value
  )

  const {
    children,
    className,
    onSubmit,
    preventDefaultOnSubmit = true,
    ...restProps
  } = {
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
  const mutableHasElementRef =
    dataContext.hasElementRef as React.RefObject<boolean>
  mutableHasElementRef.current = true

  const onSubmitHandler = useCallback(
    (event: React.SyntheticEvent<HTMLFormElement>) => {
      if (preventDefaultOnSubmit) {
        event?.preventDefault()
      }

      const formElement = event.target as HTMLFormElement
      const submitter = (
        event.nativeEvent as Event & { submitter?: HTMLElement }
      )?.submitter
      const submitterId = submitter?.getAttribute?.(
        'data-form-submit-button-id'
      )

      if (dataContext.hasContext) {
        if (submitterId) {
          dataContext.setActiveSubmitButtonId?.(submitterId)
        }
        dataContext.formElementRef.current = formElement
        dataContext.handleSubmit()
      }

      if (typeof onSubmit === 'function') {
        // @ts-expect-error -- strictFunctionTypes
        onSubmit(event)
      }
    },
    [dataContext, onSubmit, preventDefaultOnSubmit]
  )

  return (
    <Space
      element="form"
      className={clsx('dnb-forms-form', className)}
      // @ts-expect-error -- strictFunctionTypes
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
            className="dnb-forms-form__status-message"
            show={Boolean(value)}
            noAnimation={false}
            shellSpace={{ top: 'small' }}
          >
            {String(value?.['message'] || value || '')}
          </FormStatus>
        )
      })}
    </Space>
  )
}
