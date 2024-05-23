import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import type { ComponentProps } from '../../types'
import DataContext from '../../DataContext/Context'
import Button, { ButtonProps } from '../../../../components/button/Button'
import SubmitIndicator from '../SubmitIndicator'
import useTranslation from '../../hooks/useTranslation'
import { send } from '../../../../icons'

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

  const { formState, handleSubmit, isInsideFormElement } =
    useContext(DataContext) || {}

  const onClickHandler = useCallback(() => {
    if (!isInsideFormElement) {
      handleSubmit?.()
    }
  }, [isInsideFormElement, handleSubmit])

  return (
    <Button
      className={classnames('dnb-forms-submit-button', className)}
      onClick={onClickHandler}
      type="submit"
      icon={variant === 'send' ? send : null}
      {...rest}
    >
      {content}

      <SubmitIndicator
        state={
          showIndicator ? 'pending' : formState // will be enabled in a follow-up PR
        }
      />
    </Button>
  )
}

SubmitButton._supportsSpacingProps = true
export default SubmitButton
