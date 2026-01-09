import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import DataContext from '../../DataContext/Context'
import Button, { ButtonProps } from '../../../../components/button/Button'
import SubmitIndicator from '../SubmitIndicator'
import useTranslation from '../../hooks/useTranslation'
import { send } from '../../../../icons'
import useId from '../../../../shared/helpers/useId'

export type Props = {
  /**
   * Show the submit indicator
   */
  showIndicator?: boolean
} & ComponentProps &
  Omit<ButtonProps, 'variant'> &
  Partial<React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>> & {
    variant?: 'send'
  }

function SubmitButton(props: Props) {
  const translations = useTranslation().SubmitButton

  const { variant, className, showIndicator, children, text, ...rest } =
    props

  const content =
    text ||
    children ||
    (variant === 'send' ? translations.sendText : translations.text)

  const submitButtonId = useId()
  const {
    formState,
    handleSubmit,
    hasElementRef,
    props: dataContextProps,
    activeSubmitButtonId,
    setActiveSubmitButtonId,
  } = useContext(DataContext) || {}
  const { isolate } = dataContextProps || {}

  const onClickHandler = useCallback(() => {
    setActiveSubmitButtonId?.(submitButtonId)
    if (!hasElementRef?.current) {
      handleSubmit?.()
    }
  }, [
    hasElementRef,
    handleSubmit,
    setActiveSubmitButtonId,
    submitButtonId,
  ])

  const isActiveSubmitButton =
    !activeSubmitButtonId || activeSubmitButtonId === submitButtonId
  const indicatorState = showIndicator
    ? 'pending'
    : isActiveSubmitButton
    ? formState
    : undefined

  return (
    <Button
      className={classnames('dnb-forms-submit-button', className)}
      onClick={onClickHandler}
      type={isolate ? 'button' : 'submit'}
      icon={variant === 'send' ? send : null}
      data-form-submit-button-id={submitButtonId}
      {...rest}
    >
      {content}

      <SubmitIndicator state={indicatorState} />
    </Button>
  )
}

SubmitButton._supportsSpacingProps = true
export default SubmitButton
